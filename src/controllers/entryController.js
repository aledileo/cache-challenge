const Entry = require('../models/entry');
const { v4 } = require('uuid');

async function addRandomEntryByKey(key) {
  try {
    const entriesCount = await Entry.countDocuments({});
    if (entriesCount >= process.env.MAX_CACHE_SIZE) {
      await handleCacheOverflow();
    }
  
    const entry = new Entry({
      key,
      value: v4(),
      lastRead: Date.now(),
    });
  
    return entry.save();
  } catch (e) {
    console.log(e);
    throw e;
  }
}

const isEntryExpired = (entry) => Boolean(Date.now() - entry.lastRead >= 1000 * 15);

/**
 * The entry to be deleted is the oldest one
 */
async function handleCacheOverflow () {
  try {
    const oldestEntry = (await Entry.find().sort({ lastRead: 'asc' }))[0];
    await Entry.findByIdAndDelete({ _id: oldestEntry._id });
  } catch (e) {
    console.log(e);
    throw e;
  }
}

exports.getEntryById = async (req, res) => {
  try {
    let entry = await Entry.findOne({ key: req.params.id });
    console.log('holu')
    
    if (!entry) {
      console.log("Cache miss");
      const newEntry = await addRandomEntryByKey(req.params.id);
      res.status(201).send(newEntry.value);
      return;
    }

    if (isEntryExpired(entry)) {
      await Entry.findByIdAndDelete({ _id: entry._id });
      const newEntry = await addRandomEntryByKey(req.params.id);
      res.status(201).send(newEntry.value);
      return;
    }

    console.log("Cache hit");
    res.status(200).send(entry.value);
    await Entry.findByIdAndUpdate({ _id: entry._id}, { lastRead: Date.now() });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

exports.getAllEntries = async (req, res) => {
  try {
    const entries = await Entry.find();
    res.status(200).json(entries);
  } catch(e) {
    res.status(500).json({ message: e.message });
  }
}

exports.updateEntryById = async (req, res) => {
  try {
    const query = { key: req.params.id };
    const updateOperation = { value: req.body.value, lastRead: Date.now() };
    const options = { new: true };
    const updatedEntry = await Entry.findOneAndUpdate(query, updateOperation, options);
    res.status(200).json(updatedEntry);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

exports.deleteEntryByKey = async (req, res) => {
  try {
    const query = { key: req.params.id };
    const deletedEntry = await Entry.findOneAndDelete(query);
    res.status(200).json(deletedEntry);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

exports.deleteAllEntries = async (req, res) => {
  try {
    const returnedQuery = await Entry.deleteMany({});
    res.status(200).json(returnedQuery);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}
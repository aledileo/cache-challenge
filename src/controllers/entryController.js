const Entry = require('../models/entry');

async function addRandomEntryByKey(key) {
  const randomString = `Random string for '${key}'`;
  const entry = new Entry({
    key,
    value: randomString,
  });

  return entry.save();
}

exports.getEntryById = async (req, res) => {
  try {
    let entry = await Entry.findOne({ key: req.params.id });
    
    if (!entry) {
      console.log("Cache miss");
      const newEntry = await addRandomEntryByKey(req.params.id);
      res.status(201).send(newEntry.value);
    } else {
      console.log("Cache hit");
      res.status(200).send(entry.value);
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

exports.getAllEntries = async (req, res) => {
  try {
    const entries = await Entry.find();
    res.status(200).json(entries);
  } catch(e) {
    console.log(e)
    res.status(500).json({ message: e.message });
  }
}

exports.updateEntryById = async (req, res) => {
  try {
    const query = { key: req.params.id };
    const updateOperation = { value: req.body.value };
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
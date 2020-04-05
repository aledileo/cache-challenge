const Entry = require('../models/entry');

async function addRandomEntryByKey(key) {
  const randomString = `Random string for '${key}'`;
  const entry = new Entry({
    key,
    value: randomString,
  });

  return entry.save();
}

exports.getById = async (req, res) => {
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
    res.status(400).json({ message: err.message })
  }
}
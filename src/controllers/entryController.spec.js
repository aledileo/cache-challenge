const { MongoClient } = require('mongodb');
const entryController = require('./entryController');

describe('entryController', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    db = await connection.db();
  });

  afterAll(async () => {
    await connection.close();
    await db.close();
  });

  it('should insert a new entry', async () => {
    const statusSpy = jest.fn();
    const entries = db.collection('entries');
    const req = {
      params: {
        id: 'test',
      }
    };

    const res = {
      status: statusSpy,
    }

    await entryController.getEntryById(req, res);
    const createdEntry = await entries.findOne({ key: 'test'});
    expect(createdEntry).not.toEqual(createdEntry.key === 'test');
    expect(statusSpy).toHaveBeenCalledWith(201);
  });
});
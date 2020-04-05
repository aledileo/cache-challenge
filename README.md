# Cache challenge

## Requirements

- MongoDB running
- Node 10.18.0

## How to run

1. Create a `.env` file in the root directory. `DB_URI` is the only value required i.e: 
```
PORT=3000
DB_URI=mongodb://localhost/cache
MAX_CACHE_SIZE=3
TTL=15
```

2. Run `npm install`
3. Run `npm start`

## Supported routes

- `GET` /cache/:id 
    - Retrieves the desired cachec entry or create a new one if not present 

- `GET` /cache
    - Retrieves all entries in the cache

- `PUT` /cache/:id | `{ value: 'New Value' }`
    - Replaces the value of a given entry

- `DELETE` /cache/:id
    - Deletes a given entry from the cache

- `DELETE` /cache
    - Deletes all entries in the cache

## Considerations

- Both `MAX_CACHE_SIZE` and `TTL` can be configurable from the `.env` file. If no values provided they will fall back to `3` and `15`, respectively.

- When the cache is full I choosed to delete the oldest entry and insert the incoming value

- Tests are not connnecting to the in-memory mongo instance, thus timing out
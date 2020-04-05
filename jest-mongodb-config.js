module.exports = {
  mongodbMemoryServerOptions: {
    instance: {
      dbName: 'entries'
    },
    binary: {
      version: '4.0.3',
      skipMD5: true
    },
    autoStart: false
  }
};
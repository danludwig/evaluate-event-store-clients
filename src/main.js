const evaluateEventStoreClient = require('./evaluate-event-store-client');
const evaluateGESClient = require('./evaluate-ges-client');

const message = 'Hello, node server world'
const start = () => (console.log(message))
const server = start()

const config = {
  eventStore: {
    host: '192.168.99.100',
    port: 1113,
    credentials: {
      username: 'admin',
      password: 'changeit'
    }
  }
}

evaluateEventStoreClient(config)
//evaluateGESClient(config)

module.exports = server

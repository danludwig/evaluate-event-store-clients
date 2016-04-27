import evaluateEventStoreClient from './evaluate-event-store-client'
import evaluateGESClient from './evaluate-ges-client'

const message = 'Hello, node server world'
const start = () => (console.log(message))
const server = start()

const config = {
  eventStore: {
    address: '127.0.0.1',
    port: 1113,
    credentials: {
      username: 'admin',
      password: 'changeit'
    }
  }
}

evaluateEventStoreClient(config)
//evaluateGESClient(config)

export default server

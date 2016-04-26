import EventStoreClient from 'event-store-client'
import ges from 'ges-client'

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

// Connect to the Event Store
const options = {
  host: config.eventStore.host,
  port: config.eventStore.port
}

const connection = new EventStoreClient.Connection(options)

// Ping it to see that its there
console.log(`Pinging eventstore ${options.host}:${options.port}...`)
connection.sendPing(response => (
  console.log(`...Received ${EventStoreClient.Commands.getCommandName(response.command)} response from Ping.`)
))

export default server

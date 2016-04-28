const EventStoreClient = require('event-store-client')

module.exports = config => {
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

  let written = false, read = false
  const destinationId = 'TestStream'
  const newEvent = {
      eventId: EventStoreClient.Connection.createGuid(),
      eventType: 'TestEvent',
      data: {
          textProperty: "value",
          numericProperty: 42
      }
  }
  const newEvents = [ newEvent ]
  console.log('Writing events to ' + destinationId + '...')
  connection.writeEvents(destinationId, EventStoreClient.ExpectedVersion.Any, false, newEvents, null, completed => {
      console.log(`Events written result: ${EventStoreClient.OperationResult.getName(completed.result)}`)
      written = true
      //closeIfDone()
  })

  const onEventAppeared = streamEvent => {
    console.log(streamEvent)
  }
  console.log('Reading events forward from ' + destinationId + '...')
  connection.readStreamEventsForward(destinationId, 0, 100, true, false, onEventAppeared, null, completed => {
      console.log(`Received a completed event:  ${EventStoreClient.ReadStreamResult.getName(completed.result)} (error: ${completed.error})`)
      read = true
      //closeIfDone()
  })

  connection.close()
}

import ges from 'ges-client'
import uuid from 'node-uuid'

export default config => {
  const connection = ges(), stream = 'intro-events'
  const testEventData = new Buffer(JSON.stringify({
    eventProp1: 'string',
    eventProp2: 199,
  }))
  const testEventMetadata = new Buffer(JSON.stringify({
    metadataProp1: 'string',
    metadataProp2: 299,
  }))
  const testEvent = ges.createEventData(uuid.v4(), 'SampleGesEvent', true, testEventData, testEventMetadata)
  const arrayOfEvents = [testEvent]

  connection.on('connect', () => {
    // const appendData = {
    //   //expectedVersion: ges.expectedVersion.emptyStream,
    //   expectedVersion: ges.expectedVersion.any,
    //   events: arrayOfEvents,
    // }

    // connection.appendToStream(stream, appendData, (err, appendResult) => {
    //   if (err) return console.log('Oooops!', err)
      connection.readStreamEventsForward(stream, { start: 0, count: 500}, (err, readResult) => {
        if (err) return console.log('Ooops!', err)

        console.log(readResult.Events)
      })
    // })
  })
}

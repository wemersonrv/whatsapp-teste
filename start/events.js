const Event = use('Event')

Event.on('message::incoming', () => {
  console.log('A new message has arrived')
})

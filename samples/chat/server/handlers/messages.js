const messages = []
let log = undefined

const handleMessageActions = function(action, { socketDispatch, broadcast }, next){
  switch(action.type) {
    case 'GET_ALL_MESSAGES': {
      socketDispatch({
        type: 'SET_MESSAGES',
        payload: { messages }
      })
      break;
    }
    case 'SEND_MESSAGE': {
      const message = action.payload.message.value
      messages.push(message)
      broadcast({
        type: 'APPEND_MESSAGE',
        payload: { message }
      })
      break;
    }
  }

  next()
}

module.exports = function(reactReduxSocketServer) {
  reactReduxSocketServer.onActionIn(handleMessageActions)
}

module.exports.log = _log => { log = _log; return module.exports }

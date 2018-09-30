import createActions from 'redux-actions-generator'

const Api = createActions('api', [
  'CONNECT',
  'CONNECTED',
  'NEW_MESSAGE',
  'SEND_MESSAGE',
  'DISCONNECTED',
  'AUTH_ERROR'
])

export default { Api }

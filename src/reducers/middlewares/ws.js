import Actions from '@actions'

let uuid = 1

export const wsMiddleware = function mqttMiddleware(store) {
  let client = null
  let messages = {}

  return function (next) {
    return function (action) {
      let { type, payload } = action
      switch(type) {
        case (Actions.Api.CONNECT):
          client = new WebSocket(`ws://${payload.host}`)

          client.onclose = function() {
            store.dispatch({ type: Actions.Api.DISCONNECTED })
          }
          
          client.onmessage = function(event) {
            let data = JSON.parse(event.data)
            console.log(data)
            if (data.type == "result") {
              let responseType = messages[data.id]
              
              if (responseType) {
                store.dispatch({ 
                  type: Actions.Api.NEW_MESSAGE, 
                  payload: {
                    ...data,
                    type: responseType
                  } 
                })
                delete messages[data.id]
              }
            } else if (data.type == "auth_ok") {
              store.dispatch({ type: Actions.Api.CONNECTED })
            } else if (data.type == 'auth_invalid') {
              store.dispatch({ type: Actions.Api.AUTH_ERROR, payload: data })
              client.close()
              messages = {}
            } else if (data.type == 'auth_required') {
              let message = JSON.stringify({ type: 'auth', access_token: payload.password })
              client.send(message)
            } else {
              store.dispatch({ type: Actions.Api.NEW_MESSAGE, payload: data })
            }
          }

          client.onerror = function(event) {
            console.error(event)
            store.dispatch({ type: Actions.Api.DISCONNECTED })
            client = null
          }
        break

        case (Actions.Api.SEND_MESSAGE):
          messages[uuid] = payload.type
          let message = JSON.stringify({ id: uuid, ...payload })
          client.send(message)
          uuid++
        break
      }
      next(action)
    }
  }
}

const initialState = 'LOADING'

export function wsReducer(state = initialState, action) {
  switch(action.type) {
    case (Actions.Api.CONNECT):
      return 'CONNECTING'
    break

    case (Actions.Api.CONNECTED):
      return 'OK'
    break

    case (Actions.Api.DISCONNECTED):
      return 'DISCONNECTED'
    break

    case (Actions.Api.AUTH_ERROR):
      return 'INVALID'
    break
  }
  return state
}

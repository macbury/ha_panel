import Actions from '@actions'

export function auth(host, password) {
  return { type: Actions.Api.CONNECT, payload: { host, password } }
}

export function subscribeToStateChanges() {
  return { 
    type: Actions.Api.SEND_MESSAGE, 
    payload: {
      type: 'subscribe_events',
      event_type: 'state_changed' 
    } 
  }
}

// https://developers.home-assistant.io/docs/en/external_api_websocket.html#fetching-states
export function fetchStates() {
  return { 
    type: Actions.Api.SEND_MESSAGE, 
    payload: {
      type: 'get_states'
    } 
  }
}

//https://developers.home-assistant.io/docs/en/external_api_websocket.html#calling-a-service
export function callService(domain, service, service_data) {
  return { 
    type: Actions.Api.SEND_MESSAGE, 
    payload: {
      type: 'call_service',
      domain,
      service,
      service_data
    } 
  }
}

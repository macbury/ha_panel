import Actions from '@actions'

const initialState = {
  loading: true,
  items: {}
}

function parseMessage(state, { type, result, event }) {
  if (type == 'get_states') {
    let items = {}
    result.forEach((item) => { items[item.entity_id] = item })
    return { loading: false, items }
  } else if (event) {
    let { event_type, data } = event
    if (event_type == 'state_changed') {
      let items = {...state.items}
      items[data.entity_id] = data.new_state
      return {...state, items }
    }
  }
  return state
}

export default function entitiesReducer(state = initialState, { type, payload }) {
  switch(type) {
    case (Actions.Api.NEW_MESSAGE):
      return parseMessage(state, payload)
    break
  }
  return state
}
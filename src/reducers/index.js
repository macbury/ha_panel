import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'

import { wsMiddleware, wsReducer } from '@reducers/middlewares/ws'
import entities from './entities'
import config from './config'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

function test(state, action) {
  return {}
}

const reducers = combineReducers({
  ws: wsReducer,
  entities,
  config
})

const middlewares = applyMiddleware(
  wsMiddleware, thunkMiddleware
)

const store = createStore(reducers, composeEnhancers(middlewares))

export { store }

import { combineReducers, createStore } from 'redux';
import { initialState, stateTypeCheck } from './types'


const reducer = combineReducers({ visibilityFilter, todos })
const store = createStore(reducer)

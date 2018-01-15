import { combineReducers } from 'redux'
import webSocket from './webSocket'
import colorPicker from './colorPicker'

export default combineReducers({
    webSocket,
    colorPicker
})
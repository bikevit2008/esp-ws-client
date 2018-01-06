import { WEBSOCKET_CONNECT, WEBSOCKET_DISCONNECT, WEBSOCKET_SEND } from '../middleware/websocket'

export function wsConnect(args) {
  return {
    type: WEBSOCKET_CONNECT,
    payload: {
        args: args
    }
  }
}
export function wsDisconnect() {
  return {
    type: WEBSOCKET_DISCONNECT
  }
}
export function wsSend(object) {
  return {
    type: WEBSOCKET_SEND,
    payload: object
  }
}

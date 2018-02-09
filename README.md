# esp-ws-client
React.js, Redux, WebSocket client for esp server

Example for change length of the strip (leds count)

{
  type: 'WEBSOCKET:SEND',
  payload: '{"method":"setLengthStrip","lengthStrip": 3}'
}

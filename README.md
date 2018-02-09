# esp-ws-client
React.js, Redux, WebSocket client for esp server

Example for change length of the strip (leds count)

{
  type: 'WEBSOCKET:SEND',
  payload: '{"method":"setLengthStrip","lengthStrip": 3}'
}

Example for change color of the all leds

{
  type: 'WEBSOCKET:SEND',
  payload: '{"method":"changeColorAll","color":[255, 255, 255]}'
}

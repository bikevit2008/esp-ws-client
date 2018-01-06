/* eslint-env browser */
/*       */
import { compose } from 'redux';
import partial from 'lodash/fp/partial';
import partialRight from 'lodash/fp/partialRight';
import { connecting, open, closed, message } from './actions';
import { createWebsocket } from './websocket';

// Action types to be dispatched by the user
export const WEBSOCKET_CONNECT = 'WEBSOCKET:CONNECT';
export const WEBSOCKET_DISCONNECT = 'WEBSOCKET:DISCONNECT';
export const WEBSOCKET_SEND = 'WEBSOCKET:SEND';
// Action types dispatched by the WebSocket implementation
export const WEBSOCKET_CONNECTING = 'WEBSOCKET:CONNECTING';
export const WEBSOCKET_OPEN = 'WEBSOCKET:OPEN';
export const WEBSOCKET_CLOSED = 'WEBSOCKET:CLOSED';
export const WEBSOCKET_MESSAGE = 'WEBSOCKET:MESSAGE';

const createMiddleware = () => {
  // Hold a reference to the WebSocket instance in use.
  let websocket            
  let websocketConfig         

  /**
   * A function to create the WebSocket object and attach the standard callbacks
   */
  const initialize = ({ dispatch }, config) => {
    // Instantiate the websocket.
    websocket = createWebsocket(config);
    websocketConfig = config

    // Function will dispatch actions returned from action creators.
    const dispatchAction = partial(compose, [dispatch]);

    // Setup handlers to be called like this:
    // dispatch(open(event));
    websocket.onopen = dispatchAction(open);
    websocket.onclose = dispatchAction(closed);
    websocket.onmessage = dispatchAction(message);

    // An optimistic callback assignment for WebSocket objects that support this
    const onConnecting = dispatchAction(connecting);
    // Add the websocket as the 2nd argument (after the event).
    websocket.onconnecting = partialRight(onConnecting, [websocket]);
  };

  /**
   * Close the WebSocket connection and cleanup
   */
  const close = () => {
    if (websocket) {
      console.warn(`Closing WebSocket connection to ${websocket.url} ...`);
      websocket.close();
      websocket = null;
    }
  };

  let attempts = 1
  const generateInterval = (k) => Math.min(30, (Math.pow(2, k) - 1)) * 1000

  /**
   * The primary Redux middleware function.
   * Each of the actions handled are user-dispatched.
   */
  return (store) => (next) => (action) => {
    let time = 0
    switch (action.type) {
      // User request to connect
      case WEBSOCKET_CONNECT:
        close();
        initialize(store, action.payload);
        next(action);
        break;

      // User request to disconnect
      case WEBSOCKET_DISCONNECT:
        close();
        next(action);
        break;

      // User request to send a message
      case WEBSOCKET_SEND:
        if (websocket) {
          websocket.send(action.payload)
        } else {
          console.warn('WebSocket is closed, ignoring. Trigger a WEBSOCKET_CONNECT first.');
        }
        next(action);
        break;

      case WEBSOCKET_OPEN:
        attempts = 1
        next(action)
        break
    
      case WEBSOCKET_CLOSED:
        time = generateInterval(attempts)

        setTimeout(() => {
          // We've tried to reconnect so increment the attempts by 1
          attempts++;
          console.log(websocketConfig, websocketConfig.url)
          initialize(store, websocketConfig)
        }, time)
        next(action)
        break
      default:
        next(action);
    }
  };
};

export default createMiddleware();

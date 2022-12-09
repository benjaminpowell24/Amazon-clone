import React from 'react';
import ReactDOM,{render} from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { StateProvider } from './StateProvider';
import reducer, { initialState } from './reducer';
import { transitions, positions, Provider as AlertProvider, types } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';


const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_CENTER,
  types: types.INFO,
  timeout: 3000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE,
  containerStyle: {
    zIndex: 1001
  }
}

ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <AlertProvider template={AlertTemplate} {...options}>
          <App />
      </AlertProvider>
    </StateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

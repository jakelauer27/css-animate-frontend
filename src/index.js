import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App/App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom'
import { createStore } from 'redux'
import rootReducer from './reducers/index'
import { Provider } from 'react-redux'
import { Route } from 'react-router-dom'

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const store = createStore(rootReducer, devTools)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename={`${process.env.PUBLIC_URL}`}>
      <Route path={`${process.env.PUBLIC_URL}/`} component={App} />
    </BrowserRouter> 
  </Provider>,
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleWare from 'redux-thunk'
import logger from 'redux-logger'
import App from './App';
import * as serviceWorker from './serviceWorker';

import { fetchData, searchData, handleUser } from './reduxFiles/reducers'

const rootReducer = combineReducers({ fetchData, searchData, handleUser })
const store = createStore(rootReducer, applyMiddleware(logger, thunkMiddleWare))

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

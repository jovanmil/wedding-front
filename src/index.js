import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {register} from './serviceWorker';
import loginreducer from "./redux/reducers/loginreducer";
import datareducer from "./redux/reducers/datareducer";

// Defining additional reducers if there is need for
const rootReducer = combineReducers({
    loginReducer: loginreducer,
    datareducer: datareducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));
register();

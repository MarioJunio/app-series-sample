import React from 'react';
import Router from './Router';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { rootReducer } from './reducers';
import { composeWithDevTools } from 'remote-redux-devtools';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(reduxThunk)));

const SeriesApp = (props) => (

    <Provider store={store}>
        <Router />
    </Provider>

);

export default SeriesApp;
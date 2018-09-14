import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import {initialState} from "./core/State";
import CoreReducer from './core/CoreReducer';

export default function configureStore() {
    return createStore(
        combineReducers({ CoreReducer }),
        initialState,
        applyMiddleware(thunk)
    );
}

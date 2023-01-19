import { configureStore, createStore } from '@reduxjs/toolkit'
import { composeWithDevTools } from 'redux-devtools-extension'
import React from 'react'
import { rootReducer } from '../reducers/rootReducer';

export const createAppStore = ()=>{
    let store = configureStore({reducer:rootReducer},composeWithDevTools());
    return store
}



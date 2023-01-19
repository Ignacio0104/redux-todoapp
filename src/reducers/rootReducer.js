import React from 'react'
import { combineReducers } from 'redux'
import filterReducer from './filterReducer'
import todoReducer from './todoReducer'

export const rootReducer = combineReducers(
    {
        todoState: todoReducer,
        filterState: filterReducer
    }
)



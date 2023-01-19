import React from 'react'

const SET_VISIBILITY_FILTER = "SET_VISIBILITY_FILTER"

let initialState = "SHOW_PENDING"

const filterReducer = (state=initialState,action) => {
  switch(action.type){
    case SET_VISIBILITY_FILTER:
        return action.payload.filter
    default:
        return state
  }
}

export default filterReducer

import React from 'react'
const ADD_TODO = 'ADD_TODO';
const TOOGLE_TODO = 'TOOGLE_TODO';
const DELETE_TODO = 'DELETE_TODO';
const UPDATE_TODO = 'UPDATE_TODO';

let initalState = []

const todoReducer = (state=initalState,action) => {
  switch(action.type){
    case ADD_TODO:
        return[
            ...state,
            {
                id:action.payload.id,
                description: action.payload.description,
                completed: false,
                priority: action.payload.priority
            }
        ]
    case TOOGLE_TODO:
        return state.map((todo)=>
            (todo.id === action.payload.id) 
            ?
            {
                ...todo,
                completed : !todo.completed
            }:
            todo        
        )
    case UPDATE_TODO:
        return state.map((todo)=>
        (todo.id === action.payload.id) 
        ?
        {
            ...todo,
            description: action.payload.description,
            priority: action.payload.priority
        }:
        todo        
    )
    case DELETE_TODO:
        return state.filter((todo)=> todo.id !== action.payload.id)
    default:
        return state;
  }
}

export default todoReducer

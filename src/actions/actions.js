import React from "react";

let nextTodoID = 0;

export const toogleTodo = (id)=>{
    return{
        type: "TOOGLE_TODO",
        payload:{
            id:id
        }
    }
}

export const filterTodo = (type)=>{
    return{
        type: "SET_VISIBILITY_FILTER",
        payload:{
            filter: type
        }
    }
}

export const deleteTodo = (id)=>{
    return{
        type: "DELETE_TODO",
        payload:{
            id:id
        }
    }
}

export const updateTodo = (id,text,priority)=>{
    return{
        type: "UPDATE_TODO",
        payload:{
            id:id,
            description: text,
            priority:priority
        }
    }
}



export const addTodo = (text,priority)=>{
    return{
        type: "ADD_TODO",
        payload:{
            id:nextTodoID++,
            description: text,
            priority: priority
        }
    }
}
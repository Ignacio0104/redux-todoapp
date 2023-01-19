import React from 'react'
import { connect } from 'react-redux'
import { deleteTodo, toogleTodo, updateTodo } from '../../actions/actions';
import TodoList from '../pure/TodoList';

const filterTodos = (todos,filter)=>{
    switch(filter){
        case "SHOW_ALL":
            return todos;
        case "SHOW_COMPLETED":
            return todos.filter((todo)=>todo.completed);
        case "SHOW_PENDING":
            return todos.filter((todo)=>!todo.completed);
        default:
            return todos;
    }
}

const mapStateToProps = (state) => {
    return{
        todos: filterTodos(state.todoState,state.filterState)
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        onTodoClick: (id)=>{
            dispatch(toogleTodo(id))
        },
        onTrashClick: (id)=>{
            dispatch(deleteTodo(id))
        },
        onEditTodo: (id,text,priority)=>{
            dispatch(updateTodo(id,text,priority))
        }
    }
}

const TodoContainer = connect(mapStateToProps, mapDispatchToProps)(TodoList)

export default TodoContainer;

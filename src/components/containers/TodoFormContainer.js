import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../../actions/actions';
import TaskForm from '../pure/TaskForm';

const mapStateToProps = (state) => {
    return{
        todos: state.todoState
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        submit: (id,text,priority)=>{
            dispatch(addTodo(id,text,priority))
        }
    }
}

const TodoFormContainer = connect(mapStateToProps, mapDispatchToProps)(TaskForm)

export default TodoFormContainer;

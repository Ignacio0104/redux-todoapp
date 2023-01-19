import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../../actions/actions';
import TaskForm from '../pure/TaskForm';

const mapStateToProps = (state) => ({
    // Not necessary
})

const mapDispatchToProps = (dispatch) =>{
    return {
        submit: (text,priority)=>{
            dispatch(addTodo(text,priority))
        }
    }
}

const TodoFormContainer = connect(mapStateToProps, mapDispatchToProps)(TaskForm)

export default TodoFormContainer;

import React from 'react'
import { connect } from 'react-redux'
import { updateAllTodos } from '../../actions/actions';
import Navbar from '../pure/Navbar';

const mapStateToProps = (state) => ({
    // Not necessary
})

const mapDispatchToProps = (dispatch) =>{
    return {
        updateAll: (todos)=>{
            dispatch(updateAllTodos(todos))
        }
    }
}

const LoginFormContainer = connect(mapStateToProps, mapDispatchToProps)(Navbar)

export default LoginFormContainer;

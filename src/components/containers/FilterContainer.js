import React from 'react'
import { connect } from 'react-redux'
import { filterTodo } from '../../actions/actions'
import Filter from '../pure/Filter'

const mapStateToProps = (state) => {
    return{
        filter: state.filterState
    }
}

const mapDispatchToProps = (dispatch)=> {
    return{
        filterTodosByType: (type)=>{
            dispatch(filterTodo(type))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)
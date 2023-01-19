import React from 'react'
import Task from './Task'
import "./TodoList.css"

const TodoList = ({todos,onTodoClick,onTrashClick,onEditTodo}) => {   
  return (
    <div className='todo-list'>
      { 
        todos.length >0 ? 
        todos.map((todo,index)=>(
            <Task key={index} item={todo} toggle={()=>onTodoClick(todo.id)} 
            deleteTodo={()=>onTrashClick(todo.id)}
            editTodo={onEditTodo}
            ></Task>
        )):
        (
            <h2 className='todo-list__title'>There are no todos in this category</h2>
        )
      }
    </div>
  )
}

export default TodoList

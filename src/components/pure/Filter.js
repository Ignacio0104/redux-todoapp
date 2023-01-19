import React from 'react'
import "./Filter.css"

const Filter = ({filterTodosByType}) => {
  return (
    <div className='filter-container'>
      <button className='filter-container__all' onClick={()=>filterTodosByType("SHOW_ALL")}>All</button>
      <button className='filter-container__completed' onClick={()=>filterTodosByType("SHOW_COMPLETED")}>COMPLETED</button>
      <button className='filter-container__pending' onClick={()=>filterTodosByType("SHOW_PENDING")}>PENDING</button>
    </div>
  )
}

export default Filter

import React, { Children, useEffect, useRef, useState } from 'react'
import "./Task.css"

const Task = ({item,toggle,deleteTodo,editTodo}) => {
  const [editionMode, setEditionMode] = useState(false);
  const textAreaRef = useRef();
  const [priorityItem, setpriorityItem] = useState(item.priority)
  const [priorityChange, setPriorityChange] = useState("task low-category");

  useEffect(()=>{
    setpriorityItem(item.priority)
  },[item])

  useEffect(() => {
    checkPriority();
  }, [priorityItem])
  
  const checkPriority =()=>{
    switch(priorityItem){
      case "LOW":
        setPriorityChange("task low-category");
        return 
      case "MEDIUM":
        setPriorityChange("task medium-category")
        return 
      case "BLOCKING":
        setPriorityChange("task blocking-category")
        return
      default:
    }

  }

  const handleEditionChange=(boolean)=>{
    setEditionMode(boolean);
    setpriorityItem(item.priority);
  }

  const handleEditConfirmation =()=>{
    editTodo(item.id,textAreaRef.current.value,priorityItem);
    setEditionMode(false);
  }

  const changePriority = (symbol)=>{
    if(symbol==="+"){
      if(priorityItem==="LOW"){
        setpriorityItem("MEDIUM")
      }else{
        setpriorityItem("BLOCKING")
      }
    }else{
      if(priorityItem==="BLOCKING"){
        setpriorityItem("MEDIUM")
      }else{
        setpriorityItem("LOW")
      }
    }
  }

  return (
    <div className={priorityChange}>
    {
      !editionMode ? (
        <p className='task-information' style={{textDecoration: item.completed && "line-through"}}>
      {item.description}</p>
      ):
      (
        <div className='task-text-area-container'>     
        <textarea className='task-text-area' ref={textAreaRef}>{item.description}</textarea>
          <div className='task-radio-container'>
            <button disabled={priorityItem==="LOW"} onClick={()=>changePriority("-")}><i class="fas fa-minus"></i></button>
            <h4>{priorityItem}</h4>
            <button disabled={priorityItem==="BLOCKING"} onClick={()=>changePriority("+")}><i class="fas fa-plus"></i></button>
          </div>
      </div>
      )

    }
     
      <div className='task-icons'>
        <i className="fas fa-check" onClick={()=> !editionMode ? toggle(): handleEditConfirmation()}></i>
        {!editionMode ?
        (
          <>
            <i className="fas fa-trash-alt" onClick={()=>deleteTodo()}></i>
            <i className="fas fa-edit" onClick={()=>handleEditionChange(true)}></i>
          </>
        ):
        (
          <i class="fas fa-times" onClick={()=>handleEditionChange(false)}></i>
        )}

      </div>
    </div>
  )
}

export default Task

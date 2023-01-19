import React, { useEffect, useRef, useState } from 'react'
import "./TaskForm.css"

const TaskForm = ({submit}) => {
    const inputRef = useRef();
    const [priority, setPriority] = useState("LOW");
    const [selectBackground, setSelectBackground] = useState("select__low")

    const handleChange = (e)=>{
      setPriority(e.target.value);
    }

    const handleSubmit = ()=>{
      submit(inputRef.current.value,priority);
      inputRef.current.value = ""
    }

    const submitWithEnter =(e)=>{
      if(e.key==="Enter"){
        handleSubmit()
      }
    }
    useEffect(() => {
      switch(priority){
        case "LOW":
          setSelectBackground("select__low");
          break;
        case "MEDIUM":
          setSelectBackground("select__medium");
          break;
        case "BLOCKING":
          setSelectBackground("select__blocking");
          break;
        default:
          break
      }
    
    }, [priority])
    
  return (
    <div className='task-form'>
      <h1 className='task-form_title'>Your TODOs</h1>
      <div>
        <input className='task-form_input_text' type={"text"} onKeyDown={(e)=>submitWithEnter(e)} ref={inputRef}></input>
        <i class="fas fa-plus-circle task-form_input_icon" onClick={handleSubmit}></i>
      </div>
      <div>
        <select className={`task-form__select ${selectBackground}`} onChange={(e)=>handleChange(e)}>
          <option className='select__low'>LOW</option>
          <option className='select__medium'>MEDIUM</option>
          <option className='select__blocking'>BLOCKING</option>
        </select>
      </div>
    </div>
  )
}

export default TaskForm

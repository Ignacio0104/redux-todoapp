import { doc, getFirestore, updateDoc } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react'
import { firebaseApp } from '../../firebase/credentials';
import "./TaskForm.css"

const db = getFirestore(firebaseApp);

const TaskForm = ({submit,todos,loggedIn}) => {
    const inputRef = useRef();
    const [databaseUpdating, setDatabaseUpdating] = useState(false);
    const [priority, setPriority] = useState("LOW");
    const [selectBackground, setSelectBackground] = useState("select__low");

    useEffect(() => {
     if(databaseUpdating)
     {
      updateDataBase();
     }
    }, [todos])
    

    const handleChange = (e)=>{
      setPriority(e.target.value);
    }

    const handleSubmit = ()=>{
      setDatabaseUpdating(true);
      const nextId = () => todos.reduce(function(prev, current) {
        return (prev.id > current.id) ? prev : current
    },0)
      let id = nextId().id;
      submit(id === undefined ? 0 : parseInt(id)+1,inputRef.current.value,priority);
      inputRef.current.value = ""
    }
    
    const updateDataBase = async()=>{
      const userReference = doc(db, "users", localStorage.getItem("docId"));
      await updateDoc(userReference, {
        todos:todos
      });
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
      <h1 className='task-form_title'>{loggedIn ? localStorage.getItem("name").split(" ")[0]+"'s" : "Your"} TODOs</h1>
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

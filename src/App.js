import FilterContainer from "./components/containers/FilterContainer";
import TodoContainer from "./components/containers/TodoContainer";
import TodoFormContainer from "./components/containers/TodoFormContainer";
import TodoList from "./components/pure/TodoList";
import "./App.css"
import Navbar from "./components/pure/Navbar";
import { useState } from "react";
import LoginFormContainer from "./components/containers/LoginContainer";

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [loggingIn, setLoggingIn] = useState(false);
  const [register, setRegister] = useState(false)

  const handleLoginChanged = (boolean)=>{
    setLoggedIn(boolean);
  }
  
  return (
    <div className="App">
      <LoginFormContainer loggedIn={loggedIn} changeLogin={handleLoginChanged}></LoginFormContainer>
      {
        loggedIn ?
        (
          <>
          <TodoFormContainer loggedIn={loggedIn}></TodoFormContainer>
          <FilterContainer></FilterContainer>
          <TodoContainer></TodoContainer>
          </> 
        ) :
        <div className="title-container"> 
          <h1 className="task-form_title">Please login to continue</h1>
        </div>
      }

    </div>
  );
}

export default App;

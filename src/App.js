import FilterContainer from "./components/containers/FilterContainer";
import TodoContainer from "./components/containers/TodoContainer";
import TodoFormContainer from "./components/containers/TodoFormContainer";
import TodoList from "./components/pure/TodoList";
import "./App.css"
import Navbar from "./components/pure/Navbar";
import { useState } from "react";
import LoginForm from "./components/pure/LoginForm";
import RegisterForm from "./components/pure/RegisterForm";

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [loggingIn, setLoggingIn] = useState(false);
  const [register, setRegister] = useState(false)

  const handleLoginChanged = (boolean)=>{
    setLoggedIn(boolean);
  }
  const handleLoginChange = (boolean)=>{
    setRegister(boolean);
  }
  
  return (
    <div className="App">
      <Navbar loggedIn={loggedIn} changeLogin={handleLoginChanged}></Navbar>
      {
          <>
          <TodoFormContainer></TodoFormContainer>
          <FilterContainer></FilterContainer>
          <TodoContainer></TodoContainer>
          </> 
      }

    </div>
  );
}

export default App;

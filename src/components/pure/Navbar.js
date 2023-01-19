import React, {useState, useEffect} from 'react'
import "./Navbar.css";
import { firebaseApp } from '../../firebase/credentials';
import {getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut} from 'firebase/auth'
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

function Navbar({loggedIn,changeLogin}) {

   const [user, setUser] = useState(null)

   const loginGoogle = ()=>{
      loggedIn ?
      signOut(auth).then(() => {
         setUser(null)
         changeLogin(false)
         // Sign-out successful.
       }).catch((error) => {
         // An error happened.
       })
      :
      signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user)
        setUser(user)
        changeLogin(true)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
   }

  return (
     <div className='navbar'>
        <div className='navbar-container'>
        {
         user !== null && (
            <h3>Hello, {user.displayName.substring(0, user.displayName.indexOf(' '))}</h3>
         )
        }
            <h3 className='navbar-link' onClick={loginGoogle}>{loggedIn ? "Logout" : "Sign in with google"}</h3>
        </div>
     </div>
  )
}

export default Navbar

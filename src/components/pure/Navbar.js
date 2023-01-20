import React, {useState, useEffect} from 'react'
import "./Navbar.css";
import { firebaseApp } from '../../firebase/credentials';
import {getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut} from 'firebase/auth'
import {getFirestore,collection,getDocs, query, where, addDoc, getDoc, doc} from "firebase/firestore"

const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();
const db = getFirestore(firebaseApp);

function Navbar({updateAll,loggedIn,changeLogin}) {

   const [user, setUser] = useState(null);

   useEffect(() => { 
      if(localStorage.getItem("docId")!==null){
        getDoc(doc(db, "users", localStorage.getItem("docId"))).then(res=>
         {
            changeLogin(true)
            getArrayOfTodos(res._document.data.value.mapValue.fields.todos.arrayValue.values)
         })
       
      }else{
         console.log("no se logueo")
      }
   }, [])
   
   const getArrayOfTodos = (list)=>{
      if(list !== undefined && list.length>0){
         let firebaseArray = []
         list.map((item)=>firebaseArray.push(
            {
               completed: item.mapValue.fields.completed.booleanValue,
               description: item.mapValue.fields.description.stringValue,
               id: item.mapValue.fields.id.integerValue,
               priority: item.mapValue.fields.priority.stringValue
            }
         ))
         updateAll(firebaseArray);
      }else{ 
         console.log("el array está vacio")
      }
   }

   const checkIfUserExists = async (user)=>{
      const q = query(collection(db, "users"), where("email", "==", user.email));
      const querySnapshot = await getDocs(q);
      if(querySnapshot._snapshot.docChanges.length > 0){
         querySnapshot.forEach((doc) => {
            let arrayOfTodos = doc._document.data.value.mapValue.fields.todos.arrayValue.values
            getArrayOfTodos(arrayOfTodos);
            localStorage.setItem("docId",doc._document.key.path.segments[6]);
          })
      }else{
         try{  
            await addDoc(collection(db,'users'),{
                userId: user.uid,
                name:user.displayName, 
                email: user.email,
                todos:[]
            })
        }catch(err){
            console.log(err)
        }
      }
   }
   

   const loginGoogle = ()=>{
      loggedIn ?
      signOut(auth).then(() => {
         setUser(null)
         changeLogin(false)
         localStorage.removeItem("docId");
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
        setUser(user);
        checkIfUserExists(user);
        changeLogin(true);
        localStorage.setItem("name",user.displayName);
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
            <button className='navbar-link' onClick={loginGoogle}>
            {loggedIn ? "Logout" : "Sign in with google"}
               <img className='google-icon' src='/images/google-icon.png' alt='google icon'></img>
            </button>
        </div>
     </div>
  )
}

export default Navbar

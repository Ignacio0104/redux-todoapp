import React, {useState, useEffect} from 'react'
import "./Navbar.css";
import { firebaseApp } from '../../firebase/credentials';
import {getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut} from 'firebase/auth'
import {getFirestore,collection,getDocs, query, where, addDoc, getDoc, doc} from "firebase/firestore"

const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
   prompt: 'select_account',
 });
const db = getFirestore(firebaseApp);

function Navbar({updateAll,loggedIn,changeLogin}) {

   const [user, setUser] = useState(null);

   useEffect(() => { 
      console.log(auth)
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
        const user = result.user;
        setUser(user);
        checkIfUserExists(user);
        changeLogin(true);
        localStorage.setItem("name",user.displayName);
      }).catch((error) => {
        console.log(error)
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


import { React, useEffect,useState } from "react";
import './App.css';
import Body from "./body";
import Login from "./login";
import {auth} from "./firebase";
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import AssignmentIcon from '@material-ui/icons/Assignment';
import axios from "./axios";


function App() {

   const [user,SetUser] = useState();

   const addusertodb = (user) => {

    axios.post("/new/user", {
      user_id: user.uid,
      user_name: user.displayName,
      user_photo: user.photo,
    });
  };


   useEffect(()=>{
     if(auth!=null){
      auth.onAuthStateChanged((user) => {
        if (user) {
          SetUser(user);
          addusertodb(user);
        } else {
          console.log("No user");

        }
      });
     }
   
   })
  
   return (
    <div className="App">
      {
        user != null ?(
          <div>
            <div className="header">
               <div className="header_title">
                   <div className="icon"><AssignmentIcon fontSize="large"/></div>
                   <div className="title">ARENA</div>
                   </div>
               <div className="header_user">
                   <div className="account"><img src={user.photoURL} width="40" height="40"></img></div>
                   <div className="logout"><button onClick={() =>{auth.signOut();SetUser(null)} } className="Logout" title="logout"><PowerSettingsNewIcon /></button></div>
                   </div>
            </div>
            <Body/>
        
          </div>
        ):(
          <Login/>
        )
      }
     
      
    </div>
  );
}

export default App;



import React, {useState,useEffect}from 'react';
import "./body.css";
import List from "./list";
import axios from "./axios";
import {auth} from "./firebase"

export default function Body(props){
    const [user,SetUser] = useState();
    const [list, setList] = useState("");
    const [array, setArray] = useState([]);
    const form = document.querySelector('form')
    const handleSubmit = (evt) => {
        evt.preventDefault();
        // const list = evt.target.value;
       
    }
   
    const handleAdd = ()=>{
        const list_n = prompt("Enter the List Name");
        axios.post('/new/list',{
            user_id:user.uid,
            list_name:list_n,
        })
        axios.get('/get/user',{
            user_id:user.uid,
        }).then((res)=>{
            console.log(res.data);
        })
    }
   
    useEffect(()=>{
        if(auth!=null){
         auth.onAuthStateChanged((user) => {
           if (user) {
             SetUser(user);
           } else {
             console.log("No user");
           }
         });
        }
      
      })

        return (
            <div className="body">
                <div className="body_header">
                    Lists
                </div>

                <div className="arena" id="arena">
                    {
                        array != null ?(
                            array.map(()=>(
                                <div className="list"><List/></div>
                            ))
                        ):(<div></div>)
                    }

                    
                    <div className="add_list" id = "add_list">
                        <button className="list_button" onClick={handleAdd}  >Add Club</button>
                    </div>
                </div>
            </div>
        );
}

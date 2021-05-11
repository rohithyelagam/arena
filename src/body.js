import React, {useState,useEffect}from 'react';
import axios from "./axios";
import {auth} from "./firebase"
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Task from "./task";
import "./list.css";
import "./body.css";

export default function Body(props){

    const [list, setList] = useState([]);
    const [userr,setUserr] = useState(props.user);

    function refreshPage() {
        window.location.reload(false);
      }

    const handleAddTask = (list_nn)=>{
        const new_task = prompt("Enter the Task Name");

              if (userr) {
                  if(new_task){
                    axios.post('/new/task',{
                        'user_id':userr,
                        'list_name':list_nn,
                        'task_name':new_task,
                    }).then((res)=>{
                            axios.post('/get/user',{
                                'user_id':userr,
                            }).then((res)=>{
                                    if(res.data!=undefined){
                                        setList(res.data);
                                        refreshPage();
                                    }
                            })
                    })
                  }
              }
           
    }

    const handleAdd = ()=>{
        const list_n = prompt("Enter the List Name");
        
              if (userr) {
                  if(list_n){
                    axios.post('/new/list',{
                        'user_id':userr,
                        'list_name':list_n,
                    })
                    refreshPage();
                  }
              }else{
                  console.log('ddd');
              }
           
    }
   
    useEffect(()=>{
              if (userr) {
                axios.post('/get/user',{
                    'user_id':userr,
                }).then((res)=>{ 
                    // console.log(res);    
                    if(res!=undefined){
                        setList(res.data);
                    }     
                    
                })
              }
      },[])

        return (

            <div className="body">
                <div className="body_header">
                    Lists
                </div>
                <div className="arena" id="arena">
                    {
                        list !== null?(
                            list.map((li)=>(
                                <div className="list">
                                <div className="list_header">
                                    <div className="list_header_title">{li.list_name}</div>
                                    <div className="list_header_edit"><MoreHorizIcon fontSize="small"/></div>
                                </div>
                
                                <div className="list_body">
    
                                <div><Task list_name={li.list_name} tasks={li.tasks}/></div>
                                </div>
                                <div className="list_footer">
                                <div>
                                    <button onClick={()=>handleAddTask(li.list_name)}>Add task</button>
                                </div>
                                
                                </div>
                            </div>
                            ))
                        ):(
                            <div></div>
                        )
                    }
                        
                    <div className="add_list" id = "add_list">
                        <button className="list_button" onClick={handleAdd()}>Add List</button>
                    </div>
                </div>
            </div>
        );
}

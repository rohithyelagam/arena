import React, { Component,useEffect,useState } from 'react';
import "./task.css";
import DeleteIcon from '@material-ui/icons/Delete';
import axios from "./axios";


export default function Task(props){

        const [taskss,setTaskss] = useState([]);

        useEffect(() => {
            setTaskss(props.tasks);
        }, [])

        return (
            
            <div>
                {
                    taskss!=null?(
                        taskss.map(tt => (
                            <div  className="task">
                                <div className="task_name">{tt.task_name}</div>
                               <div className="task_options"><DeleteIcon fontSize="small"/></div> 
                            </div>
                            
                        ))
                    ):(
                        <div  className="task">
                        <div className="task_name">hello</div>
                        <div className="task_options"><DeleteIcon fontSize="small"/></div> 
                        </div>
                    )
                }
                 
            </div>


        )
    
}

{/* <div className="task_name">{ta.task_name}</div>
<div className="task_options"><DeleteIcon fontSize="small"/></div> */}
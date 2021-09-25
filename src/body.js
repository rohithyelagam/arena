import React, {useState,useEffect}from 'react';
import axios from "./axios";
import {auth} from "./firebase"
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Task from "./task";
import "./list.css";
import "./body.css";

class Body extends React.Component{
    constructor(props){
        super(props);
        this.state={
            list:[],
            user:{},
            counter:0
        }
    }

    componentDidMount(){
        axios.post('/get/user',{
            'user_id':auth.currentUser.uid,
        }).then((res)=>{ 
            if(res!=undefined){
                this.setState({
                    list:res.data
                })
            }     
            
        }).then(()=>{
            this.setState({
                user:auth.currentUser
            });
        })
    }

     handleAddTask = (list_nn)=>{
        const new_task = prompt("Enter the Task Name");
        var aa=[];
        if(new_task){
            axios.post('/new/task',{
                'user_id':this.state.user.uid,
                'list_name':list_nn,
                'task_name':new_task
            }).then(()=>{
                axios.post('/get/user',{
                    'user_id':auth.currentUser.uid,
                }).then((res)=>{ 
                    if(res!=undefined){
                        this.setState({
                            list:res.data
                        })
                    }     
                })
            })
            
        }   
        this.setState({
            list:[]
        })
    }
    
handleAdd = ()=>{
    const list_n = prompt("Enter the List Name");

    if(list_n){
        axios.post('/new/list',{
            'user_id':this.state.user.uid,
            'list_name':list_n,
        }).then((res)=>{
        axios.post('/get/user',{
            'user_id':this.state.user.uid,
        }).then((res)=>{
            if(res.data!=undefined){
            this.setState({
                list:res.data
            })
            }
          })
        })
        this.setState({
            list:[]
        })
    }
           
}

    render(){
      return (
        <div className="body">
            <div className="body_header">
                  Lists
            </div>
            <div className="arena" id="arena">
                  {
                      
                        this.state.list.map((li)=>(
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
                                  <button onClick={()=>this.handleAddTask(li.list_name)}>Add task</button>
                              </div>
                              
                              </div>
                          </div>
                          ))
    
                  }
                      
                  <div className="add_list" id = "add_list">
                       <button className="list_button" onClick={this.handleAdd}>Add List</button>
                  </div>
                 
              </div> 
        
              
          </div>
        )
    }
}

export default Body;



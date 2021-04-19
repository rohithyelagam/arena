import React, { Component } from 'react';
import "./task.css";
import DeleteIcon from '@material-ui/icons/Delete';

export default class Task extends Component{
    constructor(props){
        super(props);
        this.state ={
            task_name:"task",
        }
    }
    render(){
        return (
            <div className="task">
                <div className="task_name">{this.props.task_name}</div>
                <div className="task_options"><DeleteIcon fontSize="small"/></div>
            </div>
        )
    }
}

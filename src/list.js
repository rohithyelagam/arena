import React, { Component } from 'react';
import "./list.css";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Task from "./task";


export default class List extends Component{

    constructor(props){
        super(props);
        this.state ={
            name:"default",
        }
    }

    render(){
        return (
            <div className="list">
                <div className="list_header">
                    <div className="list_header_title">{this.props.name}</div>
                    <div className="list_header_edit"><MoreHorizIcon fontSize="small"/></div>
                </div>

                <div className="list_body">
                <Task/>
                <Task/>
                <Task/>
                <Task/>
                </div>
                <div className="list_footer">
                <div>
                    <form className="add_form">
                        <input placeholder="+ Add another Task"></input>
                        <input type="submit" value="add"></input>
                    </form>
                </div>
                
                </div>
            </div>
        )
    }   
}

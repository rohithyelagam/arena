import React from "react";
import { auth } from "./firebase";
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Body from "./body";

class Loggedin extends React.Component {

 constructor(props){
     super(props);
     this.state={
        user:{}
     }
 }

 componentDidMount(){
     this.setState({
         user:auth.currentUser
     })
 }

  handleLogout = () => {
    auth.signOut();
  };


  render() {
    return (
      <div className="signin">

        <div className="header">

          <div className="header_title">
             <div className="icon">
              <AssignmentIcon fontSize="large" />
             </div>
             <div className="title">ARENA</div>
          </div>
          
          <div className="header_user">
            <div className="account">
              <img src={this.state.user.photoURL} width="40" height="40"></img>
            </div>
            <div className="logout">
              <button
                onClick={() => {
                  auth.signOut();
                }}
                className="Logout"
                title="logout"
              >
                <PowerSettingsNewIcon />
              </button>
            </div>
          </div>

        </div>
        
        <Body/>

      </div>
    );
  }
}

export default Loggedin;

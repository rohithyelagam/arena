import  React from "react";
import Body from "./body";
import Loggedin from "./loggedin";
import firebase,{auth, provider} from "./firebase"
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import AssignmentIcon from '@material-ui/icons/Assignment';
import axios from "./axios";
import './App.css';


class App extends React.Component {

  constructor(props){
    super(props);
    this.state={
      isLoggedIn:false,
      user:auth.currentUser,
      loading:true
    };
    auth.onAuthStateChanged((us)=>{
      this.setState({
        user:us
      })
    });
  
  }


  handleLogin=()=>{
    auth.signInWithPopup(provider).then((result)=>{
      this.setState({
        isLoggedIn:true,
        user:result.user
      })
    });
  }


  render(){
    return(
      <div className="App">
        {
          (this.state.user)?(
            <div>
              <Loggedin/>
            </div>
          ):(
            <div className='login'>
              
              <button onClick={this.handleLogin} className='login-button'>Log In</button>
            </div>
          )
        }
      </div>
    );
  }

}

export default App;



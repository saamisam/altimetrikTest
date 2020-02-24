import React, { Component } from 'react';
import './App.css';
import Routes from "./Routes";

class App extends Component {
  
  constructor(props) {
    super(props);
  
    this.state = {
      isAuthenticated: false,
      isAuthenticating: true
    };
  }
  
  async componentDidMount() {
    try {
      var session = localStorage.getItem('session');
      if(session)
        this.userHasAuthenticated(true);
    }
    catch(e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }
  
    this.setState({ isAuthenticating: false });
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  render(){
  
  const childProps = {
    isAuthenticated: this.state.isAuthenticated,
    userHasAuthenticated: this.userHasAuthenticated
  };
  console.log("this.state.isAuthenticated", this.state.isAuthenticated)
  return (
    !this.state.isAuthenticating &&
    <div  >
      <Routes childProps={childProps}/>
    </div>
  );
  }
}

export default App;

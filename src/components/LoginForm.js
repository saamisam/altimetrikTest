import React, { Component } from 'react'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import axios from '../config/axios'

class LoginForm extends Component {
    state = {
        username: null,
        password: null,
        warning: null
    }

    login = async() => {
      let username = this.state.username;
      let password = this.state.password;
      if(username !== null && password !== null){
        axios.get(`people/?search=${username}`)
              .then(async(response) => {
                  response = response['data'];
                  console.log(response)
                  if(response['count'] >= 1){
                    console.log('comes here')
                    let responseUsername = response['results'][0]['name'];
                    let responsePassword = response['results'][0]['birth_year'];
                    console.log(responseUsername, responsePassword)
                    if(responseUsername == username && responsePassword == password){
                      await localStorage.setItem('session', btoa(responseUsername));
                      this.props.userHasAuthenticated(true);
                      this.props.history.push('/');
                    }else{
                      this.setWarning('Invalid Username Or Password');
                    }
                  } else {
                    this.setWarning('Invalid Username Or Password')
                  }
              });
      }else{
        this.setWarning('Invalid Username Or Password')
      }
    }

    setWarning = (message) => {
      this.setState({
        warning: message
      })
    }

    setUserName = (event) => {
        this.setState({
            username: event.target.value
        });
    }

    setPassWord = (event) => {
        this.setState({
            password: event.target.value
        });
    }

    render() {
        return (
          <div className = 'landing-image'>
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
              <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='grey' textAlign='center'>
                  {/* <Image src='/logo.png' />  */}
                  Log-in to your account
                </Header>
                <Form size='large'>
                  <Segment stacked>
                    <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' value={this.state.username} onChange={this.setUserName.bind(this)} />
                    <Form.Input
                      fluid
                      icon='lock'
                      iconPosition='left'
                      placeholder='Password'
                      type='password'
                      autoComplete='' 
                      value={this.state.password} 
                      onChange={this.setPassWord.bind(this)}
                    />
          
                    <Button color='grey' fluid size='large' onClick = {this.login}>
                      Login
                    </Button>
                  </Segment>
                </Form>
                  {(this.state.warning != null) ? <Message color='red'>{this.state.warning}</Message> : ''}
              </Grid.Column>
            </Grid>
          </div>
        )
    }

}


export default LoginForm

import React, { Component } from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
// import { Redirect } from 'react-router';

// import axios from './config/axios'
import axios from '../config/axios'
// const LoginForm = () => (
// )

import {
    Route,
    // Link,
    // Switch,
    // Redirect
  } from 'react-router-dom';
  
//   import Home from './components/Home';
//   import About from './components/About';
  import Messages from './Messages';

class LoginForm extends Component {
    state = {
        username: '',
        password: '',
    }

    componentDidMount() {
        // axios.get('category')
        //     .then((responese) => {
        //         this.setState({
        //             category: responese.data.category,
        //             cartItems: responese.data.cart
        //         });
        //     });
    }

    login = () => {
        axios.post('/api/login/client', {
            username: this.state.username,
            password: this.state.password
        })
            .then(async(response) => {
                console.log('response', response);
                if (response.status === 200) {
                  console.log('this.props', this.props);
                    // window.open('/Messages');
                    // console.log('this.props', this.props);
                    await localStorage.setItem('session',response['data']['data']['token']);
                    var session = localStorage.getItem('session');
                    var userId = await axios.post('/api/verify/', {session: session}) 
                    // userId = userId['data']['data']['data']['userId'];
                    var organisation = userId['data']['data']['data']['organisation'];
                    await localStorage.setItem('organisation',organisation);
                    // var userId = await axios.get('/api/verify/'+session);
                    console.log('organisation', organisation)
              
                    this.props.userHasAuthenticated(true);
                    // this.props.history.push("/home");
                    // <Route path="/messages" component={Messages} />
                    // this.setState({
                    //     showAlert: true
                    // });
                } else {
                    this.props.history.push("/");
                }
            });
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
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as='h2' color='green' textAlign='center'>
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
        
                  <Button color='green' fluid size='large' onClick = {this.login}>
                    Login
                  </Button>
                </Segment>
              </Form>
              {/* <Message>
                New to us? <a href='#'>Sign Up</a>
              </Message> */}
            </Grid.Column>
          </Grid>
        )
    }

}


export default LoginForm

import React, { Component } from 'react';

import Header from '../components/Header';
import LoginForm from '../components/LoginForm';
import Loader from '../components/Loader';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.submit = this.submit.bind(this);
  }

  componentWillMount() {
    fetch('https://hackyeah.akai.org.pl/api/users')
      .then( (users) => {
        return users.json();
      })
      .then( (_users) => {
        this.setState({users: _users});
      })
      .catch( (err) => {
        console.log(err);
      } );
  }

  submit() {
    const user = {
      login: document.getElementById('login').value,
      password: document.getElementById('password').value
    };
    
    let changeLocation = false;

    for (const prop in this.state.users) {
      const _user = this.state.users[prop];
      if (_user.login === user.login && _user.password === user.password) {
        changeLocation = true;
        document.cookie = "loginName=" + user.login;
        window.location = _user.location;
      }
    }

    if (!changeLocation) {
      alert('Check credentials');
    }
  }

  render() {
    if (!this.state) {
      return <Loader></Loader>;
    }
    return (
      <div className="login-view">
        <Header></Header>
        <LoginForm onSubmit={this.submit}></LoginForm>
      </div>
    );
  }
}

export default Login;
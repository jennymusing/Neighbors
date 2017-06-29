/*  global fetch:false  */
/* eslint react/prop-types: 0 */
// Popup form for signing up with email
// called by Login.jsx
const React = require('react');
import axios from 'axios';


class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      loginFailed: false
    };
    this.clearField = () => {
      this.email.value = '';
      this.password.value = '';
    };
    this.fieldSubmit = (e) => {
      e.preventDefault();
      // const info = {
      //   email: this.email.value,
      //   password: this.password.value,
      // };
      // fetch('/login', {
      //   credentials: 'same-origin',
      //   method: 'POST',
      //   headers: {
      //     'Content-type': 'application/json',
      //   },
      //   body: JSON.stringify(info),
      // })
      //   .then((resp) => {
      //     console.log('pre-json', resp);
      //     return resp.json();
      //   })
      //   .then((resp) => {
      //     if (!resp.success) {
      //       this.setState({ message: resp.message });
      //     } else {
      //       console.log('pos', resp);
      //       this.props.appMethods.updateUser(resp.profile);
      //       this.props.loginMethods.login(resp.profile.id);
      //       this.clearField();
      //     }
      //   });
      axios.post('/login', {
        email: this.email.value,
        password: this.password.value
      })
        .then((response) => {
          if (!response.data.success) {
            this.setState({
              message: response.data.message
            });
          } else {
            this.props.appMethods.updateUser(response.data.profile);
            this.props.loginMethods.login(response.data.profile.id);
            this.clearField();
          }
        })
        .catch((err) => {
          console.log('Error at login: ', err);
          this.setState({
            loginFailed: true
          })
        });
    };
  }
  render() {
    let message = null;
    const loginFailedAlert = this.state.loginFailed 
      ? <h3
          className="loginFailedAlert">
          Invalid username or password
        </h3>
      : null;
    if (this.state.message) {
      message = <div className="alert alert-danger">{this.state.message}</div>;
    }
    return (
      <div className="">
        <div className="">
          <h1><span className="fa fa-sign-in" /> Login</h1>
          {message}
          <form onSubmit={e => this.fieldSubmit(e)} >
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                className="form-control userEmail"
                ref={(input) => { this.email = input; }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="text"
                name="password"
                className="form-control userPassword"
                ref={(input) => { this.password = input; }}
              />
            </div>
            <button type="submit" className="btn btn-small submitLoginButton">Login</button>
            {loginFailedAlert}
          </form>
          <hr />
          <p>Already have an account?
            <button
              onClick={this.props.loginMethods.chooseSignup}
              className="btn btn-small"
            >Signup</button>
          </p>
        </div>
      </div>
    );
  }
}

module.exports = LoginForm;

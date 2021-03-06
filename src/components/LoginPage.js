import React from "react";
import { firebase, database } from "../firebase/config";
import LoadingSpinner from "./LoadingSpinner";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.submitLogin = this.submitLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      showLaoder: false,
      email: "frankzucche@gmail.com",
      password: ""
    };
  }

  submitLogin(e) {
    e.preventDefault();
    this.setState({
      showLaoder: true
    });
    /* setTimeout(() => {
      console.log(this);
      
    }, 1000); */
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        setTimeout(() => {
          this.setState({
            showLaoder: false
          });
        }, 1000);
      })
      .catch(function(error) {
        console.log(error); // ...
      });
    //this.props.onClick({ ...this.state }, this.props.history);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.showLaoder && (
          <LoadingSpinner loaderVisibility={this.state.showLaoder} />
        )}
        <div className="loginDiv">
          <div className="middle-box text-center loginscreen animated fadeInDown ">
            <div>
              <div>
                <h1 className="logo-name">YV</h1>
              </div>
              <h3>Welcome to YouVincy</h3>
              <p>
                The easiest way to play football in your city.
                {/*Continually expanded and constantly improved Inspinia Admin Them (IN+)*/}
              </p>

              <form className="m-t" role="form" onSubmit={this.submitLogin}>
                <div className="form-group">
                  <input
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    type="email"
                    className="form-control"
                    placeholder="Username"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    required
                  />
                </div>
                <button
                  tyoe="submit"
                  className="btn btn-primary block full-width m-b"
                >
                  Login
                </button>
                <a href="#!">
                  <small>Forgot password?</small>
                </a>
                <p className="text-muted text-center">
                  <small>Do not have an account?</small>
                </p>
                <a className="btn btn-sm btn-white btn-block" href="#!">
                  Create an account
                </a>
              </form>
              <p className="m-t">
                {" "}
                <small>YouVincy © 2018</small>{" "}
              </p>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default LoginPage;

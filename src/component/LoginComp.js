import React from "react"
import ReCAPTCHA from "react-google-recaptcha";
// import { Modal } from "react-bootstrap"
//Importing Bootstrap 5
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

class LoginComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: [], 
      text: '', 
      isVerified: false,
      failedAttempts: 0,
      lockout: false,
      lockoutTime: null
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleOnChange(value) {
    console.log("Captcha value:", value);
    this.setState({isVerified: true})
  }
  
  handleSubmit(event) {
  event.preventDefault();
    // validate the username and password. here
    const { username, password } = event.target.elements;
    if (username.value !== "validausername" || password.value !== "validatepassword") {
    this.setState((prevState) => {
        return { failedAttempts: prevState.failedAttempts + 1 }
    });
    if (this.state.failedAttempts >= 3){
      this.setState ({ lockout: true });
      const time = new Date().getTime() + 30 * 1000;
      this.setState({ lockoutTime: time });
      setTimeout(() => {
        this.setState({ lockout: false, failedAttempts: 0 });
      }, 30 * 1000 );
      }
    } else {
      // successful login
    }
  }
  
  render() {
    return (
      <div className="LoginComp"> 
        <div class="container p-5">
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            User Login
          </button>

          <div class="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title text-danger" id="exampleModalLabel">Login Form</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <form onSubmit={this.handleSubmit}>
                    <div class="mb-3">
                      <label htmlFor="username" class="form-label">Username</label>
                      <input type="text" class="form-control" id="username" autoComplete="off" required />
                    </div>
                    <div class="mb-3">
                      <label htmlFor="exampleInputPassword1" class="form-label">Password</label>
                      <input type="password" class="form-control" id="exampleInputPassword1" name="password" required />
                    </div>
                    {this.state.lockout &&
                    <div class="alert alert-danger">You have exceeded the maximum number of failed attempts. Please try again in {Math.round((this.state.lockoutTime - new Date().getTime()) / 1000)} seconds.</div>
                    }                    
                    <ReCAPTCHA
                      sitekey="6LcC-58jAAAAAH_ClxF0jEQ3bI5xFf_ejSUcvGwT"
                      onChange={this.handleOnChange}
                    />
                    <button disabled={!this.state.isVerified || this.state.lockout} type="submit" class="btn btn-primary">Login</button>
                  </form>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-warning" data-bs-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
    
  }
  handleChange(e) {
    this.setState({ text: e.target.value });
  }
}
export default LoginComp;

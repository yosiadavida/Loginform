import React from "react"
import ReCAPTCHA from "react-google-recaptcha";
// import { Modal } from "react-bootstrap"
//Importing Bootstrap 5
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";


class LoginComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], text: '', isVerified: false };
    this.handleOnChange = this.handleOnChange.bind(this);
  }
  handleOnChange(value) {
    console.log("Captcha value:", value);
    this.setState({isVerified: true})
  }
  render() {
    return (

      <div className="LoginComp"> 
        <div class="container p-5">


          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            User Login
          </button>

          <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title text-danger" id="exampleModalLabel">Login Form</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <form action="/login" method="post">
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">Email address</label>
                      <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                      <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div class="mb-3">
                      <label for="exampleInputPassword1" class="form-label">Password</label>
                      <input type="password" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <ReCAPTCHA
                      sitekey="6LcC-58jAAAAAH_ClxF0jEQ3bI5xFf_ejSUcvGwT"
                      onChange={this.handleOnChange}
                    />
                    <button disabled={!this.state.isVerified} type="submit" class="btn btn-primary">Login</button>
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

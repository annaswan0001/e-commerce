import React from "react";
import PropTypes from "prop-types";
import Input from "../../components/Forms/Input/Input";
import "./SignUp.scss";
import Button from "../Forms/Button/Button";
import {auth, handleUserProfile} from '../../firebase/utils'

const initialState = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
  errors: [],
};
class SignUp extends React.Component {
  state = {
    ...initialState,
  };

  handleSubmit =   async e =>{
    e.preventDefault()
    let {displayName, email, password, confirmPassword ,errors } = this.state
    if(password != confirmPassword){
      errors = [...errors, "Password doesnt match"]
    }
    this.setState({errors})

    try {
      const user = await auth.createUserWithEmailAndPassword(email,password)
      await handleUserProfile(user, displayName)
      this.setState({...initialState})

    } catch (error) {
      
    }
  }


  handleChange = (event) => {
    const { name, value } = event.target;
    console.log(value);
    this.setState({
      [name]: value,
    });
  };
  render() {
    const { props } = this.props;
    const {
      displayName,
      email,
      password,
      confirmPassword,
      errors,
    } = this.state;
    return (
      <div className="signup">
        <div className="wrapper">
          <h2>Sign Up</h2>
          <div className="form-wrapper">
            {errors.length > 0 && (
              <ul className="error">
                {errors.map((error, index) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            )}
            <form onSubmit={this.handleSubmit}>
              <Input
                placeholder="Full name"
                type="text"
                name="displayName"
                value={displayName}
                handleChange={this.handleChange}
              />
              <Input
                placeholder="Email"
                type="email"
                name="email"
                value={email}
                handleChange={this.handleChange}
              />
              <Input
                placeholder="Password"
                type="password"
                name="password"
                value={password}
                handleChange={this.handleChange}
              />
              <Input
                placeholder="Confirm password"
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                handleChange={this.handleChange}
              />
              <Button>register</Button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

SignUp.propTypes = {};

export default SignUp;

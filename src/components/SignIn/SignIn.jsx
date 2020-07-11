import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { signInWithGoogle , auth} from "../../firebase/utils";
import "./SignIn.scss";
import Button from "../../components/Forms/Button/Button";
import Input from "../../components/Forms/Input/Input";

const initialState = {
  email: "",
  password: "",
};

class SignIn extends React.Component {
  state = {
    ...initialState,
  };
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const {email, password} = this.state

    try {
        await auth.signInWithEmailAndPassword(email,password);
        this.setState({...initialState})
    } catch (error) {
        console.log(error.message)
    }
  };
  render() {
    const { email, password } = this.state;

    return (
      <div className="signin">
        <div className="wrapper">
          <h2>Login</h2>
          <div className="formWrapper">
            <form onSubmit={this.handleSubmit}>
              <div className="row">
                <Input
                  value={email}
                  type="text"
                  handleChange={this.handleChange}
                  name="email"
                  placeholder="Email"
                />
                <Input
                  value={password}
                  type="password"
                  name="password"
                  handleChange={this.handleChange}
                  placeholder="Password"
                />
                <Button type="submit">Log in</Button>
              </div>
            </form>
            </div>
            <div className="socialSignIn">
              <Button onClick={signInWithGoogle}>Sign in with Google</Button>
            
          </div>
        </div>
      </div>
    );
  }
}

SignIn.propTypes = {};

export default SignIn;

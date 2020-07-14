import React, { useState , useEffect} from "react";
import PropTypes from "prop-types";
import Input from "../../components/Forms/Input/Input";
import "./SignUp.scss";
import {signUp} from '../../redux/User/userActions'
import Button from "../Forms/Button/Button";
import { auth, handleUserProfile } from "../../firebase/utils";
import AuthWrapper from "../AuthWrapper/AuthWrapper";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signUpStart } from "../../redux/User/userActions";

const initialState = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
  errors: [],
};
const configAuthWrapper = {
  headline: "Sign up",
};

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
  error: user.error,
});



const SignUp = (props) => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const dispatch= useDispatch();
   const {currentUser, error} = useSelector(mapState)

  const resetForm = () => {
    setDisplayName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };
  useEffect(() => {
      if(currentUser){
        resetForm();
        props.history.push("/")
      }
  
  }, [currentUser])
  
  useEffect(() => {
    if(error.length > 0){
      setErrors(error)
    }
  }, [error])



  const handleSubmit = (e) => {
    setErrors("");
    e.preventDefault();
    dispatch(signUpStart({displayName,email, password,confirmPassword}))
  };
 

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className="form-wrapper">
        {errors.length > 0 && (
          <ul className="error">
            {errors.map((error, index) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}
        <form onSubmit={handleSubmit}>
          <Input
            placeholder="Full name"
            type="text"
            name="displayName"
            value={displayName}
            handleChange={(e) => setDisplayName(e.target.value)}
          />
          <Input
            placeholder="Email"
            type="email"
            name="email"
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            name="password"
            value={password}
            handleChange={(e) => setPassword(e.target.value)}
          />
          <Input
            placeholder="Confirm password"
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            handleChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button>register</Button>
        </form>
      </div>
    </AuthWrapper>
  );
};

SignUp.propTypes = {};

export default withRouter(SignUp);

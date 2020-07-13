import React, {useState} from "react";
import PropTypes from "prop-types";
import Input from "../../components/Forms/Input/Input";
import "./SignUp.scss";
import Button from "../Forms/Button/Button";
import {auth, handleUserProfile} from '../../firebase/utils'
import AuthWrapper from "../AuthWrapper/AuthWrapper";
import {withRouter} from 'react-router-dom'

const initialState = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
  errors: [],
};
const configAuthWrapper = {
  headline:"Sign up"
}

const SignUp=(props)=>{
  const [displayName,setDisplayName ] = useState("");
  const [email,setEmail ] = useState("")
  const [password,setPassword ] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [errors, setErrors ] = useState([])


  const resetForm = () =>{
    setDisplayName("")
    setEmail("")
    setPassword("")
    setConfirmPassword("")
  }
  const handleSubmit =  async e =>{
    setErrors("")
    e.preventDefault()

    if(password != confirmPassword){
      setErrors(["Password doesnt match"])
      return
    }

    try {
      const user = await auth.createUserWithEmailAndPassword(email,password)
      await handleUserProfile(user, displayName)
      resetForm();
      props.history.push("/")

    } catch (error) {
      console.log(error);
    }
  }

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
                handleChange={(e)=>setDisplayName(e.target.value)}
              />
              <Input
                placeholder="Email"
                type="email"
                name="email"
                value={email}
                handleChange={(e)=>setEmail(e.target.value)}
              />
              <Input
                placeholder="Password"
                type="password"
                name="password"
                value={password}
                handleChange={(e)=>setPassword(e.target.value)}
              />
              <Input
                placeholder="Confirm password"
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                handleChange={(e)=>setConfirmPassword(e.target.value)}
              />
              <Button>register</Button>
            </form>
          </div>
          </AuthWrapper>
    );
}

SignUp.propTypes = {};

export default withRouter(SignUp);

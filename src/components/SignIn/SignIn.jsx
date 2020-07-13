import React, { useState } from "react";
import PropTypes, { resetWarningCache } from "prop-types";
import { Link , withRouter} from "react-router-dom";
import { signInWithGoogle, auth } from "../../firebase/utils";
import "./SignIn.scss";
import Button from "../../components/Forms/Button/Button";
import Input from "../../components/Forms/Input/Input";
import AuthWrapper from "../AuthWrapper/AuthWrapper";

const configAuthWrapper = {
  headline: "Log in",
};

const SignIn = (props) => {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  
  const resetForm = () => {
    setEmail("")
    setPassword("")

  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(email, password);
      resetForm();
      props.history.push("/")
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className="formWrapper">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <Input
              value={email}
              type="text"
              handleChange={(e)=>setEmail(e.target.value)}
              name="email"
              placeholder="Email"
            />
            <Input
              value={password}
              type="password"
              name="password"
              handleChange={(e)=>setPassword(e.target.value)}
              placeholder="Password"
            />
            <Button type="submit">Log in</Button>
          </div>
        </form>
      </div>
      <div className="socialSignIn">
        <Button onClick={signInWithGoogle}>Sign in with Google</Button>
      </div>

      <div className="links">
        <Link to="/recovery">Reset Password</Link>
      </div>
    </AuthWrapper>
  );
};

SignIn.propTypes = {};

export default withRouter(SignIn);

import React, { useState, useEffect } from "react";
import PropTypes, { resetWarningCache } from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./SignIn.scss";
import Button from "../../components/Forms/Button/Button";
import Input from "../../components/Forms/Input/Input";
import AuthWrapper from "../AuthWrapper/AuthWrapper";
import { signInStart, googleSignInStart } from "../../redux/User/userActions";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});
const configAuthWrapper = {
  headline: "Log in",
};

const SignIn = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { currentUser } = useSelector(mapState);

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    if (currentUser) {
      resetForm();
      props.history.push("/");
    }
  }, [currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signInStart({ email, password }));
  };
  const signInWithGoogle = () => {
    dispatch(googleSignInStart());
  };
  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className="formWrapper">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <Input
              value={email}
              type="text"
              handleChange={(e) => setEmail(e.target.value)}
              name="email"
              placeholder="Email"
            />
            <Input
              value={password}
              type="password"
              name="password"
              handleChange={(e) => setPassword(e.target.value)}
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

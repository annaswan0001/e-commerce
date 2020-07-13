import React, { useEffect } from "react";
import "./default.scss";
import { connect } from "react-redux";
import Homepage from "./views/Homepage/Homepage";
import { Switch, Route, Redirect } from "react-router-dom";
import Registration from "./views/Registration/Registration";
import MainLayout from "./layouts/MainLayout";
import HomeLayout from "./layouts/HomeLayout";
import Login from "./views/Login/Login";
import Recovery from "./views/Recovery/Recovery";
import { auth, handleUserProfile } from "./firebase/utils";
import { setCurrentUser } from "./redux/User/userActions";
import Dashboard from "./views/Dashboard/Dashboard";
import WithAuth from "./components/hoc/WithAuth";

const App = (props) => {
  const {currentUser, setCurrentUser} = props

  useEffect(() => {
    const authListener = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot((snapshot) => {
          props.setCurrentUser({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data(),
            },
          });
        });
      }
      props.setCurrentUser(userAuth);
    });
    return () => {
      authListener();
    };
  }, []);

  return (
    <div className="app">
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <HomeLayout>
              <Homepage />
            </HomeLayout>
          )}
        />
        <Route
          path="/registration"
          render={() =>
            (
               
              <MainLayout>
                <Registration />
              </MainLayout>
            )
          }
        />
        <Route
          path="/login"
          render={() =>
            (
              <MainLayout>
                <Login />
              </MainLayout>
            )
          }
        />
        <Route
          path="/recovery"
          render={() => (
            <MainLayout currentUser={currentUser}>
              <Recovery />
            </MainLayout>
          )}
        />
      <Route
          path="/dashboard"
          render={() => (
           < WithAuth>
            <MainLayout currentUser={currentUser}>
              <Dashboard />
            </MainLayout>
            </WithAuth>
          )}
        />
      </Switch>
    </div>
  );
};
const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});
export default connect(mapStateToProps, { setCurrentUser })(App);

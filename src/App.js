import React, { useState } from "react";
import "./default.scss";
import {connect} from 'react-redux'
import Homepage from "./views/Homepage/Homepage";
import { Switch, Route, Redirect } from "react-router-dom";
import Registration from "./views/Registration/Registration";
import MainLayout from "./layouts/MainLayout";
import HomeLayout from "./layouts/HomeLayout";
import Login from "./views/Login/Login";
import Recovery from './views/Recovery/Recovery'
import { auth, handleUserProfile} from "./firebase/utils";
import {setCurrentUser}from './redux/User/userActions'


const initialState = {
  currentUser: null,
};

class App extends React.Component {
 
  authListerner = null;


  componentDidMount() {
    this.authListener = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot(snapshot => {
          this.props.setCurrentUser({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          })
        })
      }

      this.props.setCurrentUser(userAuth);
    });
  }
  
  componentWillUnmount() {
    this.authListerner();
  }
  render() {
    const { currentUser } = this.props;
    return (
      <div className="app">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <HomeLayout >
                <Homepage />
              </HomeLayout>
            )}
          />
          <Route
            path="/registration"
            render={() => ( 
              currentUser ? (
                <Redirect to="/" />
              ) : (
              <MainLayout >
                <Registration />
              </MainLayout>
            ))}
          />
          <Route
            path="/login"
            render={() =>
              currentUser ? (
                <Redirect to="/" />
              ) : (
                <MainLayout >
                  <Login />
                </MainLayout>
              )
            }
          />
                <Route
            path="/recovery"
            render={() =>
              
                <MainLayout currentUser={currentUser}>
                  <Recovery />
                </MainLayout>
            
            }
          />
        </Switch>
      </div>
    );
  }
}
const mapStateToProps = (state) =>({
  currentUser:state.user.currentUser
})
export default connect(mapStateToProps, {setCurrentUser})(App);

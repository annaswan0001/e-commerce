import React, { useState } from "react";
import "./default.scss";
import Homepage from "./views/Homepage/Homepage";
import { Switch, Route, Redirect } from "react-router-dom";
import Registration from "./views/Registration/Registration";
import MainLayout from "./layouts/MainLayout";
import HomeLayout from "./layouts/HomeLayout";
import Login from "./views/Login/Login";
import { auth, handleUserProfile} from "./firebase/utils";

const initialState = {
  currentUser: null,
};

class App extends React.Component {
  state = {
    ...initialState,
  };

  authListerner = null;
  // componentDidMount() {
  //   this.authListerner = auth.onAuthStateChanged((userAuth) => {
  //     console.log(userAuth);
  //     if (!userAuth) {
  //       this.setState({ ...initialState });
  //     }else{
  //       this.setState({ currentUser: userAuth });
  //     }
      
  //   });
  // }

  componentDidMount() {
    this.authListener = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot(snapshot => {
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          })
        })
      }

      this.setState({
        ...initialState
      });
    });
  }
  
  componentWillUnmount() {
    this.authListerner();
  }
  render() {
    const { currentUser } = this.state;
    return (
      <div className="app">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <HomeLayout currentUser={currentUser}>
                <Homepage />
              </HomeLayout>
            )}
          />
          <Route
            path="/registration"
            render={() => (
              <MainLayout currentUser={currentUser}>
                <Registration />
              </MainLayout>
            )}
          />
          <Route
            path="/login"
            render={() =>
              currentUser ? (
                <Redirect to="/" />
              ) : (
                <MainLayout currentUser={currentUser}>
                  <Login />
                </MainLayout>
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

export default App;

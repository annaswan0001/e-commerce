import React, { useEffect, useState } from "react";
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
import { checkUserSessionStart } from "./redux/User/userActions";
import Dashboard from "./views/Dashboard/Dashboard";
import WithAuth from "./components/hoc/WithAuth";
import { useDispatch } from "react-redux";

const App = (props) => {
  const [app,setApp] = useState(false)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSessionStart());
    setTimeout(()=>setApp(true), 1000)
  }, []);

  return (
    <React.Fragment>
   {app && (    <div className="app">
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
          render={() => (
            <MainLayout>
              <Registration />
            </MainLayout>
          )}
        />
        <Route
          path="/login"
          render={() => (
            <MainLayout>
              <Login />
            </MainLayout>
          )}
        />
        <Route
          path="/recovery"
          render={() => (
            <MainLayout>
              <Recovery />
            </MainLayout>
          )}
        />
        <Route
          path="/dashboard"
          render={() => (
            <WithAuth>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </WithAuth>
          )}
        />
      </Switch>
    </div>)}

    </React.Fragment>
  );
};

export default App;

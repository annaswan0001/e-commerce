import React from "react";
import "./default.scss";
import Homepage from "./views/Homepage/Homepage";
import { Switch, Route } from "react-router-dom";
import Registration from "./views/Registration/Registration";
import MainLayout from "./layouts/MainLayout";
import HomeLayout from "./layouts/HomeLayout";


function App() {
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
          render={() => (
            <MainLayout>
              <Registration />
            </MainLayout>
          )}
        />
      </Switch>
    </div>
  );
}

export default App;

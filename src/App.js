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
import WithAuth from "./hoc/WithAuth";
import WithAdminAuth from "./hoc/WithAdminAuth";
import { useDispatch } from "react-redux";
import Admin from "./views/Admin/Admin";
import AdminToolbar from "./components/AdminToolBar/AdminToolBar";
import AdminLayout from "./layouts/AdminLayout";
import DashBoardLayout from "./layouts/DashboardLayout";
import BabyBoy from "./views/BabyBoy/BabBoy";
import BabyGirl from "./views/BabyGirl/BabyGirl";
import Cart from "./views/Cart/Cart";
import Product from './views/Product/Product'
const App = (props) => {
  const [app, setApp] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSessionStart());
    setTimeout(() => setApp(true), 1000);
  }, []);

  return (
    <React.Fragment>
      {app && (
        <div className="app">
          <AdminToolbar />
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
              path="/product-babygirl"
              render={() => (
                <MainLayout>
                  <BabyGirl />
                </MainLayout>
              )}
            />
          <Route
              path="/shopping-cart"
              render={() => (
                <MainLayout>
                  <Cart/>
                </MainLayout>
              )}
            />
            <Route
              path="/product/:id"
              render={() => (
                <HomeLayout>
                  <Product />
                </HomeLayout>
              )}
            />
               <Route
              path="/shop-babyboy"
              render={() => (
                <MainLayout>
                  <BabyBoy />
                </MainLayout>
              )}
            />

            <Route
              path="/dashboard"
              render={() => (
                <WithAuth>
                  <DashBoardLayout>
                    <Dashboard />
                  </DashBoardLayout>
                </WithAuth>
              )}
            />
            <Route
              path="/admin"
              render={() => (
                <WithAdminAuth>
                  <AdminLayout>
                    <Admin />
                  </AdminLayout>
                </WithAdminAuth>
              )}
            />
          </Switch>
        </div>
      )}
    </React.Fragment>
  );
};

export default App;

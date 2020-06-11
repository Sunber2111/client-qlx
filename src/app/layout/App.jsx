import React, { Fragment, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import Navigation from "containers/Navigation";
import { Layout } from "antd";
import HeaderNav from "containers/Header";
import CarPage from "papes/car";
import ModalContainer from "containers/ModalContainer";
import ModalMruContainer from "containers/ModalMruContainer";
import { Route, Switch } from "react-router-dom";
import Order from "routes/Order";
import Pur from "routes/Pur";
import "./style.scss";
import NotFound from "papes/notfound";
import PrivateRoute from "routes/PrivateRoute";
import ChartPage from "papes/chart";
import EmpPape from "papes/emp";
import CusPage from "papes/cus";
import SupPage from "papes/sup";
import AccountPage from "papes/account";
import StorePape from "papes/store";
import DivBlock from "containers/DivBlock";
import HomePage from "papes/home";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUser } from "redux/actions/account";
import LoadingComponent from "./LoadingComponent";

const { Content } = Layout;

const App = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.account);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);

  if (loading) return <LoadingComponent content="Loading..." />;

  return (
    <Fragment>
      <Route exact path="/" component={HomePage} />

      <Route
        path={"/(.+)"}
        render={() => (
          <Layout className="main-content">
            <DivBlock />
            <Navigation />
            <Layout className="site-layout">
              <HeaderNav />
              <Content
                className="site-layout-background mt-4 mx-3"
                style={{
                  minHeight: 280,
                }}
              >
                <div className="mx-auto">
                  <Fragment>
                    <Switch>
                      <PrivateRoute exact path="/chart" component={ChartPage} />
                      <PrivateRoute exact path="/store" component={StorePape} />
                      <PrivateRoute exact path="/acc" component={AccountPage} />
                      <PrivateRoute exact path="/car" component={CarPage} role={1} />
                      <PrivateRoute exact path="/emp" component={EmpPape} />
                      <PrivateRoute exact path="/cus" component={CusPage} />
                      <PrivateRoute exact path="/sup" component={SupPage} />
                      <PrivateRoute path="/order" component={Order} />
                      <PrivateRoute path="/pur" component={Pur} />
                      <Route component={NotFound} />
                    </Switch>
                  </Fragment>
                </div>
              </Content>
            </Layout>
          </Layout>
        )}
      />
      <ModalContainer />
      <ToastContainer />
      <ModalMruContainer />
    </Fragment>
  );
};

export default App;

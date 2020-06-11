import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux';
import { history } from "index";
const PrivateRoute = ({ role,component, ...rest }) => {
  const Component = component;
  
  const maCV = useSelector(s=>s.account.currentUser.maChucVu);

  if(maCV<role)
    history.push("/car")

  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

export default PrivateRoute;

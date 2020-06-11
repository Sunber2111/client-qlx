import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Orderlist from "papes/orderlist";
import OrderPage from "papes/order";

const Order = (props) => {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route exact path={match.url} component={Orderlist} />

      <Route path={`${match.url}/create`} component={OrderPage} />
    </Switch>
  );
};

export default Order;

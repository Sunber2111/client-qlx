import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import PurchasingPage from "papes/pur";
import PagePurHand from "containers/PagePurHand";
import PagePurExcel from "containers/PagePurExcel";
import Purlist from "papes/purlist";
import NotFound from "papes/notfound";

const Pur = (props) => {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${match.url}/create`} component={PurchasingPage} />

      <Route exact path={`${match.url}/create/hand`} component={PagePurHand} />

      <Route exact path={`${match.url}/create/excel`} component={PagePurExcel} />

      <Route exact path={`${match.url}`} component={Purlist} />

      <Route component={NotFound} />

    </Switch>
  );
};

export default Pur;

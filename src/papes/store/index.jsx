import React, { useState } from "react";
import StoreTable from "containers/StoreTable";
import { Grid, GridRow, GridColumn } from "semantic-ui-react";
import StoreDetail from "components/StoreDetail";

const StorePape = () => {

  const [data,setData] = useState([])

  return (
    <Grid>
      <GridRow className="mx-auto">
        <GridColumn computer={8} mobile={16}>
          <StoreTable  setData={setData} />
        </GridColumn>
        <GridColumn computer={8} mobile={16}>
           <StoreDetail cars={data} />
        </GridColumn>
      </GridRow>
    </Grid>
  );
};

export default StorePape;

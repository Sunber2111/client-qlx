import React, { useState } from "react";
import { Grid, GridRow, GridColumn, Label } from "semantic-ui-react";
import OrderTable from "containers/OrderTable";
import OrderDetailList from "components/OrderDetailList";
import { Paper } from "@material-ui/core";

const Orderlist = () => {
  const [data, setData] = useState({ ctHdx: [] });

  return (
    <Grid>
      <GridRow className="mx-auto">
        <GridColumn computer={10} mobile={16}>
          <OrderTable setData={setData} />
        </GridColumn>
        <GridColumn computer={6} mobile={16}>
          {data.ctHdx.length > 0 && (
            <div>
              <Label
                content={`Chi Tiết Hóa Đơn Số ${data.maHdx}`}
                color="black"
                basic
                className="mb-3"
              />
              <OrderDetailList list={data.ctHdx} />
            </div>
          )}
        </GridColumn>
      </GridRow>
    </Grid>
  );
};

export default Orderlist;

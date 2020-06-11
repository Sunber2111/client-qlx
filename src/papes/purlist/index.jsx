import React, { useState } from "react";
import { Grid, GridRow, GridColumn, Label } from "semantic-ui-react";
import OrderTable from "containers/OrderTable";
import OrderDetailList from "components/OrderDetailList";
import { Paper } from "@material-ui/core";
import PurTable from "containers/PurTable";
import PurDetailList from "components/PurDetailList";

const Purlist = () => {
  const [data, setData] = useState({ ctHdn: [] });

  return (
    <Grid>
      <GridRow className="mx-auto">
        <GridColumn computer={10} mobile={16}>
          <PurTable setData={setData} />
        </GridColumn>
        <GridColumn computer={6} mobile={16}>
          {data.ctHdn.length > 0 && (
            <div>
              <Label
                content={`Chi Tiết Hóa Đơn Số ${data.maHdn}`}
                style={{ background: "#00e676",color:"white" }}
                basic
                className="mb-3"
              />
              <PurDetailList list={data.ctHdn} />
            </div>
          )}
        </GridColumn>
      </GridRow>
    </Grid>
  );
};

export default Purlist;

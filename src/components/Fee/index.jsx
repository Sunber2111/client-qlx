import React from "react";
import { Paper } from "@material-ui/core";
import { Label } from "semantic-ui-react";
import moment from "moment";
import { convertToPrice } from "app/utils/tool";
const Fee = ({fee}) => {

  
  return (
    <Paper elevation={3} className="px-4 py-3">
      <div className="d-flex align-middle">
        <h5 className="my-auto">Ngày Lập</h5>
        <div className="ml-3">
          <Label
            content={moment(new Date()).format("DD/MM/YYYY")}
            style={{ fontSize: "14px" }}
          />
        </div>
      </div>
      <div className="d-flex mt-4">
        <h3>Tổng Tiền</h3>
        <div className="ml-3">
          <Label content={convertToPrice(fee)} style={{ fontSize: "15px" }} tag color="red" />
        </div>
      </div>
    </Paper>
  );
};

export default Fee;

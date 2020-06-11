import React from "react";
import "./style.scss";
import { Paper } from "@material-ui/core";
import { Label } from "semantic-ui-react";

const CarTop = ({ image, name, value }) => {
  return (
    <Paper elevation={4} className="px-2 py-3">
      <div className="row">
        <div className="col-2">
          <img src={image} className="icon-top-3 mx-auto" alt="icon-number" />
        </div>
        <div className="col-10">
          <div>
            <strong className="mr-4">Tên Xe:</strong>
            {name}
          </div>
          <div className="mt-2">
            <strong>Số Lượng</strong>
            <Label className="ml-4" tag content={value} color="red" />
          </div>
        </div>
      </div>
    </Paper>
  );
};

export default CarTop;

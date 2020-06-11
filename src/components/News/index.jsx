import React from "react";
import { GridColumn } from "semantic-ui-react";
import { Paper } from "@material-ui/core";
import "./style.scss";

const News = ({ data, title, image, color }) => {
  return (
    <GridColumn computer={4} mobile={16}>
      <Paper elevation={3} className="bg-white  mb-3">
        <div className="row">
          <div className="col-4 pl-4">
            <img src={image} className="img-icon-fast" alt="img-fn" />
          </div>
          <div className="col-8 mt-2 px-0">
            <p className="fn-title">{title}</p>
            <h3 className={`text-${color}`}>{data}</h3>
          </div>
        </div>
      </Paper>
    </GridColumn>
  );
};

export default React.memo(News);

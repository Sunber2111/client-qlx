import React from "react";
import { Grid } from "semantic-ui-react";
import "./styles.scss";
import hand from "app/images/hand.png";
import ex from "app/images/excel.png";
import Paper from "@material-ui/core/Paper";
import { NavLink } from "react-router-dom";

const PurchasingPage = () => {
  return (
    <Grid className="mx-auto mt-3">
      <h2>Chọn Phương Thức Thêm Hóa Đơn Nhập</h2>
      <Paper elevation={3} className="bg-pur mt-3 py-5">
        <Grid divided>
          <Grid.Column mobile={16} computer={8} className="d-flex flex-column" as={NavLink} to="/pur/create/hand">
            <img src={hand} className="icon-pur mx-auto" alt="icon-hand" />
            <h3 className="text-muted mx-auto">Thêm Thủ Công</h3>
          </Grid.Column>
          <Grid.Column mobile={16} computer={8} className="d-flex flex-column" as={NavLink} to="/pur/create/excel">
            <img src={ex} className="icon-pur mx-auto" alt="icon-excel" />
            <h3 className="text-muted mx-auto">Thêm Bằng File Excel</h3>
          </Grid.Column>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default PurchasingPage;

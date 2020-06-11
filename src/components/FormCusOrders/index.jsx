import React, { useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { Switch } from "antd";
import { DatePicker } from "antd";
import moment from "moment";
import { useState } from "react";
import { Segment } from "semantic-ui-react";

const FormCusOrders = ({ load, dataCus, setCus }) => {
  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];

  const onChange = (date) => {
    try {
      setCus({
        ...dataCus,
        ngaySinh: date.format(),
      });
    } catch (error) {}
  };

  const handleChange = (e) => {
    setCus({
      ...dataCus,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Segment loading={load}>
      <form
        noValidate
        autoComplete="off"
        className="form-cus"
        onSubmit={(e) => e.preventDefault()}
      >
        <TextField
          value={dataCus.tenKh || ""}
          name="tenKh"
          onChange={handleChange}
          label="Tên Khách Hàng"
          className="mb-3"
          fullWidth
          variant="outlined"
        />
        <TextField
          value={dataCus.sdt || ""}
          name="sdt"
          onChange={handleChange}
          className="mb-3"
          label="Số Điện Thoại"
          fullWidth
          variant="outlined"
        />
        <TextField
          value={dataCus.diaChi || ""}
          name="diaChi"
          onChange={handleChange}
          label="Địa Chỉ"
          className="mb-3"
          fullWidth
          variant="outlined"
        />
        <TextField
          value={dataCus.cmnd || ""}
          name="cmnd"
          onChange={handleChange}
          label="CMND"
          className="mb-3"
          fullWidth
          variant="outlined"
        />
        <div className="row ">
          <div className="col">
            <p>Giới Tính</p>
            <Switch
              checked={dataCus.gioiTinh}
              onChange={(e) =>
                setCus({ ...dataCus, gioiTinh: !dataCus.gioiTinh })
              }
              name="gioiTinh"
            />
            <p>{dataCus.gioiTinh ? "Nam" : "Nữ"}</p>
          </div>
          <div className="col">
            <p>Ngày Sinh</p>
            <DatePicker
              value={moment(new Date(dataCus.ngaySinh), dateFormatList[0])}
              onChange={onChange}
              format={dateFormatList}
            />
          </div>
        </div>
      </form>
    </Segment>
  );
};

export default FormCusOrders;

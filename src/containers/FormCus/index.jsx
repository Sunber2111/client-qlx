import React from "react";
import TextField from "@material-ui/core/TextField";
import "./style.scss";
import { Switch } from "antd";
import { DatePicker } from "antd";
import moment from "moment";
import { Button } from "semantic-ui-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { submit } from "../../redux/actions/customer";

const FormCus = ({ cus }) => {
  const [data, setData] = useState({ ...cus, lienHe: true });

  const dispatch = useDispatch();

  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];

  const onChange = (date) => {
    try {
      setData({
        ...data,
        ngaySinh: date.format(),
      });
    } catch (error) {}
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = () => {
    dispatch(submit(data));
  };

  return (
    <form
      noValidate
      autoComplete="off"
      className="form-cus"
      onSubmit={(e) => e.preventDefault()}
    >
      <TextField
        value={data.tenKh}
        name="tenKh"
        className="mb-3"
        onChange={handleChange}
        label="Tên Khách Hàng"
        fullWidth
        variant="outlined"
      />
      <TextField
        value={data.sdt}
        name="sdt"
        onChange={handleChange}
        label="Số Điện Thoại"
        fullWidth
        variant="outlined"
      />
      <TextField
        value={data.diaChi}
        name="diaChi"
        onChange={handleChange}
        label="Địa Chỉ"
        fullWidth
        variant="outlined"
      />
      <TextField
        value={data.cmnd}
        name="cmnd"
        onChange={handleChange}
        label="CMND"
        fullWidth
        variant="outlined"
      />
      <div className="info-s-d">
        <div className="info-s">
          <p>Giới Tính</p>
          <Switch
            checked={data.gioiTinh}
            onChange={(e) => setData({ ...data, gioiTinh: !data.gioiTinh })}
            name="gioiTinh"
          />
          <p>{data.gioiTinh ? "Nam" : "Nữ"}</p>
        </div>
        <div>
          <p>Ngày Sinh</p>
          <DatePicker
            defaultValue={moment(new Date(data.ngaySinh), dateFormatList[0])}
            onChange={onChange}
            format={dateFormatList}
          />
        </div>
      </div>
      {cus && (
        <div className="btn-sub-cus">
          <Button color="green" onClick={handleUpdate} type="submit">
            Sửa
          </Button>
        </div>
      )}
    </form>
  );
};

export default React.memo(FormCus);

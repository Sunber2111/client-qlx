import React, { useState } from "react";
import { Grid, Image, Button } from "semantic-ui-react";
import "./style.scss";
import { useDispatch } from "react-redux";
import { closeModal } from "../../redux/actions/modal";
import TextField from "@material-ui/core/TextField";
import { Switch } from "antd";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { submit } from "../../redux/actions/employee";
import FormGroup from "@material-ui/core/FormGroup";
import { withStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const IOSSwitch = withStyles((theme) => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    "&$checked": {
      transform: "translateX(16px)",
      color: theme.palette.common.white,
      "& + $track": {
        backgroundColor: "#52d869",
        opacity: 1,
        border: "none",
      },
    },
    "&$focusVisible $thumb": {
      color: "#52d869",
      border: "6px solid #fff",
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(["background-color", "border"]),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

const FormEmp = ({ emp, custom=false }) => {
  const [data, setData] = useState(
    emp
      ? emp
      : {
          cmnd: "",
          diaChi: "",
          gioiTinh: false,
          hinh: "",
          maChucVu: null,
          email: "",
          sdt: "",
          tenNv: "",
          ngaySinh: Date.now(),
        }
  );

  const dispatch = useDispatch();

  const handleClose = (e) => {
    dispatch(closeModal());
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleChangeDate = (date) => {
    try {
      const day = new Date(date);
      const td = day.toISOString().slice(0, 19);
      setData({ ...data, ngaySinh: td });
    } catch (error) {}
  };

  const handleSubmit = (e) => {
    dispatch(submit(data));
  };

  const fileSelectedhandler = (e) => {
    const avatar = URL.createObjectURL(e.target.files[0]);
    setData({
      ...data,
      hinh: avatar,
      hinhMoi: e.target.files[0],
    });
  };

  return (
    <Grid className="form-emp">
      <Grid.Column computer={4} mobile={16} className="form-emp-ava">
        <Image src={data.hinh} />
        <label className="custom-file-upload">
          <input type="file" onChange={fileSelectedhandler} />
          {data.maNv ? "Thay Đổi Avatar" : "Thêm Avatar"}
        </label>
      </Grid.Column>
      <Grid.Column mobile={16} computer={12}>
        <Grid>
          <Grid.Column mobile={16} computer={8}>
            <TextField
              className="input-emp"
              label="Tên Nhân Viên"
              name="tenNv"
              value={data.tenNv}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
            <TextField
              className="input-emp"
              label="Địa Chỉ"
              name="diaChi"
              value={data.diaChi}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
            <TextField
              className="input-emp"
              label="CMND"
              name="cmnd"
              value={data.cmnd}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
            <TextField
              className="input-emp"
              label="Số Điện Thoại"
              name="sdt"
              value={data.sdt}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid.Column>
          <Grid.Column mobile={16} computer={8}>
            <TextField
              className="input-emp"
              label="Email"
              name="email"
              value={data.email}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
            <div>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="dd/MM/yyyy"
                  margin="normal"
                  label="Ngày Sinh"
                  value={data.ngaySinh}
                  onChange={(date) => handleChangeDate(date)}
                  KeyboardButtonProps={{
                    "aria-label": "Thay Đổi Ngày",
                  }}
                />
              </MuiPickersUtilsProvider>
            </div>
            <div>
              <p>Giới Tính</p>
              <FormGroup>
                <FormControlLabel
                  control={
                    <IOSSwitch
                      checked={data.gioiTinh}
                      onChange={(e) => {
                        const gt = !data.gioiTinh;
                        setData({ ...data, gioiTinh: gt });
                      }}
                      name="gioiTinh"
                    />
                  }
                  label={data.gioiTinh ? "Nam" : "Nữ"}
                />
              </FormGroup>
            </div>
            {custom===false && (
              <div style={{ marginTop: "20px" }}>
                <p>Chọn Chức Vụ</p>
                <FormControl variant="outlined" className="form-emp-cv">
                  <InputLabel>Chức Vụ</InputLabel>
                  <Select
                    name="maChucVu"
                    value={data.maChucVu}
                    onChange={handleChange}
                    label="Chức vụ"
                  >
                    <MenuItem value={null}>none</MenuItem>
                    <MenuItem value={1}>Nhân Viên</MenuItem>
                    <MenuItem value={2}>Nhân Viên Kho</MenuItem>
                    <MenuItem value={3}>Quản Lý</MenuItem>
                  </Select>
                </FormControl>
              </div>
            )}
          </Grid.Column>
          <Grid.Row style={{ display: "flex", justifyContent: "center" }}>
            <Button color="google plus" onClick={handleSubmit}>
              Gửi
            </Button>
          </Grid.Row>
        </Grid>
      </Grid.Column>

      <Button
        circular
        onClick={handleClose}
        icon="close"
        className="btn-close-emp"
      />
    </Grid>
  );
};

export default React.memo(FormEmp);

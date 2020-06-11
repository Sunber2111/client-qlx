import React, { useState, Fragment } from "react";
import { Button, Checkbox, Segment, Loader, Dimmer } from "semantic-ui-react";
import TextField from "@material-ui/core/TextField";
import { useDispatch, useSelector } from "react-redux";
import { login, resetPassword } from "redux/actions/account";
import { Alert, AlertTitle } from "@material-ui/lab";
import "./style.scss";

const FormLogin = () => {
  const { error } = useSelector((state) => state.account);
  const [data, setData] = useState({
    tenDangNhap: "",
    matKhau: "",
  });

  const [email, setEmail] = useState("");

  const [load, setLoad] = useState(false);

  const [isReset, setReset] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    setLoad(true);
    isReset
      ? dispatch(resetPassword(email)).finally(() => setLoad(false))
      : dispatch(login(data));
  };

  return (
    <div>
      <h2>Tài Khoản Đăng Nhập</h2>
      {error && (
        <Alert severity="error">
          <strong>{error}</strong>
        </Alert>
      )}
      {isReset ? (
        <div>
          <Dimmer active={load} inverted>
            <Loader size="medium" />
          </Dimmer>

          <TextField
            label="Nhập Email đã đăng kí"
            fullWidth
            variant="outlined"
            className="login-input mt-3"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
      ) : (
        <Fragment>
          <TextField
            label="Tên Đăng Nhập"
            fullWidth
            variant="outlined"
            className="login-input mt-3"
            onChange={(e) => setData({ ...data, tenDangNhap: e.target.value })}
            value={data.userName}
          />
          <TextField
            label="Mật Khẩu"
            fullWidth
            variant="outlined"
            className="login-input"
            onChange={(e) => setData({ ...data, matKhau: e.target.value })}
            value={data.passWord}
            type="password"
          />
        </Fragment>
      )}
      <Checkbox
        checked={isReset}
        label="Quên Mật Khẩu ?"
        onClick={(e) => setReset(!isReset)}
      />
      <Button color="google plus" floated="right" onClick={handleSubmit}>
        {isReset ? "Gửi Qua Mail" : "Đăng Nhập"}
      </Button>
    </div>
  );
};

export default FormLogin;

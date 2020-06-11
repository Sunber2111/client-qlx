import React, { useState } from "react";
import { useDispatch } from "react-redux";
import TextField from "@material-ui/core/TextField";
import { Button } from "semantic-ui-react";
import { regisAccount } from "../../redux/actions/account";

const FormAccount = ({ emp }) => {
  const [data, setData] = useState("");

  const dispatch = useDispatch();

  const handleAdd = (e) => {
    emp.tenDangNhap = data;
    dispatch(regisAccount(emp));
  };

  return (
    <div style={{ minHeight: "120px" }}>
      <form noValidate autoComplete="off" onSubmit={(e) => e.preventDefault()}>
        <TextField
          label="Điền Tên Đăng Nhập"
          variant="outlined"
          fullWidth
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
        <p style={{ marginTop: "10px" }}>
          Mật khẩu sẽ được trả về cho Gmail mà nhân viên đã đăng Kí là:
        </p>
        <strong> {emp.email}</strong>
        <Button
          floated="right"
          color="green"
          style={{ marginTop: "10px" }}
          onClick={handleAdd}
        >
          Gửi
        </Button>
      </form>
    </div>
  );
};

export default FormAccount;

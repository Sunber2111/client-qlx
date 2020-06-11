import React from "react";
import TextField from "@material-ui/core/TextField";
import { Button } from "semantic-ui-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { submit } from "../../redux/actions/supplier";

const FormSup = ({ sup }) => {
  const [data, setData] = useState({ ...sup, ngungCungCap: false });

  const dispatch = useDispatch();

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
      className="form-cus mt-4"
      onSubmit={(e) => e.preventDefault()}
    >
      <TextField
        value={data.tenNcc}
        name="tenNcc"
        onChange={handleChange}
        label="Tên Nhà Cung Cấp"
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
      <div className="btn-sub-cus">
        <Button color="youtube" onClick={handleUpdate}>
         {sup?"Sửa":"Thêm"}
        </Button>
      </div>
    </form>
  );
};

export default React.memo(FormSup);

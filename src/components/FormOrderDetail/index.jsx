import React, { useEffect, useState } from "react";
import { Paper } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import "./styles.scss";
import { useSelector, useDispatch } from "react-redux";
import { getAll } from "redux/actions/category";
import { getAll as getAllStores } from "redux/actions/store";
import { Label, Dropdown, GridColumn, Grid, Button } from "semantic-ui-react";
import NumberFormat from "react-number-format";

const Category = (categories) =>
  categories.map((cate) => {
    return {
      key: cate.maLoaiXe,
      text: cate.tenLoaiXe,
      value: cate.maLoaiXe,
    };
  });

const Stores = (stores) =>
  stores.map((s) => {
    return {
      key: s.maKho,
      text: s.tenKho,
      value: s.maKho,
    };
  });

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="$"
    />
  );
}

const FormOrderDetail = ({ maNcc, handleAdd }) => {
  const [data, setData] = useState({
    tenXe: "",
    soKhung: "",
    soMay: "",
    maLoaiXe: 0,
    maKho: 0,
    giaNhap: 0,
  });

  const { categories } = useSelector((s) => s.category);
  const { stores } = useSelector((s) => s.store);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAll());
    dispatch(getAllStores());
  }, []);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    data.giaNhap = parseInt(data.giaNhap);
    data.maNcc = maNcc;
    const xe = { ...data };
    handleAdd(xe);
  };

  return (
    <Paper elevation={2} className="p-2 py-4">
      <h3 className="ml-3">Form Tạo Xe Nhập</h3>
      <Grid>
        <GridColumn mobile={16} computer={5}>
          <TextField
            fullWidth
            name="tenXe"
            value={data.tenXe}
            onChange={handleChange}
            className="mr-3"
            label="Tên Xe"
            variant="outlined"
          />
        </GridColumn>
        <GridColumn mobile={16} computer={5}>
          <TextField
            fullWidth
            name="soKhung"
            value={data.soKhung}
            onChange={handleChange}
            className="mr-3"
            label="Số Khung"
            variant="outlined"
          />
        </GridColumn>
        <GridColumn mobile={16} computer={5}>
          <TextField
            fullWidth
            name="soMay"
            value={data.soMay}
            onChange={handleChange}
            className="mr-3"
            label="Số Máy"
            variant="outlined"
          />
        </GridColumn>
      </Grid>
      <Grid>
        <GridColumn computer={3} mobile={16}>
          Loại Xe
          <Dropdown
            fluid
            placeholder="Chọn Loại Xe"
            name="maLoaiXe"
            onChange={(e, { value, name }) => {
              setData({ ...data, [name]: value });
            }}
            selection
            options={Category(categories)}
          ></Dropdown>
        </GridColumn>

        <GridColumn computer={3} mobile={16}>
          Kho
          <Dropdown
            fluid
            name="maKho"
            onChange={(e, { value, name }) => {
              setData({ ...data, [name]: value });
            }}
            placeholder="Chọn Kho"
            selection
            options={Stores(stores)}
          ></Dropdown>
        </GridColumn>
        <GridColumn computer={3} mobile={16}>
          <div className="mx-2 d-flex flex-column">
            <div>Mã Nhà Cung Cấp:</div>
            <div>
              <Label color="red" pointing className="ml-2">
                {" "}
                {maNcc === 0 ? "Chưa Chọn Nhà Cung Cấp" : maNcc}{" "}
              </Label>
            </div>
          </div>
        </GridColumn>
        <GridColumn computer={3} mobile={16}>
          <TextField
            fullWidth
            label="Giá Nhập"
            name="giaNhap"
            onChange={handleChange}
            variant="outlined"
            InputProps={{
              inputComponent: NumberFormatCustom,
            }}
          />
        </GridColumn>
        <GridColumn className="" computer={3} mobile={16}>
          <Button color="google plus" onClick={handleClick}>
            Thêm
          </Button>
        </GridColumn>
      </Grid>
    </Paper>
  );
};

export default React.memo(FormOrderDetail);

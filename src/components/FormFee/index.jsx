import React, { useState } from "react";
import NumberFormat from "react-number-format";
import { Paper, TextField } from "@material-ui/core";
import { Label, Button } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { closeDialog } from "redux/actions/dialog";

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

const FormFee = ({ car, onAddCar }) => {
  const [giaXuat, setGiaXuat] = useState(0);

  const dispatch = useDispatch();

  const handleClick = (e) => {
    
    car.giaXuat = parseInt(giaXuat);
    onAddCar(car);
    dispatch(closeDialog());
  };

  const canSubmit = () => {
    if (giaXuat <= 0) return true;
    return false;
  };
  return (
    <Paper className="mb-3">
      <Label color="yellow">Mời Bạn Nhập Gía</Label>
      <TextField
        fullWidth
        label="Giá Bán"
        onChange={(e) => setGiaXuat(e.target.value)}
        variant="outlined"
        className="mt-3"
        InputProps={{
          inputComponent: NumberFormatCustom,
        }}
      />
      <Button
        floated="right"
        color="green"
        disabled={canSubmit()}
        className="mt-3"
        onClick={handleClick}
      >
        Thêm
      </Button>
    </Paper>
  );
};

export default FormFee;

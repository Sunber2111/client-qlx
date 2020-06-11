import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Input } from "semantic-ui-react";
import { getAll } from "../../redux/actions/employee";
import CardEmp from "../CardEmp";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const options = [
  { key: 0, text: "Toàn Bộ", value: 0 },
  { key: 1, text: "Mã Nhân Viên", value: 1 },
  { key: 2, text: "Tên Nhân Viên", value: 2 },
];

const EmployeeTable = () => {
  const [select, setSelect] = useState(0);

  const [keyInput, setKeyInput] = useState("");

  const dispatch = useDispatch();

  const { emps } = useSelector((s) => s.employee);

  useEffect(() => {
    dispatch(getAll());
  }, [dispatch]);

  const createData = () => {
    let arr = [];

    if (keyInput === "" || keyInput === null) {
      emps.map((emp) => arr.push(<CardEmp emp={emp}  />));
      return arr;
    }

    switch (select) {
      case 0:
        emps.map((emp) => arr.push(<CardEmp emp={emp} />));
        break;
      case 1: {
        const nv = emps.find((emp) => emp.maNv == keyInput);
        if (nv) arr.push(<CardEmp emp={nv} />);
        break;
      }
      case 2: {
        emps
          .filter(
            (emp) =>
              emp.tenNv.toLowerCase().indexOf(keyInput.toLowerCase()) >= 0
          )
          .map((emp) => arr.push(<CardEmp emp={emp} />));
        break;
      }
      default:
        break;
    }
    return arr;
  };

  return (
    <div className='mx-auto'>
      <Input
        type="text"
        placeholder="Tìm Theo..."
        action
        value={keyInput}
        onChange={(e) => setKeyInput(e.target.value)}
      >
        <input />
        <FormControl variant="outlined" style={{ background: "white" }}>
          <Select value={select} onChange={(e) => setSelect(e.target.value)}>
            {options.map((opt) => (
              <MenuItem value={opt.value} key={opt.value}>
                {opt.text}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Input>
      <Grid style={{ marginTop: "20px" }} className='mx-auto'>
        <Grid.Row>{createData()}</Grid.Row>
      </Grid>
    </div>
  );
};

export default EmployeeTable;

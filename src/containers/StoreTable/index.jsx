import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAll } from "redux/actions/store";
import {
  Button,
  Dropdown,
  Input,
  Grid,
  GridRow,
  GridColumn,
  Label,
} from "semantic-ui-react";
import { Table } from "antd";
import { openDialog } from "redux/actions/dialog";
import FormStore from "containers/FormStore";

const options = [
  { key: 0, text: "Mã Kho", value: 0 },
  { key: 1, text: "Tên Kho", value: 1 },
];

const StoreTable = ({ setData }) => {
  const { stores } = useSelector((s) => s.store);

  const maCV = useSelector((s) => s.account.currentUser.maChucVu);

  useEffect(() => {
    dispatch(getAll());
  }, []);

  const [select, setSelect] = useState(0);

  const [keyInput, setKeyInput] = useState("");

  const [itemSelect, setItemSelect] = useState(null);

  const dispatch = useDispatch();

  const columns = [
    {
      title: "Mã Kho",
      dataIndex: "maKho",
    },
    {
      title: "Tên Kho",
      dataIndex: "tenKho",
    },

    {
      title: "Địa Chỉ",
      dataIndex: "diaChi",
    },
  ];

  const columnsAdmin = [
    {
      title: "Mã Kho",
      dataIndex: "maKho",
    },
    {
      title: "Tên Kho",
      dataIndex: "tenKho",
    },

    {
      title: "Địa Chỉ",
      dataIndex: "diaChi",
    },
    {
      title: "Sửa",
      render: (text, record) => (
        <Button
          color="yellow"
          onClick={(e) => {
            dispatch(openDialog(<FormStore store={record} />));
          }}
        >
          Sửa
        </Button>
      ),
    },
  ];

  useEffect(() => {
    dispatch(getAll());
  }, [dispatch]);

  const setRowClassName = (record) => {
    return record.maKho === itemSelect ? "clickRowStyl" : "";
  };

  const createData = () => {
    if (keyInput === null || keyInput === "") return stores;

    switch (select) {
      case 1: {
        const item = stores.find((cus) => cus.tenKho.toLowerCase().indexOf(keyInput.toLowerCase()) >= 0);
        return item ? [{ ...item }] : [];
      }
      case 0: {
        const item = stores.find((cus) => cus.maKho == keyInput);
        return item ? [{ ...item }] : [];
      }
      default:
        break;
    }
  };

  const handleFind = (e, { value }) => {
    setKeyInput(value);
  };

  const handleAdd = (e) => {
    dispatch(openDialog(<FormStore />));
  };

  return (
    <Table
      key="tableCar"
      title={() => (
        <Grid className="pl-3">
          <GridRow>
            <GridColumn computer={5} mobile={16}>
              <Label color="blue" basic style={{ fontSize: "20px" }}>
                Danh Sách Kho
              </Label>
            </GridColumn>
            {maCV >= 3 && (
              <GridColumn computer={11} mobile={16}>
                <Button floated="right" onClick={handleAdd} color="green">
                  Thêm Kho
                </Button>
              </GridColumn>
            )}
          </GridRow>
          <GridRow className="mt-2">
            <Input
              action={
                <Dropdown
                  button
                  basic
                  floating
                  value={select}
                  onChange={(e, { value }) => setSelect(value)}
                  options={options}
                  defaultValue={0}
                />
              }
              icon="search"
              className="cmt-2 mt-1"
              iconPosition="left"
              value={keyInput}
              onChange={handleFind}
              placeholder="Tìm Kiếm Theo..."
            />
          </GridRow>
        </Grid>
      )}
      columns={maCV >= 3 ? columnsAdmin : columns}
      dataSource={[...createData()]}
      onRow={(record, rowIndex) => {
        return {
          onClick: (event) => {
            setData(
              record.ctKho.map((val) => {
                return val.xe;
              })
            );

            setItemSelect(record.maKho);
          },
        };
      }}
      rowClassName={setRowClassName}
      rowKey="maKho"
    />
  );
};

export default StoreTable;

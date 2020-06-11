import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAll } from "redux/actions/customer";
import { Button, Segment } from "semantic-ui-react";
import { openDialog } from "redux/actions/dialog";
import { Table } from "antd";
import {
  Label,
  Input,
  Dropdown,
  Grid,
  GridColumn,
  GridRow,
} from "semantic-ui-react";
import { convertDate } from "app/utils/tool";
import FormCus from "../FormCus";

const rowSelection = {
  getCheckboxProps: () => ({
    className: "tableSelectCheckboxOverride",
  }),
  hideDefaultSelections: true,
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
};

const options = [
  { key: 0, text: "Tất Cả", value: 0 },
  { key: 1, text: "Mã Khách Hàng", value: 1 },
  { key: 2, text: "Tên Khách Hàng", value: 2 },
  { key: 3, text: "CMND", value: 3 },
  { key: 4, text: "SDT", value: 4 },
];

const CustomerTable = () => {
  const [select, setSelect] = useState(0);

  const [keyInput, setKeyInput] = useState("");

  const [itemSelect, setItemSelect] = useState({
    rowId: null,
  });

  const dispatch = useDispatch();

  const { cuses } = useSelector((s) => s.customer);

  const columns = [
    {
      title: "Mã Khách Hàng",
      dataIndex: "maKh",
    },
    {
      title: "Tên Khách Hàng",
      dataIndex: "tenKh",
    },

    {
      title: "Địa Chỉ",
      dataIndex: "diaChi",
    },
    {
      title: "Giới Tính",
      dataIndex: "gioiTinh",
      render: (gioiTinh) => (
        <Label basic color={gioiTinh ? "red" : "pink"} key={gioiTinh}>
          {gioiTinh ? "Nam" : "Nữ"}
        </Label>
      ),
    },
    {
      title: "CMND",
      dataIndex: "cmnd",
    },
    {
      title: "Số Điện Thoại",
      dataIndex: "sdt",
      render: (sdt) => (
        <Label color="green" key={sdt} basic>
          {sdt}
        </Label>
      ),
    },
    {
      title: "Ngày Sinh",
      dataIndex: "ngaySinh",
      render: (ngaySinh) => (
        <Label color="blue" key={ngaySinh} basic>
          {ngaySinh && convertDate(ngaySinh)}
        </Label>
      ),
    },
    {
      title: "Sửa",
      render: (text, record) => (
        <Button color="yellow" onClick={() => handleUpdate(record)}>
          Sửa
        </Button>
      ),
    },
  ];

  const handleUpdate = (record) => {
    dispatch(
      openDialog(<FormCus cus={record} />, "Chỉnh Sửa Thông Khách Hàng")
    );
  };

  useEffect(() => {
    dispatch(getAll());
  }, [dispatch]);

  const setRowClassName = (record) => {
    return record.maKh === itemSelect.rowId ? "clickRowStyl" : "";
  };

  const createData = () => {
    if (keyInput === null || keyInput === "") return cuses;

    switch (select) {
      case 0: {
        return cuses;
      }
      case 1: {
        const item = cuses.find((cus) => cus.maKh == keyInput);
        return item ? [{ ...item }] : [];
      }
      case 2: {
        return cuses.filter(
          (cus) => cus.tenKh.toLowerCase().indexOf(keyInput.toLowerCase()) >= 0
        );
      }
      case 3: {
        const item = cuses.find((cus) => cus.cmnd.includes(keyInput));
        return item ? [{ ...item }] : [];
      }
      case 4: {
        const item = cuses.find((cus) => cus.sdt.includes(keyInput));
        return item ? [{ ...item }] : [];
      }
      default:
        break;
    }
  };

  const handleFind = (e, { value }) => {
    setKeyInput(value);
  };

  return (
    <Segment className="bg-clear-p-0">
      <Table
        key="tableCar"
        title={() => (
          <Grid>
            <GridRow>
              <GridColumn computer={4} mobile={16}>
                <Label color="red" basic>
                  <h3>Danh Sách Khách Hàng</h3>
                </Label>
              </GridColumn>
              <GridColumn computer={11} mobile={16}>
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
                  className="cmt-2"
                  iconPosition="left"
                  value={keyInput}
                  onChange={handleFind}
                  placeholder="Tìm Kiếm Theo..."
                />
              </GridColumn>
            </GridRow>
          </Grid>
        )}
        rowSelection={{
          ...rowSelection,
        }}
        columns={columns}
        dataSource={[...createData()]}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              setItemSelect({ ...itemSelect, rowId: rowIndex + 1 });
            },
          };
        }}
        rowClassName={setRowClassName}
        rowKey="maKh"
      />
    </Segment>
  );
};

export default CustomerTable;

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAll } from "redux/actions/supplier";
import { Button, Segment, Grid, GridColumn, GridRow } from "semantic-ui-react";
import { openDialog } from "redux/actions/dialog";
import { Table } from "antd";
import { Label, Input, Dropdown } from "semantic-ui-react";
import FormSup from "../FormSup";
import "./styles.scss";

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
  { key: 1, text: "Mã Nhà Cung Cấp", value: 1 },
  { key: 2, text: "Tên Nhà Cung Cấp", value: 2 },
];

const SupTable = ({ columnsCustom, setDataSelect }) => {
  const [select, setSelect] = useState(0);

  const [keyInput, setKeyInput] = useState("");

  const [itemSelect, setItemSelect] = useState({
    rowId: null,
  });

  const dispatch = useDispatch();

  const { sups } = useSelector((s) => s.supplier);

  const maCV = useSelector((s) => s.account.currentUser.maChucVu);

  const columns = [
    {
      title: "Mã Nhà Cung Cấp",
      dataIndex: "maNcc",
    },
    {
      title: "Tên Nhà Cung Cấp",
      dataIndex: "tenNcc",
    },

    {
      title: "Địa Chỉ",
      dataIndex: "diaChi",
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
  ];

  const columnsAdmin = [
    {
      title: "Mã Nhà Cung Cấp",
      dataIndex: "maNcc",
    },
    {
      title: "Tên Nhà Cung Cấp",
      dataIndex: "tenNcc",
    },

    {
      title: "Địa Chỉ",
      dataIndex: "diaChi",
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
      openDialog(<FormSup sup={record} />, "Chỉnh Sửa Thông Nhà Cung Cấp")
    );
  };

  useEffect(() => {
    dispatch(getAll());
  }, [dispatch]);

  const setRowClassName = (record) => {
    return record.maNcc == itemSelect.rowId ? "clickRowStyl" : "";
  };

  const createData = () => {
    if (keyInput == null || keyInput == "") return sups;

    switch (select) {
      case 0: {
        return sups;
      }
      case 1: {
        const item = sups.find((cus) => cus.maNcc == keyInput);
        return item ? [{ ...item }] : [];
      }
      case 2: {
        return sups.filter(
          (cus) => cus.tenNcc.toLowerCase().indexOf(keyInput.toLowerCase()) >= 0
        );
      }
      default:
        break;
    }
  };

  const handleFind = (e, { value }) => {
    setKeyInput(value);
  };

  const handleAdd = () => {
    dispatch(openDialog(<FormSup />));
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
                  <h3>Danh Sách Nhà Cung Cấp</h3>
                </Label>
              </GridColumn>
              <GridColumn computer={9} mobile={16}>
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
              <GridColumn computer={3} mobile={16}>
                <Button color="green" onClick={handleAdd}>
                  Thêm Nhà Cung Cấp
                </Button>
              </GridColumn>
            </GridRow>
          </Grid>
        )}
        rowSelection={{
          ...rowSelection,
        }}
        columns={
          columnsCustom ? columnsCustom : maCV >= 3 ? columnsAdmin : columns
        }
        dataSource={[...createData()]}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              if (setDataSelect) setDataSelect(record);

              setItemSelect({ ...itemSelect, rowId: rowIndex + 1 });
            },
          };
        }}
        rowClassName={setRowClassName}
        rowKey="maNcc"
      />
    </Segment>
  );
};

export default React.memo(SupTable);

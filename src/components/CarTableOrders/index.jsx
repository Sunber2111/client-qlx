import React, { useState, useCallback } from "react";
import { Button, Segment, GridRow, GridColumn ,Grid} from "semantic-ui-react";
import { Table } from "antd";
import { Label, Input, Dropdown } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { openModal } from "redux/actions/modal";
import FormFee from "components/FormFee";
import { openDialog } from "redux/actions/dialog";
import pink from "@material-ui/core/colors/pink";
import Chip from "@material-ui/core/Chip";

const colorP = pink[500];

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
  { key: 0, text: "Mã Xe", value: 0 },
  { key: 1, text: "Tên Xe", value: 1 },
];

const CarTableOrders = ({ cars, onAddCar }) => {
  const [select, SetSelect] = useState(0);

  const [keyInput, setKeyInput] = useState("");

  const dispatch = useDispatch();

  const [itemSelect, setItemSelect] = useState({
    rowId: null,
  });

  const columns = [
    {
      title: "Mã Xe",
      dataIndex: "maXe",
    },
    {
      title: "Tên Xe",
      dataIndex: "tenXe",
    },

    {
      title: "Loại Xe",
      dataIndex: "loaiXe",
    },
    {
      title: "Tên Kho",
      dataIndex: "tenKho",
      render: (tenKho) => (
        <Chip label={tenKho} style={{ background: colorP, color: "white" }} />
      ),
    },
    {
      title: "Số Khung",
      dataIndex: "soKhung",
      render: (soKhung) => (
        <Label color="blue" key={soKhung}>
          {soKhung}
        </Label>
      ),
    },
    {
      title: "Số Máy",
      dataIndex: "soMay",
      render: (soMay) => (
        <Label color="yellow" key={soMay}>
          {soMay}
        </Label>
      ),
    },
    {
      title: "Thêm",
      render: (text, record) => (
        <Button color="green" onClick={() => handleAdd(record)}>
          Thêm Vào Giỏ Hàng
        </Button>
      ),
    },
  ];

  const handleAdd = (record) => {
    dispatch(openDialog(<FormFee car={record} onAddCar={onAddCar} />));
  };

  const setRowClassName = useCallback(
    (record) => {
      return record.maXe == itemSelect.rowId ? "clickRowStyl" : "";
    },
    [itemSelect.rowId]
  );

  const createData = () => {
    if (keyInput == "" || keyInput == null) return cars;
    switch (select) {
      case 0: {
        const car = cars.find((x) => x.maXe == keyInput);
        return car ? [car] : [];
      }
      case 1: {
        return cars.filter(
          (x) => x.tenXe.toLowerCase().indexOf(keyInput.toLowerCase()) >= 0
        );
      }
      default:
        break;
    }
  };

  return (
    <Segment className="bg-clear-p-0">
      <Table
        key="tableCar"
        title={() => (
          <Grid>
            <GridRow>
              <GridColumn computer={5} mobile={16}>
                <Label color="red">
                  <p style={{ fontSize: "20px" }}> Danh Sách Xe</p>
                </Label>
              </GridColumn>
              <GridColumn computer={11} mobile={16}>
                <Input
                  action={
                    <Dropdown
                      button
                      basic
                      floating
                      options={options}
                      value={select}
                      onChange={(e, { value }) => {
                        SetSelect(value);
                      }}
                    />
                  }
                  icon="search"
                  className="cmt-2"
                  iconPosition="left"
                  value={keyInput}
                  onChange={(e) => setKeyInput(e.target.value)}
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
        dataSource={createData()}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              setItemSelect({ ...itemSelect, rowId: record.maXe });
            },
          };
        }}
        rowClassName={setRowClassName}
        rowKey="maXe"
      />
    </Segment>
  );
};

export default CarTableOrders;

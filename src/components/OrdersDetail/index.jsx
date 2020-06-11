import React, { useState, useCallback } from "react";
import { Button, Segment } from "semantic-ui-react";
import { Table } from "antd";
import { Label } from "semantic-ui-react";

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

const OrdersDetail = ({ cars, handleDelete }) => {
  const [select] = useState(0);

  const [keyInput] = useState("");

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
      title: "Gía Bán",
      dataIndex: "giaXuat",
      render: (giaXuat) => (
        <Label color="purple" key={giaXuat}>
          {giaXuat}
        </Label>
      ),
    },
    {
      title: "Xóa",
      render: (text, record) => (
        <Button color="red" onClick={() => handleDeleteCar(record)}>
          Xóa
        </Button>
      ),
    },
  ];

  const handleDeleteCar = (record) => {
    handleDelete(record);
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
          <div className="title-cars">
            <Label color="teal" basic>
              <p style={{ fontSize: "20px" }}>Chi Tiết Hóa Đơn Xuất</p>
            </Label>
          </div>
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

export default OrdersDetail;

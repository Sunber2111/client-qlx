import React, { useState } from "react";
import { Label, Button } from "semantic-ui-react";
import { Table } from "antd";

const OrderTableTable = ({ orders, onDeleteXe }) => {
  const [select, setSelect] = useState(0);

  const [itemSelect, setItemSelect] = useState({
    rowId: null,
  });

  const handleDelete = (xe) => {
    onDeleteXe(xe);
  };
  const columns = [
    {
      title: "Mã Xe ( Tạm Thời )",
      dataIndex: "maXe",
    },
    {
      title: "Tên Xe",
      dataIndex: "tenXe",
    },

    {
      title: "Số Khung",
      dataIndex: "soKhung",
      render: (soKhung) => (
        <Label color="green" key={soKhung} basic>
          {soKhung}
        </Label>
      ),
    },
    {
      title: "Số Máy",
      dataIndex: "soMay",
      render: (soMay) => (
        <Label color="blue" key={soMay} basic>
          {soMay}
        </Label>
      ),
    },
    {
      title: "Mã Loại",
      dataIndex: "maLoaiXe",
    },
    {
      title: "Mã Nhà Cung Cấp",
      dataIndex: "maNcc",
    },

    {
      title: "Mã Kho",
      dataIndex: "maKho",
    },
    {
      title: "Giá Nhập",
      dataIndex: "giaNhap",
      render: (giaNhap) => (
        <Label color="purple" key={giaNhap}>
          {giaNhap}
        </Label>
      ),
    },

    {
      title: "Xóa",
      render: (text, record) => (
        <Button
          color="red"
          onClick={(e) => {
            handleDelete(record);
          }}
        >
          Xóa
        </Button>
      ),
    },
  ];

  const setRowClassName = (record) => {
    return record.maXe == itemSelect.rowId ? "clickRowStyl" : "";
  };

  return (
    <Table
      key="tableorders"
      title={() => <h3>Danh Sách Chi Tiết Hóa Đơn</h3>}
      columns={columns}
      dataSource={orders}
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
  );
};

export default React.memo(OrderTableTable);

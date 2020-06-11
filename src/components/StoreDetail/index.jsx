import React, { useState, useCallback } from "react";
import { Button, Segment } from "semantic-ui-react";
import { Table } from "antd";
import { Label, Input, Dropdown } from "semantic-ui-react";
import pink from "@material-ui/core/colors/pink";
import Chip from "@material-ui/core/Chip";

const colorP = pink[500];


const options = [
  { key: 0, text: "Mã Xe", value: 0 },
  { key: 1, text: "Tên Xe", value: 1 },
];

const StoreDetail = ({ cars }) => {
  const [select, SetSelect] = useState(0);

  const [keyInput, setKeyInput] = useState("");


  const [itemSelect, setItemSelect] = useState(null);

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
      render: (tenKho) => <Chip label={tenKho} style={{background:colorP,color:"white"}} />,
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
    }
  ];

  const setRowClassName = useCallback(
    (record) => {
      return record.maXe == itemSelect ? "clickRowStyl" : "";
    },
    [itemSelect]
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
            <Label color="red">
              <p style={{ fontSize: "20px" }}> Chi Tiết Kho</p>
            </Label>
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
              className="search-car-od"
              iconPosition="left"
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              placeholder="Tìm Kiếm Theo..."
            />
          </div>
        )}
        columns={columns}
        dataSource={createData()}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              setItemSelect(record.maXe);
            },
          };
        }}
        rowClassName={setRowClassName}
        rowKey="maXe"
      />
    </Segment>
  );
};

export default StoreDetail;

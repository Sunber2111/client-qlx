import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAll } from "../../redux/actions/car";
import { Button, Segment } from "semantic-ui-react";
import { openDialog } from "../../redux/actions/dialog";
import { Table, Tag } from "antd";
import FormEditCar from "../FormEditCar";
import { Label, Input, Dropdown } from "semantic-ui-react";
import { convertToPrice } from "../../app/utils/tool";
import "./style.scss";
import { deleteSelect } from "../../redux/actions/category";

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

const CarTable = () => {
  const [select, SetSelect] = useState(0);

  const maCV = useSelector((s) => s.account.currentUser.maChucVu);

  const [keyInput, setKeyInput] = useState("");

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
        <Tag color="geekblue" key={soKhung}>
          {soKhung}
        </Tag>
      ),
    },
    {
      title: "Số Máy",
      dataIndex: "soMay",
      render: (soMay) => (
        <Tag color="green" key={soMay}>
          {soMay}
        </Tag>
      ),
    },
  ];

  const columnsAdmin = [
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
        <Tag color="geekblue" key={soKhung}>
          {soKhung}
        </Tag>
      ),
    },
    {
      title: "Số Máy",
      dataIndex: "soMay",
      render: (soMay) => (
        <Tag color="green" key={soMay}>
          {soMay}
        </Tag>
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

  const { cars } = useSelector((s) => s.car);

  const { isSelect } = useSelector((s) => s.category);

  const dispatch = useDispatch();

  const handleUpdate = (record) => {
    dispatch(
      openDialog(<FormEditCar car={record} />, "Chỉnh Sửa Thông Tin Xe")
    );
  };

  useEffect(() => {
    dispatch(getAll());
  }, [dispatch]);

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

  const handleCloseSelect = (e) => {
    dispatch(deleteSelect());
  };

  return (
    <Segment className="bg-clear-p-0">
      {isSelect && (
        <Label
          as="a"
          color="blue"
          className="alert-cate-cars"
          ribbon="right"
          onClick={handleCloseSelect}
        >
          X &nbsp;&nbsp; {`Bạn Đang Chọn Loại Xe ${isSelect.tenLoaiXe}`}
        </Label>
      )}
      <Table
        key="tableCar"
        title={() => (
          <div className="title-cars">
            <h3>Danh Sách Xe</h3>
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
              className="search-car"
              iconPosition="left"
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              placeholder="Tìm Kiếm Theo..."
            />
          </div>
        )}
        rowSelection={{
          ...rowSelection,
        }}
        columns={maCV >= 3 ? columnsAdmin : columns}
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

export default CarTable;

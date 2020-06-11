import React, { useState, useCallback, useEffect } from "react";
import { Segment, GridRow, Grid, GridColumn } from "semantic-ui-react";
import { Table } from "antd";
import { Label, Input, Dropdown } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import Chip from "@material-ui/core/Chip";
import { getAll } from "redux/actions/order";
import { convertDate } from "app/utils/tool";

const options = [{ key: 0, text: "Mã Hóa Đơn", value: 0 }];

const OrderTable = ({ setData }) => {
  const { orders } = useSelector((s) => s.order);

  const [select, SetSelect] = useState(0);

  const [keyInput, setKeyInput] = useState("");

  const dispatch = useDispatch();

  const [itemSelect, setItemSelect] = useState(null);

  useEffect(() => {
    dispatch(getAll());
  }, []);
  const columns = [
    {
      title: "Mã Hóa Đơn",
      dataIndex: "maHdx",
    },
    {
      title: "Tên Khách Hàng",
      dataIndex: "tenKh",
      render: (tenKh) => (
        <Chip label={tenKh} style={{ background: "#f44336", color: "white" }} />
      ),
    },

    {
      title: "Tên Nhân Viên",
      dataIndex: "tenNv",
      render: (tenNv) => (
        <Label color="blue" basic key={tenNv}>
          {tenNv}
        </Label>
      ),
    },
    {
      title: "Ngày Lập",
      dataIndex: "ngayXuat",
      render: (ngayXuat) => (
        <Label color="yellow" basic key={ngayXuat}>
          {convertDate(ngayXuat)}
        </Label>
      ),
    },
  ];

  const setRowClassName = (record) => {
    return record.maHdx == itemSelect ? "clickRowStyl" : "";
  };

  const createData = () => {
    if (keyInput == "" || keyInput == null) return orders;
    switch (select) {
      case 0: {
        const od = orders.find((x) => x.maHdx == keyInput);
        return od ? [od] : [];
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
              <GridColumn computer={6} mobile="16">
                <Label color="red">
                  <p style={{ fontSize: "20px" }}> Danh Sách Hóa Đơn Xuất</p>
                </Label>
              </GridColumn>
              <GridColumn computer={10} mobile="16" className="ml-auto">
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
                  iconPosition="left"
                  className="cmt-2"
                  value={keyInput}
                  onChange={(e) => setKeyInput(e.target.value)}
                  placeholder="Tìm Kiếm Theo..."
                />
              </GridColumn>
            </GridRow>
          </Grid>
        )}
        columns={columns}
        dataSource={createData()}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              setData(record);
              setItemSelect(record.maHdx);
            },
          };
        }}
        rowClassName={setRowClassName}
        rowKey="maHdx"
      />
    </Segment>
  );
};

export default OrderTable;

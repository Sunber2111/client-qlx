import React, { useState, useCallback, useEffect } from "react";
import { Segment, GridRow, Grid, GridColumn } from "semantic-ui-react";
import { Table } from "antd";
import { Label, Input, Dropdown } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import Chip from "@material-ui/core/Chip";
import { getAll } from "redux/actions/pur";
import { convertDate } from "app/utils/tool";

const options = [{ key: 0, text: "Mã Hóa Đơn", value: 0 }];

const PurTable = ({ setData }) => {
  const { purs } = useSelector((s) => s.pur);

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
      dataIndex: "maHdn",
    },
    {
      title: "Tên Nhà Cung Cấp",
      dataIndex: "tenNcc",
      render: (tenKh) => (
        <Chip label={tenKh} style={{ background: "#2196f3", color: "white" }} />
      ),
    },

    {
      title: "Tên Nhân Viên",
      dataIndex: "tenNv",
      render: (tenNv) => (
        <Label style={{ background: "#7c4dff", color: "white" }}  basic key={tenNv}>
          {tenNv}
        </Label>
      ),
    },
    {
      title: "Ngày Lập",
      dataIndex: "ngayNhap",
      render: (ngayXuat) => (
        <Label style={{background:"#ff4081",color:"white"}} basic key={ngayXuat}>
          {convertDate(ngayXuat)}
        </Label>
      ),
    },
  ];

  const setRowClassName = (record) => {
    return record.maHdn == itemSelect ? "clickRowStyl" : "";
  };

  const createData = () => {
    if (keyInput == "" || keyInput == null) return purs;
    switch (select) {
      case 0: {
        const od = purs.find((x) => x.maHdn == keyInput);
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
                <Label style={{background:"#ffd600"}}>
                  <p style={{ fontSize: "20px" }}> Danh Sách Hóa Đơn Nhập</p>
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
              setItemSelect(record.maHdn);
            },
          };
        }}
        rowClassName={setRowClassName}
        rowKey="maHdn"
      />
    </Segment>
  );
};

export default PurTable;

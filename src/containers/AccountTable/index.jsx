import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAll } from "redux/actions/employee";
import { Button, Segment, GridRow, GridColumn,Grid } from "semantic-ui-react";
import { openDialog } from "redux/actions/dialog";
import { Table } from "antd";
import { Label, Input, Dropdown } from "semantic-ui-react";
import IOSSwitch from "../../components/switches";
import { updateActiveAccount } from "../../redux/actions/account";
import FormAccount from "../FormAccount";

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
  { key: 1, text: "Tên Tài Khoản", value: 1 },
  { key: 2, text: "Mã Nhân Viên", value: 2 },
  { key: 3, text: "Tên Nhân Viên", value: 3 },
  { key: 4, text: "Có Tài Khoản", value: 4 },
  { key: 5, text: "Chưa Có Tài Khoản", value: 5 },
];

const AccountTable = () => {
  const [select, setSelect] = useState(0);

  const [keyInput, setKeyInput] = useState("");

  const [itemSelect, setItemSelect] = useState({
    rowId: null,
  });

  const dispatch = useDispatch();

  const { emps } = useSelector((s) => s.employee);

  const handleChangeState = (acc) => {
    dispatch(updateActiveAccount(acc.maNv, acc.kichHoat));
  };

  const columns = [
    {
      title: "Tên Đăng Nhập",
      dataIndex: "tenDangNhap",
      render: (tenDangNhap) => (
        <Label
          basic={tenDangNhap != null}
          color={tenDangNhap ? "blue" : "red"}
          key={tenDangNhap}
        >
          {tenDangNhap ? tenDangNhap : "Chưa Có Tài Khoản"}
        </Label>
      ),
    },

    {
      title: "Mã Nhân Viên",
      dataIndex: "maNv",
    },
    {
      title: "Tên Nhân Viên",
      dataIndex: "tenNv",
    },
    {
      title: "Trạng Thái Kích Hoạt",
      render: (text, record) => (
        <IOSSwitch
          checked={record.kichHoat}
          onChange={() => handleChangeState(record)}
        />
      ),
    },
    {
      title: "Thêm Tài Khoản",
      render: (text, record) => {
        if (record.email == null || record.email == "")
          return (
            <Label color="black">
              Nhân viên chưa có Gmail nên không thêm được
            </Label>
          );
        if (!record.tenDangNhap)
          return (
            <Button color="yellow" onClick={() => handleAddAcc(record)}>
              Thêm Tài Khoản
            </Button>
          );
      },
    },
  ];

  useEffect(() => {
    dispatch(getAll());
  }, [dispatch]);

  const setRowClassName = (record) => {
    return record.maNv == itemSelect.rowId ? "clickRowStyl" : "";
  };

  const createData = () => {
    switch (select) {
      case 0: {
        return emps;
      }
      case 1: {
        return emps.filter(
          (emp) =>
            emp.tenDangNhap.toLowerCase().indexOf(keyInput.toLowerCase()) >= 0
        );
      }

      case 2: {
        if (keyInput == null || keyInput == "") return emps;

        const item = emps.find((emp) => emp.maNv == keyInput);
        return item ? [{ ...item }] : [];
      }
      case 3: {
        if (keyInput == null || keyInput == "") return emps;

        const item = emps.find(
          (emp) => emp.tenNv.toLowerCase().indexOf(keyInput.toLowerCase()) >= 0
        );
        return item ? [{ ...item }] : [];
      }
      case 4: {
        return emps.filter(
          (emp) => emp.kichHoat === true && emp.tenDangNhap != null
        );
      }
      case 5: {
        return emps.filter(
          (emp) => emp.kichHoat === false && emp.tenDangNhap != null
        );
      }
      default:
        break;
    }
  };

  const handleFind = (e, { value }) => {
    setKeyInput(value);
  };

  const handleAddAcc = (nv) => {
    dispatch(openDialog(<FormAccount emp={nv} />, "Thêm Tài Khoản"));
  };

  return (
    <Segment className="bg-clear-p-0">
      <Table
        key="tableCar"
        title={() => (
          <div>
            <Grid >
              <GridRow>
                <GridColumn computer={4} mobile={16}>
                  <Label color="blue" basic>
                    <p style={{fontSize:"23px"}} className="text-primary">Danh Sách Tài Khoản</p>
                  </Label>
                </GridColumn>
                <GridColumn className="cmt-2" computer={11} mobile={16}>
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
                    iconPosition="left"
                    value={keyInput}
                    onChange={handleFind}
                    placeholder="Tìm Kiếm Theo..."
                  />
                </GridColumn>
              </GridRow>
            </Grid>
          </div>
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
        rowKey="maNv"
      />
    </Segment>
  );
};

export default React.memo(AccountTable);

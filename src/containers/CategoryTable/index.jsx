import React, { Fragment, useEffect, useCallback } from "react";
import { Table } from "antd";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "semantic-ui-react";
import { openDialog } from "../../redux/actions/dialog";
import {
  getAll,
  deleteCategory,
  setSelect,
} from "../../redux/actions/category";
import FormCategory from "../FormCategory";
import swal from "sweetalert";

const rowSelection = {
  getCheckboxProps: () => ({
    className: "tableSelectCheckboxOverride",
  }),
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
};

const CategoryTable = () => {
  const maCV = useSelector((s) => s.account.currentUser.maChucVu);

  const [itemSelect, setItemSelect] = useState({
    rowId: null,
  });

  const dispatch = useDispatch();

  const { categories, isSelect } = useSelector((s) => s.category);

  useEffect(() => {
    dispatch(getAll());
  }, [dispatch]);

  const handleUpdate = useCallback(
    (record) => {
      dispatch(openDialog(<FormCategory cate={record} />, "Thêm Loại Xe"));
    },
    [dispatch]
  );

  const handleDelete = (id) => {
    swal({
      title: `Bạn Muốn Xóa Loại Xe Này ?`,
      icon: "warning",
      dangerMode: true,
      buttons: ["Cancel", "Yes"],
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteCategory(id));
      }
    });
  };

  const columns = [
    {
      title: "Tên",
      key: "tenLoaiXe",
      dataIndex: "tenLoaiXe",
    },
  ];

  const columnAdmin = [
    {
      title: "Tên",
      key: "tenLoaiXe",
      dataIndex: "tenLoaiXe",
    },
    {
      title: "Sủa",
      type: "action",
      render: (text, record) => (
        <Button color="yellow" onClick={() => handleUpdate(record)}>
          Sửa
        </Button>
      ),
    },
    {
      title: "Xóa",
      render: (text, record) => (
        <Button
          color="google plus"
          onClick={() => handleDelete(record.maLoaiXe)}
        >
          Xóa
        </Button>
      ),
    },
  ];

  const setRowClassName = (record) => {
    return record.maLoaiXe === itemSelect.rowId && isSelect != null
      ? "clickRowStyl"
      : "";
  };

  const handleAdd = (e) => {
    dispatch(openDialog(<FormCategory />, "Thêm Loại Xe"));
  };

  return (
    <Fragment>
      {maCV >= 3 && (
        <div className="btn-add-cate" onClick={handleAdd}>
          Thêm Loại Xe
        </div>
      )}
      <Table
        key="tableCategory"
        title={() => <h2>Danh Sách Loại Xe</h2>}
        rowSelection={{
          ...rowSelection,
        }}
        pagination={{ pageSize: 8 }}
        columns={maCV >= 4 ? columnAdmin : columns}
        dataSource={[...categories]}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              setItemSelect({ rowId: record.maLoaiXe });
              dispatch(setSelect(record.maLoaiXe));
            },
          };
        }}
        rowClassName={setRowClassName}
        rowKey="maLoaiXe"
      />
    </Fragment>
  );
};

export default CategoryTable;

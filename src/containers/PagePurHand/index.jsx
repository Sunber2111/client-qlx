import React, { useState } from "react";
import { Paper } from "@material-ui/core";
import { Grid, GridColumn, Label, Icon, Button } from "semantic-ui-react";
import SubTable from "../SubTable";
import OrderDetailTable from "components/OrderDetailTable";
import FormOrderDetail from "components/FormOrderDetail";
import { useDispatch } from "react-redux";
import { submit } from "redux/actions/pur";
import { mappingStore } from "app/utils/tool";
import { error } from "app/notify";

const columnsNcc = [
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

const SelectSuplier = ({ sup }) => {
  if (sup == null) return <h3>Chưa Chọn Nhà Cung Cấp</h3>;

  return (
    <Paper className="px-4 py-3" elevation={3}>
      <h3>Nhà Cung Cấp Đang Chọn</h3>
      <div className="d-flex my-3">
        <div>
          <Icon name="id card" className="mr-2" size="large" color="green" />
          Mã Nhà Cung Cấp: {sup.maNcc}
        </div>
      </div>
      <div className="d-flex my-3">
        <div>
          <Icon name="user circle" className="mr-2" size="large" color="red" />
          Tên Nhà Cung Cấp: {sup.tenNcc}
        </div>
      </div>
      <div className="d-flex my-3">
        <div>
          <Icon name="phone" className="mr-2" size="large" color="blue" />
          Số Điện Thoại : <Label color="yellow"> {sup.sdt} </Label>
        </div>
      </div>
      <div className="d-flex my-3">
        <div>
          <Icon
            name="address card"
            className="mr-2"
            size="large"
            color="purple"
          />
          Địa Chỉ: {sup.diaChi}
        </div>
      </div>
    </Paper>
  );
};

const PagePurHand = () => {
  const [selectSup, setSelectSup] = useState(null);
  const [orderDetail, setOD] = useState([]);

  const dispatch = useDispatch();

  const handleAdd = (od) => {
    od.maXe = orderDetail.length + 1;
    setOD([...orderDetail, od]);
  };

  const onDeleteXe = (xe) => {
    const index = orderDetail.indexOf(xe);
    orderDetail.splice(index, 1);
    setOD([...orderDetail]);
  };

  const handleSubmit = (e) => {
    mappingStore(orderDetail)
      .then((res) => {
        dispatch(submit(res));
      })
      .catch((errors) => {
        error("Có Lỗi");
      });
  };

  return (
    <div className="mb-5">
      <Grid>
        <GridColumn computer={11} mobile={16} className="pl-2">
          <SubTable columnsCustom={columnsNcc} setDataSelect={setSelectSup} />
        </GridColumn>
        <GridColumn computer={5} mobile={16}>
          <SelectSuplier sup={selectSup} />
        </GridColumn>
      </Grid>
      <Grid className="my-0">
        <GridColumn computer={16} mobile={16}>
          <FormOrderDetail
            maNcc={selectSup && selectSup.maNcc != null ? selectSup.maNcc : 0}
            handleAdd={handleAdd}
          />
        </GridColumn>
        <GridColumn computer={16} mobile={16}>
          <OrderDetailTable orders={orderDetail} onDeleteXe={onDeleteXe} />
        </GridColumn>
      </Grid>
      {orderDetail.length > 0 && (
        <Button floated="right" color="twitter" onClick={handleSubmit}>
          Tạo Hóa Đơn
        </Button>
      )}
    </div>
  );
};

export default PagePurHand;

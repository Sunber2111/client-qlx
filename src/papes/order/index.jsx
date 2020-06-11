import React, { useEffect, useState, useCallback } from "react";
import { Grid, GridColumn, GridRow, Label, Button } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { getAll } from "redux/actions/car";
import CarTableOrders from "components/CarTableOrders";
import { Paper } from "@material-ui/core";
import SearchCus from "containers/SearchCus";
import FormCusOrders from "components/FormCusOrders";
import { getCusBy } from "redux/actions/customer";
import { warning } from "app/notify";
import OrdersDetail from "components/OrdersDetail";
import Fee from "components/Fee";
import { createOrder } from "redux/actions/order";

const OrderPage = () => {
  const dispatch = useDispatch();

  const [data, setData] = useState({
    tenKh: "",
    sdt: "",
    cmnd: "",
    maKh: 0,
    diaChi: "",
    gioiTinh: true,
    ngaySinh: Date.now(),
    lienHe: true,
  });

  const [dsXe, setDsXe] = useState([]);

  const [ctHdx, setCtHdx] = useState([]);

  const [load, setLoad] = useState(false);

  useEffect(() => {
    dispatch(getAll()).then((res) => {
      setDsXe(res);
    });
  }, [dispatch]);

  const submitFindCus = useCallback((res) => {
    setLoad(true);
    getCusBy(res.input, res.type)
      .then((cus) => {
        if (cus) {
          setData({ ...cus });
        } else {
          warning("Khách Hàng Không Tồn Tại Trong Hệ Thống");
        }
      })
      .finally(() => {
        setLoad(false);
      });
  }, []);

  const handleAddCar = (car) => {
    try {
      let newDsCthdx = [...ctHdx];

      newDsCthdx.push(car);

      const index = dsXe.findIndex((x) => x.maXe === car.maXe);

      let newDsXe = [...dsXe];

      newDsXe.splice(index, 1);

      setDsXe(newDsXe);
      setCtHdx(newDsCthdx);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (car) => {
    try {
      const index = ctHdx.findIndex((x) => x.maXe === car.maXe);

      let newDsXe = [...dsXe];

      newDsXe.push(car);

      let newDsCthdx = [...ctHdx];

      newDsCthdx.splice(index, 1);

      setDsXe(newDsXe);
      setCtHdx(newDsCthdx);
    } catch (error) {
      console.log(error);
    }
  };

  const isCreate = () => {
    if (ctHdx.length <= 0) return false;
    if (
      data.tenKh.length <= 0 ||
      data.diaChi.length <= 0 ||
      data.sdt.length <= 0 ||
      data.cmnd.length <= 0
    )
      return false;
    return true;
  };

  const handleCreateOrder = () => {
    const khachHang = { ...data };
    const ct = ctHdx.map((val) => {
      return {
        maCtKho: val.maCtKho,
        giaXuat: val.giaXuat,
      };
    });
    dispatch(
      createOrder({
        khachHang,
        ctHdx: ct,
      })
    );
  };

  return (
    <Grid className='mx-auto'>
      <GridRow className='mx-auto'>
        <GridColumn computer={11} mobile={16}>
          <CarTableOrders cars={[...dsXe]} onAddCar={handleAddCar} />
        </GridColumn>
        <GridColumn computer={5} mobile={16}>
          <div className="text-center mb-2">
            <Label color="purple">
              <h4 className="text-white">Form Điền Thông Tin Khách Hàng</h4>
            </Label>
          </div>
          <div className="text-center">
            <SearchCus find={submitFindCus} />
          </div>
          <Paper elevation={3} className="p-0">
            <FormCusOrders load={load} dataCus={data} setCus={setData} />
          </Paper>
        </GridColumn>
      </GridRow>
      <GridRow className='mx-auto'>
        <GridColumn computer={11} mobile={16}>
          <OrdersDetail cars={[...ctHdx]} handleDelete={handleDelete} />
        </GridColumn>
        <GridColumn computer={5} mobile={16}>
          <div className="text-center mb-2 mt-3">
            <Label color="blue" basic>
              <p style={{ fontSize: "20px" }}>Hóa Đơn Xuất</p>
            </Label>
          </div>
          <Fee
            fee={ctHdx.reduce((init, next) => {
              return init + next.giaXuat;
            }, 0)}
          />
          {isCreate() && (
            <Button
              color="twitter"
              className="mt-3"
              floated="right"
              onClick={handleCreateOrder}
            >
              Xuất Hóa Đơn
            </Button>
          )}
        </GridColumn>
      </GridRow>
    </Grid>
  );
};

export default OrderPage;

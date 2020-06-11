import React, { useEffect } from "react";
import ChartDonut from "../../components/ChartDonut";
import { GridRow, GridColumn, Grid, Label } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { getTop5, get12Month, getFN } from "redux/actions/doanhthu";
import { Paper } from "@material-ui/core";
import LineCharts from "components/LineChart";
import FastNews from "containers/FastNews";
import Top3Xe from "containers/Top3Xe";

const ChartPage = () => {
  const { dataDonus, data12M, fn } = useSelector((s) => s.doanhthu);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTop5());
    dispatch(get12Month());
    dispatch(getFN());
  }, [dispatch]);

  return (
    <Grid className="mx-auto mt-2">
      <FastNews data={fn} />
      <GridRow className="mx-auto">
        <GridColumn computer={5} mobile={16} className="mb-4">
          <Paper>
            <div className="mx-auto pt-3 text-center ">
              <h4>Biểu Đồ Top 5 Loại Xe Bán Chạy Nhất</h4>
            </div>
            <ChartDonut data={dataDonus} />
          </Paper>
          <div className="mt-2" elevation={3}>
            <div className="mx-auto pt-3 text-center ">
              <Label color="blue" basic>
                <p style={{fontSize:"18px"}}>Top 3 Bán Chạy Nhất Mọi Thời Đại</p>
              </Label>
            </div>
            <Top3Xe />
          </div>
        </GridColumn>
        <GridColumn computer={11} mobile={16} className="pl-2">
          <Paper>
            <div className="mx-auto pt-3 text-center ">
              <h4>Doanh Thu 12 Tháng Vừa Qua ( số lượng hóa đơn xuất )</h4>
            </div>
            <LineCharts data={data12M} />
          </Paper>
        </GridColumn>
      </GridRow>
    </Grid>
  );
};

export default ChartPage;

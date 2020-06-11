import React, { useEffect } from "react";
import { Grid, GridRow, GridColumn } from "semantic-ui-react";
import CarTop from "components/CarTop";
import { useSelector, useDispatch } from "react-redux";
import { getTop3Car } from "redux/actions/doanhthu";
import p1 from "app/images/number1.png";
import p2 from "app/images/number2.png";
import p3 from "app/images/number3.png";
const image = [p1, p2, p3];
const Top3Xe = () => {
  const dispatch = useDispatch();

  const { dataTop3 } = useSelector((s) => s.doanhthu);

  useEffect(() => {
    dispatch(getTop3Car());
  }, [dispatch]);

  const createData = dataTop3.reverse().map((val, index) => (
    <GridColumn computer={16} className="mb-2" key={index} >
      <CarTop image={image[index]} name={val.name} value={val.value} />
    </GridColumn>
  ));

  return (
    <Grid className="ml-4 mt-1">
      <GridRow>{createData}</GridRow>
    </Grid>
  );
};

export default Top3Xe;

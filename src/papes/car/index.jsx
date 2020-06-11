import React from "react";
import "./style.scss";
import { Grid, Segment } from "semantic-ui-react";
import CategoryTable from "../../containers/CategoryTable";
import CarTable from "../../containers/CarTable";

const CarPage = () => {


  return (
    <Grid className='mx-auto'>
      <Grid.Column computer={5} mobile={16} className="bg-clear-1">
        <Segment className="bg-clear">
          <CategoryTable />
        </Segment>
      </Grid.Column>
      <Grid.Column computer={11} mobile={16}>
        <CarTable />
      </Grid.Column>
    </Grid>
  );
};

export default CarPage;

import React from "react";
import { Segment, Button, Header, Icon } from "semantic-ui-react";

const NotFound = () => {
  return (
    <Segment placeholder className="bg-white mx-auto">
      <Header icon>
        <div className="d-flex flex-row justify-content-center">
          <div>
            <p style={{fontSize:"60px"}} className="text-primary mr-3">404</p>
          </div>
          <div>
            {" "}
            <Icon name="search" size="large" color="blue" className="p-0 m-0" />
          </div>
        </div>
        <h2>Không Có Trang Cần Tìm...</h2>
      </Header>
    </Segment>
  );
};

export default NotFound;

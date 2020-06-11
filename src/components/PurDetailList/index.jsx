import React from "react";
import { Table } from "semantic-ui-react";
import { convertToPrice } from "app/utils/tool";

const PurDetailList = ({ list }) => {
  return (
    <div className="p-0 m-0">
      <Table inverted>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Tên Xe</Table.HeaderCell>
            <Table.HeaderCell>Tên Kho</Table.HeaderCell>
            <Table.HeaderCell>Giá Nhập</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {list.map((val) => (
            <Table.Row>
              <Table.Cell>{val.tenXe}</Table.Cell>
              <Table.Cell>{val.tenKho}</Table.Cell>
              <Table.Cell>{convertToPrice(val.giaNhap)}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default PurDetailList;

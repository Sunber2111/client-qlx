import React, { useState } from "react";
import readXlsxFile from "read-excel-file";
import { XeSchema } from "app/models/xe";
import { Table, Segment, Label } from "semantic-ui-react";
import Button from "@material-ui/core/Button";
import "./styles.scss";
import Paper from "@material-ui/core/Paper";
import { mappingStore, convertToPrice } from "app/utils/tool";
import { useDispatch } from "react-redux";
import { submit } from "redux/actions/pur";

const PagePurExcel = () => {
  const dispatch = useDispatch();

  const [data, setData] = useState({
    Errors: [],
    table: [],
  });

  const [select, setSelect] = useState(-1);

  const fileSelectedhandler = (e) => {
    const schema = { ...XeSchema };

    readXlsxFile(e.target.files[0], { schema }).then(({ rows, errors }) => {
      let arrErrors = [];
      let dataRows = [];
      if (errors.length > 0) {
        errors.forEach((err) => {
          if (err.error === "invalid")
            arrErrors.push(
              `Sai kiểu dữ liệu tại: Dòng ${err.row}, Cột ${err.column}`
            );
          else if (err.error === "required")
            arrErrors.push(
              `Dữ liệu bắt buộc phải có tại: Dòng ${err.row}, Cột ${err.column}`
            );
          else
            arrErrors.push(
              `Dữ liệu sai tại: Dòng ${err.row}, Cột ${err.column}`
            );
        });
      } else {
        dataRows = rows;
      }

      setData({
        ...data,
        Errors: arrErrors,
        table: dataRows,
      });
    });
  };

  const createError = data.Errors.map((err) => (
    <Label basic content={err} color="red" className="mb-2" />
  ));

  const handleSubmit = (e) => {
    try {
      console.log(data.table);
      
      mappingStore(data.table)
        .then((data) => {
          console.log(data);
          
          dispatch(submit(data));
        })
        .catch((err) => {});
    } catch (error) {}
  };

  return (
    <div>
      <div>
        <label
          className="custom-file-upload-car mt-2"
          style={{ background: "white" }}
        >
          <input type="file" onChange={fileSelectedhandler} />
          Chọn File Excel Thêm Hóa Đơn Nhập
        </label>
        {data.table.length > 0 && (
          <div className="bg-white">
            <Table celled>
              <Table.Header>
                <Table.Row className="header-pur" textAlign="center">
                  <Table.HeaderCell>Mã Xe ( Tạm Thời )</Table.HeaderCell>
                  <Table.HeaderCell>Tên Xe</Table.HeaderCell>
                  <Table.HeaderCell>Số Khung</Table.HeaderCell>
                  <Table.HeaderCell>Số Máy</Table.HeaderCell>
                  <Table.HeaderCell>Mã Nhà Cung Cấp</Table.HeaderCell>
                  <Table.HeaderCell>Mã Loại Xe</Table.HeaderCell>
                  <Table.HeaderCell>Mã Kho</Table.HeaderCell>
                  <Table.HeaderCell>Giá Nhập</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {data.table.map((xe, index) => (
                  <Table.Row
                    key={index}
                    textAlign="center"
                    active={select === index}
                    onClick={(e) => setSelect(index)}
                  >
                    <Table.Cell className="mx-2">{xe.maXe}</Table.Cell>
                    <Table.Cell className="mx-2">{xe.tenXe}</Table.Cell>
                    <Table.Cell className="mx-2">{xe.soKhung}</Table.Cell>
                    <Table.Cell className="mx-2">{xe.soMay}</Table.Cell>
                    <Table.Cell className="mx-2">{xe.maNcc}</Table.Cell>
                    <Table.Cell className="mx-2">{xe.maLoaiXe}</Table.Cell>
                    <Table.Cell className="mx-2">{xe.maKho}</Table.Cell>
                    <Table.Cell className="mx-2">
                      {convertToPrice(xe.giaNhap)}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
            <Button
              variant="contained"
              className="btn-pur-submit"
              onClick={handleSubmit}
            >
              Tạo Hóa Đơn
            </Button>
          </div>
        )}
      </div>

      <div>
        {data.Errors.length > 0 && (
          <div className="d-flex">
            <Segment className="d-inline-flex mx-auto">
              <div className="mx-auto d-inline-flex flex-column">
                {createError}
              </div>
            </Segment>
          </div>
        )}
      </div>
    </div>
  );
};

export default PagePurExcel;

import React, { useState } from "react";
import { Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { Button } from "semantic-ui-react";
import { submit } from "../../redux/actions/category";
const FormCategory = ({ cate }) => {
  const [data, setData] = useState(
    cate
      ? cate
      : {
          tenLoaiXe: "",
        }
  );

  const dispatch = useDispatch();

  const handleUpdate = (e) => {
    dispatch(submit(data));
  };

  return (
    <div>
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: "middle",
        }}
        size={"middle"}
        
      >
        <Form.Item label="Tên Loại Xe">
          <Input
            style={{ marginLeft: "20px" }}
            value={data.tenLoaiXe}
            name="tenLoaiXe"
            onChange={(e) =>
              setData({ ...data, [e.target.name]: e.target.value })
            }
          />
        </Form.Item>
      </Form>
      <Button
        content="Sửa"
        floated="right"
        color="green"
        onClick={handleUpdate}
      />
    </div>
  );
};

export default FormCategory;

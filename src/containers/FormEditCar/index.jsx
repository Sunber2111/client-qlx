import React, { useState } from "react";
import { Form, Input, Select } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "semantic-ui-react";
import { submit } from "../../redux/actions/car";

const FormEditCar = ({ car }) => {
  const { categories } = useSelector((s) => s.category);

  const [data, setData] = useState(car);

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
        <Form.Item label="Tên Xe">
          <Input
            value={data.tenXe}
            name="tenXe"
            onChange={(e) =>
              setData({ ...data, [e.target.name]: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item label="Tên Loại Xe">
          <Select
            name="maLoaiXe"
            value={data.maLoaiXe}
            onChange={(e) => setData({ ...data, maLoaiXe: e })}
          >
            {categories.map((category) => (
              <Select.Option value={category.maLoaiXe}>
                {category.tenLoaiXe}
              </Select.Option>
            ))}
          </Select>
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

export default FormEditCar;

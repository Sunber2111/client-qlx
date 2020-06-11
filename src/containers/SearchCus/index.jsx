import React, { useState } from "react";
import { Button, Select, Input } from "semantic-ui-react";

const options = [
  { key: "all", text: "Số Điện Thoại", value: 1 },
  { key: "articles", text: "CMND", value: 2 },
];

const SearchCus = ({ find }) => {
  const [data, setData] = useState({
    input: null,
    type: 1,
  });

  const handleClick = (e) => {
    find(data);
  };

  const canSubmit = () => {
    if (data.input === null || data.input === "") return true;
    return false;
  };

  return (
    <div className="mb-3 px-2" style={{ zIndex: "200 !important" }}>
      <Input type="text" placeholder="Từ Khóa..." action fluid >
        <input
          value={data.input || ""}
          name="input"
          onChange={(e) =>
            setData({ ...data, [e.target.name]: e.target.value })
          }
        />
        <Select
          compact
          name="type"
          options={options}
          value={data.type}
          onChange={(e, { name, value }) => {
            setData({
              ...data,
              [name]: value,
            });
          }}
        />
        <Button disabled={canSubmit()} onClick={handleClick}>
          Tìm
        </Button>
      </Input>
    </div>
  );
};

export default SearchCus;

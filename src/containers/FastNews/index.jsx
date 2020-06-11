import React from "react";
import { GridRow } from "semantic-ui-react";
import News from "components/News";
import meet from "app/images/meeting.png";
import emp from "app/images/empf.png";
import money from "app/images/money.png";
import chart from "app/images/chart.png";

const titles = [
  "Tổng Khách Hàng",
  "Tổng Hóa Đơn Xuất Trong Tháng",
  "Tổng Nhân Viên",
  "Tổng Hóa Đơn Xuất Trong Hôm Nay",
];

const image = [meet, emp, money, chart];

const colors = ["warning", "primary", "success", "muted"];

const FastNews = ({ data }) => {
  const createData = () => {
    let arr = [],
      i = 0;
    for (let x in data) {
      arr.push(
        <News
          key={x}
          data={data[x]}
          title={titles[i]}
          image={image[i]}
          color={colors[i]}
        />
      );
      i++;
    }
    return arr;
  };

  return <GridRow className="pt-0 mx-auto">{createData()}</GridRow>;
};

export default React.memo(FastNews);

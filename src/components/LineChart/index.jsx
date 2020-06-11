import React from "react";
import Chart from "react-apexcharts";

const LineCharts = ({ data }) => {
  return (
    <Chart
      options={{
        chart: {
          type: "area",
          height: 350,
          zoom: {
            enabled: false,
          },
        },
        labels: data.map((val)=>val.name),
        legend: {
          horizontalAlign: "left",
        },
      }}
      series={[
        {
          name: "Doanh Thu ( Phiếu Xuất )",
          data: data.map((val)=>val.value),
        },
      ]}
      type="area"
      height={470}
    ></Chart>
  );
};

export default React.memo(LineCharts);

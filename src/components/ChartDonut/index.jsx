import React from "react";
import Chart from "react-apexcharts";

const ChartDonut = ({ data }) => {
  return (
    <Chart
      options={ {
        chart: {
          width: 380,
        },
        labels: data.map((val)=>val.name),
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      }}
      series={data.map((val)=>val.value)}
      type="donut"
      width="380"
    />
  );
};

export default React.memo(ChartDonut);

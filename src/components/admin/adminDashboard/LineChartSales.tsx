import React, { useEffect, useState } from "react";
import { ResponsiveLine } from "@nivo/line";

const LineChartSales = ({ data, alignment }) => {
  const chartData = data[0].data.length === 0 ? [{ id: 'No Data', data: [{ x: 0, y: 0 }] }] : data;
  const [margin, setMargin] = useState({ top: 50, right: 110, bottom: 50, left: 60 });
 
  useEffect(() => {
      const updateMargins = () => {
          if (window.innerWidth < 600) {
              setMargin({ top: 60, right: 20, bottom: 50, left: 40 });
          } else if (window.innerWidth < 1024) {
              setMargin({ top: 40, right: 80, bottom: 40, left: 50 });
          } else {
              setMargin({ top: 50, right: 110, bottom: 50, left: 60 });
          }
      };

      window.addEventListener('resize', updateMargins);
      updateMargins(); 

      return () => window.removeEventListener('resize', updateMargins);
  }, []);
  return (
    <ResponsiveLine
      data={chartData}
      theme={{
        text: {
          fontSize: 11,
          fill: "#f5f5f5",
          outlineWidth: 0,
          outlineColor: "transparent",
        },
        axis: {
          domain: {
            line: {
              stroke: "#777777",
              strokeWidth: 1,
            },
          },
          legend: {
            text: {
              fontSize: 12,
              fill: "#f5f5f5",
              translate: -10,
              outlineWidth: 0,
              outlineColor: "transparent",
            },
          },
          ticks: {
            line: {
              stroke: "#f5f5f5",
              strokeWidth: 1,
            },
            text: {
              fontSize: 11,
              fill: "#f5f5f5",
              outlineWidth: 0,
              outlineColor: "transparent",
            },
          },
        },
        grid: {
          line: {
            stroke: "#dddddd",
            strokeWidth: 1,
          },
        },
        legends: {
          title: {
            text: {
              fontSize: 11,
              fill: "#f5f5f5",
              outlineWidth: 0,
              outlineColor: "transparent",
            },
          },
          text: {
            fontSize: 11,
            fill: "#f5f5f5",
            outlineWidth: 0,
            outlineColor: "transparent",
          },
          ticks: {
            line: {},
            text: {
              fontSize: 10,
              fill: "#333333",
              outlineWidth: 0,
              outlineColor: "transparent",
            },
          },
        },
        annotations: {
          text: {
            fontSize: 13,
            fill: "#333333",
            outlineWidth: 2,
            outlineColor: "#ffffff",
            outlineOpacity: 1,
          },
          link: {
            stroke: "#000000",
            strokeWidth: 1,
            outlineWidth: 2,
            outlineColor: "#ffffff",
            outlineOpacity: 1,
          },
          outline: {
            stroke: "#000000",
            strokeWidth: 2,
            outlineWidth: 2,
            outlineColor: "#ffffff",
            outlineOpacity: 1,
          },
          symbol: {
            fill: "#000000",
            outlineWidth: 2,
            outlineColor: "#ffffff",
            outlineOpacity: 1,
          },
        },
        tooltip: {
          container: {
            background: "#ffffff",
            fontSize: 12,
            color: "#000000",
          },
          basic: {},
          chip: {},
          table: {},
          tableCell: {},
          tableCellValue: {},
        },
      }}
      margin={margin}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: 0,
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: `${
          alignment === "monthly" ? "Monthly Income" : "Yearly Income"
        }`,
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        tickSize: 4,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Total Income",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      enableGridX={true}
      enableGridY={false}
      colors={{ scheme: "paired" }}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      enableArea={true}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-left",
          direction: "column",
          justify: false,
          translateX: 20,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default LineChartSales;

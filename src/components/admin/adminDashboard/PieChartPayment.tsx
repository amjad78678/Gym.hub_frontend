import React from "react";
import { ResponsivePie } from "@nivo/pie";

const PieChartPayment = ({ payments }) => {
  console.log("dashboard", payments);
  console.log("dashboardinPie", payments);
  const data = [
    {
      id: "Online Payment",
      label: "Online Payment",
      value: payments?.onlinePaymentCount[0]?.count,
      color: "hsl(45, 70%, 50%)",
    },
    {
      id: "Wallet Payment",
      label: "Wallet Payment",
      value: payments?.walletPaymentCount[0]?.count,
      color: "hsl(125, 70%, 50%)",
    },
    {
      id: "Pending Payment",
      label: "Pending Payment",
      value: payments?.pendingPaymentCount,
      color: "hsl(192, 70%, 50%)",
    },
  ];
  console.log("piedata", data);
  return (
    <ResponsivePie
      data={data}
      theme={{
        text: {
          fontSize: 11,
          fill: "#333333",
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
              fill: "#333333",
              outlineWidth: 0,
              outlineColor: "transparent",
            },
          },
          ticks: {
            line: {
              stroke: "#777777",
              strokeWidth: 1,
            },
            text: {
              fontSize: 11,
              fill: "#333333",
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
              fill: "#333333",
              outlineWidth: 0,
              outlineColor: "transparent",
            },
          },
          text: {
            fontSize: 11,
            fill: "#333333",
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
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      sortByValue={true}
      innerRadius={0.5}
      padAngle={1}
      activeOuterRadiusOffset={4}
      colors={{ scheme: "nivo" }}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#f5f5f5"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color", modifiers: [] }}
      enableArcLabels={false}
      arcLabelsRadiusOffset={0.4}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      defs={[
        {
          id: "dots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 30,
          itemWidth: 100,
          itemHeight: 14,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#f5f5f5",
              },
            },
          ],
        },
      ]}
    />
  );
};

export default PieChartPayment;

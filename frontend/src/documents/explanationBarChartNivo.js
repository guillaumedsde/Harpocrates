import React from "react";
import { generateCountriesData, sets } from "@nivo/generators";
import { Bar } from "@nivo/bar";
import { CircularProgress } from "@material-ui/core";
import range from "lodash/range";
import random from "lodash/random";

const keys = ["hot dogs", "burgers", "sandwich", "kebab", "fries", "donut"];
const commonProps = {
  width: 900,
  height: 500,
  margin: { top: 60, right: 80, bottom: 60, left: 80 },
  data: generateCountriesData(keys, { size: 7 }),
  indexBy: "country",
  keys,
  padding: 0.2,
  labelTextColor: "inherit:darker(1.4)",
  labelSkipWidth: 16,
  labelSkipHeight: 16
};

const divergingData = range(9).map(i => {
  let gain = random(0, 100);
  let loss = 100 - gain;
  const highGain = random(Math.round(gain * 0.4));
  const highLoss = random(Math.round(loss * 0.4));
  gain = gain - highGain;
  loss = loss - highLoss;

  return {
    "gained > 100$": highGain,
    "gained <= 100$": gain,
    "lost <= 100$": -loss,
    "lost > 100$": -highLoss,
    user: sets.names[i]
  };
});

const divergingCommonProps = {};

export default function ExplanationChart(props) {
  if (props.explanationFeatures) {
    return (
      <Bar
        {...commonProps}
        data={props.explanationFeatures}
        indexBy="text"
        keys={["weight"]}
        markers={[
          {
            axis: "y",
            value: 0,
            lineStyle: { strokeOpacity: 0 },
            textStyle: { fill: "#2ebca6" },
            legend: "Sensitive",
            legendPosition: "top-left",
            legendOrientation: "vertical",
            legendOffsetY: 120
          },
          {
            axis: "y",
            value: 0,
            lineStyle: { stroke: "#f47560", strokeWidth: 1 },
            textStyle: { fill: "#e25c3b" },
            legend: "Not Sensitive",
            legendPosition: "bottom-left",
            legendOrientation: "vertical",
            legendOffsetY: 120
          }
        ]}
        padding={0.1}
        colors={["#61cdbb", "#97e3d5", "#f47560", "#e25c3b"]}
        innerPadding={1}
      />
    );
  } else {
    return <CircularProgress />;
  }
}

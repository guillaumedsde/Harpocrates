import React from "react";

import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine
} from "recharts";
import { CircularProgress } from "@material-ui/core";

export default function ExplanationChart(props) {
  if (props.explanationFeatures) {
    return (
      <BarChart
        width={500}
        height={300}
        data={props.explanationFeatures}
        layout="vertical"
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <YAxis dataKey="text" type="category" />
        <XAxis type="number" />
        <Tooltip />
        <ReferenceLine x={0} stroke="#000" />
        {/* Color depending on positivity of value */}
        <Bar dataKey="weight">
          {props.explanationFeatures.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.weight > 0 ? "#2ca02c" : "#d62728"}
            />
          ))}
        </Bar>
      </BarChart>
    );
  } else {
    return <CircularProgress />;
  }
}

import React from "react";

import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer
} from "recharts";
import { CircularProgress } from "@material-ui/core";

export default function ExplanationChart(props) {
  if (props.explanationFeatures) {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={0}
          height={0}
          data={props.explanationFeatures}
          layout="vertical"
          margin={{
            top: 5,
            right: 30,
            left: 30,
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
      </ResponsiveContainer>
    );
  } else {
    return <CircularProgress />;
  }
}

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
  ResponsiveContainer,
  Label
} from "recharts";
import { CircularProgress } from "@material-ui/core";

export default function ExplanationChart(props) {
  if (props.explanationFeatures) {
    return (
      <div style={{ height: "80vh", width: "90%" }}>
        <ResponsiveContainer height="100%" width="100%">
          <BarChart
            width={0}
            height={0}
            data={props.explanationFeatures}
            layout="vertical"
            margin={{ top: 30, right: 30, bottom: 30, left: 30 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <YAxis dataKey="text" type="category">
              <Label
                value="Not Sensitive"
                offset={-50}
                position="insideBottom"
              />
            </YAxis>
            <XAxis type="number">
              <Label
                value="Sensitive"
                offset={-20}
                position="insideBottomRight"
              />
            </XAxis>
            <Tooltip />
            <ReferenceLine x={0} stroke="#000" />
            {/* Color depending on positivity of value */}
            <Bar dataKey="weight">
              {props.explanationFeatures.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.weight > 0 ? "red" : "blue"}
                  opacity={0.25}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  } else {
    return <CircularProgress />;
  }
}

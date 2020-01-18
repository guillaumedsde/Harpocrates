import React from "react";
import { useTheme } from "@material-ui/styles";

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

import uniqBy from "lodash/uniqBy";

import { CircularProgress } from "@material-ui/core";

function sortExplanations(arr) {
  //build comparison function
  function absoluteValueComparison(a, b) {
    return Math.abs(a.weight) - Math.abs(b.weight);
  }
  //call comparison function as callback in array sort
  return arr.sort(absoluteValueComparison).reverse();
}

export function uniqueFeatures(classification) {
  var allUniqueFeatures = [];

  if (classification != null) {
    // remove duplicate features and sort by absolute value
    allUniqueFeatures = uniqBy(classification.features, "text");
  } else {
    return null;
  }
  return allUniqueFeatures;
}

export default function ExplanationChart(props) {
  const theme = useTheme();

  var uniqueExplanations = null;

  if (props.explanations) {
    // build list of sorted unique explanations
    uniqueExplanations = uniqueFeatures(props.explanations).slice(
      0,
      props.nbrExplanations
    );
  }

  // handle clicks on chart bars
  const handleClick = params => {
    if (!params || props.activeFeature !== params.activeLabel) {
      props.setActiveFeature(params.activeLabel);
    } else {
      props.setActiveFeature(null);
    }
  };

  if (uniqueExplanations) {
    return (
      <div style={{ height: "100%", width: "90%", display: "block" }}>
        <ResponsiveContainer height="100%" width="100%">
          <BarChart
            width={0}
            height={0}
            data={uniqueExplanations}
            layout="vertical"
            margin={{ top: 10, right: 20, bottom: 20, left: 40 }}
            onClick={handleClick}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <YAxis dataKey="text" type="category">
              <Label offset={-50} position="insideBottom">
                Not Sensitive
              </Label>
            </YAxis>
            <XAxis type="number">
              <Label offset={-20} position="insideBottomRight">
                Sensitive
              </Label>
            </XAxis>
            <Tooltip formatter={value => value.toFixed(6)} />
            <ReferenceLine x={0} stroke="#000" />
            {/* Color depending on positivity of value */}
            <Bar dataKey="weight">
              {uniqueExplanations.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    entry.weight > 0
                      ? entry.text === props.activeFeature
                        ? theme.palette.secondary.main
                        : theme.palette.secondary.light
                      : entry.text === props.activeFeature
                      ? theme.palette.primary.main
                      : theme.palette.primary.light
                  }
                  // opacity={entry.text === props.activeFeature ? 1 : 0.75}
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

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

export function concatenateExplanations(classification) {
  var allUniqueFeatures = [];

  if (classification != null) {
    var allFeatures = [...classification.sensitiveFeatures];

    classification.nonSensitiveFeatures.forEach(feature => {
      var newFeature = { ...feature };
      newFeature["weight"] = -feature.weight;
      allFeatures.push(newFeature);
    });
    // remove duplicate features and sort by absolute value
    allUniqueFeatures = sortExplanations(uniqBy(allFeatures, "text"));
  }
  return allUniqueFeatures;
}

export default function ExplanationChart(props) {
  // build list of sorted unique explanations
  const uniqueExplanations = concatenateExplanations(
    props.classification
  ).slice(0, props.nbrExplanations);

  // handle clicks on chart bars
  const handleClick = params => {
    if (props.activeFeature === params.activeLabel) {
      props.setActiveFeature(null);
    } else {
      props.setActiveFeature(params.activeLabel);
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
            margin={{ top: 30, right: 30, bottom: 30, left: 30 }}
            onClick={handleClick}
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
              {uniqueExplanations.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.weight > 0 ? "red" : "blue"}
                  opacity={entry.text === props.activeFeature ? 1 : 0.5}
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

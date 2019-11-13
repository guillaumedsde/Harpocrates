import React from "react";
import Paper from "@material-ui/core/Paper";

import { makeStyles } from "@material-ui/core/styles";

import Popover from 'react-text-selection-popover';
import createMarker from "react-content-marker";

import PopoverMenu from "./textPopoverMenu"

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(5, 5),
    lineHeight: 1.5,
    maxWidth: "210mm",
    margin: "auto",

    // preserve text whitespaces
    whiteSpace: "pre-wrap"
  }
}));

export default function DocumentBody(props) {
  const classes = useStyles();
  var rules = [];


  var refBody = React.createRef()


    

  if (props.showSensitive & (props.classification !== null)) {
    props.classification.sensitiveFeatures.forEach(feature => {
      // TODO varied opacity depending on the weight with a minimum and maximum opacity
      var opacity = feature.weight / 2 + 0.25;
      //var opacity = 1;
      rules.push({
        rule: feature.feature,
        tag: x => (
          <mark
            style={{
              backgroundColor: `rgba(255, 0, 0, ${opacity})`
            }}
          >
            {x}
          </mark>
        )
      });
    });
  }

  if (props.showNonSensitive & (props.classification !== null)) {
    props.classification.nonSensitiveFeatures.forEach(feature => {
      // TODO varied opacity depending on the weight with a minimum and maximum opacity
      //var opacity = Math.abs(feature.weight);
      var opacity = feature.weight / 2 + 0.25;
      rules.push({
        rule: feature.feature,
        tag: x => (
          <mark style={{ backgroundColor: `rgba(0, 0, 255, ${opacity})` }}>
            {x}
          </mark>
        )
      });
    });
  }

  const MyMarker = createMarker(rules);
  return (
    
    <Paper className={classes.root}>
            
                <div>
            <div
              ref={refBody}
              contentEditable="false"
              suppressContentEditableWarning
              
            >
              <MyMarker>{props.documentContent}</MyMarker>
              
            </div>
            <Popover selectionRef={refBody}>
              <PopoverMenu/>
            </Popover>
          </div>
          </Paper>
          
      
  );
}

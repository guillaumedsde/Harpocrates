import React, { useEffect, useState } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";

import { makeStyles } from "@material-ui/core/styles";

import { DocumentApi } from "@harpocrates/api-client";

import createMarker from "react-content-marker";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(5, 5)
  }
}));

export default function DocumentBody(props) {
  const [rules, setRules] = useState(null);
  const classes = useStyles();

  var api = new DocumentApi();

  // effect for getting document
  useEffect(
    () => {
      api
        .getPredictedClassificationExplanation(
          props.documentSetName,
          props.documentId
        )
        .then(explanation => {
          //sort negative and positive features
          const rules = [];
          explanation.features.forEach(feature => {
            // TODO varied opacity depending on the weight with a minimum and maximum opacity
            //var opacity = Math.abs(feature.weight);
            var opacity = 1;
            if (feature.weight > 0) {
              rules.push({
                rule: feature.feature,
                tag: x => (
                  <mark
                    style={{ backgroundColor: `rgba(255, 0, 0, ${opacity})` }}
                  >
                    {x}
                  </mark>
                )
              });
            } else {
              rules.push({
                rule: feature.feature,
                tag: x => (
                  <mark
                    style={{ backgroundColor: `rgba(0, 255, 0, ${opacity})` }}
                  >
                    {x}
                  </mark>
                )
              });
            }
          });
          // set state
          setRules(rules);
        });
    },
    [] //dependencies
  );
  if (rules) {
    const MyMarker = createMarker(rules);
    return (
      <Paper className={classes.root}>
        <MyMarker>{props.documentContent}</MyMarker>
      </Paper>
    );
  }

  return (
    <div>
      <Box my={2}>
        Calculating explanation for sensitivity prediction...
        <br />
        <LinearProgress />
      </Box>

      <Paper className={classes.root}>{props.documentContent}</Paper>
    </div>
  );
}

// export default class DocumentBody extends React.Component {
//   constructor(props) {
//     super(props);
//     this.api = new DocumentApi();
//     this.state = {
//       loading: true
//     };
//   }

//   componentDidMount() {
//     // query API for explanation
//     this.api
//       .getPredictedClassificationExplanation(
//         this.props.documentSetName,
//         this.props.documentId
//       )
//       .then(explanation => {
//         //sort negative and positive features
//         const rules = [];
//         explanation.features.forEach(feature => {
//           // TODO varied opacity depending on the weight with a minimum and maximum opacity
//           //var opacity = Math.abs(feature.weight);
//           var opacity = 1;
//           if (feature.weight > 0) {
//             rules.push({
//               rule: feature.feature,
//               tag: x => (
//                 <mark
//                   style={{ backgroundColor: `rgba(255, 0, 0, ${opacity})` }}
//                 >
//                   {x}
//                 </mark>
//               )
//             });
//           } else {
//             rules.push({
//               rule: feature.feature,
//               tag: x => (
//                 <mark
//                   style={{ backgroundColor: `rgba(0, 255, 0, ${opacity})` }}
//                 >
//                   {x}
//                 </mark>
//               )
//             });
//           }
//         });
//         // set state
//         this.setState({
//           rules: rules,
//           loading: false
//         });
//       });
//   }

//   render() {
//     if (this.state.loading) {
//       return (
//         <div>
//           <h4>
//             Calculating explanation for sensitivity prediction
//             <br />
//             <LinearProgress />
//           </h4>

//           <Paper>{this.props.documentContent}</Paper>
//         </div>
//       );
//     }

//     const { rules } = this.state;
//     const MyMarker = createMarker(rules);
//     return (
//       <Paper>
//         <MyMarker>{this.props.documentContent}</MyMarker>
//       </Paper>
//     );
//   }
// }

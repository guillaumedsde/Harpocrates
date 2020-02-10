import React from "react";

import BorderColor from "@material-ui/icons/BorderColor";
import FormatColorResetIcon from "@material-ui/icons/FormatColorReset";
// import InsertCommentIcon from "@material-ui/icons/InsertComment";
import { Button, ButtonGroup } from "@material-ui/core";

import { DocumentApi } from "@harpocrates/api-client";

import { SensitiveSection } from "@harpocrates/api-client";

const getTextSelection = function(editor) {
  const selection = window.getSelection();

  if (selection != null && selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);

    return {
      start: getTextLength(editor, range.startContainer, range.startOffset),
      end: getTextLength(editor, range.endContainer, range.endOffset)
    };
  } else return null;
};

const getTextLength = function(parent, node, offset) {
  var textLength = 0;

  if (node.nodeName == "#text") textLength += offset;
  else
    for (var i = 0; i < offset; i++)
      textLength += getNodeTextLength(node.childNodes[i]);

  if (node != parent)
    textLength += getTextLength(parent, node.parentNode, getNodeOffset(node));

  return textLength;
};

const getNodeTextLength = function(node) {
  var textLength = 0;

  if (node.nodeName == "BR") textLength = 1;
  else if (node.nodeName == "#text") textLength = node.nodeValue.length;
  else if (node.childNodes != null)
    for (var i = 0; i < node.childNodes.length; i++)
      textLength += getNodeTextLength(node.childNodes[i]);

  return textLength;
};

const getNodeOffset = function(node) {
  return node == null ? -1 : 1 + getNodeOffset(node.previousSibling);
};

export default function PopoverMenu(props) {
  var api = new DocumentApi();

  const selectedNodeParent = window.getSelection().anchorNode.parentNode;

  const handleRedact = (event, setId, documentId, setSensitiveSections) => {
    const selection = window.getSelection();
    const selectionRange = getTextSelection(selection.anchorNode.parentNode);
    const section = new SensitiveSection(
      selectionRange.start,
      selectionRange.end
    );
    api
      .addSensitiveSection(setId, documentId, { sensitiveSection: section })
      .then(sensitiveSections => {
        setSensitiveSections(sensitiveSections);
      });
  };

  return (
    <ButtonGroup variant="contained" size="medium" color="primary">
      {selectedNodeParent.tagName === "MARK" ? (
        <Button size="medium" startIcon={<FormatColorResetIcon />}>
          Un-redact
        </Button>
      ) : (
        <Button
          size="medium"
          onClick={event =>
            handleRedact(
              event,
              props.setName,
              props.documentId,
              props.setSensitiveSections
            )
          }
          startIcon={<BorderColor />}
        >
          Redact
        </Button>
      )}
      {/* <Button size="medium" startIcon={<InsertCommentIcon />}>Comment</Button> */}
    </ButtonGroup>
  );
}

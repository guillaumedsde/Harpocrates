import React, {useState} from "react";

import BorderColor from '@material-ui/icons/BorderColor';
import FormatColorResetIcon from '@material-ui/icons/FormatColorReset';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import {Button, ButtonGroup} from '@material-ui/core';

export default function PopoverMenu(props) {
    return (
        <ButtonGroup  variant="contained" size="medium" color="primary">
            <Button size="medium" startIcon={<BorderColor />}>Redact</Button>
            <Button size="medium" startIcon={<FormatColorResetIcon />}>Un-redact</Button>
            <Button size="medium" startIcon={<InsertCommentIcon />}>Comment</Button>
        </ButtonGroup>
    )
}
import React from "react";
import { IconButton, SvgIcon} from '@mui/material';
import { ReactComponent as YourIcon } from './icon.svg';
 


function MenuIcon() {
    return (
        <IconButton  sx={{ width: 30, height: 30, padding: 3.5 }}>
            <SvgIcon component={YourIcon} inheritViewBox sx={{ fontSize: '8rem' }} />
        </IconButton>
    );
}

export default MenuIcon;
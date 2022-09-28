import React from 'react';
import {styled} from "@mui/material/styles";
import {
    TableCell,
    tableCellClasses,
    TableRow,
} from "@mui/material";
import './Budget.css';


export const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#191c1e", color: theme.palette.common.white,
    }, [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));
export const StyledTableRow = styled(TableRow)(() => ({
    '&:nth-of-type(odd)': {}, // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',

});



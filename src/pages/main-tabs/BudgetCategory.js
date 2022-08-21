import React from 'react';
import {getDataFromRealtimeDB} from "../auth/firebase";
import {auth, database} from "../../configs/firebaseConfig";
import {styled} from "@mui/material/styles";
import {
    Button as ButtonMUI,
    Card,
    CardContent,
    InputAdornment,
    OutlinedInput,
    Paper,
    Table as TableMUI,
    TableBody,
    TableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from "@mui/material";
import {getFunctions, httpsCallable} from "firebase/functions";
import _ from "lodash";
import {useDispatch, useSelector} from "react-redux";
import {setBudgetTotalAmount} from "../userDataSlice";
import {IconButton, Message} from "rsuite";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import {AiOutlinePlus} from "react-icons/ai";
import {ref, set, update}  from "firebase/database";
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

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});



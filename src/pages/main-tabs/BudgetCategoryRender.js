import React from 'react';
import {getDataFromRealtimeDB} from "../auth/firebase";
import {auth, database} from "../../configs/firebaseConfig";
import {styled} from "@mui/material/styles";
import {
    Avatar,
    Button as ButtonMUI,
    Card,
    CardContent, IconButton,
    InputAdornment, List, ListItem, ListItemAvatar, ListItemText,
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
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import {AiOutlinePlus} from "react-icons/ai";
import {ref, set, update}  from "firebase/database";
import FolderIcon from '@mui/icons-material/Folder';
import {LockOpen, LockSharp} from "@mui/icons-material";
import {GiExpense} from "react-icons/gi";
import {formater, formatter} from "./BudgetCategory"

function BudgetCategoryRender({selectedCategory}) {

        //console.log(Object.entries(selectedCategory.expenseList)[1].name);

        const [lock, setLock] = React.useState(false);
        return(
            <div>
                <div className={"budgetSelectedCategory"} style={(lock)? {height: 400} : null}>
                    <IconButton size={"small"} onClick={() => setLock(!lock)}>
                        {(lock)? <LockSharp scale={0.5}/> : <LockOpen/>}
                    </IconButton>
                    <p>You've selected</p>
                    <h3>{(selectedCategory === "None") ? "Nothing yet" : selectedCategory.name}</h3>
                    <p className={"moneyText"}>{(selectedCategory === "None") ? null : formatter.format(selectedCategory.amount)}</p>
                    {(!lock)? <p className={"hoverText"}>Hover to view linked expenses</p> : null}
                    <p className={"linkedExpenseText"} style={(lock)? {fontSize: 15}: null}>Linked Expenses:</p>
                    <List dense={true}>

                    {(selectedCategory.expenseList !== undefined)? Object.entries(selectedCategory.expenseList).map(value => {
                        return(
                            <ListItem
                                secondaryAction={
                                    <IconButton edge="end" aria-label="delete">
                                        <DeleteIcon />
                                    </IconButton>
                                }
                            >
                                <ListItemAvatar>

                                        <GiExpense style={{color: "#ff4000", fontSize: 30}}/>

                                </ListItemAvatar>
                                <ListItemText
                                    primary={value[1].name}
                                    secondary={'Secondary text'}
                                />
                            </ListItem>
                        )

                    }) : "No linked expenses" }
                    </List>
                </div>
            </div>
        )

}


export default BudgetCategoryRender;
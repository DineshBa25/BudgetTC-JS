import React from 'react';
import {
    IconButton, List, ListItem, ListItemAvatar, ListItemText,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {LockOpen, LockSharp} from "@mui/icons-material";
import {GiExpense} from "react-icons/gi";
import {formatter} from "./BudgetFormatters"

/** Renders and controls the panel that displays more specific information for each specific subcategory for the budget or income category.
 *  For budget categories, the panel shows that amount allocated and the expenses that linked to that subcategory
 *  @param selectedCategory - the category that the user has selected
 * */
function BudgetCategoryRender({selectedCategory}) {
    const [lock, setLock] = React.useState(false);
    return (<div>
            <div className={"budgetSelectedCategory"} style={(lock) ? {height: 400} : null}>
                <IconButton size={"small"} onClick={() => setLock(!lock)}>
                    {(lock) ? <LockSharp scale={0.5}/> : <LockOpen/>}
                </IconButton>
                <p>You've selected</p>
                <h3>{(selectedCategory === "None") ? "Nothing yet" : selectedCategory.name}</h3>
                <p className={"moneyText"}>{(selectedCategory === "None") ? null : formatter.format(selectedCategory.amount)}</p>
                {(!lock) ? <p className={"hoverText"}>Hover to view linked expenses</p> : null}
                <p className={"linkedExpenseText"} style={(lock) ? {fontSize: 15} : null}>Linked Expenses:</p>
                <List dense={true}>

                    {(selectedCategory.expenseList !== undefined) ? Object.entries(selectedCategory.expenseList).map(value => {
                        return (<ListItem
                                secondaryAction={<IconButton edge="end" aria-label="delete">
                                    <DeleteIcon/>
                                </IconButton>}
                            >
                                <ListItemAvatar>

                                    <GiExpense style={{color: "#ff4000", fontSize: 30}}/>

                                </ListItemAvatar>
                                <ListItemText
                                    primary={value[1].name}
                                    secondary={'Secondary text'}
                                />
                            </ListItem>)

                    }) : "No linked expenses"}
                </List>
            </div>
        </div>)

}


export default BudgetCategoryRender;
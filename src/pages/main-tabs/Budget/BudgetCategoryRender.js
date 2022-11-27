import React from 'react';
import {
    IconButton, List, ListItem, ListItemAvatar, ListItemText,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {HelpSharp, LockOpen, LockSharp, QuestionMark} from "@mui/icons-material";
import {GiExpense} from "react-icons/gi";
import {formatter} from "./BudgetFormatters"
import {Message, Popover, Stack, Whisper} from "rsuite";
import {GrCircleQuestion} from "react-icons/gr";

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
                <Whisper placement={ "top" } speaker={
                    <Popover title={ "About Smart Feedback" }>
                        <p>
                            Smart Feedback is a tool that helps you to understand how your budget is allocated and how you can improve your budgeting to match practical spending patterns.
                        </p>
                    </Popover>
                }>
                    <Stack direction={"row"} justifyContent={"center"} spacing={10}>
                        <h4 style={{color: "#5692be"}}>Smart Feedback</h4>
                        <HelpSharp style={{marginTop: 10}}/>
                    </Stack>
                </Whisper>
                <div>
                    <Message  style={{marginRight: 15, marginLeft: 10, marginTop: 10, borderRadius: 20}} closable showIcon type="info" header="Coming Soon!">
                        Soon, you will be able to see how your budget is allocated and how you can improve your budgeting to match practical spending patterns.                    </Message>
                </div>
            </div>
        </div>)

}


export default BudgetCategoryRender;

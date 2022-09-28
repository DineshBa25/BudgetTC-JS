import React from 'react';
import {Stack} from "rsuite";
import {Button as ButtonMUI} from "@mui/material";
import ImportIcon from "@rsuite/icons/Import";
import DraftRound from "@rsuite/icons/DraftRound";
import {RestorePage} from "@mui/icons-material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

/**Renders the buttons and controls/triggers the actions for the main budget page in the action menu.*/
const BudgetActionMenu = () => {
    return (<div>
            <div className={"budgetNavActionHeader"}>
                <center>
                    <h4>Actions</h4><KeyboardArrowDownIcon/>
                </center>
            </div>

            <div className={"budgetNavActionItems"}>
                <Stack direction={"column"} spacing={10}>
                    <ButtonMUI variant={"outlined"} style={{background: "#1a1d24"}}
                               startIcon={<ImportIcon/>}>
                        Import Expenses
                    </ButtonMUI>
                    <ButtonMUI variant={"outlined"} style={{background: "#1a1d24"}}
                               startIcon={<DraftRound/>}>
                        Draft Budget
                    </ButtonMUI>
                    <ButtonMUI variant={"outlined"} style={{background: "#1a1d24"}}
                               startIcon={<RestorePage/>}>
                        Restore Budget
                    </ButtonMUI>
                    <ButtonMUI variant={"outlined"} color={'secondary'} style={{background: "#1a1d24"}}
                               startIcon={<RestorePage/>}>
                        Import Budget
                    </ButtonMUI>
                </Stack>
            </div>

        </div>);
}

export default BudgetActionMenu;

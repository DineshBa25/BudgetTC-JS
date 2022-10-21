import React from 'react';
import {Button, Modal, Stack} from "rsuite";
import ImportIcon from "@rsuite/icons/Import";
import DraftRound from "@rsuite/icons/DraftRound";
import {RestorePage} from "@mui/icons-material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import './Budget.css';
import BudgetImportExpensesModal from "./BudgetImportExpensesModal";


/**Renders the buttons and controls/triggers the actions for the main budget page in the action menu.*/
class BudgetActionMenu extends React.Component{
    constructor() {
        super();
        this.state = {
            showConfirmationScreen: false,
            inDraftMode: false,
            showImportExpensesModal: false,
        }
    }

    handleClose = () => {
        this.setState({showConfirmationScreen: false});
    }

    handleShow = () => {
        this.setState({showConfirmationScreen: true});
    }

    handleShowImportExpenseModal = () => {
        this.setState({showImportExpensesModal: true})
    }

    handleCloseImportExpenseModal = () =>{
        this.setState({showImportExpensesModal: false})
    }

    //TODO: Add list of things that draft mode is useful for.
    render() {
        return (<div>
            {(this.state.showImportExpensesModal)? <BudgetImportExpensesModal show handleClose={this.handleCloseImportExpenseModal} addToUnallocatedExpenses={(add)=>this.props.addToUnallocatedExpenses(add)}/>: null}
            <Modal backdrop={"static"} keyboard={false} open={this.state.showConfirmationScreen} size="sm" onClose={this.handleClose}>
                <Modal.Body>
                    <h4>Are you sure that you want to enter Draft mode?</h4>
                    <hr/>
                    <p>By entering draft mode you will leave your current budget and enter a state where you can view and edit a draft budget. Below are some uses for draft mode:</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={()=>{this.props.toggleDraftMode(true); this.handleClose(); this.setState({inDraftMode: true})}} appearance="primary">
                        Yes
                    </Button>
                    <Button onClick={this.handleClose} appearance="error">
                        No, I don't want to enter draft mode
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className={"budgetNavActionHeader"}>
                <center>
                    <h4>Actions</h4><KeyboardArrowDownIcon/>
                </center>
            </div>

            <div className={"budgetNavActionItems"}>
                {(this.props.validMonth && !this.state.inDraftMode)?
                    <Stack direction={"column"} spacing={10}>
                        <Button onClick={this.handleShowImportExpenseModal}>
                            <ImportIcon/> Import Expenses
                        </Button>

                            <Button onClick={this.handleShow}>
                                <DraftRound/> Enter Draft Mode
                            </Button>

                        <Button className={"action-menu-button"} >
                            Restore Budget
                        </Button>
                        <Button >
                            Import Budget
                        </Button>
                    </Stack>:
                    <Stack direction={"column"} spacing={10}>
                        <Button onClick={this.handleShow}>
                            <DraftRound/> Enter Draft Mode
                        </Button>
                    </Stack>}
                {(this.state.inDraftMode)?
                    <Stack direction={"column"} spacing={10}>
                        <Button onClick={()=>{this.props.toggleDraftMode(false); this.setState({inDraftMode: false})}}>
                            <RestorePage/> Exit Draft Mode
                        </Button>
                        <Button>
                            Import Budget
                        </Button>
                    </Stack>
                    :null}
            </div>

        </div>);
    }
}

export default BudgetActionMenu;

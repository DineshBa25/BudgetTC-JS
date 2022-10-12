import React from 'react';
import {
    Avatar,
    Button,
    ButtonToolbar,
    Form,
    IconButton,
    Input,
    InputGroup,
    InputNumber,
    Modal,
    Popover,
    Stack,
    Whisper
} from "rsuite";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import {formatter} from "./BudgetFormatters";
import RemindFillIcon from '@rsuite/icons/RemindFill';
import {List, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import {GiExpense} from "react-icons/gi";
import BudgetExpenseItemTransferList from "./BudgetExpenseItemTransferList"

/** Renders a collection of BudgetCategoryItems that allows you to view and control a sub budget category.
 *  */
class BudgetCategoryItem extends React.Component {
    constructor(props) {
        super(props);
        //console.log("Item Unallocated Expenses: ", this.props.unallocatedExpenses);
        this.state = {
            item: props.item,
            name: props.item.name,
            amount : props.item.amount,
            expenseList: (props.item.expenseList === undefined) ? [] : props.item.expenseList,
            category: props.category,
            categoryTotal: props.categoryTotal,
            id: this.props.item.id,
            showEditModal: false,
            loading: false,
            modelData: {
                name: props.item.name,
                amount: props.item.amount,
                expenseList: props.item.expenseList,
            },
            showNameInput: false,
            expensesAllocated: 0,
        }
    }

    componentDidMount() {
        let total = 0;
        console.log("Expense List: ", this.state.expenseList);
        Object.entries(this.state.expenseList).forEach((expense) => {
            if (expense[1].amount !== undefined) {
                total += expense[1].amount;
            }
        })
        console.log("Total: ", total);
        //do not end until state udpate was completed
        this.setState({expensesAllocated: total}, () => {
            console.log("Expenses Allocated: ", this.state.expensesAllocated);
        });
    }

    getExpensesAllocated() {
        let total = 0;
        console.log("Expense List: ", this.state.expenseList);
        Object.entries(this.state.expenseList).forEach((expense) => {
            if (expense[1].amount !== undefined) {
                total += expense[1].amount;
            }
        })
        console.log("Total: ", total);
        return total;
    }

    handleClose = () => {
        this.setState({showEditModal: false});
    }
     handelEdit = () => {
         this.setState({showEditModal: true});
     }

    toObject(arr) {
        let rv = {};

        for (let i = 0; i < arr.length; ++i){
            console.log(arr[i][1]);
            rv["item"+(i+1)] = arr[i][1];
        }
        return rv;
    }
    //modifies the expenselist. changes is a {} of the form {addedToLeft: [], removedFromLeft: [], addedToRight: [], removedFromRight: []}
    handleExpenseListChange = (changes) => {

        console.log("Current Expense List: ", this.state.expenseList);

        let newExpenseList = this.toObject(changes.right);

        console.log(changes)

        console.log("New expense list: ", newExpenseList);

        this.setState({expenseList: newExpenseList}, () => {
           this.setState({expensesAllocated: this.getExpensesAllocated()});
        });

        //update the unallocated expenses in the parent function
        console.log(changes)
        this.props.modifyExpenseAllocation(this.state.id,changes);
     }

    render() {

        return (
            <div className={"budget-category-item"}>
                <Modal open={this.state.showEditModal} onClose={this.handleClose}>
                    <Modal.Header>
                        <Modal.Title>{this.state.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form layout="horizontal">
                            <Form.Group controlId="name">
                                <Form.ControlLabel>Item Name</Form.ControlLabel>
                                <Form.Control name="name"  defaultValue={this.state.name}  onBlur={async event => {
                                    this.props.handleOnNameChange(event.target.value, this.state.category, this.state.id);
                                    this.setState({name: event.target.value})
                                    //modify ref this.textInput.current.value
                                }}/>
                                <Form.HelpText tooltip>The name of the item</Form.HelpText>
                            </Form.Group>
                            <Form.Group controlId="amount">
                                <Form.ControlLabel>Amount allocated</Form.ControlLabel>
                                <Form.Control name="amount" accepter={InputNumber} defaultValue={this.state.amount} prefix={"$"} onBlur={async event => {
                                    console.log(`Amount changed from ${this.state.amount} to ${event.target.value}`)
                                    this.setState({amount: event.target.value,});
                                    this.props.modifyBudgetItemAmount(this.state.id, event.target.value);
                                }}/>
                                <Form.HelpText tooltip>The amount the you are willing to allocated to the item</Form.HelpText>
                            </Form.Group>
                            <BudgetExpenseItemTransferList left={this.props.unallocatedExpenses}  right={(this.state.expenseList !== undefined) ? Object.entries(this.state.expenseList): []}
                                                           handleExpenseAllocation={(changes)=> {this.handleExpenseListChange(changes); console.log(changes)}}/>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button appearance={"primary"} color={"red"}>Delete {this.state.name}</Button>
                        <Button onClick={this.handleClose} appearance="primary">
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
                <div className={"budget-category-item-panel-grid"}>
                    <div className={"budget-category-item__name"}>
                        {(this.state.showNameInput)? <Input  style={{color: "#5692be"}}  defaultValue={this.state.name}  onBlur={async event => {
                            this.props.handleOnNameChange(event.target.value, this.state.category, this.state.id);
                            this.setState({name: event.target.value, showNameInput: false})
                        }}/> : <Input value={this.state.name}  readOnly onSelect={() => {this.setState({showNameInput: true})}}/>}
                    </div>

                    <div className={"budget-category-item__amount"} style={{borderRadius: 10}}  >
                        <InputGroup>
                            <InputGroup.Addon>$</InputGroup.Addon>
                            <InputNumber defaultValue={this.state.amount} size="lg" onBlur={async event => {
                                console.log(`Amount changed from ${this.state.amount} to ${event.target.value}`)
                               this.setState({amount: event.target.value,});
                                this.props.modifyBudgetItemAmount(this.state.id, event.target.value);
                            }} />
                        </InputGroup>


                    </div>
                    <div className={"budget-category-item__info"} style={{background: "rgba(0,0,0,0.18)", borderRadius: 10}}>
                        {(!this.props.draftMode)?
                        <div className={"budget-category-item__info__feedback"} style={{float: "left"}}>
                            {(this.state.item.amount - this.state.expensesAllocated < 0)?
                                <Stack direction={"row"} spacing={5}>
                                    <h6 style={{color: "#ff3535", fontWeight: "bold"}}>
                                        {formatter.format(-1* (this.state.item.amount - this.state.expensesAllocated))}</h6>
                                    <h6 style={{color: "#cecece"}}>Over Budget</h6>
                                    <RemindFillIcon style={{color: "#ffc400"}}></RemindFillIcon>
                                </Stack>
                                :
                                <Stack direction={"row"} spacing={5}>
                                    <h6 style={{color: "#2f9b00"}}>{
                                        //print the value of the difference between the amount allocated and the expenses allocated by going through expenseList and summing the values of amount
                                        formatter.format(this.state.amount - this.state.expensesAllocated)
                                    }</h6>
                                    <h6 style={{color: "#696969"}}>Remaining</h6>
                                </Stack> }
                        </div>: null}
                        <Stack direction={"row"} spacing={10} alignItems={"flex-end"} justifyContent={"flex-end"} style={{float: "right"}}>

                            {(!this.props.draftMode)? <div>
                            <Whisper
                                trigger="hover"
                                controlId="control-id-hover-enterable"
                                speaker={<Popover title={`${this.state.name}'s Allocated Expenses`}>
                                    <List dense={true}>

                                        {(this.state.expenseList !== undefined) ? Object.entries(this.state.expenseList).map((value) => {
                                            return (<ListItem>
                                                <ListItemAvatar>
                                                    <GiExpense style={{color: "#ff4000", fontSize: 30}}/>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    secondary={
                                                    <Stack>
                                                        <h6 style={{color: "#787878"}}>{value[1].name}&nbsp;</h6>
                                                        <h6 style={{color: "#ff0000"}}>{formatter.format(value[1].amount)}</h6>
                                                    </Stack>}
                                                />
                                                <IconButton aria-label="delete"
                                                            style={{background: "rgba(0,0,0,0)", height: 30, width: 30}}
                                                            size={"xs"}
                                                            icon={<DeleteIcon className={"budget-category-item__info__delete-icon"}/>}/>
                                            </ListItem>)

                                        }) : "No linked expenses"}
                                    </List>
                                </Popover>}
                                enterable
                                preventOverflow
                                placement="auto"

                            >

                                <Avatar className={"budget-category-item__info__expense-list-avatar"} style={{background: "#a80000"}} size={"sm"} >{(this.state.expenseList !== undefined)? Object.keys(this.state.expenseList).length : 0}</Avatar>
                            </Whisper>
                                <IconButton aria-label="edit"
                                            style={{
                                                marginRight: 0,
                                                background: "rgba(0,0,0,0)", height: 30, width: 30
                                            }}
                                            size={"sm"}
                                            loading={this.state.showEditModal}
                                            icon={(!this.state.showEditModal) ? <EditOutlinedIcon
                                                className={"budget-category-item__info__edit-icon"}/>: null}


                                            onClick={this.handelEdit}
                                />
                                </div>: null}
                                <IconButton aria-label="delete"
                                            style={{background: "rgba(0,0,0,0)", height: 30, width: 30}}
                                            size={"xs"}
                                            icon={<DeleteIcon className={"budget-category-item__info__delete-icon"}/>}/>

                        </Stack>
                    </div>

                </div>

            </div>
        );
    }




}


export default BudgetCategoryItem;
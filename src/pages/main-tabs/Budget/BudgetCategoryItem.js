import React from 'react';
import {
    Button,
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
            showAmountInput: false,
            expensesAllocated: 0,
        }
    }

    componentDidMount() {
        let total = 0;
        Object.entries(this.state.expenseList).forEach((expense) => {
            if (expense[1].amount !== undefined) {
                total += expense[1].amount;
            }
        })
        //do not end until state udpate was completed
        this.setState({expensesAllocated: total});
    }


    getExpensesAllocated() {
        let total = 0;
        Object.entries(this.state.expenseList).forEach((expense) => {
            if (expense[1].amount !== undefined) {
                total += expense[1].amount;
            }
        })
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
            rv["item"+(i+1)] = arr[i][1];
        }
        return rv;
    }
    //modifies the expenselist. changes is a {} of the form {addedToLeft: [], removedFromLeft: [], addedToRight: [], removedFromRight: []}
    handleExpenseListChange = (changes) => {

        let newExpenseList = this.toObject(changes.right);

        this.setState({expenseList: newExpenseList}, () => {
           this.setState({expensesAllocated: this.getExpensesAllocated()});
        });

        this.props.modifyExpenseAllocation(this.state.id,changes);
     }

    render() {

        return (
            <div className={"budget-category-item"} >
                {(this.state.showEditModal)?
                <Modal open={true} onClose={this.handleClose} size={"lg"}>
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
                                    this.setState({amount: event.target.value,});
                                    this.props.modifyBudgetItemAmount(this.state.id, event.target.value);
                                }}/>
                                <Form.HelpText tooltip>The amount the you are willing to allocated to the item</Form.HelpText>
                            </Form.Group>
                            <BudgetExpenseItemTransferList left={this.props.unallocatedExpenses}  right={(this.state.expenseList !== undefined) ? Object.entries(this.state.expenseList): []}
                                                           handleExpenseAllocation={(changes)=> {this.handleExpenseListChange(changes);}} updateUnallocatedExpenses={(newList)=> this.handleExpenseListChange({left: newList, right: []})}/>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button appearance={"primary"} color={"red"}>Delete {this.state.name}</Button>
                        <Button onClick={this.handleClose} appearance="primary">
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>: null}
                <div className={"budget-category-item-panel-grid"}>
                    <div className={"budget-category-item__name"}>
                        {(this.state.showNameInput)? <Input  style={{color: "#5692be"}}  defaultValue={this.state.name}  onBlur={async event => {
                            if(this.state.name !==  event.target.value) {
                                this.props.handleOnNameChange(event.target.value, this.state.category, this.state.id);
                                this.setState({name: event.target.value, showNameInput: false})
                            }
                            else {
                                this.setState({showNameInput: false})
                            }
                        }}/> : <Input value={this.state.name}  readOnly onSelect={() => {this.setState({showNameInput: true})}}/>}
                    </div>

                    <div className={"budget-category-item__amount"} style={{borderRadius: 10}}  >
                        {(this.state.showAmountInput)?
                            <InputGroup inside>
                                <InputGroup.Addon>$</InputGroup.Addon>
                                <Input  style={{color: "#5692be"}}  defaultValue={this.state.amount}
                                        onBlur={async event => {
                                            if(this.state.amount !==  event.target.value) {
                                                this.setState({amount: event.target.value, showAmountInput: false});
                                                this.props.modifyBudgetItemAmount(this.state.id, event.target.value);
                                            }
                                            else {
                                                this.setState({showAmountInput: false})
                                            }
                                            //this.props.modifyBudgetItemAmount(this.state.id, event.target.value);
                                        }}/>

                            </InputGroup>
                            : <InputGroup inside>
                                <InputGroup.Addon style={{color: "#656565"}}>$</InputGroup.Addon>
                                <Input value={parseFloat(this.state.amount).toFixed(2)}  readOnly onSelect={() => {this.setState({showAmountInput: true})}}/>
                            </InputGroup>}
                    </div>
                    <div className={"budget-category-item__info"} style={{background: "rgba(0,0,0,0.18)", borderRadius: 10}}>

                        <Whisper
                            trigger="hover"
                            controlId="control-id-hover"
                            speaker={<Popover title={`${this.state.name}'s Allocated Expenses`}>
                                <List dense={true}>
                                    {(this.state.expenseList.length !== 0) ? Object.entries(this.state.expenseList).map((value) => {

                                        return (<ListItem>
                                            <ListItemAvatar>
                                                <GiExpense style={{color: "#ff4000", fontSize: 30}}/>
                                            </ListItemAvatar>
                                            <ListItemText
                                                secondary={
                                                    <Stack>
                                                        <h6 style={{color: "#787878"}}>{value[1].name}&nbsp;</h6>
                                                        <h6 style={{color: "#ff0000"}}>{formatter.format(parseFloat(value[1].amount))}</h6>
                                                    </Stack>}
                                            />
                                        </ListItem>)

                                    }) :  <h6 style={{color: "#787878"}}>No allocated expenses</h6>
                                    }
                                </List>
                            </Popover>}

                            preventOverflow
                            placement="auto"

                        >

                            <div className={"budget-category-item__info__feedback"} style={{float: "left"}}>
                                {(this.state.item.amount - this.state.expensesAllocated < 0)?
                                    <Stack direction={"row"} spacing={5}>
                                        <h6 style={{color: "#ff3535", fontWeight: "bold"}}>
                                            {formatter.format(-1* (this.state.item.amount - this.state.expensesAllocated))}</h6>
                                        <h6 style={{color: "#cecece"}}>Over Budget</h6>
                                        <RemindFillIcon style={{color: "#ffc400"}}></RemindFillIcon>
                                        <h6 style={{color: "#ff3535"}}>({(this.state.expenseList !== undefined)? Object.keys(this.state.expenseList).length : 0})</h6>
                                    </Stack>
                                    :
                                    <Stack direction={"row"} spacing={5}>
                                        <h6 style={{color: "#2f9b00"}}>{
                                            //print the value of the difference between the amount allocated and the expenses allocated by going through expenseList and summing the values of amount
                                            formatter.format(this.state.amount - this.state.expensesAllocated)
                                        }</h6>
                                        <h6 style={{color: "#696969"}}>Remaining</h6>

                                        {(Object.keys(this.state.expenseList).length !== 0)? <h6 style={{color: "#ff3535"}}>({Object.entries(this.state.expenseList).length})</h6> : null}
                                    </Stack> }
                            </div>
                        </Whisper>
                        <Stack direction={"row"} spacing={10} alignItems={"flex-end"} justifyContent={"flex-end"} style={{float: "right"}}>

                            {(!this.props.draftMode)? <div>

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
                                            icon={<DeleteIcon className={"budget-category-item__info__delete-icon"}/>}
                                            onClick={()=>this.props.handleRemoveBudgetItem(this.state.id)}
                                />

                        </Stack>
                    </div>

                </div>

            </div>
        );
    }




}


export default BudgetCategoryItem;
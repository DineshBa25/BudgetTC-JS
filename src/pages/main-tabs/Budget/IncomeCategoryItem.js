import React from 'react';
import {
    IconButton,
    Input,
    InputGroup,
    Popover,
    Stack,
    Whisper
} from "rsuite";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import {formatter} from "./BudgetFormatters";
import {List, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import {GiExpense} from "react-icons/gi";

/** Renders a collection of BudgetCategoryItems that allows you to view and control a sub budget category.
 *  */
class IncomeCategoryItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: props.item,
            name: props.item.name,
            amount : props.item.amount,
            expenseList: (props.item.expenseList === undefined) ? [] : props.item.expenseList,
            category: props.category,
            categoryTotal: props.categoryTotal,
            id: props.item.id,
            showEditModal: false,
            loading: false,
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

    toObject(arr) {
        let rv = {};
        for (let i = 0; i < arr.length; ++i){
            rv["item"+(i+1)] = arr[i][1];
        }
        return rv;
    }

    render() {
        return (
            <div className={"budget-income-category-item"} >
                <div className={"budget-category-item-panel-grid"}>
                    <div className={"budget-category-item__name"}>
                        {(this.state.showNameInput)? <Input  style={{color: "#5692be"}}  defaultValue={this.state.name}  onBlur={(e) => {
                            this.props.handleNameChange(this.state.id, e.target.value);
                            this.setState({showNameInput: false, name: e.target.value});
                        }
                        }/> : <Input value={this.state.name}  readOnly onSelect={() => {this.setState({showNameInput: true})}}/>}
                    </div>

                    <div className={"budget-category-item__amount"} style={{borderRadius: 10}}  >
                        {(this.state.showAmountInput)?
                            <InputGroup inside>
                                <InputGroup.Addon>$</InputGroup.Addon>
                                <Input  style={{color: "#5692be"}}  defaultValue={this.state.amount}
                                        onBlur={(e) => {
                                            this.props.handleAmountChange(this.state.id, e.target.value);
                                            this.setState({showAmountInput: false, amount: e.target.value});
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
                                                        <h6 style={{color: "#ff0000"}}>{formatter.format(parseFloat(value[1].amount))}</h6>
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

                            <div className={"budget-category-item__info__feedback"} style={{float: "left"}}>
                                        <h6 style={{color: "#ff3535"}}>({(this.state.expenseList !== undefined)? Object.keys(this.state.expenseList).length : 0})</h6>
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
                                            icon={<EditOutlinedIcon/>}

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


export default IncomeCategoryItem;

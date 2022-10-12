import React from 'react';
import BudgetCategoryItem from "./BudgetCategoryItem";
import {Message, Stack} from "rsuite";
import BudgetClass from "./BudgetClass"
import {formatter} from "./BudgetFormatters";


/** Renders a collection of BudgetCategoryItems that allows you to view and control a sub budget category.
 *  */

class BudgetCategory extends React.Component {
    constructor(props) {
        console.log("draft mode: " + props.draftMode);

        super(props);
        console.log("Unallocated Expenses: ", props.unallocatedExpenses )
        this.state = {
            amount: props.category.amount,
            items: Object.entries(props.category.items),
            color: props.category.color,
            name: props.category.name,
            id: props.category.id,
            draftMode: this.props.draftMode,
        }
    }

    modifyBudgetItemName = (name, category, id) => {
        //modify this state
        let items = this.state.items;
        let item = items.find(item => item[0] === id);
        item[1].name = name;
        this.setState({items: items});
        console.log(id)
        this.props.handleOnNameChange(name, category, id);


    }

    modifyBudgetItemAmount = (id, amount1) => {
        //set the amount of the item with the given id to the given amount in state
        let items = this.state.items;
        for (let i = 0; i < items.length; i++) {
            if (items[i][0] === id) {
                items[i][1].amount = amount1;
                break;
            }
        }
        this.setState({items: items});
        let newAmount = 0;
        this.state.items.forEach(item => {
            //console.log(`Item ${item[1].id} has amount ${item[1].amount}`);
            newAmount += parseFloat(item[1].amount);
        });
        //console.log(`Total amount changed to ${newAmount}`);

        //set state amount to new amount and wait for it to update
        this.setState({amount: newAmount}, () => {
            console.log(`new total: ${this.state.amount}\n calling parent update`);
            this.props.handleOnAmountChange(amount1, this.state.amount, this.state.id, id)
        });


    };

    toObject(arr) {
        let rv = {};

        for (let i = 0; i < arr.length; ++i){
            console.log(arr[i][1]);
            rv["item"+(i+1)] = arr[i][1];
        }
        return rv;
    }
    //modifies the expenseAllocation list
    modifyExpenseAllocation = (id, changes) => {

        this.props.updateUnallocatedExpenses(changes.left);
        //modify the allocated expense list
        let items = this.state.items;

        for (let i = 0; i < items.length; i++) {
            if (items[i][0] === id) {
                console.log("found item with id: " + id);
                items[i][1].expenseList = this.toObject(changes.right);
                console.log(this.toObject(changes.right))
                break;
            }
        }
        console.log("new items: ", items);
        //this.setState({items: items});
    }



    render(){
        return (
            <div className={"budgetCategoryPanel"}>
                <div className={"budget-category-header"}>
                    <Stack direction={"row"} spacing={5} >
                        <Message
                            style={{height: 30, marginTop: 3, width: 10,  background: this.state.color}}/>
                        <h3 style={{ color: "#a3a8b2"}}>
                            {this.state.name}
                        </h3>
                        <div className={"budget-category-amount"}>
                            <h4 >
                                {formatter.format(this.state.amount)}
                            </h4>
                        </div>
                    </Stack>

                </div>
                <div className={"budget-category-item-panel"}>
                    {this.state.items.map((item) => {
                        return <BudgetCategoryItem
                            draftMode={this.state.draftMode}
                            item={item[1]} category={this.state.id}
                            unallocatedExpenses={this.props.unallocatedExpenses}
                            categoryTotal={this.state.amount} changeTotal={(newTotal)=>this.changeState(newTotal)}
                            handleOnNameChange={this.modifyBudgetItemName}
                            modifyBudgetItemAmount={(id,amount)=>this.modifyBudgetItemAmount(id,amount)}
                            modifyExpenseAllocation= {(id, changes)=>this.modifyExpenseAllocation(id, changes)}/>
                    })}
                </div>
            </div>
        );
    }
}

export default BudgetCategory;
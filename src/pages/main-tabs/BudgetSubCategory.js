import React from 'react';


class BudgetSubCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            totalAllocated: props.totalAllocated,
            totalSpent: props.totalSpent,
            linkedExpenses: [],
        }
    }

    linkExpense = (expense) => {
        this.state.linkedExpenses.push(expense);
    }


    render() {
        return (
            <div>
                    <h4>{this.state.name}</h4>
                    <h4>{this.state.totalAllocated}</h4>
                    <h4>{this.state.totalSpent}</h4>
                    <h4>{this.state.linkedExpenses}</h4>
            </div>
        );

    }




}

export default BudgetSubCategory;
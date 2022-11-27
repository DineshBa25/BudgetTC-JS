import React from 'react';
import {child, get, ref, update} from "firebase/database";
import {database} from "../../../configs/firebaseConfig";
import {Stack} from "rsuite";
import {formatter} from "./BudgetFormatters";
import IncomeCategoryItem from "./IncomeCategoryItem";
import CategoryName from "./CategoryName";

class IncomeCategoryNG extends React.Component {
        constructor() {
            super();
            this.state = {
                incomeCategories: [],
                oneTimeIncome: [],
                showAmountInput: false,
                showNameInput: false,

            }
        }

        componentDidMount() {
            get(child(ref(database), this.props.address)).then((snapshot) => {

                if (snapshot.exists()) {
                    let incomeCategories = [];
                    let oneTimeIncome = [];

                    snapshot.forEach((childSnapshot) => {

                        let childData = childSnapshot.val();
                        console.log(childData);
                        if (childData.type === "category") {
                            console.log("Found category: " + childData.name);
                            let items = [];
                            for (let item in childData.items) {
                                items.push(childData.items[item]);
                            }
                            childData.items = items;
                            incomeCategories.push(childData);
                        } else if (childData.type === "oneTime") {
                            console.log("Found one time income: " + childData.name);
                            //convert items to array

                            oneTimeIncome.push(childData);
                        }
                    });
                    this.setState({
                        incomeCategories: incomeCategories,
                        oneTimeIncome: oneTimeIncome,
                    })
                }
                else {
                    console.log("No data available");
                }
            })
        }

    handleNameChange = (id, name, category: "none given") => {
            console.log("Name change: " + id + " " + name + " " + category);


        if(this.state.incomeCategories.some((item) => {
            return item.id === category})) {
            update(ref(database), {
                [this.props.address + category + "/items/" + id + "/name"]: name
            }).then(() => {
                console.log("SUCCESS: updated name of budget item in RTDB at " + this.props.address + category + "/items/" + id + "/name");

            }).catch((error) => {
                console.error(error);
            });
        }
        else if(this.state.oneTimeIncome.some((item) => {
                console.log(item.id + " " + id);
                return item.id === id})){
                console.log("Found category in Income categories");
                update(ref(database), {
                    [this.props.address + id + "/name"]: name
                }).then(() => {
                    console.log("SUCCESS: updated name of budget item in RTDB at " + this.props.address + id + "/name");
                    //update state

                }).catch((error) => {
                    console.error(error);
                });
            }



    }

    handleAmountChange = (id,  category,amount) => {
        //update in firebase
        console.log("Amount change: " + id + " " + amount + " " + category);
        //address
        console.log(this.props.address + category + "/items/" + id + "/amount");
        if(category !== "none given"){
            console.log("Found category in Income categories, this is a income category");
            update(ref(database), {
                [this.props.address + category+ "/items/" + id + "/amount"]: amount
            }).then(() => {
                console.log("SUCCESS: updated amount of budget item in RTDB at " + this.props.address + id + "/amount");
                //update state
                this.setState({
                    incomeCategories: this.state.incomeCategories.map((item) => {
                        if(item.id === category){
                            item.items.map((item) => {
                                if(item.id === id){
                                    item.amount = amount;
                                }
                                return item;
                            })
                        }
                        return item;
                    })
                })

            }).catch((error) => {
                console.error(error);
            });
        }
        else  {
            //this is one time income
            console.log("Found category in one time income, this is one time income");
            update(ref(database), {
                [this.props.address + id + "/amount"]: amount
            }).then(() => {
                console.log("SUCCESS: updated amount of budget item in RTDB at " + this.props.address + category + "/items/" + id + "/amount");

            }).catch((error) => {
                console.error(error);
            });
        }

    }

    handleExpenseListChange = (id, changes) => {
        this.setState({expenseList: changes});
    }

    handleIncomeCategoryNameChange = (id, name) => {
        console.log("Name change: " + id + " " + name);
        //print address
        console.log(this.props.address);

        update(ref(database), {[this.props.address+"/"+id+"/name"]: name}).then(() => {
            //update state
            console.log("SUCCESS: updated name of budget category in RTDB");
            this.setState({name: name, showNameInput: false});

        }).catch((error) => {
            console.error(error);
        });
    }

    render() {
            return (
                <div>
                    {(this.state.loading)? <div className={"budgetCategoryPanel"}>
                            <div style={{height:40,width:200,borderTopRightRadius: 20,marginLeft:20, background: "#30303a", borderTopLeftRadius:20}}/>
                            <div  style={{height: 225,background: "#30303a", borderRadius: 20}}/>
                        </div>:
                        <div className={"budgetCategoryPanel"} style={{marginTop: 0}}>
                            <div className={"budget-income-category-header"}>
                                <Stack direction={"row"} spacing={5} >

                                    <h3  className={"budget-category-name"}  style={{color: "#a3a7b1"}} >Miscellaneous Income</h3>

                                </Stack>

                            </div>
                            <div className={"budget-category-item-panel"}>
                                { (this.state.oneTimeIncome !== undefined) ? this.state.oneTimeIncome.map((category) => {

                                    return <IncomeCategoryItem item={category}
                                                               handleNameChange={(id, name)=> this.handleNameChange(id,name)}
                                                                handleAmountChange={(id, amount)=> this.handleAmountChange(id,"none given",amount)}
                                    />

                                }): null
                                }

                            </div>

                            {this.state.incomeCategories.map((category) => {
                                return <div>
                                    <hr/>
                            <div className={"budget-income-category-header"}>
                                <Stack direction={"row"} spacing={5} >
                                    <CategoryName name={category.name} id={category.id} handleNameChange={(name)=>this.handleIncomeCategoryNameChange(category.id,name)}/>
                                    <div className={"budget-category-amount"} style={{color: "#1c9c02"}}>
                                        <h4 >
                                            {formatter.format(this.state.incomeCategories.find((item) => {
                                                return item.id === category.id
                                            }).items.reduce ((accumulator, currentValue) => {
                                                return accumulator + currentValue.amount
                                            }, 0))}
                                        </h4>
                                    </div>
                                </Stack>

                            </div>
                            <div className={"budget-category-item-panel"}>
                                    { (category.items !== undefined) ? category.items.map((category1) => {
                                        return <IncomeCategoryItem item={category1}
                                                                   handleNameChange={(id, name)=> this.handleNameChange(id,name, category.id)}
                                                                   handleAmountChange={(id, amount)=> this.handleAmountChange(id,category.id,amount)}
                                        />

                                    }): null}

                            </div>
                                </div>
                            })}
                        </div>
                    }
                </div>
            );
        }
}

export default IncomeCategoryNG;

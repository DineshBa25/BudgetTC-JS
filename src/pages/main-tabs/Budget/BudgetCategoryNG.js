import React from 'react';
import BudgetCategoryItem from "./BudgetCategoryItem";
import { Input, Message, Popover, Stack, Whisper} from "rsuite";
import {formatter} from "./BudgetFormatters";
import {database} from "../../../configs/firebaseConfig";
import {child, get, ref, update, remove} from "firebase/database";
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BudgetColorPicker from "./BudgetColorPicker";
/** Renders a collection of BudgetCategoryItems that allows you to view and control a sub budget category.
 *  */

class BudgetCategoryNG extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: 0,
            items: [],
            color: "",
            name: "",
            id: "",
            loading: true,
            showNameInput: false,
            deleted: false,
        }

    }


    //props will contain the name of a category and its id along with the budgetViewMode
    componentDidMount() {
        console.log("mounting")
        get(child(ref(database), this.props.address)).then((snapshot) => {
            if (snapshot.exists()) {
                let items = [];
                //items is an object of objects
                if(snapshot.val().items){
                    Object.entries(snapshot.val().items).forEach(([, value]) => {
                        items.push(value);
                    });
                }


                this.setState({
                    amount: snapshot.val().amount,
                    items: items,
                    color: snapshot.val().color,
                    name: snapshot.val().name,
                    id: snapshot.val().id,
                }, () => {

                });
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
        //wait 5 seconds to simulate loading
        /*setTimeout(() => {
            this.setState({loading: false});
        }, 5000);*/
        this.setState({loading: false});
    }

    modifyBudgetItemName = (name, category, id) => {
        //modify name of budget item in category in items array
        let items = this.state.items;
        let index = items.findIndex((item) => item.id === id);
        items[index].name = name;
        //update in firebase
        update(ref(database), {
            [this.props.address + "/items/" + id + "/name"]: name
        }).then(() => {
            //update state
            console.log("SUCCESS: updated name of budget item in RTDB");
            this.setState({items: items});
        }).catch((error) => {
            console.error(error);
        });


    }

    modifyBudgetItemAmount = (id, amount1) => {
        //set the amount of the item with the given id to the given amount in state
        let items = this.state.items;
        let total = 0;
        for (let i = 0; i < items.length; i++) {
            if (items[i].id === id) {
                items[i].amount = amount1;
            }
            total += parseFloat(items[i].amount);
        }
        //update in firebase
        update(ref(database), {
            [this.props.address + "/items/" + id + "/amount"]: amount1
        }).then(() => {
            //update state
            console.log("SUCCESS: updated amount of budget item in RTDB");
            this.setState({items: items, amount: total});
            //update total amount in parent
            this.props.modifyBudgetCategoryAmount(this.state.id, total);

        }).catch((error) => {
            console.error(error);
        });


    };




    toObject(arr) {
        let rv = {};

        for (let i = 0; i < arr.length; ++i){
            rv["item"+(i+1)] = arr[i][1];
        }
        return rv;
    }
    //modifies the expenseAllocation list
    async modifyExpenseAllocation(id, changes){
        //update the unallocated expense list in the BudgetClass. Then update the allocated expenses for the item that was modified. This ensures that the allocated or unallocated item is not lost.
        await this.props.updateUnallocatedExpenses(changes.left)

            .then(() => {
                let items = this.state.items;
                for (let i = 0; i < items.length; i++) {
                    if (items[i].id === id) {
                        items[i]["expenseList"] = this.toObject(changes.right);
                        break;
                    }
                }
                //update the item in firebase RTDB
                update(ref(database), {
                    [this.props.address + "/items/" + id + "/expenseList"]: this.toObject(changes.right)
                }).then(() => {
                    //update the state
                    this.setState({items: items});
                }).catch((error) => {
                    console.error(error);
                });
            })

    }

    modifyBudgetCategoryName = (name) => {
        update(ref(database), {[this.props.address+"/name"]: name}).then(() => {
            //update state
            console.log("SUCCESS: updated name of budget category in RTDB");
            this.setState({name: name, showNameInput: false});

            this.props.modifyBudgetCategoryName(this.state.id, name);
        }).catch((error) => {
            console.error(error);
        });
    }

    modifyBudgetCategoryColor = (color) => {
        update(ref(database), {[this.props.address+"/color"]: color}).then(() => {
            //update state
            console.log("SUCCESS: updated color of budget category in RTDB");
            this.setState({color: color});

            this.props.modifyBudgetCategoryColor(this.state.id, color);
        }).catch((error) => {
            console.error(error);
        });
    }

    handleAddBudgetItem = () => {
        //add a new budget item to the items array

        let items = this.state.items;
        console.log(items)
        let id = `item${parseInt(items.length)+1}`;
        let newItem = {id: id, name: "", amount: 0, expenseList: {}};
        items.push(newItem);
        //update in firebase
        update(ref(database), {[this.props.address + "/items/" +id ]: newItem}).then(() => {
            //update state
            console.log("SUCCESS: added new budget item to RTDB with id: " + newItem.id + " at address: " + this.props.address + "/items/item" + items.length+1);
            this.setState({items: items});
        }).catch((error) => {
            console.error(error);
        });
    }

    handleRemoveBudgetItem(id) {
        //remove the budget item with the given id from the items array
        let items = this.state.items;
        let index = items.findIndex((item) => item.id === id);
        items.splice(index, 1);
        //update in firebase
        remove(ref(database, this.props.address + "/items/" + id)).then(() => {
            //update state
            console.log("SUCCESS: removed budget item from RTDB at " + this.props.address + "/items/item" + id);
            this.setState({items: items});
        }).catch((error) => {
            console.error(error);
        });
    }

    render() {
        return(
            <div>
                {(this.state.loading)? <div className={"budgetCategoryPanel"}>
                        <div style={{height:40,width:200,borderTopRightRadius: 20,marginLeft:20, background: "#30303a", borderTopLeftRadius:20}}/>
                        <div  style={{height: 225,background: "#30303a", borderRadius: 20}}/>
                </div>:
            <div className={"budgetCategoryPanel"}>
               <div>

                <div className={"budget-category-header"}>
                    <Stack direction={"row"} spacing={5} >
                        <Whisper
                            placement="bottom"
                            trigger="hover"
                            controlId="control-id-hover-enterable"
                            speaker={<Popover><BudgetColorPicker color={this.state.color} onChange={(newColor)=> {
                                this.modifyBudgetCategoryColor(newColor);
                            }} /></Popover>}
                            enterable
                        >
                            <Message
                                style={{height: 25, marginTop: 3, width: 10,  background: this.state.color, cursor: "pointer"}}/>
                        </Whisper>
                        {this.state.showNameInput? <Input size={"lg"} maxLength={32}  type={"text"} defaultValue={this.state.name} autoFocus onBlur={(event)=> this.modifyBudgetCategoryName(event.target.value)}/> : <h3  className={"budget-category-name"} style={{cursor: "pointer"}} onClick={() => this.setState({showNameInput: true})}> {this.state.name}</h3>}
                        <div className={"budget-category-amount"}>
                            <h4 >
                                {formatter.format(this.state.amount)}
                            </h4>
                        </div>
                    </Stack>

                </div>
                <div className={"budget-category-item-panel"}>
                    {(this.state.items.length !== 0) ?
                        this.state.items.map((item) => {
                            //todo: fix changeState() function in budgetClass
                        return <BudgetCategoryItem
                            draftMode={false}
                            item={item} category={this.state.id}
                            unallocatedExpenses={this.props.unallocatedExpenses}
                            categoryTotal={this.state.amount} changeTotal={(newTotal)=>this.changeState(newTotal)}
                            handleOnNameChange={this.modifyBudgetItemName}
                            modifyBudgetItemAmount={(id,amount)=>this.modifyBudgetItemAmount(id,amount)}
                            modifyExpenseAllocation= {async (id, changes)=>this.modifyExpenseAllocation(id, changes)}
                            handleRemoveBudgetItem={(id)=>this.handleRemoveBudgetItem(id)}
                        />
                    }) :
                        <center>
                            <h6 style={{color: "#ffffff", justifyContent: "center", margin :10}}>No items in this category</h6>
                        </center>
                    }
                </div>
                <div className={"budget-category-modification-buttongroup"}>
                    <Stack direction={"row"} spacing={20}>
                        <Button variant={"text"} startIcon={<AddIcon />} onClick={()=>this.handleAddBudgetItem()}>
                            Add Item
                        </Button>
                        <Button variant="text" color="error" endIcon={<DeleteForeverIcon />} onClick={() => {

                            console.log("delete category");
                                this.props.removeBudgetCategory();

                        }}>
                            Delete Category
                        </Button>
                    </Stack>
                </div>
                </div>
            </div> }
            </div>
        );
    }
}

export default BudgetCategoryNG;
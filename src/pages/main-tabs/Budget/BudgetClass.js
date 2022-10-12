import React from 'react';
import {
    Badge, Button, FlexboxGrid, Message, Nav, Table
} from "rsuite";
import {database} from "../../../configs/firebaseConfig";
import {ref, onValue, update, get, child} from "firebase/database";
import {
    Button as ButtonMUI
} from "@mui/material";
import {AiOutlinePlus} from "react-icons/ai";
import {GiAbstract002, GiReceiveMoney, GiTakeMyMoney} from "react-icons/gi";
import './Budget.css';
import BudgetCategoryRender from "./BudgetCategoryRender";
import {formatter} from "./BudgetFormatters"
import DatePickerTC from "../calendar/DatePickerTC";
import Chart from "react-apexcharts";
import {ScaleLoader} from "react-spinners";
import BudgetActionMenu from "./BudgetActionMenu";
import ScrollTo from "react-scroll-into-view";
import IncomeCategory from "./IncomeCategory";
import BudgetCategory from "./BudgetCategory";
import {getMonthlyBudgetFromFireStore} from "../../auth/firebase";

class BudgetClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            unallocatedExpenses: [["expense1", {name: "Test Expense", amount: 70}]],
            draftMode: false,
            validMonth: true,
            tempMonthView: "current",
            monthSelected: {
                month: new Date().getMonth(),
                year: new Date().getFullYear()
            },
            monthView: "current", loading: true, chartState: {
                series: [], options: {
                    labels: [], legend: {
                        width: 410, position: 'bottom', show: false,
                    }, colors: [], chart: {
                        type: 'donut', background: 'rgba(37,41,62,0)'
                    }, theme: {
                        mode: 'light', palette: 'palette1'
                    }, responsive: [{
                        breakpoint: 480, options: {
                            chart: {
                                width: 889
                            }, legend: {
                                position: 'bottom', show: false
                            }
                        }, theme: 'light'
                    }]
                }
            }, currentView: "Budget", lastSaved: "None", selectedCategory: "None", current: {
                categories: [], budgetCatMap: {}, totalAmountAllocated: 0, income: {
                    categories: [], oneTime: [], totalAmountAllocated: 0,
                }
            }, next: {
                categories: [], budgetCatMap: {}, totalAmountAllocated: 0, income: {
                    categories: [], oneTime: [], totalAmountAllocated: 0,
                }
            }, previous: {
                categories: [], budgetCatMap: {}, totalAmountAllocated: 0, income: {
                    categories: [], oneTime: [], totalAmountAllocated: 0,
                }
            }, draft: {
                categories: [], budgetCatMap: {}, totalAmountAllocated: 0, income: {
                    categories: [], oneTime: [], totalAmountAllocated: 0,
                }
            },
        }
    }

    //on component mount, initiate or refresh budget categories and income categories

    componentDidMount() {
        setTimeout(() => {
            //get budget categories from firebase so that each category can be updated when with is updated in the realtime database
            get(child(ref(database), "users/testUser")).then((snapshot) => {
                       let budgetCats;
//stores all budget categories
                let budgetCatMap;
//stores the mapping of budget categories to their names
                let chartValues;
//stores all the amounts allocated for each category so that the overview donut chart can display it
                let chartNames;
//stores all the names of the categories so that the overview donut chart can use it
                let chartColors;
//stores all the colors of the categories so that the overview donut chart can use it
                let totalAmountAllocated;
                let incomeCats;
//stores all separate use created income categories
                let oneTimeIncome;
//stores all one time income(misc income) categories
                let totalAmountAllocatedIncome;
//for users/testUser/current update state
                if (snapshot.exists()) {

                    console.log(typeof (snapshot.val().current["budgetCategories"]))
                    budgetCats = [];
                    budgetCatMap = {};
                    chartValues = [];
                    chartNames = [];
                    chartColors = [];
                    totalAmountAllocated = 0; //stores the total amount allocated for all categories to display in the overview
                    //using the response from the database, looping through each category and adding it to the arrays created above
                    Object.entries(snapshot.val().current["budgetCategories"]).forEach((category) => {
                        budgetCats.push(category[1]);
                        budgetCatMap[category[1].name] = category[1];
                        chartValues.push(category[1].amount);
                        chartNames.push(category[1].name);
                        chartColors.push(category[1].color);
                        totalAmountAllocated += category[1].amount;
                    });
                    //modifying state with updated arrays so that the values that changed will trigger a rerender
                    incomeCats = [];
                    oneTimeIncome = [];
                    totalAmountAllocatedIncome = 0;
                    Object.entries(snapshot.val().current["incomeCategories"]).forEach((category) => {
                        //using the response from the database, looping through each category and adding it to the arrays created above

                        totalAmountAllocatedIncome += parseFloat(category[1].amount);
                        if (category[1].type === "oneTime") oneTimeIncome.push(category[1]); else if (category[1].type === "category") incomeCats.push(category[1]);

                    })
                    this.setState({
                        current: {
                            ...this.state.current,
                            categories: budgetCats,
                            budgetCatMap: budgetCatMap,
                            totalAmountAllocated: totalAmountAllocated,
                            income: {
                                ...this.state[this.state.monthView].income,
                                categories: incomeCats,
                                oneTime: oneTimeIncome,
                                totalAmountAllocated: totalAmountAllocatedIncome,
                            },
                            series: chartValues, labels: chartNames, colors: chartColors,

                        }
                    })
                    //clear the arrays so that they can be used for the next month
                    budgetCats = [];
                    budgetCatMap = {};
                    chartValues = [];
                    chartNames = [];
                    chartColors = [];
                    totalAmountAllocated = 0;
                    incomeCats = [];
                    oneTimeIncome = [];
                    totalAmountAllocatedIncome = 0;

                    //for users/testUser/next update state
                    Object.entries(snapshot.val().next["budgetCategories"]).forEach((category) => {
                        budgetCats.push(category[1]);
                        budgetCatMap[category[1].name] = category[1];
                        chartValues.push(category[1].amount);
                        chartNames.push(category[1].name);
                        chartColors.push(category[1].color);
                        totalAmountAllocated += category[1].amount;
                    });
                    Object.entries(snapshot.val().next["incomeCategories"]).forEach((category) => {
                        totalAmountAllocatedIncome += parseFloat(category[1].amount);
                        if (category[1].type === "oneTime") oneTimeIncome.push(category[1]); else if (category[1].type === "category") incomeCats.push(category[1]);
                    })
                } else {
                    console.log("No data available");
                }

                this.setState({
                    next: {
                        ...this.state.next,
                        categories: budgetCats,
                        budgetCatMap: budgetCatMap,
                        totalAmountAllocated: totalAmountAllocated,
                        income: {
                            ...this.state.next.income,
                            categories: incomeCats,
                            oneTime: oneTimeIncome,
                            totalAmountAllocated: totalAmountAllocatedIncome,
                        },
                        series: chartValues, labels: chartNames, colors: chartColors,
                        }

                })

                //clear the arrays so that they can be used for the previous month
                budgetCats = [];
                budgetCatMap = {};
                chartValues = [];
                chartNames = [];
                chartColors = [];
                totalAmountAllocated = 0;
                incomeCats = [];
                oneTimeIncome = [];
                totalAmountAllocatedIncome = 0;

//for users/testUser/previous update state

                Object.entries(snapshot.val().previous["budgetCategories"]).forEach((category) => {
                    budgetCats.push(category[1]);
                    budgetCatMap[category[1].name] = category[1];
                    chartValues.push(category[1].amount);
                    chartNames.push(category[1].name);
                    chartColors.push(category[1].color);
                    totalAmountAllocated += category[1].amount;
                });

                Object.entries(snapshot.val().previous["incomeCategories"]).forEach((category) => {
                    totalAmountAllocatedIncome += parseFloat(category[1].amount);
                    if (category[1].type === "oneTime") oneTimeIncome.push(category[1]); else if (category[1].type === "category") incomeCats.push(category[1]);
                })

                this.setState({
                    previous: {
                        ...this.state.previous,
                        categories: budgetCats,
                        budgetCatMap: budgetCatMap,
                        totalAmountAllocated: totalAmountAllocated,
                        income: {
                            ...this.state.previous.income,
                            categories: incomeCats,
                            oneTime: oneTimeIncome,
                            totalAmountAllocated: totalAmountAllocatedIncome,
                        },
                        series: chartValues, labels: chartNames, colors: chartColors,
                        }

                })

                //clear the arrays so that they can be used for the draft month
                budgetCats = [];
                budgetCatMap = {};
                chartValues = [];
                chartNames = [];
                chartColors = [];
                totalAmountAllocated = 0;
                incomeCats = [];
                oneTimeIncome = [];
                totalAmountAllocatedIncome = 0;

                //for users/testUser/draft update state
                Object.entries(snapshot.val().draft["budgetCategories"]).forEach((category) => {
                    budgetCats.push(category[1]);
                    budgetCatMap[category[1].name] = category[1];
                    chartValues.push(category[1].amount);
                    chartNames.push(category[1].name);
                    chartColors.push(category[1].color);
                    totalAmountAllocated += category[1].amount;
                });

                Object.entries(snapshot.val().draft["incomeCategories"]).forEach((category) => {
                    totalAmountAllocatedIncome += parseFloat(category[1].amount);
                    if (category[1].type === "oneTime") oneTimeIncome.push(category[1]); else if (category[1].type === "category") incomeCats.push(category[1]);
                })

                this.setState({
                    draft: {
                        ...this.state.draft,
                        categories: budgetCats,
                        budgetCatMap: budgetCatMap,
                        totalAmountAllocated: totalAmountAllocated,
                        income: {
                            ...this.state.draft.income,
                            categories: incomeCats,
                            oneTime: oneTimeIncome,
                            totalAmountAllocated: totalAmountAllocatedIncome,
                        },
                        series: chartValues, labels: chartNames, colors: chartColors,
                        }

                })

                //read in unallocatedExpenses
                let  unallocatedExpenses = [];
                Object.entries(snapshot.val().unallocatedExpenses).map((expense) => {
                    unallocatedExpenses.push(expense);
                })
                console.log("unallocatedExpenses: ", unallocatedExpenses);
                this.setState({
                    unallocatedExpenses: unallocatedExpenses
                })
                this.setState({loading: false})//after loading is complete, set loading to false so that the loading spinner will disappear
            }, 0);
        }, 0);

    }

    /**
     * Function that is called when a user edits the name of a budget category.0
     * @param newName the new name of the category
     * @param address the address of the category in the RT database
     */
    handleOnNameChange(newName, category, id)
    {   console.log("id: " + id);
        setTimeout(() => { //set timeout so that the state is updated before the update is sent to the database
            console.log("category: " + category, "id: " + id);
            update(ref(database, `users/testUser/${this.state.monthView}/budgetCategories/${category}/items/${id}`), {name: newName,})  //update the name of the category in the database
                .catch((error) => {
                    console.error("Error updating name in ", `users/testUser/${this.state.monthView}/budgetCategories/${category}/items/${id}`, error);
                }).then(() => {
                console.log("Updated name in RTDB at", `users/testUser/${this.state.monthView}/budgetCategories/${category}/items/${id}`)

                //update the name of item with id in category with name category in categories
                this.setState({
                    /*[this.state.monthView]: {
                        ...this.state[this.state.monthView],
                        categories: this.state[this.state.monthView].categories.map((cat) => {
                            //console.log(cat, category);
                            if (cat.id === category) {
                                console.log("found category to update", cat.name)
                                return {
                                    ...cat,
                                    items: Object.entries(cat.items).map((item) => {
                                        if (item[1].id === id) {
                                            console.log("found item to update", item[1].name, "to", newName)
                                            return {
                                                ...item[1],
                                                name: newName,
                                            }
                                        } else return item[1];
                                    })
                                }
                            } else return cat;
                        })}*/
                        // [`${this.state.monthView}/categories/${category}/items/${id}/name`]: newName,
                    }, () => {
                        console.log(this.state)
                    }
                )

                console.log("state: ", this.state);
                });
        }, 0);
    }

    /**
     * Function that is called when a user edits the amount of a budget category.
     * @param newAmount the new amount allocated for the category
     * @param newTotal the new total amount allocated for all categories
     * @param cat the id of the category that is being updated
     * @param item the id of the item that is being updated
     */
    handleOnAmountChange(newAmount, newTotal, cat, item) {
        setTimeout(() => { //set timeout so that the state is updated before the update is sent to the database
            console.log(cat, item)
            const updates = {}; //stores the updates to be sent to the database
            updates[`users/${'testUser'}/${this.state.monthView}/budgetCategories/${cat}/amount`] = newTotal;
            updates[`users/${'testUser'}/${this.state.monthView}/budgetCategories/${cat}/items/${item}/amount`] = newAmount;
            //update chart
            let index = this.state[this.state.monthView].categories.findIndex((category) => category.id === cat);

            console.log(index);
            this.setState({
                [this.state.monthView]: {
                    ...this.state[this.state.monthView],
                    series: this.state[this.state.monthView].series.map((value, i) => {
                        if (i === index)
                        {
                            console.log("found index to update", value, "to", newTotal)
                            return newTotal;}
                        else return value;
                    })
                }
            })
            update(ref(database), updates)
                .catch((error) => {
                    console.error("Error updating amount", error.message);
                });
            this.setState({lastSaved: "Amount"}) //set the last saved state to amount so that the last saved message will display the amount
        }, 0);
    };

    /**
     * Function that is called when a user edits the amount of a budget category.
     * @param newAmount the new amount allocated for the category
     * @param newTotal the new total amount allocated for all categories
     * @param cat the id of the category that is being updated
     * @param item the id of the item that is being updated
     * @param type the type of item that is being updated (either "category" or "oneTime")
     */
    handleOnIncomeAmountChange(newAmount, newTotal, cat, item, type) {
        setTimeout(() => {
            const updates = {}; //stores the updates to be sent to the database
            if (type === "oneTime") updates[`users/${'man1'}/incomeCategories/${item}/amount`] = newAmount; else if (type === "category") {
                updates[`users/${'man1'}/incomeCategories/${cat}/amount`] = newTotal; //update the total amount allocated for the income category
                updates[`users/${'man1'}/incomeCategories/${cat}/items/${item}/amount`] = newAmount;
            }
            update(ref(database), updates) //update the amount of the category in the database
                .catch((error) => {
                    console.error("Error updating name", error);
                });
        }, 0);
    }

    handleExpenseAllocationChange(change){
        this.setState({unallocatedExpenses: change});
    }

    /**
     * Put the budget view into draft mode.
     */
    toggleDraftMode(bool) {
        //if the draft mode is already active, then set the draft mode to false
        console.log("toggle draft mode to ", bool)

        //set month view to draft
        if(bool)
            this.setState({tempMonthView: this.state.monthView, monthView: "draft", draftMode: true});
        else
            this.setState({monthView: this.state.tempMonthView, draftMode: false});
    }

    modifyStateForMonthView(month, year) {
        console.log("Month received: ", month, "Year received: ", year, "Current month: ", new Date().getMonth()+1, "Current year: ", new Date().getFullYear());
        //if the month is the current month, set the state to the current month

        if (year === new Date().getFullYear() && month === new Date().getMonth()+1) {
            console.log("setting state to current month")
            this.setState({monthView: "current", validMonth: true, monthSelected: {month: month, year: year}});
        }
        else if ((year === new Date().getFullYear() && month === new Date().getMonth() + 2) || (year === new Date().getFullYear() + 1 && month === 1 && new Date().getMonth() === 11)) {
            //if the month is the next month, set the state to the next month
            console.log("setting state to next month")
            this.setState({monthView: "next", validMonth: true, monthSelected: {month: month, year: year}});
        }
        else if ((year === new Date().getFullYear() && month === new Date().getMonth() ) || (year === new Date().getFullYear() - 1 && month === 12 && new Date().getMonth() === 0)) {
            //if the month is the previous month, set the state to the previous month
            console.log("setting state to past month")
            this.setState({monthView: "previous", validMonth: true, monthSelected: {month: month, year: year}});
        } else { //if the month is not the current, next, or previous month, set the state to the other month
            /*getMonthlyBudgetFromFireStore(month, year).then((snapshot) => {
                console.log("Snapshot from firestore: ", snapshot);
                if (snapshot === undefined) {
                    console.log("Snapshot is undefined, previous month not made previously");
                }
            });*/
            console.log ("Invalid month selected");
            this.setState({validMonth: false,  monthSelected: {month: month, year: year}});
        }


    }

    render() {
        let options={
            labels: this.state[this.state.monthView].labels , legend: {
                width: 410, position: 'bottom', show: false,
            }, colors: this.state[this.state.monthView].colors, chart: {
                type: 'donut', background: 'rgba(37,41,62,0)'
            }, theme: {
                mode: 'light', palette: 'palette1'
            }, responsive: [{
                breakpoint: 480, options: {
                    chart: {
                        width: 889
                    }, legend: {
                        position: 'bottom', show: false
                    }
                }, theme: 'light'
            }]
        };

        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        /*const ohNoGifs = [
            <img src={"https://i.giphy.com/media/j4l0mCdcTFRyY4Bc5s/giphy.webp"} height={250} alt={"gif"}/>,
            <img src={"https://i.giphy.com/media/hEwnTrYovTP5GHAeZp/giphy.webp"} height={250} alt={"gif"}/>,
            <img src={"https://i.giphy.com/media/kfS15Gnvf9UhkwafJn/giphy.webp"} height={250} alt={"gif"}/>,
            <img src={"https://i.giphy.com/media/j4l0mCdcTFRyY4Bc5s/giphy.webp"} height={250} alt={"gif"}/>,
            <img src={"https://i.giphy.com/media/XHdW0gCDj6KiFmKFCZ/giphy.webp"} height={250} alt={"gif"}/>,
            <img src={"https://i.giphy.com/media/XEyXIfu7IRQivZl1Mw/giphy.webp"} height={250} alt={"gif"}/>,
    ];*/
        return (<div>
            {(this.state.loading) ? <div style={{position: "fixed", top: "calc(50% - 50px)", left: "50%"}}>
                    <ScaleLoader width={15} height={50} color={"#fff"} loading={this.state.loading}/></div> :
                <div className={"box8"}>
                    <div className="budgetNavPanel">
                        {(!this.state.validMonth && !this.state.draftMode) ?  <div className={"budgetNavInvalidMonthNotice"}>
                            <h5>Fun Fact</h5>
                            <hr/>
                            <h7>Did you know that car payments could be one of the biggest things keeping you from being a millionaire. The average car payment in America is $532 a month. Invested monthly at a 9% annual return over 30 years, that's $2.27 million. </h7>
                        </div> : <div>
                        <div className={"budgetNavNavigationHeader"}>
                            <center>
                                <h4>Navigation</h4>
                            </center>
                        </div>
                        <center>
                            <Nav vertical appearance={"default"} style={{width: 240, marginTop: 60, height: "auto"}}
                                 activeKey={"Debt"} onSelect={value => {
                                console.log(value)
                            }}>
                                {this.state[this.state.monthView].categories.map(cat => {
                                    return <ScrollTo selector={`#${cat.id}`}
                                                     scrollOptions={{behavior: "smooth", block: "center"}}
                                                     style={{cursor: "pointer", marginBottom: 4}}>
                                        <Button appearance={"ghost"} size={"sm"}
                                                style={{
                                                    borderColor: cat.color, color: "#a3a8b2", background: "#1a1d24"
                                                }}>
                                            <Badge color="red"
                                                   style={{background: cat.color}}></Badge> {cat.name}
                                        </Button>
                                    </ScrollTo>
                                })}
                            </Nav>
                        </center>
                        </div>}

                        <BudgetActionMenu validMonth={this.state.validMonth} toggleDraftMode={(bool)=>this.toggleDraftMode(bool)}/>

                        <p style={{textAlign: "center", marginTop: 30, color: "#9b9b9b"}}>Last
                            Saved: {this.state.lastSaved}</p>
                    </div>


                    <div className="budgetScrollablePanel">
                        {(!this.state.validMonth && !this.state.draftMode) ? <div className={"budgetNotAvailablePanel"}>
                            <h1 style={{textAlign: "center", color: "#5690bc"}}>Uh oh!</h1>
                            <h5 style={{textAlign: "center", color: "#ffffff"}}>A budget document does not exist for the month of <b style={{color: "#5692be"}}>{months[this.state.monthSelected.month-1] + " " + this.state.monthSelected.year}</b>.</h5>
                                <div className={"budget-category-item"} style={{marginTop:20}}>

                            <center>
                                <img src={"https://media3.giphy.com/media/USUIWSteF8DJoc5Snd/giphy.gif?cid=790b7611df41144f49f38d108db3acaf013a537e64365cfa&rid=giphy.gif&ct=g"} height={250} alt={"gif"}/>
                            </center>
                                </div>
                            </div>: <div>
                        <center>
                            <Nav appearance="subtle" reversed activeKey={this.state.currentView} justified
                                 className={"budgetScrollableNav"}
                            style={{position: "fixed", top: 55}}
                            >
                                <Nav.Item eventKey={"Budget"} icon={<GiAbstract002/>} onSelect={() => {
                                    (this.state.currentView !== "Budget") ? this.setState({currentView: "Budget"}) : console.log("Already Selected")
                                }}>
                                    Expense Budget
                                </Nav.Item>
                                <Nav.Item eventKey={"Income"} icon={<GiReceiveMoney/>} onSelect={() => {
                                    (this.state.currentView !== "Income") ? this.setState({currentView: "Income"}) : console.log("Already Selected")
                                }}>Income Budget </Nav.Item>
                                <Nav.Item eventKey={"Both"} icon={<GiTakeMyMoney/>} onSelect={() => {
                                    (this.state.currentView !== "Both") ? this.setState({currentView: "Both"}) : console.log("Already Selected")
                                }}>Both</Nav.Item>
                            </Nav>
                        </center>
                        <div style={{paddingTop: 37}}>
                            {(this.state.monthView === "previous") ? <Message style={{marginRight: 15, marginLeft: 10, marginTop: 10}} closable showIcon type="warning" header="Warning">
                                You are viewing <b>last month's budget</b>. To view this month's budget, please select the current month from the date selector.
                            </Message>: null}
                            {(this.state.monthView === "next") ?<Message  style={{marginRight: 15, marginLeft: 10, marginTop: 10}} closable showIcon type="warning" header="Warning">
                                You are viewing <b>next month's budget</b>. To view this month's budget, please select the current month from the date selector.
                            </Message>: null}
                            {(this.state.currentView === "Both")?  <center>
                                <div style={{width: 115, height: 35, borderTopLeftRadius: 20, borderTopRightRadius: 20, marginTop: 10, background: "rgb(27,29,36)"}}>
                                    <h4 style={{textAlign: "center", color: "#fff"}}>Income</h4>
                                </div>
                            </center>: null}
                            {(this.state.currentView === "Income" || this.state.currentView === "Both") ?
                                <div key="One Time Income"  style={(this.state.currentView === "Income") ? {marginTop: 10} : null}>
                                    <IncomeCategory incomeState={this.state.income} handleAmountChange={this.handleOnIncomeAmountChange.bind()}></IncomeCategory>
                                </div>
                                : null}
                            {(this.state.currentView === "Both") ? <center>
                                <div style={{width: 130, height: 35, borderRadius: 20, marginTop: 10, background: "rgb(27,29,36)"}}>

                                    <h4 style={{textAlign: "center", color: "#fff"}}>Expenses</h4>

                                </div>
                            </center>: null}
                            {(this.state.currentView === "Budget" || this.state.currentView === "Both") ? <div>
                                {(this.state.monthView === "previous")?
                                    this.state.previous.categories.map(cat => {
                                        console.log(this.state.unallocatedExpenses, " <=")
                                        return  <div id={cat.id}>
                                                    <BudgetCategory
                                                    category={cat}
                                                    unallocatedExpenses={this.state.unallocatedExpenses}
                                                    updateUnallocatedExpenses={(changes)=>this.handleExpenseAllocationChange(changes)}
                                                    handleOnNameChange={async (name, category, id) => this.handleOnNameChange(name, category, id)}
                                                    handleOnAmountChange={(newAmount, newTotal, cat, item) => this.handleOnAmountChange(newAmount, newTotal, cat, item)}/>
                                                    draftMode={this.state.draftMode}
                                        </div>
                                    }) : null}
                                {(this.state.monthView === "current")?
                                    this.state.current.categories.map(cat => {
                                        return <div id={cat.id}><BudgetCategory category={cat}
                                                                                unallocatedExpenses={this.state.unallocatedExpenses}
                                                                                updateUnallocatedExpenses={(changes)=>this.handleExpenseAllocationChange(changes)}
                                                                                handleOnNameChange={async (name, category, id) => this.handleOnNameChange(name, category,id)}
                                                                                handleOnAmountChange={(newAmount, newTotal, cat, item) => this.handleOnAmountChange(newAmount, newTotal, cat, item)}/></div>
                                    }) : null}
                                {(this.state.monthView === "next")?
                                    this.state.next.categories.map(cat => {
                                        return <div id={cat.id}><BudgetCategory category={cat}
                                                                                unallocatedExpenses={this.state.unallocatedExpenses}
                                                                                updateUnallocatedExpenses={(changes)=>this.handleExpenseAllocationChange(changes)}
                                                                                handleOnNameChange={async (name, category, id) => this.handleOnNameChange(name, category, id)}
                                                                                handleOnAmountChange={(newAmount, newTotal, cat, item) => this.handleOnAmountChange(newAmount, newTotal, cat, item)}/></div>
                                    }) : null}
                                {(this.state.monthView === "draft")?
                                    this.state.draft.categories.map(cat => {
                                        return <div id={cat.id}><BudgetCategory draftMode={true} category={cat}
                                                                                unallocatedExpenses={this.state.unallocatedExpenses} handleOnNameChange={async (name,  category, id) => this.handleOnNameChange(name, category , id)}  handleOnAmountChange={(newAmount, newTotal, cat, item) => this.handleOnAmountChange(newAmount, newTotal, cat, item)}/></div>
                                    }) : null}



                            </div>: null}

                            <center>
                                <ButtonMUI variant="outlined" style={{
                                    width: "calc(100% - 300px)",
                                    borderRadius: 20,
                                    background: 'rgb(26,29,36)',
                                    margin: 10,
                                    padding: 10
                                }}

                                           startIcon={<AiOutlinePlus/>} size={"large"}>
                                    Add new category
                                </ButtonMUI></center>
                        </div></div>}

                    </div>

                    <div className={"budgetNavigationInfoPanel"}>
                        <center>
                            <div className={"budgetDateSelector"}>
                                {(this.state.draftMode)? <h2 style={{color: "#e8eaef"}}>Draft Mode</h2> :<DatePickerTC
                                    modifyStateForMonthView={(month, year) => this.modifyStateForMonthView(month, year)}></DatePickerTC> }

                            </div>
                            {(!this.state.validMonth && !this.state.draftMode)? <div className={"budgetInfoInvalidMonthNotice"}>
                                <h5>You may only select a budget for the previous, present, or upcoming month unless you have made budget for a previous month before.</h5>
                                <hr/>
                                <h7>Note: Previous budgets that are older than 1 month will become read only. Check below for a list of budgets that are available</h7>
                            </div> : <div>
                            <div className={"budgetNavigationInfoPanelMain"}>
                                <div style={{height: 285}}>
                                    <div style={{width: 350, marginLeft: 0}}>

                                        <Chart
                                            options={options}
                                            series={this.state[this.state.monthView].series} type="donut"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <FlexboxGrid align="top" justify={"center"}>
                                        <FlexboxGrid.Item colspan={7}>
                                            <div style={{
                                                height: 65,
                                                background: "rgb(28,157,2)",
                                                marginTop: 15,
                                                marginBottom: 15,
                                                marginLeft: 5,
                                                marginRight: 5,
                                                borderRadius: 15,
                                                textAlign: "center"
                                            }}>
                                                <h6>Income</h6>
                                                <div style={{
                                                    background: "#1a1a1a", width: "auto"
                                                }}>
                                                    <h4>
                                                        <b>{formatter.format(this.state[this.state.monthView].income.totalAmountAllocated)}</b>
                                                    </h4>
                                                </div>
                                            </div>
                                        </FlexboxGrid.Item>
                                        <FlexboxGrid.Item colspan={1.75}>
                                            <center>
                                                <h2 style={{marginTop: 25}}>-</h2>
                                            </center>
                                        </FlexboxGrid.Item>
                                        <FlexboxGrid.Item colspan={7}>
                                            <div style={{
                                                height: 65,
                                                background: "rgb(169,0,0)",
                                                marginTop: 15,
                                                marginBottom: 15,
                                                marginRight: 5,
                                                marginLeft: 5,
                                                borderRadius: 15,
                                                textAlign: "center"
                                            }}>
                                                <h6>Expenses</h6>
                                                <div style={{
                                                    background: "#1a1a1a", width: "auto"
                                                }}>
                                                    <h4>
                                                        <b>{formatter.format(//sum up values in this.state.chartState.series
                                                            this.state[this.state.monthView].series.reduce((a, b) => a + b, 0))}</b>
                                                    </h4>
                                                </div>
                                            </div>
                                        </FlexboxGrid.Item>
                                        <FlexboxGrid.Item colspan={1.75}>
                                            <center>
                                                <h2 style={{marginTop: 30}}>=</h2>
                                            </center>
                                        </FlexboxGrid.Item>
                                        <FlexboxGrid.Item colspan={7}>
                                            <div style={{
                                                height: 65,
                                                background: "#3c3c48",
                                                marginTop: 15,
                                                marginBottom: 15,
                                                marginRight: 10,
                                                marginLeft: 5,
                                                borderRadius: 15,
                                                textAlign: "center"
                                            }}>
                                                <h6>Balance</h6>
                                                <div style={{
                                                    background: "rgb(26,26,26)", width: "auto",
                                                }}>
                                                    <h4 style={(this.state[this.state.monthView].income.totalAmountAllocated - this.state[this.state.monthView].series.reduce((a, b) => a + b, 0) >= 0) ? {color: "rgb(28,157,2)"} : {color: "rgb(169,0,0)"}}>
                                                        <b>{formatter.format(this.state[this.state.monthView].income.totalAmountAllocated - this.state[this.state.monthView].series.reduce((a, b) => a + b, 0))}</b>
                                                    </h4>
                                                </div>
                                            </div>
                                        </FlexboxGrid.Item>
                                    </FlexboxGrid>
                                </div>
                                <div>
                                    <Table
                                        height={400}
                                        data={this.state[this.state.monthView].categories}
                                        onRowClick={rowData => {
                                            console.log(rowData);
                                        }}
                                    >
                                        <Table.Column width={350}>
                                            <Table.HeaderCell>Category Name</Table.HeaderCell>
                                            <Table.Cell dataKey="name"/>
                                        </Table.Column>
                                        <Table.Column width={120} fixed="right">
                                            <Table.HeaderCell>Amount Allocated</Table.HeaderCell>
                                            <Table.Cell dataKey="amount"/>
                                        </Table.Column>
                                    </Table>
                                </div>
                            </div>
                            <BudgetCategoryRender
                                selectedCategory={this.state.selectedCategory}></BudgetCategoryRender>
                        </div>}
                        </center>
                    </div>
                    }
                </div>}
        </div>);
    }
}

export default BudgetClass;
import React from 'react';
import {
    Badge, Button, FlexboxGrid, Message, Nav, Notification, Grid, Row, Col, Divider
} from "rsuite";
import {database} from "../../../configs/firebaseConfig";
import {ref, update, get, child, set} from "firebase/database";
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
import BudgetCategoryNG from "./BudgetCategoryNG";
import IncomeCategoryNG from "./IncomeCategoryNG";
import {Button as ButtonMUI} from "@mui/material";
import {auth} from "../../../configs/firebaseConfig";

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
            }, currentView: "Budget", lastSaved: "None", selectedCategory: "None",
            current: {
                 income: {
                    categories: [], oneTime: [],
                },removedCategories: []
            }, next: {
                idList: [], income: {
                    categories: [], oneTime: []
                },removedCategories: []
            }, previous: {
                 idList: [], income: {
                    categories: [], oneTime: []
                },removedCategories: []
            }, draft: {
                  idList: [], income: {
                    categories: [], oneTime: []
                },removedCategories: []
            }
        }
    }

    //toaster is used to display messages to the user.


    errorMessageNotification = (errorMsg) => (
        <Notification type={'error'} header={'Sign in Error'}  duration={15000} closable>
            <h6>The following error occurred while trying to sign you in:</h6>
            <h8>{errorMsg}</h8>
        </Notification>
    )

    //on component mount, initiate or refresh budget categories and income categories
    componentDidMount() {
        setTimeout(() => {
            //get budget categories from firebase so that each category can be updated when with is updated in the realtime database
            get(child(ref(database), `users/${auth.currentUser.uid}`)).then((snapshot) => {
//stores the mapping of budget categories to their names
                let chartValues;
//stores all the amounts allocated for each category so that the overview donut chart can display it
                let chartNames;
//stores all the names of the categories so that the overview donut chart can use it
                let chartColors;
//stores all the colors of the categories so that the overview donut chart can use it
                let incomeCats;
//stores all separate use created income categories
                let oneTimeIncome;
//stores all one time income(misc income) categories

                let idList;

                let amount;
//for users/${auth.currentUser.uid}/current update state
                if (snapshot.exists()) {
                    chartValues = [];
                    chartNames = [];
                    chartColors = [];
                    idList = [];
                    //using the response from the database, looping through each category and adding it to the arrays created above
                    Object.entries(snapshot.val().current["budgetCategories"]).forEach((category) => {
                        idList.push(category[0]);
                        //go through each item in category and add to ammount then push to chartValues
                        amount = 0;
                        Object.entries(category[1].items).forEach((item) => {
                            console.log(item[1].amount)
                            amount += parseFloat(item[1].amount);
                        })
                        chartValues.push(amount);
                        chartNames.push(category[1].name);
                        chartColors.push(category[1].color);
                    });
                    //modifying state with updated arrays so that the values that changed will trigger a rerender
                    incomeCats = [];
                    oneTimeIncome = [];
                    Object.entries(snapshot.val().current["incomeCategories"]).forEach((category) => {
                        //using the response from the database, looping through each category and adding it to the arrays created above

                        if (category[1].type === "oneTime") oneTimeIncome.push(category[1]); else if (category[1].type === "category") incomeCats.push(category[1]);

                    })
                    this.setState({
                        current: {
                            ...this.state.current,
                            income: {
                                ...this.state[this.state.monthView].income,

                                oneTime: oneTimeIncome,
                            },
                            series: chartValues, labels: chartNames, colors: chartColors, idList: idList

                        }
                    })
                    //clear the arrays so that they can be used for the next month
                    chartValues = [];
                    chartNames = [];
                    chartColors = [];
                    incomeCats = [];
                    oneTimeIncome = [];

                    idList = [];

                    //for users/${auth.currentUser.uid}/next update state
                    Object.entries(snapshot.val().next["budgetCategories"]).forEach((category) => {
                        idList.push(category[0]);
                        amount = 0;
                        Object.entries(category[1].items).forEach((item) => {
                            console.log(item[1].amount)
                            amount += parseFloat(item[1].amount);
                        })
                        chartValues.push(amount);
                        chartNames.push(category[1].name);
                        chartColors.push(category[1].color);
                    });
                    Object.entries(snapshot.val().next["incomeCategories"]).forEach((category) => {
                        if (category[1].type === "oneTime") oneTimeIncome.push(category[1]); else if (category[1].type === "category") incomeCats.push(category[1]);
                    })
                } else {
                    console.log("No data available");
                }

                this.setState({
                    next: {
                        ...this.state.next,
                        income: {
                            ...this.state.next.income,
                            oneTime: oneTimeIncome,
                        },
                        series: chartValues, labels: chartNames, colors: chartColors, idList: idList
                        }

                })

                //clear the arrays so that they can be used for the previous month
                chartValues = [];
                chartNames = [];
                chartColors = [];
                incomeCats = [];
                oneTimeIncome = [];
                idList =[];

//for users/${auth.currentUser.uid}/previous update state

                Object.entries(snapshot.val().previous["budgetCategories"]).forEach((category) => {
                    amount = 0;
                    Object.entries(category[1].items).forEach((item) => {
                        console.log(item[1].amount)
                        amount += parseFloat(item[1].amount);
                    })
                    chartValues.push(amount);
                    chartNames.push(category[1].name);
                    chartColors.push(category[1].color);
                    idList.push(category[0]);
                });

                Object.entries(snapshot.val().previous["incomeCategories"]).forEach((category) => {
                    if (category[1].type === "oneTime") oneTimeIncome.push(category[1]); else if (category[1].type === "category") incomeCats.push(category[1]);
                })

                this.setState({
                    previous: {
                        ...this.state.previous,
                        income: {
                            ...this.state.previous.income,
                            oneTime: oneTimeIncome,
                        },
                        series: chartValues, labels: chartNames, colors: chartColors, idList: idList
                        }

                })

                //clear the arrays so that they can be used for the draft month
                chartValues = [];
                chartNames = [];
                chartColors = [];
                incomeCats = [];
                oneTimeIncome = [];
                idList = [];
                //for users/${auth.currentUser.uid}/draft update state
                Object.entries(snapshot.val().draft["budgetCategories"]).forEach((category) => {
                    idList.push(category[0]);
                    amount = 0;
                    Object.entries(category[1].items).forEach((item) => {
                        console.log(item[1].amount)
                        amount += parseFloat(item[1].amount);
                    })
                    chartValues.push(amount);
                    chartNames.push(category[1].name);
                    chartColors.push(category[1].color);
                });

                Object.entries(snapshot.val().draft["incomeCategories"]).forEach((category) => {
                    if (category[1].type === "oneTime") oneTimeIncome.push(category[1]); else if (category[1].type === "category") incomeCats.push(category[1]);
                })


                this.setState({
                    draft: {
                        ...this.state.draft,
                        income: {
                            ...this.state.draft.income,
                            oneTime: oneTimeIncome,
                        },
                        series: chartValues, labels: chartNames, colors: chartColors, idList: idList
                        }

                })

                //read in unallocatedExpenses
                let  unallocatedExpenses = [];
                if(snapshot.val().unallocatedExpenses !== undefined) {
                    Object.entries(snapshot.val().unallocatedExpenses).map((expense) => {
                        unallocatedExpenses.push(expense);
                    })
                    this.setState({
                        unallocatedExpenses: unallocatedExpenses
                    })
                }
                this.setState({loading: false})//after loading is complete, set loading to false so that the loading spinner will disappear
                //push toast notification to let user know that the data has been loaded

            }, 0);
        }, 0);

    }

    getTotalIncome = () => {
        let total = 0;
        Object.entries(this.state[this.state.monthView].income.oneTime).forEach((income) => {
            total += parseFloat(income[1].amount);
        })
        Object.entries(this.state[this.state.monthView].income.categories).forEach((income) => {
            total += parseFloat(income[1].amount);
        })
        return total;
    }

    modifyBudgetCategoryName(id,name){
        //update the name in the labels array
        let index = this.state[this.state.monthView].idList.indexOf(id);
        this.setState({
            [this.state.monthView]: {
                ...this.state[this.state.monthView],
                labels: this.state[this.state.monthView].labels.map((value, i) => {
                    if (i === index)
                        return name;
                    else
                        return value;
                })
            },

        })
    }

    modifyBudgetCategoryAmount(id,amount){
        //update the amount in the series array
        let index = this.state[this.state.monthView].idList.indexOf(id);
        this.setState({
            [this.state.monthView]: {
                ...this.state[this.state.monthView],
                series: this.state[this.state.monthView].series.map((value, i) => {
                    if (i === index)
                        return amount;
                    else
                        return value;
                })
            },

        })
    }

    modifyBudgetCategoryColor(id,color){
        //update the color in the colors array
        let index = this.state[this.state.monthView].idList.indexOf(id);
        this.setState({
            [this.state.monthView]: {
                ...this.state[this.state.monthView],
                colors: this.state[this.state.monthView].colors.map((value, i) => {
                    if (i === index)
                        return color;
                    else
                        return value;
                })
            },

        })
    }

    removeBudgetCategory(id){
        //update in firebase
        console.log("removing budget category with id: " + id);
        if(id === undefined || id === null || id === "") {
        console.log("unable to remove budget category with id: " + id);
        return;
        }
        update(ref(database),{[`users/${auth.currentUser.uid}/` + this.state.monthView + "/budgetCategories/" + id]: null}).then(()=> {
            console.log("SUCCESS: removed budget category from RTDB at users/${auth.currentUser.uid}/" + this.state.monthView + "/budgetCategories/" + id);
            let index = this.state[this.state.monthView].idList.indexOf(id) ;
            console.log("current state of idList: " + this.state[this.state.monthView].idList);
            this.setState({
                [this.state.monthView]: {
                    ...this.state[this.state.monthView],
                    series: this.state[this.state.monthView].series.filter((value, i) => i !== index),
                    labels: this.state[this.state.monthView].labels.filter((value, i) => i !== index),
                    colors: this.state[this.state.monthView].colors.filter((value, i) => i !== index),
                    idList: this.state[this.state.monthView].idList.filter((value) => value !== id)
                }
            },
                () => {
                console.log("updated state of idList: " + this.state[this.state.monthView].idList);
            })

        }).catch(
            (error) => {
                console.log("ERROR: could not remove budget category from RTDB at users/${auth.currentUser.uid}/" + this.state.monthView + "/budgetCategories/" + id);
                console.log(error);
            }
        )



        //remove the category from the labels array


    }


    addBudgetCategory(){
        //add the category to the labels array
        let newId = "newItem"+ (parseInt(this.state[this.state.monthView].idList.length)+1);

        //update in firebase
        update(ref(database),{[`users/${auth.currentUser.uid}/` + this.state.monthView + "/budgetCategories/" + newId]:
                {name: "Unnamed Category", amount: 0, color: "#000000", id: newId}})
            .then(()=> {
                this.setState({

                    [this.state.monthView]: {
                        ...this.state[this.state.monthView],
                        labels: [...this.state[this.state.monthView].labels, "Unnamed Category"],
                        series: [...this.state[this.state.monthView].series, 0],
                        colors: [...this.state[this.state.monthView].colors, "#000000"],
                        idList: [...this.state[this.state.monthView].idList, newId]
                    },
                })
                console.log("SUCCESS: added budget category to RTDB at users/${auth.currentUser.uid}/" + this.state.monthView + "/budgetCategories/" + newId);
        })
            .catch(
            (error) => {
                console.log("ERROR: could not add budget category to RTDB at users/${auth.currentUser.uid}/" + this.state.monthView + "/budgetCategories/" + newId);
                console.log(error);
            }
        )



    }

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
            }
            update(ref(database), updates) //update the amount of the category in the database
                .catch((error) => {
                    console.error("Error updating name", error);
                });
        }, 0);
    }

    toObject(arr) {
        let rv = {};
        for (let i = 0; i < arr.length; ++i){
            console.log(arr[i][1]);
            rv[arr[i][1].id] = arr[i][1];
        }
        return rv;
    }


    async handleExpenseAllocationChange(change){
        //updates the unallocated expenses in firebase so that data is persistent
        console.log(change);
        await set(ref(database, `users/${auth.currentUser.uid}/unallocatedExpenses`), this.toObject(change))
            .then(()=> {
                    console.log("SUCCESS: updated unallocated expenses in RTDB at", `users/${auth.currentUser.uid}/unallocatedExpenses`);
                    this.setState({lastSaved: "Expense Allocation", unallocatedExpenses: change})
            }
            )
            .catch((error) => {
                    console.error("Error updating unallocatedExpenses", error);
                    //push toasts here
                    this.props.toaster.push(this.errorMessageNotification());
                }
            );
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

    //add items to unallocated expensee list
    addToUnallocatedExpenses(toAdd){
        //toAdd is an array of objects
        let newUnallocatedExpenses = this.state.unallocatedExpenses;
        console.log("current unallocated expenses: ", newUnallocatedExpenses);
        for (let i = 0; i < toAdd.length; i++){
            //add item if it does not already exist
            if(!newUnallocatedExpenses.some((item) => item[1].id === toAdd[i].id)){
                newUnallocatedExpenses.push([toAdd[i].id, toAdd[i]]);
                console.log("added ", toAdd[i].id, " to unallocated expenses");
            }
            else console.log("item already exists in unallocated expenses");

        }
        console.log("new unallocated expenses: ", newUnallocatedExpenses);
        //this.setState({unallocatedExpenses: newUnallocatedExpenses});
    }

    modifyStateForMonthView(month, year) {
        //console.log("Month received: ", month, "Year received: ", year, "Current month: ", new Date().getMonth()+1, "Current year: ", new Date().getFullYear());
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
//            console.log("setting state to past month")
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

    //make component unmount when called

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
                            {this.state[this.state.monthView].idList.map((label, index) => {
                                //console.log("label: ", label, "index: ", index);
                                return <ScrollTo selector={`#${label}`}
                                                 scrollOptions={{behavior: "smooth", block: "center"}}
                                                 style={{cursor: "pointer", marginBottom: 4}}>
                                    <Button appearance={"ghost"} size={"sm"}
                                            style={{
                                                borderColor: this.state[this.state.monthView].colors[index], color: "#a3a8b2", background: "#1a1d24"
                                            }}>
                                        <Badge color="red"
                                               style={{background: this.state[this.state.monthView].colors[index]}}></Badge> {this.state[this.state.monthView].labels[index]}
                                    </Button>
                                </ScrollTo>
                            })}
                            </Nav>
                        </center>
                        </div>}

                        <BudgetActionMenu validMonth={this.state.validMonth} toggleDraftMode={(bool)=>this.toggleDraftMode(bool)}
                                          addToUnallocatedExpenses={(add) => this.addToUnallocatedExpenses(add)}
                        />

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
                            style={{position: "fixed", top: 55, zIndex: 5}}
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


                                    {(this.state.monthView === "current")? <IncomeCategoryNG
                                        address={`users/${auth.currentUser.uid}/current/incomeCategories/`}
                                    />: null}
                                    {(this.state.monthView === "next")? <IncomeCategoryNG
                                        address={`users/${auth.currentUser.uid}/next/incomeCategories/`}
                                    />: null}
                                    {(this.state.monthView === "previous")? <IncomeCategoryNG
                                        address={`users/${auth.currentUser.uid}/previous/incomeCategories/`}
                                    />: null}
                                    {(this.state.monthView === "draft")? <IncomeCategoryNG
                                        address={`users/${auth.currentUser.uid}/draft/oneTimeIncome/`}
                                    />: null}

                                </div>
                                : null}
                            {(this.state.currentView === "Both") ? <center>
                                <div style={{width: 130, height: 35, borderRadius: 20, marginTop: 10, background: "rgb(27,29,36)"}}>

                                    <h4 style={{textAlign: "center", color: "#fff"}}>Expenses</h4>

                                </div>
                            </center>: null}
                            {(this.state.currentView === "Budget" || this.state.currentView === "Both") ? <div>
                                {(this.state.monthView === "previous")?
                                    this.state.previous.idList.map((catID)=>{
                                        console.log("catID: " + catID)
                                        return  <div  id={catID}>

                                            <BudgetCategoryNG key={`${catID}div`}
                                                address={`users/${auth.currentUser.uid}/previous/budgetCategories/${catID}`}
                                                unallocatedExpenses={this.state.unallocatedExpenses}
                                                modifyBudgetCategoryName={async (id,name) => this.modifyBudgetCategoryName(id,name)}
                                                modifyBudgetCategoryAmount={async (id, amount) => this.modifyBudgetCategoryAmount(id, amount)}
                                                updateUnallocatedExpenses={async (change)=> this.handleExpenseAllocationChange(change)}
                                                removeBudgetCategory={async () => this.removeBudgetCategory(catID)}
                                                modifyBudgetCategoryColor={async (id, color) => this.modifyBudgetCategoryColor(id, color)}
                                                              draft={false}

                                            />

                                        </div>
                                    }) : null}

                                {(this.state.monthView === "current")?
                                    this.state.current.idList.map((catID)=>{
                                        console.log(catID)
                                        return  <div id={catID}>
                                            <BudgetCategoryNG key={`${catID}div`}
                                                toaster={this.props.toaster}
                                                address={`users/${auth.currentUser.uid}/current/budgetCategories/${catID}`}
                                                unallocatedExpenses={this.state.unallocatedExpenses}
                                                modifyBudgetCategoryName={async (id,name) => this.modifyBudgetCategoryName(id,name)}
                                                modifyBudgetCategoryAmount={async (id, amount) => this.modifyBudgetCategoryAmount(id, amount)}
                                                updateUnallocatedExpenses={async (change)=> this.handleExpenseAllocationChange(change)}
                                                removeBudgetCategory={async () => this.removeBudgetCategory(catID)}
                                                              modifyBudgetCategoryColor={async (id, color) => this.modifyBudgetCategoryColor(id, color)}
                                                              draft={false}

                                            />
                                        </div>
                                    }) : null}

                                {(this.state.monthView === "next")?
                                    this.state.next.idList.map((catID)=>{
                                        console.log(catID)
                                        return  <div id={catID}>
                                            <BudgetCategoryNG
                                                key={`${catID}div`}
                                                toaster={this.props.toaster}
                                                address={`users/${auth.currentUser.uid}/next/budgetCategories/${catID}`}
                                                unallocatedExpenses={this.state.unallocatedExpenses}
                                                modifyBudgetCategoryName={async (id,name) => this.modifyBudgetCategoryName(id,name)}
                                                modifyBudgetCategoryAmount={async (id, amount) => this.modifyBudgetCategoryAmount(id, amount)}
                                                updateUnallocatedExpenses={async (change)=> this.handleExpenseAllocationChange(change)}
                                                removeBudgetCategory={async () => this.removeBudgetCategory(catID)}
                                                modifyBudgetCategoryColor={async (id, color) => this.modifyBudgetCategoryColor(id, color)}
                                                draft={false}
                                            />


                                        </div>}) : null}


                                {(this.state.monthView === "draft")?
                                    this.state.draft.idList.map((catID)=>{
                                        console.log(catID)
                                        return  <div id={catID}>
                                            <BudgetCategoryNG
                                                key={`${catID}div`}
                                                toaster={this.props.toaster}
                                                address={`users/${auth.currentUser.uid}/draft/budgetCategories/${catID}`}
                                                unallocatedExpenses={this.state.unallocatedExpenses}
                                                modifyBudgetCategoryName={async (id,name) => this.modifyBudgetCategoryName(id,name)}
                                                modifyBudgetCategoryAmount={async (id, amount) => this.modifyBudgetCategoryAmount(id, amount)}
                                                updateUnallocatedExpenses={(change)=> this.handleExpenseAllocationChange(change)}
                                                removeBudgetCategory={async () => this.removeBudgetCategory(catID)}
                                                modifyBudgetCategoryColor={async (id, color) => this.modifyBudgetCategoryColor(id, color)}
                                                draft={true}
                                            />

                                        </div>}) : null}



                            </div>: null}

                            <center>
                                <ButtonMUI variant="outlined" style={{
                                    width: "calc(100% - 300px)",
                                    borderRadius: 20,
                                    background: 'rgb(26,29,36)',
                                    margin: 10,
                                    padding: 10
                                }}

                                           startIcon={<AiOutlinePlus/>} size={"large"} onClick={async () => this.addBudgetCategory()}>
                                    Add new category
                                </ButtonMUI>

                            </center>
                        </div></div>}

                    </div>

                    <div className={"budgetNavigationInfoPanel"} style={{textAlign: "center"}}>

                            <div className={"budgetDateSelector"}>
                                {(this.state.draftMode)? <h2 style={{color: "#e8eaef"}}>Draft Mode</h2> :<DatePickerTC
                                    modifyStateForMonthView={(month, year) => this.modifyStateForMonthView(month, year)}></DatePickerTC> }

                            </div>

                            {(!this.state.validMonth && !this.state.draftMode)? <div className={"budgetInfoInvalidMonthNotice"} style={{justifyContent: "center"}}>
                                <h5>You may only select a budget for the previous, present, or upcoming month unless you have made budget for a previous month before.</h5>
                                <hr/>
                                <h7>Note: Previous budgets that are older than 1 month will become read only. Check below for a list of budgets that are available</h7>
                            </div> : <div>

                            <div className={"budgetNavigationInfoPanelMain"}  style={{textAlign: "center", overflowX: "hidden"}}>
                                <center>

                                <div style={{height: 285}}>
                                    <div style={{width: 350, marginLeft: 0}}>

                                        <Chart
                                            options={options}
                                            series={this.state[this.state.monthView].series} type="donut"
                                        />

                                    </div>
                                </div>
                            </center>
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
                                                        <b>{
                                                            formatter.format(this.getTotalIncome())
                                                        }</b>
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
                                                    <h4 style={(2323 - this.state[this.state.monthView].series.reduce((a, b) => a + b, 0) >= 0) ? {color: "rgb(28,157,2)"} : {color: "rgb(169,0,0)"}}>
                                                        <b>{formatter.format(this.getTotalIncome() - this.state[this.state.monthView].series.reduce((a, b) => a + b, 0))}</b>
                                                    </h4>
                                                </div>
                                            </div>
                                        </FlexboxGrid.Item>
                                    </FlexboxGrid>
                                </div>
                                <div>
                                    {this.state[this.state.monthView].labels.map((category, index) => {
                                        return  <Grid>
                                            <Divider style={{margin: 0, marginTop:5}}/>
                                                <Row >
                                                    <Col xs={9} md={9}>
                                                        <div style={{
                                                            marginTop: 5,
                                                            borderTopRightRadius: 15,
                                                            borderBottomRightRadius: 15,
                                                            textAlign: "center"
                                                        }}>
                                                            <h6>{category}</h6>
                                                        </div>
                                                    </Col>
                                                    <Col xs={9} md={3}>
                                                        <div style={{
                                                            marginTop: 5,
                                                            borderTopLeftRadius: 15,
                                                            borderBottomLeftRadius: 15,
                                                            textAlign: "center" ,
                                                            color: "#f00"
                                                        }}>
                                                            <h6>{formatter.format(this.state[this.state.monthView].series[index])}</h6>
                                                        </div>
                                                    </Col>

                                                </Row>

                                            </Grid>
                                    })}


                                </div>
                                <BudgetCategoryRender
                                    selectedCategory={this.state.selectedCategory}></BudgetCategoryRender>

                            </div>
                        </div>}
                    </div>
                    }
                </div>}
        </div>);
    }
}

export default BudgetClass;

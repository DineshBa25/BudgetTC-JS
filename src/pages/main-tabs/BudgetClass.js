import React from 'react';
import {Badge, Button, FlexboxGrid, IconButton, Message, Nav, Stack} from "rsuite";

import {database} from "../../configs/firebaseConfig";
import {ref, onValue, update} from "firebase/database";
import {
    Button as ButtonMUI,
    Card,
    CardContent,
    InputAdornment,
    OutlinedInput,
    Paper,
    Table as TableMUI,
    TableBody,
    TableContainer,
    TableHead,
    TextField
} from "@mui/material";
import {AiOutlinePlus} from "react-icons/ai";
import {GiAbstract002, GiReceiveMoney, GiTakeMyMoney} from "react-icons/gi";
import './Budget.css';
import BudgetCategoryRender from "./BudgetCategoryRender";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import {StyledTableRow, StyledTableCell, formatter} from "./BudgetCategory"
import DatePickerTC from "./DatePickerTC";
import Chart from "react-apexcharts";
import {ScaleLoader} from "react-spinners";
import BudgetActionMenu from "./BudgetActionMenu";
import ScrollTo from "react-scroll-into-view";
import IncomeCategory from "./IncomeCategory";

class BudgetClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [], selectedCategory: "None", totalAmountAllocated: 0, chartState: {

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
            }, loading: true, currentView: "Budget", lastSaved: "None", income: {
                categories: [],
                oneTime: [],
                totalAmountAllocated: 0,

        }}


    }

    //on component mount, initiate or refresh budget categories and income categories
    componentDidMount() {
        setTimeout(() =>{
            //get budget categories from firebase so that each category can be updated when with is updated in the realtime database
        onValue(ref(database, "users/man1/budgetCategories"), snapshot => {
            let budgetCats = []; //stores all budget categories
            let chartValues = []; //stores all the amounts allocated for each category so that the overview donut chart can display it
            let chartNames = []; //stores all the names of the categories so that the overview donut chart can use it
            let chartColors = []; //stores all the colors of the categories so that the overview donut chart can use it
            let totalAmountAllocated = 0; //stores the total amount allocated for all categories to display in the overview
            //using the response from the database, looping through each category and adding it to the arrays created above
            snapshot.forEach(snap => {
                budgetCats.push(snap.val());
                chartValues.push(parseFloat(snap.val().amount));
                chartNames.push(snap.val().name);
                chartColors.push(snap.val().color);
                totalAmountAllocated += parseFloat(snap.val().amount);
            });
            //modifying state with updated arrays so that the values that changed will trigger a rerender
            this.setState({
                categories: budgetCats, totalAmountAllocated: totalAmountAllocated, chartState: {
                    series: chartValues, options: {
                        ...this.state.chartState.options, labels: chartNames, colors: chartColors,
                    }
                }
            });
        });
        //get income categories from firebase so that each category can be updated when with is updated in the realtime database
            onValue(ref(database,  "users/man1/incomeCategories"), snapshot => {
                let incomeCats = []; //stores all seperate use created income categories
                let oneTimeIncome = []; //stores all one time income(misc income) categories
                let totalAmountAllocated = 0;
                //using the response from the database, looping through each category and adding it to the arrays created above
                snapshot.forEach(snap => {
                    totalAmountAllocated += parseFloat(snap.val().amount);
                    if(snap.val().type === "oneTime")
                        oneTimeIncome.push(snap.val());
                    else if(snap.val().type === "category")
                        incomeCats.push(snap.val());
            });
            //modifying state with updated arrays so that the values that changed will trigger a rerender
            this.setState({
                income: {
                    categories: incomeCats,
                    oneTime: oneTimeIncome,
                    totalAmountAllocated: totalAmountAllocated
                }
            });
                this.setState({loading: false})//after loading is complete, set loading to false so that the loading spinner will disappear
            }, 0);
    }, 0);

    }

    /**
     * Function that is called when a user edits the name of a budget category.0
     * @param newName the new name of the category
     * @param address the address of the category in the RT database
     */
    handleOnNameChange(newName, address) {
        setTimeout(() => { //set timeout so that the state is updated before the update is sent to the database
            update(ref(database, address), {
                name: newName,
            })
                .then(() => {
                    console.log(newName, " updated successfully in ", address);
                    this.setState({lastSaved: Date.now()});
                })
                .catch((error) => {
                    console.error("Error updating name in ", address, error);
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
       setTimeout(() => {
        const updates = {}; //stores the updates to be sent to the database
        console.log(newAmount, newTotal, cat, item);
        //console.log(this.state.categories[item])
        updates['users/' + 'man1' + '/budgetCategories/' + cat + '/amount'] = newTotal;
        updates['users/' + 'man1' + '/budgetCategories/' + cat + '/items/' + item + '/amount'] = newAmount;
        update(ref(database), updates)
            .then(() => {
                console.log(newAmount, " updated successfully");
                this.setState({lastSaved: Date.now()});
            })
            .catch((error) => {
                console.error("Error updating name", error);
            });

        console.log(updates);}, 0);

    }


    setSelectedCategory(category) {
        this.setState({selectedCategory: category});
    }


    render() {

        return (<div>
                {(this.state.loading) ? <div style={{position: "fixed", top: "calc(50% - 50px)", left: "50%"}}>
                        <ScaleLoader width={15} height={50} color={"#fff"} loading={this.state.loading}/></div> :
                    <div className={"box8"}>
                        <div className="budgetNavPanel">
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
                                    {this.state.categories.map(cat => {
                                        return <ScrollTo selector={`#${cat.id}`}
                                                         scrollOptions={{behavior: "smooth", block: "center"}}
                                                         style={{cursor: "pointer", marginBottom: 4}}>
                                            <Button appearance={"ghost"} size={"sm"}
                                                    style={{borderColor: cat.color, color: "#a3a8b2", background: "#1a1d24"}}>
                                                <Badge color="red"
                                                       style={{background: cat.color}}></Badge> {cat.name}
                                            </Button>
                                        </ScrollTo>
                                    })}
                                </Nav>

                                <BudgetActionMenu/>

                            </center>
                            <p style={{textAlign: "center", marginTop: 30, color: "#9b9b9b"}}>Last Saved: {this.state.lastSaved}</p>
                        </div>
                        <div className="budgetScrollablePanel">
                            <center>
                                <Nav appearance="subtle" reversed activeKey={this.state.currentView} justified
                                     style={{
                                         width: "calc(100% - 950px)",
                                         zIndex: 1,
                                         position: "fixed",
                                         alignItems: "center",
                                         textAlign: "center",
                                         background: "#1b1d24",
                                         marginLeft: 100,
                                         borderBottomLeftRadius: 20,
                                         borderBottomRightRadius: 20,
                                         boxShadow: "0px 4px 10px rgba(0,0,0,.5), 0px 4px 10px rgba(0,0,0,.5)",
                                     }}>
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
                                {(this.state.currentView === "Both")?  <center>
                                    <div style={{width: 115, height: 35, borderTopLeftRadius: 20, borderTopRightRadius: 20, marginTop: 10, background: "rgb(27,29,36)"}}>
                                        <h4 style={{textAlign: "center", color: "#fff"}}>Income</h4>
                                    </div>
                                </center>: null}
                                {(this.state.currentView === "Income" || this.state.currentView === "Both") ?
                                    <div key="One Time Income"  style={(this.state.currentView === "Income") ? {marginTop: 10} : null}>
                                        <IncomeCategory incomeState={this.state.income}></IncomeCategory>
                                    </div>
                                    : null}

                                {(this.state.currentView === "Both") ? <center>
                                    <div style={{width: 130, height: 35, borderRadius: 20, marginTop: 10, background: "rgb(27,29,36)"}}>

                                        <h4 style={{textAlign: "center", color: "#fff"}}>Expenses</h4>

                                    </div>
                                </center>: null}
                                {(this.state.currentView === "Budget" || this.state.currentView === "Both") ? <div>

                                    {this.state.categories.map(cat => {
                                    //console.log(Object.entries(cat.items));
                                    return (<div key={cat.name}>

                                            <Card key={cat.id} id={cat.id} sx={{minWidth: 275}}
                                                  style={{
                                                      marginTop: 7, marginRight: 5, borderRadius: 7, background: "rgb(26,29,36)"
                                                  }}>
                                                <CardContent>
                                                    <Stack direction={"row"} spacing={5} >

                                                        <Message
                                                            style={{height: 20, marginTop: 5, width: 20,  background: cat.color}}/>
                                                        <h3 style={{padding: 0, height: 40, margin: 0, color: "#80858e"}}>
                                                            {cat.name}
                                                        </h3>

                                                    </Stack>


                                                    <TableContainer component={Paper}>
                                                        <TableMUI sx={{minWidth: 400}} size="small"
                                                                  aria-label="a dense table">
                                                            <TableHead>
                                                            <StyledTableRow>
                                                                    <StyledTableCell style={{background: "#b10303"}}><b>Subcategory/Expense</b></StyledTableCell>
                                                                    <StyledTableCell align="center" style={{background:  "#b10303"}} >Amount
                                                                        Allocated</StyledTableCell>
                                                                    <StyledTableCell align="right"
                                                                                     style={{width: 120, background:  "#b10303"}}/>
                                                                </StyledTableRow>
                                                            </TableHead>
                                                            <TableBody>

                                                                {Object.entries(cat.items).map((value) => {

                                                                    return (<StyledTableRow
                                                                            key={value[1].name}
                                                                            onClick={() => {
                                                                                console.log(value[1].name, " clicked");
                                                                                this.setSelectedCategory({
                                                                                    name: value[1].name,
                                                                                    amount: value[1].amount,
                                                                                    expenseList: value[1].expenseList,
                                                                                    color: cat.color
                                                                                });
                                                                            }}>
                                                                            <StyledTableCell component="th"
                                                                                             scope="row">
                                                                                <TextField id="standard-basic"
                                                                                           variant="standard"
                                                                                           fullWidth size={"small"}
                                                                                           defaultValue={value[1].name}
                                                                                           key={value[1].id}
                                                                                           onBlur={async event => this.handleOnNameChange(event.target.value, 'users/' + 'man1' + '/budgetCategories/' + cat.id + '/items/' + value[1].id)}

                                                                                />
                                                                            </StyledTableCell>
                                                                            <StyledTableCell align="center">
                                                                                <OutlinedInput
                                                                                    id="outlined-adornment-amount"
                                                                                    startAdornment={<InputAdornment
                                                                                        position="start">$</InputAdornment>}
                                                                                    style={{
                                                                                        top: '0px',
                                                                                        width: "40%",
                                                                                        minWidth: 120
                                                                                    }}

                                                                                    size={"small"}
                                                                                    defaultValue={value[1].amount}
                                                                                    onBlur={async event => this.handleOnAmountChange(event.target.value, parseFloat(cat.amount) - parseFloat(value[1].amount) + parseFloat(event.target.value), cat.id, value[1].id)}

                                                                                />
                                                                            </StyledTableCell>
                                                                            <StyledTableCell align="right">

                                                                                <IconButton aria-label="edit"
                                                                                            style={{
                                                                                                marginRight: 0,
                                                                                                background: "rgba(0,0,0,0)"
                                                                                            }}
                                                                                            icon={<EditOutlinedIcon
                                                                                                color={"primary"}/>}/>
                                                                                <IconButton aria-label="delete"
                                                                                            style={{background: "rgba(0,0,0,0)"}}
                                                                                            icon={<DeleteIcon
                                                                                                color={"error"}/>}/>

                                                                            </StyledTableCell>
                                                                        </StyledTableRow>

                                                                    );

                                                                })}
                                                            </TableBody>
                                                        </TableMUI>
                                                    </TableContainer>
                                                    <center>
                                                        <ButtonMUI variant="outlined" color={'info'}
                                                                   style={{top: 10}}
                                                                   startIcon={<AiOutlinePlus/>}>
                                                            Add Item
                                                        </ButtonMUI>
                                                    </center>
                                                </CardContent>
                                            </Card>
                                        </div>

                                    );
                                    })}</div> : null}

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
                            </div>
                        </div>
                        <div className={"budgetNavigationInfoPanel"}>
                            <center>
                                <div className={"budgetDateSelector"}>
                                    <DatePickerTC></DatePickerTC>
                                </div>

                                <div style={{height: 285}}>
                                    <div style={{width: 350, marginLeft: 0, marginTop: 100}}>

                                        <Chart
                                            options={this.state.chartState.options}
                                            series={this.state.chartState.series} type="donut"
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
                                                    <h4><b>{formatter.format(this.state.income.totalAmountAllocated)}</b></h4>
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
                                                    <h4><b>{formatter.format(this.state.totalAmountAllocated)}</b>
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
                                                    <h4 style={(this.state.totalAmountAllocated-this.state.income.totalAmountAllocated >= 0)? {color: "rgb(28,157,2)"}: {color: "rgb(169,0,0)" }}><b>{formatter.format(this.state.totalAmountAllocated-this.state.income.totalAmountAllocated)}</b></h4>
                                                </div>
                                            </div>
                                        </FlexboxGrid.Item>
                                    </FlexboxGrid>
                                </div>
                                <BudgetCategoryRender
                                    selectedCategory={this.state.selectedCategory}></BudgetCategoryRender>
                            </center>
                        </div>
                        }
                    </div>}
            </div>);

    }


}

export default BudgetClass;
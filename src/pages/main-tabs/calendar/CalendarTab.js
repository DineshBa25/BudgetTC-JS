import React from 'react';
import {Badge, Button, ButtonGroup, Calendar, Divider, IconButton, Panel, Popover, Steps, Tag, Whisper} from "rsuite";
import {
    Alert,
    InputAdornment,
    OutlinedInput,
    Snackbar,
    Stack,
    TextField,
    ToggleButton,
    ToggleButtonGroup
} from "@mui/material";
import Typography from "@mui/material/Typography";
import List from "rsuite/List";
import EditIcon from "@rsuite/icons/Edit";
import * as dateFns from "date-fns";

let themeSet = "dark"
const CalendarTab = () => {
    const [dateSelected, setDateSelected] = React.useState("Select a Date");
    const [dateSelected1, setDateSelected1] = React.useState("Select a Date");

    function viewerFormat(dateString) {
        const splitDateSting = dateString.toDateString().toLowerCase().split(" ");

        const daysDict = {
            "mon": "Monday",
            "tue": "Tuesday",
            "wed": "Wednesday",
            "thu": "Thursday",
            "fri": "Friday",
            "sat": "Saturday",
            "sun": "Sunday"
        };
        const monthsDict = {
            "jan": "January",
            "feb": "February",
            "mar": "March",
            "apr": "April",
            "may": "May",
            "jun": "June",
            "jul": "July",
            "aug": "August",
            "sep": "September",
            "oct": "October",
            "nov": "November",
            "dec": "December"
        };
        return (
            <center>
                <h2>
                    {daysDict[splitDateSting[0]]},
                </h2>
                <h2>
                    {monthsDict[splitDateSting[1]]} {splitDateSting[2]}, {splitDateSting[3]}
                </h2>
            </center>);

    }

    function getTodoList(date) {
        const day = dateFns.getDate(date);

        switch (day) {
            case 3:
                return [
                    {title: 'Lastpass Renews', price: 36.45, simpleTitle: 'Lastpass', colorState: 'cyan'},
                    {title: 'Geico Charges', price: 114.26, simpleTitle: 'Geico', colorState: 'red'},

                ];
            case 5:
                return [
                    {title: 'Chegg Renews', price: 15.99, simpleTitle: 'Chegg', colorState: 'cyan'},
                    {title: 'Motortrend Renews', price: 4.99, simpleTitle: 'Motortrend', colorState: 'cyan'},

                ];
            case 6:
                return [
                    {title: 'Vacation Goal Ends', price: 0, simpleTitle: 'Vacation Goal-End', colorState: 'green'}

                ];
            case 8:
                return [
                    {title: 'Cable TV Renews', price: 78.54, simpleTitle: 'Cable TV', colorState: 'cyan'},

                ];
            case 10:
                return [
                    {
                        title: 'Amazon Music Unlimited Renews',
                        price: 0.99,
                        simpleTitle: 'Amazon Music',
                        colorState: 'cyan'
                    },
                    {
                        title: 'Accord Payment Charges', price:
                            540.48, simpleTitle: 'Accord Pay.', colorState: 'red'
                    },

                ];
            case 15:
                return [
                    {title: 'Hulu Renews', price: 7.99, simpleTitle: 'Hulu', colorState: 'cyan'},
                    {title: 'Spotify Renews', price: 3.99, simpleTitle: 'Spotify', colorState: 'cyan'},
                    {title: 'Amazon Renews', price: 12.99, simpleTitle: 'Amazon', colorState: 'cyan'},
                    {
                        title: 'Basket-Ball Game fund Deadline',
                        price: 0,
                        simpleTitle: 'Basket Ball Game Fund',
                        colorState: 'green'
                    }
                ];
            case 16:
                return [
                    {title: 'Netflix Renews', price: 16.99, simpleTitle: 'Netflix', colorState: 'cyan'},
                    {title: 'Statefarm Charges', price: 178.87, simpleTitle: 'Statefarm', colorState: 'red'},

                ];
            case 17:
                return [
                    {title: 'Electricity Bill Charges', price: 128.59, simpleTitle: 'Elec. Bill', colorState: 'red'}

                ];
            case 19:
                return [
                    {title: 'Pet Insurance renews', price: 36.5, simpleTitle: 'Pet Insur.', colorState: 'red'}

                ];
            case 23:
                return [
                    {title: 'DSC renews', price: 12.54, simpleTitle: 'DSC', colorState: 'cyan'}

                ];
            case 27:
                return [
                    {
                        title: 'Volkswagen Golf GTI Payment Charges',
                        price: 450.65,
                        simpleTitle: 'VW Golf Payment',
                        colorState: 'red'
                    }

                ];
            default:
                return [];
        }
    }

    function renderCell(date) {
        const list = getTodoList(date);
        const displayList = list.filter((item, index) => index < 2);

        if (list.length) {
            const moreCount = list.length - displayList.length;
            const moreItem = (
                <Whisper
                    placement="top"
                    trigger="click"
                    speaker={
                        <Popover>
                            {list.map((item, index) => (
                                <p key={index}>
                                    {item.title}
                                </p>
                            ))}
                        </Popover>
                    }
                >
                    <Button appearance={"link"}>{moreCount} more</Button>
                </Whisper>
            );

            return (
                <Stack spacing={0.25} direction={"column"}>
                    {displayList.map((item) => (
                        <Tag color={item.colorState} size={"sm"} onCl>
                             <span
                                 style={{
                                     color: '#0a0a0a',
                                     fontSize: 11
                                 }}
                             >
                                 <b>{item.simpleTitle}</b>
                             </span>
                        </Tag>
                    ))}
                    {moreCount ? moreItem : null}
                </Stack>
            );
        }

        return null;
    }

    return (
        <div className={"box8"}>
            <div className="test1" style={{
                background: themeSet === "dark" ? "rgba(21,23,31,0.89)" : "#ececf1",
                marginLeft: 10,
                marginTop: 10,
                marginBottom: 10,
                width: 390,
                borderRadius: 7
            }}>
                <div className={"header"}>
                    <center>
                        <Typography variant="h4" gutterBottom component="div">
                            {dateSelected}
                        </Typography>
                    </center>
                </div>
                <Divider variant="middle"/>
                <div className={"box9"}>
                    <List bordered>
                        {getTodoList(dateSelected1).map((item, index) => (

                            <List.Item key={item['title']} index={index + 1}>
                                <IconButton color={"primary"} placement={"right"} icon={<EditIcon/>}
                                            size={"sm"}/> &nbsp;<Badge
                                color={item['colorState']}/> &nbsp;{item['title']}   &nbsp; {(item["price"] <= 0) ? "" :
                                <span style={{
                                    color: "red",
                                    fontSize: 13
                                }}><b>(${item['price']})</b></span>}

                            </List.Item>))}
                    </List>
                </div>
                <Divider variant="middle"/>
                <AddWidget/>
            </div>

            <div className="test2" style={{
                background: themeSet === "dark" ? "rgba(21,23,31,0.65)" : "#f8f8f8",
                marginTop: 10,
                marginBottom: 10,
                marginRight: 10,
                width: "calc(100% - 420px)",
                height: "calc(100%- 800px)",
                borderRadius: 7
            }}>
                <Calendar onSelect={(date: Date) => setDateSelected1(date)}
                          onChange={(date: Date) => setDateSelected(viewerFormat(date))} renderCell={renderCell}/>
            </div>

        </div>
    )
}

function AddWidget() {
    const [step, setStep] = React.useState(0);
    const [open, setOpen] = React.useState(false);

    const onChange = nextStep => {
        setStep(nextStep < 0 ? 0 : nextStep > 4 ? 4 : nextStep);
    };


    const onNext = () => onChange(step + 1);
    const onPrevious = () => onChange(step - 1);


    const questionsDict = {
        "0": "What type of event is this?",
        "1": "What type of Goal is this?",
        "2": "What is the Name of this goal?",
        "3": "How much do you aim to save for this goal",
        "4": "What is the timeframe of {this} goal?",
        "5": "What type of expense is this?",
        "6": "What is the cost of [this expense]",
        "7": "How often is this expense charged?",
        "8": "when is this expense charged?",
    };
    const [alignment, setAlignment] = React.useState('web');

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
        console.log(newAlignment);
    };
    const handleClick1 = () => {
        setOpen(true);
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };


    const testElementDict = {
        "0":
            <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                onChange={handleChange}
                fullWidth={true}
            >
                <ToggleButton value="Goal">Goal</ToggleButton>
                <ToggleButton value="Expense">Expense</ToggleButton>
            </ToggleButtonGroup>
        ,
        "1":
            <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                onChange={handleChange}
                fullWidth={true}
            >
                <ToggleButton value="Short Term">Short Term</ToggleButton>
                <ToggleButton value="Long Term">Long Term</ToggleButton>
            </ToggleButtonGroup>
        ,
        "2":
            <TextField id="Goal Name" label="Goal Name" variant="outlined" fullWidth/>
        ,
        "3":
            <OutlinedInput
                id="outlined-adornment-amount"
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                style={{top: '0px'}}
                fullWidth
            />,

    };

    return (
        <div>
            <div className={"widget"}>
                <center>
                    <h6>Add to calendar</h6>
                </center>

                <div>
                    <div className={"stepper"}>
                        <Steps current={step} s>
                            <Steps.Item/>
                            <Steps.Item/>
                            <Steps.Item/>
                            <Steps.Item/>
                            <Steps.Item/>
                        </Steps>
                    </div>
                    <Panel header={questionsDict[(step).toString()]}>
                        {testElementDict[step]}
                    </Panel>


                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}
                              anchorOrigin={{vertical: "bottom", horizontal: "right"}}>
                        <Alert onClose={handleClose} severity="success" sx={{width: '100%'}}>
                            Added to Calendar
                        </Alert>
                    </Snackbar>

                </div>
            </div>
            <hr/>
            <ButtonGroup>
                <Button onClick={onPrevious} disabled={step === 0}>
                    Previous
                </Button>
                <Button onClick={onNext} disabled={step === 4}>
                    Next
                </Button>
            </ButtonGroup>
            <Button style={{left: "190px"}} onClick={handleClick1} disabled={step !== 4}
                    appearance="primary">
                Submit
            </Button>
        </div>
    );
}

export default CalendarTab
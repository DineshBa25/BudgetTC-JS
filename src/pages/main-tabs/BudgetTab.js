import React, {useEffect} from 'react';
import {RingLoader} from "react-spinners";
import {
    Button as ButtonMUI,
    Card,
    CardContent, InputAdornment, OutlinedInput, Paper,
    SpeedDial,
    SpeedDialIcon, Table as TableMUI, TableBody,
    TableCell,
    tableCellClasses, TableContainer, TableHead, TableRow,
    TextField
} from "@mui/material";
import Typography from "@mui/material/Typography";
import {Badge, IconButton, Message} from "rsuite";
import {AiOutlinePlus} from "react-icons/ai";
import {LocalizationProvider, StaticDatePicker} from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {isWeekend} from "date-fns";
import Chart from "react-apexcharts";
import List from "rsuite/List";
import {styled} from "@mui/material/styles";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/Delete";

let themeSet = 'dark'
const BudgetTab = () => {
    const [value, setValue] = React.useState(new Date());
    const [loading, setLoading] = React.useState(true);
    const data2 = {
        label: [
            {
                name: "transportation",
                fullName: "Transportation",
                color: "#ffff00",
                categories: [
                    createData('AAA Road Side Assistance', 20.00),
                    createData('Car Maintenance Fund', 135.00),
                    createData('Car Related Fee\'s (Toll, Registration, etc', 60.00),
                    createData('Gasoline', 140.00),
                    createData('Honda Civic Payment', 415.00),
                    createData('Metro Bus Membership', 20.00),
                    createData('Statefarm Car Insurance', 154.99),
                    createData('Volkswagen Golf GTi Payment', 450.00),
                ]
            },

            {
                name: "personalFunMoney",
                fullName: "Personal and Fun Money",
                color: "#ff0015",
                categories: [
                    createData('Amazon Subscription', 12.99),
                    createData('Bali Vacation Fund', 400.0),
                    createData('Dollar Shave Club Subscription', 127.64),
                    createData('Hulu Subscription', 5.79),
                    createData('LastPass Subscription', 4),
                    createData('Netflix Subscription', 10.99),
                    createData('Spotify Subscription', 4.99),
                    createData('Technology Fund', 150),
                    createData('Tx -> Colorado Road Trip Fund', 300.00),
                ]
            },

            {
                name: "food",
                fullName: "Food",
                color: "#7dff00",
                categories: [
                    createData('Coffee Shops', 35),
                    createData('Fast Food', 35),
                    createData('Groceries', 550),
                    createData('Restaurants', 150),
                ]
            },
            {
                name: "clothing",
                fullName: "Clothing",
                color: "#ff8000",
                categories: [
                    createData('Adult Clothing', 135),
                    createData('Dry Cleaning', 15),
                    createData('Kids Clothing', 70),
                ]
            },
            {
                name: "debt",
                fullName: "Debt",
                color: "#a100ff",
                categories: [
                    createData('Credit Card Debt', 167.0),
                    createData('Medical Debt', 332.0),
                    createData('Personal Loans', 17),
                    createData('Student Loans', 550.0),
                ]
            },
            {
                name: "gifts",
                fullName: "Gifts, Charity and Donations",
                color: "#00ff9d",
                categories: [
                    createData('American Red Cross Donation', 167.0),
                    createData('American Society for Deaf Children Donation', 200.0),
                    createData('Holiday Gift Fund', 50.0),
                    createData('Miscellaneous Gift Fund', 50.0),
                ]
            },
            {
                name: "pets",
                fullName: "Animal Care",
                color: "#a0ff00",
                categories: [
                    createData('Aggie\'s  Pet Medication', 9.0),
                    createData('Muffy\'s Pet Aggie\'s Toys', 25.0),
                    createData('Muffy\'s and Aggie\'s Pet Food', 65.0),
                    createData('Pet Insurance', 35.0),
                    createData('Veterinarian Visits', 50.0),

                ]
            },
            {
                name: "housing",
                fullName: "Housing",
                color: "#006fff",
                categories: [
                    createData('ADT Home Security', 14.37),
                    createData('Cleaning Supplies', 15.0),
                    createData('Electricity', 142.0),
                    createData('Furniture', 280.0),
                    createData('Home Decor', 100.0),
                    createData('Home Insurance', 367.0),
                    createData('Home Maintenance/Repair Fund', 340.0),
                    createData('Home Upgrade Fund', 170.0),
                    createData('Homeowners association dues', 89.0),
                    createData('Lawn Mower Fund', 75.0),
                    createData('Mortgage', 1670.0),
                    createData('Natural Gas', 21.0),
                    createData('GREENCARE Lawn Care', 67.0),
                    createData('MISC Tools', 55.0),
                    createData('Water Bill', 121.0),

                ]
            },
            {
                name: "kids",
                fullName: "Kids",
                color: "#ff0099",
                categories: [
                    createData('Baby Sitter Fund', 200.37),
                    createData('Extra-Curricular Activities', 40.0),
                    createData('Kid A\'s Allowance', 20.0),
                    createData('Kid B\'s Diapers', 195.0),
                    createData('Kid B\'s Allowance', 75.0),
                    createData('Toys', 25),
                ]
            },
            {
                name: "medical",
                fullName: "Medical",
                color: "#ffcc00",
                categories: [
                    createData('Eye Contacts', 40.37),
                    createData('Dentist Visits', 65.0),
                    createData('Doctor Visits', 50.0),
                    createData('Glass Fund', 35.0),
                    createData('Kid A\'s Orthodontist Payments', 150.0),
                    createData('Medications', 35),
                    createData('Optometrist Visits', 75.0),
                    createData('Vitamins/Supplements', 15.0),
                ]
            }


        ]
    };


    const state = {

        series: [44, 55, 41, 17, 15],
        options: {
            labels: ["Transportation", "Personal and fun money", "Food", "Clothing", "Debt", "Gifts, Charity...", "Animal Care", "Housing", "Kids", "Medical"],
            legend: {
                width: 150
            },
            chart: {
                type: 'donut',
                theme: 'dark',
                background: 'rgba(0,0,0,0)'
            },
            theme: {
                mode: 'dark',
                palette: 'palette1'
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 889
                    },
                    legend: {
                        position: 'bottom',
                        show: false
                    }
                },
                theme: 'dark'
            }]
        }
    };

    const feedbackData = ['Excessive spending in housing', 'The Bali vacation fund has not be contributed to in 2 months, consider removing it', 'Your car payment (Volkswagen GTI) is taking up 20% of your income', "Consider cutting out coffee from you budget, it can save you $8657 over the next 5 years."];

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false)
        }, 150)
    }, []);


    return (
        <div>
            {loading ? (<div style={{position: "fixed", top: "calc(50% - 100px)", left: "calc(50% - 100px)"}}>
                <RingLoader size={200} color={"#fff"} loading={loading}/></div>) : (
                <div className={"box8"}>
                    <div className="budgetScrollable" style={{width: "calc(100% - 485px)"}}>
                        {data2.label.map((row) => (
                            <Card key={row.name} sx={{minWidth: 275}}
                                  style={{margin: 10, borderRadius: 7, background: "rgba(30,31,40,0.92)"}}>
                                <CardContent>
                                    <Typography sx={{fontSize: 25}} variant={"h6"} gutterBottom>
                                        {row.fullName}
                                    </Typography>

                                    <Message style={{height: 15, background: row.color}}/>

                                    <SampleTable rows={row.categories}/>

                                    <center>
                                        <ButtonMUI variant="outlined" color={'info'} style={{top: 10}}
                                                   startIcon={<AiOutlinePlus/>}>
                                            Add Item
                                        </ButtonMUI>
                                    </center>
                                </CardContent>
                            </Card>
                        ))}
                        <SpeedDial
                            ariaLabel="SpeedDial basic example"
                            sx={{position: 'absolute', bottom: 70, right: 30}}
                            icon={<SpeedDialIcon/>}
                        />
                    </div>
                    <div className="test1" style={{
                        background: themeSet === "dark" ? "#292934" : "#ececf1",
                        marginLeft: 10,
                        marginTop: 10,
                        marginBottom: 10,
                        width: "475px",
                        borderRadius: 7,
                        overflowY: "hidden",
                        overflowX: "hidden"
                    }}>
                        <div className={"dateSelect"} style={{height: 'auto'}}>
                            <center>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <StaticDatePicker
                                        toolbarTitle={"Select Month"}
                                        views={['year', 'month']}
                                        orientation="landscape"
                                        openTo="month"
                                        value={value}
                                        shouldDisableDate={isWeekend}
                                        onChange={(newValue) => {
                                            setValue(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                        loading={true}
                                        open={true}
                                        disableOpenPicker={true}
                                    />
                                </LocalizationProvider>
                            </center>
                        </div>
                        <div className={"chart"} style={{height: 285}}>
                            <div style={{height: 275, width: 475, marginLeft: 0, marginTop: 0}}>
                                <Chart
                                    options={state.options} series={state.series} type="donut"
                                />
                            </div>
                        </div>
                        <div className={"feedbackList"}>
                            <center>
                                <Typography variant="h6" gutterBottom component="div" style={{top: 20}}>
                                    Suggestive Feedback
                                </Typography>
                            </center>
                        </div>
                        <div className={"feedback"}>
                            <List bordered>
                                {feedbackData.map((item, index) => (

                                    <List.Item key={index} index={index}>
                                        <Badge color={item['red']}/>&nbsp;
                                        {item}
                                    </List.Item>
                                ))}
                            </List>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );


}


function createData(name, amountAllocated) {
    return {name, amountAllocated};
}


function SampleTable(rows) {
    const StyledTableCell = styled(TableCell)(({theme}) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: "#191c1e",
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(() => ({
        '&:nth-of-type(odd)': {},
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));
    return (
        <TableContainer component={Paper}>
            <TableMUI sx={{minWidth: 650}} size="small" aria-label="a dense table">
                <TableHead>
                    <StyledTableRow>
                        <StyledTableCell><b>Subcategory/Expense</b></StyledTableCell>
                        <StyledTableCell align="center">Amount Allocated</StyledTableCell>
                        <StyledTableCell align="right"/>
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    {rows.rows.map((row) => (
                        <StyledTableRow
                            key={row.name}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <StyledTableCell component="th" scope="row">
                                <TextField id="standard-basic" variant="standard" fullWidth size={"small"}
                                           defaultValue={row.name}/>
                            </StyledTableCell>
                            <StyledTableCell align="center"><OutlinedInput
                                id="outlined-adornment-amount"
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                style={{top: '0px'}}

                                size={"small"}
                                defaultValue={row.amountAllocated}
                            /> </StyledTableCell>
                            <StyledTableCell align="right">

                                <IconButton aria-label="edit" style={{marginRight: 0, background: "rgba(0,0,0,0)"}}
                                            icon={<EditOutlinedIcon color={"primary"}/>}/>
                                <IconButton aria-label="delete" style={{background: "rgba(0,0,0,0)"}}
                                            icon={<DeleteIcon color={"error"}/>}/>

                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </TableMUI>
        </TableContainer>
    );
}

export default BudgetTab
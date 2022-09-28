import React from "react";
import {
    Button,
    ButtonToolbar, Checkbox, CheckboxGroup,
    Divider,
    Dropdown,
    Form, Input,
    InputNumber, Panel, Schema,
    Table,
    Stack
} from "rsuite";
import Chart from "react-apexcharts";
import {ValueType} from "rsuite/Radio";
import {store} from "../../../redux/store";
import {setUserDataInFireStore} from "../../auth/firebase";
import {AutoAffordabilityCalcInput, AutoAffordabilityCalcView} from "./AutoAffordabilityCalc";


let theme = "dark";


function ToolsTab() {
    const [activeWhichCalc, setActiveWhichCalc] = React.useState('Select a Calculator');
    const [activeFormData, setActiveFormData] = React.useState('No data');
    return (
        <div className={"box8"}>
        <div className="test1"  style={{background: theme === "dark"? "rgba(21,23,31,0.96)": "#ececf1", marginLeft: 10, marginTop:10, marginBottom: 10, width: 390, borderRadius: 7}}>
            <center>
                <Dropdown title={activeWhichCalc} size={"lg"} activeKey="a"  onSelect={setActiveWhichCalc} appearance="ghost" style={{marginTop:15}}>
                    <Dropdown.Item eventKey="Retirement Calculator (Roth 401K)">Retirement Calculator (Roth 401K)</Dropdown.Item>
                    <Dropdown.Item eventKey="Loan Payment Calculator">Loan Payment Calculator</Dropdown.Item>
                    <Dropdown.Item eventKey="Auto Affordability Calculator">Auto Affordability Calculator</Dropdown.Item>
                    <Dropdown.Item eventKey="Home Affordability Calculator">Home Affordability Calculator</Dropdown.Item>
                </Dropdown>
            </center>
            <hr style={{marginBottom: 0}}/>
            <div  className={"vScrollGradient"} style={{ height: "calc(100% - 78px)", marginTop: 0, overflowY: "auto", paddingTop: 20, paddingBottom: 20}}>
                <WhichCalc activeWhichCalc={activeWhichCalc}  setActiveFormData={setActiveFormData}/>
            </div>
            </div>

        <div className="test2" style={{background: theme === "dark"? "rgba(30,31,40,0.8)": "#f8f8f8", marginTop: 10, marginBottom:10, marginLeft:0, marginRight: 10, width: "calc(100% - 420px)", height: "calc(100%- 800px)",borderRadius: 7}}>
            <WhichInfoDisplay activeWhichCalc={activeWhichCalc} activeFormData={activeFormData}/>
        </div>

    </div>
    );

}
function WhichCalc({activeWhichCalc, setActiveFormData}){
    console.log("WhichCalc: "+ activeWhichCalc)
    if(activeWhichCalc === "Retirement Calculator (Roth 401K)"){
        return(

            <RetirementCalculator setActiveFormData={setActiveFormData}/>
        )
    }
    else if(activeWhichCalc === "Auto Affordability Calculator"){
        return(
            <AutoAffordabilityCalcInput setActiveFormData={setActiveFormData}/>);
    }
    else return(
        <center>
            <h5>Select a calculator above.</h5>
        </center>)
}

function WhichInfoDisplay({activeWhichCalc, activeFormData}){
    console.log("Which Info Display: "+ activeWhichCalc)
    if(activeWhichCalc === "Retirement Calculator (Roth 401K)"){
        return(
            <InvestmentInfoDisplay activeFormData={activeFormData}/>
        )
    }
    else if(activeWhichCalc === "Auto Affordability Calculator") {
        return (
            <AutoAffordabilityCalcView activeFormData={activeFormData}/>
        )
    }
    else return(
        <center>
            <h5 style={{marginTop:20}}>Select a calculator.</h5>
        </center>)
}


const { StringType, NumberType } = Schema.Types;

const model = Schema.Model({
    CurrentAge: NumberType()
        .range(5,122)
        .isRequired('This field is required.'),
    RetirementAge: NumberType()
        .range(4,121)
        .isRequired('This field is required.'),

    CurrentSavings: NumberType('Please enter a valid number.')
        .max(20000000,"Your current savings cannot be above $20 million"),

    Salary: NumberType("Please enter a valid wage")
        .max(2000000, "Enter a salary below 2 million"),
    SalaryIncrease: NumberType("Please enter a valid percent (ex. \"2.5\")")
        .max(25, "Enter a salary growth below 25%"),
    ContributionOfSalary: NumberType("Please enter the a valid percentage"),
    ExpectedContribution: StringType()
        .addRule((value) => {
            console.log(value.toString());

            return value.toString() !== 'Maxed' && value.toString() <= 2000;

        }, 'You cannot contribute more than $2000')
        .isRequired('This field is required.'),
    ExpectedReturn: NumberType()
        .max(35, "Your return cannot be above 35%. That would be insane!")
        .isRequired('This field is required.'),
    ExpectedInflation: NumberType()
        .max(7, "Inflation cannot be above 7%. That would cause chaos!")


});

const TextField = React.forwardRef((props, ref) => {
    const { name, label, accepter, prefix,postfix, ...rest } = props;
    return (
        <Form.Group controlId={`${name}-4`} ref={ref}>
            <Form.ControlLabel>{label} </Form.ControlLabel>
            <Form.Control name={name} prefix={prefix} postfix={postfix} accepter={accepter} errorPlacement={"bottomEnd"} {...rest} style={{width: 155}}/>

        </Form.Group>
    );
});



//todo modify retirement calculator to include the new inputs and show new data
// Inputs from form: Current age, Retirement Age, Current Savings, Current Salary, Expected Salary Increase(%)

function RetirementCalculator({setActiveFormData}){
        const formRef = React.useRef();
        const [formError, setFormError] = React.useState({});
        const [maxed, setMaxed] = React.useState(false);
        const [byPercent, setByPercent] = React.useState(false);
        const [adjustForInflation, setAdjustForInflation] = React.useState(false);
        const [formValue, setFormValue] = React.useState(
            /*CurrentAge: '22',
            RetirementAge: '55',
            CurrentSavings: '3200',
            Salary: '68000',
            SalaryIncrease: '2.15',
            ContributionOfSalary: '20',
            EmployerMatchPercent: '0',
            EmployerMatchUpTo: '0',
            ExpectedContribution: '500',
            ExpectedReturn: '9',
            ExpectedInflation: '2.5',*/
            store.getState().userData.userDataDocument.tools.retirementCalcR401K
        );

        const handleSubmit = () => {
            if (!formRef.current.check()) {
                console.error('Form Error');
                return;
            }
            console.log(formValue, 'Form Value');
            setActiveFormData(formValue)
            console.log("attempting to submit to firestore")
            setUserDataInFireStore({tools: {retirementCalcR401K: formValue}})

        };

        return (
            <center>
                    <Form
                        ref={formRef}
                        onChange={setFormValue}
                        onCheck={setFormError}
                        formValue={formValue}
                        formError={formError}
                        model={model}
                        layout={"horizontal"}
                    >
                        <TextField name="CurrentAge" label="Current Age" accepter={InputNumber} postfix={"years"}/>
                        <TextField name="RetirementAge" label="Retirement Age" accepter={InputNumber} postfix={"years"} />

                        <TextField name="CurrentSavings" label="Current Savings" accepter={InputNumber} prefix={"$"}/>
                        {(byPercent)? <TextField name="Salary" label="Annual Salary" accepter={InputNumber} prefix={"$"} />: null}
                        {(byPercent)? <TextField name="SalaryIncrease" label="Expected Salary Increase" accepter={InputNumber} postfix={"%"} />: null}
                        {(byPercent)?<TextField disabled={maxed} name="ContributionOfSalary" label="Contribution from Salary" accepter={InputNumber} postfix={"%"} />
                            : <TextField disabled={maxed} name="ExpectedContribution" label="Expected Contribution" accepter={!maxed? InputNumber : Input} prefix={"$"}  />}
                        {(byPercent)? <TextField name="EmployerMatchPercent" label='Employer Match' accepter={InputNumber} postfix={"%"} />: null}
                        {(byPercent)? <TextField name="EmployerMatchUpTo" label='Employer Contribution' accepter={InputNumber} postfix={"%"} />: null}


                        <center>
                        <CheckboxGroup style={{width: 200, transform: "translate(0px, -25px)"}}>
                            <Checkbox value="Max?" onChange={ (value: ValueType, checked: boolean) => {
                                if(checked){
                                    console.log("Removing Expected Contribution Input")
                                    setMaxed(true)
                                    formValue.ExpectedContribution= 'Maxed'
                                }
                                else if(maxed){
                                    console.log("Adding Expected Contribution input")
                                    setMaxed(false)
                                }
                            }}>Max 401k Contribution</Checkbox>
                            <Checkbox value="contributionType"  onChange={ (value: ValueType, checked: boolean) => {
                                if(checked){
                                    console.log("Removing By Salary Percent Input")
                                    setByPercent(true)
                                }
                                else if(byPercent){
                                    console.log("Adding  By Salary Percent input")
                                    setByPercent(false)
                                }
                            }}>Contribute as percent of yearly income</Checkbox>
                        </CheckboxGroup>
                        </center>
                        <TextField name="ExpectedReturn" label="Expected Return" accepter={InputNumber} postfix={"%"} />
                        <CheckboxGroup style={{width: 200, transform: "translate(0px, -10px)"}}>
                            <Checkbox value="Max?" onChange={ (value: ValueType, checked: boolean) => {
                                if(checked){
                                    setAdjustForInflation(true)
                                    formValue.ExpectedInflation= '2.5'
                                }
                                else if(adjustForInflation){
                                    setAdjustForInflation(false)
                                }
                            }}>Adjust for Inflation</Checkbox>
                        </CheckboxGroup>
                        {adjustForInflation? <TextField name="ExpectedInflation" label="Expected Inflation" accepter={InputNumber} postfix={"%"} /> : null}

                        <ButtonToolbar>

                            <Button appearance="primary" onClick={handleSubmit} >
                                Submit
                            </Button>

                        </ButtonToolbar>
                    </Form>

</center>
        );

}

function InvestmentInfoDisplay({activeFormData}){
    console.log(activeFormData)
    let total = parseInt(activeFormData.CurrentSavings);
    let inflatedTotal = parseInt(activeFormData.CurrentSavings);
    let ageRange = parseInt(activeFormData.RetirementAge) -parseInt(activeFormData.CurrentAge)
    let inflatedCalculations = []
    let calculations = []
    let contributionsArray = []
    let employerContributionsArray = []
    let salaryArray = []
    let limit = 0
    let contribution = 0
    let adjustedSalary =  0
    let employerContribution = 0
    for(let i = 1; i <= ageRange; i++)
    {
        if(i<50-activeFormData.CurrentAge)
            limit = 20500
        else
            limit = 27000
//(activeFormData.Salary*(1+(activeFormData.SalaryIncrease/100))^i)*(activeFormData.ContributionOfSalary/100)

        adjustedSalary = (activeFormData.Salary*(1+(activeFormData.SalaryIncrease/100))**(i-1))

        contribution = adjustedSalary*(activeFormData.ContributionOfSalary/100);

        console.log(activeFormData.EmployerMatchPercent/100 * adjustedSalary)
        employerContribution = activeFormData.EmployerMatchPercent/100 * adjustedSalary

        if(employerContribution > activeFormData.EmployerMatchUpTo/100 * adjustedSalary )
            employerContribution = activeFormData.EmployerMatchUpTo/100 * adjustedSalary

        if(employerContribution > limit )
            employerContribution = limit


        console.log(employerContribution, "+" , activeFormData.EmployerMatchUpTo/100 * adjustedSalary )

        if(contribution > limit || activeFormData.ExpectedContribution === 'Maxed')
            contribution = limit

        console.log("Recalculating")



        inflatedTotal = inflatedTotal*((100-activeFormData.ExpectedInflation)/100)*(1+(activeFormData.ExpectedReturn)/100) + (contribution + employerContribution)

        total = total*(1+(activeFormData.ExpectedReturn)/100) + (contribution + employerContribution)
        //console.log("Total at " + i + ": " + total)

        contributionsArray.push(contribution)
        inflatedCalculations.push(inflatedTotal);
        calculations.push(total)
        salaryArray.push(adjustedSalary)
        employerContributionsArray.push(employerContribution)
    }
    console.log(typeof (parseInt(activeFormData.CurrentAge)))

    const labels = Array.from({length: ageRange}, (v, k) => k + (parseInt(activeFormData.CurrentAge)+1))

    let state = {
        options: {
            chart: {
                id: "line",
                theme: 'dark',
                background: 'rgba(0,0,0,0)'
                ,
                animations: {
                    enabled: true,
                    easing: 'easein',
                    speed: 1500,
                    animateGradually: {
                        enabled: true,
                        delay: 1500
                    },
                    dynamicAnimation: {
                        enabled: true,
                        speed: 350
                    }
                }
            },
            dataLabels: {
                enabled: false
            },
            theme: {
                mode: 'dark',
                palette: 'pallete2'
            },
            xaxis: {
                categories: labels,
                tickAmount: 10,
                title: {
                    text: "Age",
                    offsetX: 0,
                    offsetY: 0,
                    style: {
                        color: undefined,
                        fontSize: '12px',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontWeight: 600,
                        cssClass: 'apexcharts-xaxis-title',
                    },
                },
            },
            yaxis: {
                decimalsInFloat: false,
                title: {
                    text: "Money (Dollars)",
                    offsetX: 0,
                    offsetY: 0,
                    style: {
                        color: undefined,
                        fontSize: '12px',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontWeight: 600,
                        cssClass: 'apexcharts-xaxis-title',
                    },
                },
            },
            noData: {
                text: "No data. Enter the data and hit submit to see the graph!",

            }


        },

        series: [
            {
                name: "Amount",
                type: "column",
                data: calculations
            },
            {
                name: "Inflation Adjusted Amount",
                type: "column",
                data: inflatedCalculations
            }

        ]
    };

   let state1 = {
        options: {
            chart: {
                id: "line",
                theme: 'dark',
                background: 'rgba(0,0,0,0)',
            },
            dataLabels: {
                enabled: false
            },
            theme: {
                mode: 'dark',
                palette: 'pallete3'
            },
            xaxis: {
                categories: labels,
                tickAmount: 5,
                title: {
                    offsetX: 0,
                    offsetY: 0,
                    style: {
                        color: undefined,
                        fontSize: '12px',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontWeight: 600,
                        cssClass: 'apexcharts-xaxis-title',
                    },
                },
            },
            yaxis: {
                decimalsInFloat: false,
                title: {
                    text: "Dollars",
                    offsetX: 0,
                    offsetY: 0,
                    style: {
                        color: undefined,
                        fontSize: '12px',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontWeight: 600,
                        cssClass: 'apexcharts-xaxis-title',
                    },
                },
            },
            noData: {
                text: "No data. Enter the data and hit submit to see the graph!",

            }


        },
        series: [

            {
                name: "Salary",
                type: "area",
                data: salaryArray,
                color: "#ce4d44"

            },
            {
                name: "Contribution",
                type: "area",
                data: contributionsArray,
                color: "#ffa500"
            },
            {
                name: "Employer Contribution",
                type: "area",
                data: employerContributionsArray,
                color: "#003fe0"
            }
        ]
    };
    let formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',

        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });
    let tableData = [
        {
            "id": "Your Contributions",
            "amount": formatter.format(contributionsArray.reduce((partialSum, a) => partialSum + a, 0))
        },
        {
            "id": "Employers Contributions",
            "amount": formatter.format(employerContributionsArray.reduce((partialSum, a) => partialSum + a, 0))
        }

        ]

    return(
        <div  style={{paddingLeft:10, paddingRight: 10, paddingTop:15}}>
            <Panel header={<h5>Summary:</h5>} bordered style={{width: "100%", background: "rgba(0,0,0,0.24)"}}>
        <div style={{marginTop: 10, marginLeft: 20, marginRight: 20}}>
            <h8> After <b>{ageRange}</b> years of investing {activeFormData.ExpectedContribution === 'Maxed'? <b> maximum contributions</b> : <b>{formatter.format(activeFormData.ExpectedContribution)}</b>}  at <b>{parseInt(activeFormData.ExpectedReturn)}% </b>
                with a current savings of <b>{formatter.format(activeFormData.CurrentSavings)}</b> in a tax-deferred savings account, you will have approximately <b>{formatter.format(total)}</b>.
                Which in <b>{ageRange}</b> years will be worth <b>{formatter.format(inflatedTotal)}</b> at an estimated <b>{activeFormData.ExpectedInflation}% </b> annual inflation.
            </h8>
        </div>
                <Chart
                    options={state.options}
                    series={state.series}
                    type="line"
                    width="100%"
                    height="380px"
                />
            </Panel>

            <Divider>Other Information</Divider>
            <Stack wrap style={{paddingBottom:20}} spacing={10} justifyContent={"center"}>
                <Panel header={"Retirement Withdrawal Maximums"} bordered style={{maxWidth:400, background: "rgba(0,0,0,0.24)"}}>

                    <h8>As a baseline, during retirement you can withdraw about <b>{formatter.format(total*0.05)}</b> every year. With annual inflation at <b>{activeFormData.ExpectedInflation}% </b> that becomes about <b>{formatter.format(inflatedTotal*0.05)}</b>.</h8>
    <hr/>
                    <label>Withdrawal Percent:</label>
                    <InputNumber postfix={"%"} value={5} style={{width: 150}}/>
                </Panel>
                <Panel header={"Salary & Contribution"} bordered style={{maxWidth:500, background: "rgba(0,0,0,0.24)"}}>
                    <Chart
                        options={state1.options}
                        series={state1.series}
                        type="line"
                        width="450px"
                        height="200px"
                    />
                </Panel>
                <Panel header={"Contribution Totals"} bordered style={{maxWidth:500, background: "rgba(0,0,0,0.24)"}}>
                    <h8>The expected total contributions can be seen below. The employer match is for a company matching <b>{activeFormData.EmployerMatchPercent}%</b> of your contributions up to <b>{activeFormData.EmployerMatchUpTo}%</b> of your annual salary.</h8>
                    <hr/>
                    <Table height={150} data={tableData}>
                        <Table.Column width={200} align="center">
                            <Table.HeaderCell>Contributor</Table.HeaderCell>
                            <Table.Cell dataKey="id" />
                        </Table.Column>
                        <Table.Column flexGrow={1} align="center">
                            <Table.HeaderCell>Total (Dollars)</Table.HeaderCell>
                            <Table.Cell dataKey="amount" />
                        </Table.Column>
                    </Table>
                </Panel>
            </Stack>
        </div>
    )
}

export default ToolsTab;
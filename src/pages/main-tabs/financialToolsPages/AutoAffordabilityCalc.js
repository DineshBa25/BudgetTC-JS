import React from 'react';
import {
    Button,
    ButtonToolbar,
    Checkbox,
    CheckboxGroup,
    Divider,
    FlexboxGrid,
    Form,
    IconButton,
    InputNumber,
    InputPicker,
    Panel,
    Schema,
    Stack,
    Table
} from "rsuite";
import {ValueType} from "rsuite/Radio";
import Chart from "react-apexcharts";
import OthersIcon from "@rsuite/icons/Others";

export const AutoAffordabilityCalcView = ({activeFormData}) => {
    const [whichLevel, setWhichLevel] = React.useState(1);

    let tableData = [{
        "id": "Principal Payment", "amount": "$185"
    }, {
        "id": "Monthly Interest", "amount": "$11"
    }, {
        "id": "Total", "amount": "$196"
    }]

    const getLevelName = (level) => {
        if (level === 1)
            return ("very affordable")
        else if (level === 2)
            return ("affordable")
        else if (level === 3)
            return ("somewhat affordable")
    }
    const labels = Array.from(Array(7).keys()).map(i => `${i + 1}`);
    let veryAffordableOCArray = [1, 2, 3, 4, 5, 6, 7];
    let somewhatAffordableOCArray = [1, 5, 10, 15, 20, 25, 30];
    let affordableOCArray = [1, 3, 5, 7, 9, 11, 13];
    let state1 = {
        options: {
            chart: {
                id: "line", theme: 'dark', background: 'rgba(0,0,0,0)',
            }, dataLabels: {
                enabled: false
            }, theme: {
                mode: 'dark', palette: 'pallete3'
            }, xaxis: {
                categories: labels, tickAmount: 5, title: {
                    offsetX: 0, offsetY: 0, style: {
                        color: undefined,
                        fontSize: '12px',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontWeight: 600,
                        cssClass: 'apexcharts-xaxis-title',
                    },
                },
            }, yaxis: {
                decimalsInFloat: false, title: {
                    text: "Dollars", offsetX: 0, offsetY: 0, style: {
                        color: undefined,
                        fontSize: '12px',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontWeight: 600,
                        cssClass: 'apexcharts-xaxis-title',
                    },
                },
            }, noData: {
                text: "No data. Enter the data and hit submit to see the graph!",

            }


        }, series: [

            {
                name: "Somewhat Contribution", type: "area", data: somewhatAffordableOCArray, color: "#003fe0"
            }, {
                name: "Contribution", type: "area", data: affordableOCArray, color: "#ffa500"
            }, {
                name: "Salary", type: "area", data: veryAffordableOCArray, color: "#ce4d44"

            }]
    };

    return (<div style={{paddingLeft: 10, paddingRight: 10, paddingTop: 15, minWidth: 500}}>
        <Panel header={<h5>Automobile Affordability Spectrum:</h5>} bordered
               style={{width: "100%", background: "rgba(0,0,0,0.24)"}}>
            <FlexboxGrid align="bottom">
                <FlexboxGrid.Item colspan={8}>
                    <div style={{
                        height: "auto",
                        background: "rgba(0,0,0,0.35)",
                        borderBottomLeftRadius: 20,
                        borderTopLeftRadius: 20,
                        padding: 10
                    }} onClick={() => {
                        setWhichLevel(1)
                    }}>
                        <center>
                            <Panel style={(whichLevel === 1) ? {
                                background: "rgba(0,0,0,0.46)", borderWidth: 10, borderColor: "#169cdf"
                            } : {background: "rgba(0,0,0,0.24)"}} bordered={true}>
                                <h5>Very Affordable</h5>
                                <h2 style={{color: "#00b230"}}>$13,233</h2>
                                <h8>$196 for 36 months</h8>
                            </Panel>
                        </center>
                    </div>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={8}>
                    <div style={{height: "auto", background: "rgba(0,0,0,0.35)", padding: 10}}>
                        <center>
                            <Panel style={(whichLevel === 2) ? {
                                background: "rgba(0,0,0,0.46)", borderWidth: 10, borderColor: "#169cdf"
                            } : {background: "rgba(0,0,0,0.24)"}} bordered={true} onClick={() => {
                                setWhichLevel(2)
                            }}>
                                <h5>Affordable</h5>
                                <h2 style={{color: "#ffc000"}}>$16,434</h2>
                                <h8>$546 for 36 months</h8>
                            </Panel>
                        </center>
                    </div>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={8}>
                    <div style={{
                        height: "auto",
                        background: "rgba(0,0,0,0.35)",
                        borderBottomRightRadius: 20,
                        borderTopRightRadius: 20,
                        padding: 10,
                    }}>
                        <center>
                            <Panel style={(whichLevel === 3) ? {
                                background: "rgba(0,0,0,0.46)", borderWidth: 10, borderColor: "#169cdf",

                            } : {background: "rgba(0,0,0,0.24)"}} bordered={true} onClick={() => {
                                setWhichLevel(3)
                            }}>
                                <h5>Somewhat Affordable</h5>
                                <h2 style={{color: "#ff0000"}}>$22,453</h2>
                                <h8>$789 for 36 months</h8>
                            </Panel>
                        </center>
                    </div>
                </FlexboxGrid.Item>
            </FlexboxGrid>
        </Panel>
        <Divider>Other Information</Divider>
        <Stack wrap style={{paddingBottom: 20}} spacing={10} justifyContent={"center"}>
            <Panel header={"Monthly Payment Breakdown Table"} bordered
                   style={{maxWidth: 400, background: "rgba(0,0,0,0.24)"}}>
                <h8>The monthly breakdown for your cars payment at
                    the <i><b>{getLevelName(whichLevel)}</b></i> level can be found in the table below.
                </h8>
                <hr/>
                <Table data={tableData} bordered style={{borderRadius: 10}}>
                    <Table.Column width={200} align="center">
                        <Table.HeaderCell>Type</Table.HeaderCell>
                        <Table.Cell dataKey="id"/>
                    </Table.Column>
                    <Table.Column flexGrow={1} align="center">
                        <Table.HeaderCell>Amount (Dollars)</Table.HeaderCell>
                        <Table.Cell dataKey="amount"/>
                    </Table.Column>
                </Table>

            </Panel>
            <Panel header={"Opportunity Cost"} bordered style={{maxWidth: 500, background: "rgba(0,0,0,0.24)"}}>
                <h8>While a car is significant asset that helps us accomplish many of the things we do daily, it is
                    still one of the largest <b>depreciating assets</b> we own or finance. The chart below gives you
                    an idea about the effect that the various levels of car ownership can have on your wealth
                    building.
                </h8>
                <hr/>
                <Chart
                    options={state1.options}
                    series={state1.series}
                    type="line"
                    width="450px"
                    height="200px"
                /> </Panel>

            <Panel header={<div>
                <h7>Subsequent Value Estimation</h7>
                <IconButton icon={<OthersIcon/>} style={{height: 40}} appearance={"subtle"}></IconButton></div>}
                   bordered
                   style={{maxWidth: 400, background: "rgba(0,0,0,0.24)"}}>
                <h8>Since cars are a depreciating asset, they tend to loose a significant portion of their value
                    depending on the age of car you buy. Below is a conservative estimator for the value of the car
                    after a certain timeframe.
                </h8>
                <Divider>Inputs</Divider>
                <Stack direction={"row"} spacing={20}>
                    <div>
                        <label>Age of car:</label>
                        <InputNumber postfix={"year(s)"} style={{width: 150}}/>
                    </div>
                    <div>
                        <label>Price of car:</label>
                        <InputNumber prefix={"$"} style={{width: 150}}/>
                    </div>
                </Stack>
                <Divider>Results</Divider>
                <h7>In <b>6</b> years the car you buy for <b>$12,654</b> will be worth approximately:</h7>
                <h5 style={{textAlign: "center", color: "#ff0000"}}><b>- $7,010</b></h5>
                <h4 style={{textAlign: "center"}}>= $5,644</h4>
                <h7>That is a loss of <i><b>$7,010</b></i> which is <i><b>55.3%</b></i> of the vehicle's value.</h7>
            </Panel>
        </Stack>
    </div>);

}


const {StringType, NumberType} = Schema.Types;
const model = Schema.Model({
    YearlyIncome: NumberType()
        .range(0, 1000000)
        .isRequired('This field is required.'),
});

const TextField = React.forwardRef((props, ref) => {
    const {name, label, accepter, prefix, postfix, ...rest} = props;
    return (<Form.Group controlId={`${name}-4`} ref={ref}>
            <Form.ControlLabel>{label} </Form.ControlLabel>
            <Form.Control name={name} prefix={prefix} postfix={postfix} accepter={accepter}
                          errorPlacement={"bottomEnd"} {...rest} style={{width: 155}}/>
        </Form.Group>);
});
export const AutoAffordabilityCalcInput = ({setActiveFormData}) => {

    const formRef = React.useRef();
    const [formError, setFormError] = React.useState({});
    const [tradeIn, setTradeIn] = React.useState(false);
    const [financed, setFinanced] = React.useState(false);
    const [formValue, setFormValue] = React.useState({
            YearlyIncome: '68000',
            TargetMonthlyPayment: '0',
            CurrentSavings: '0',
            TradeInValue: '0',
            AmountOwed: '0',
            DownPayment: '0',
            ExpectedFinancing: '0',
            LoanTerm: 'josh',
        }
    );

    const handleSubmit = () => {
        if (!formRef.current.check()) {
            console.error('Form Error');
            return;
        }
        console.log(formValue, 'Form Value');
        setActiveFormData(formValue)
    };

    return (
        <Form
            ref={formRef}
            onChange={setFormValue}
            onCheck={setFormError}
            formValue={formValue}
            formError={formError}
            model={model}
            layout={"horizontal"}
        >
            <TextField name="YearlyIncome" label="Yearly Income" accepter={InputNumber} prefix={'$'}/>
            <TextField name="TargetMonthlyPayment" label="Target Monthly Payment" accepter={InputNumber} prefx={'$'}/>
            <TextField name="CurrentSavings" label="Current Savings" accepter={InputNumber} prefx={'$'}/>
            <Divider/>
            <center>
                <CheckboxGroup style={{width: 200}}>
                    <Checkbox value="Max?" onChange={(value: ValueType, checked: boolean) => {
                        if (checked) {
                            setTradeIn(true)
                            formValue.ExpectedInflation = '2.5'
                        } else if (tradeIn) {
                            setTradeIn(false)
                        }
                    }}>Add a Trade In</Checkbox>
                </CheckboxGroup>
            </center>
            {(tradeIn) ?
                <TextField name="TradeInValue" label="Trade In Value" accepter={InputNumber} prefx={'$'}/> : null}
            {(tradeIn) ? <TextField name="AmountOwed" label="Amount Owed" accepter={InputNumber} prefx={'$'}/> : null}
            <Divider/>
            <center>
                <CheckboxGroup style={{width: 200}}>
                    <Checkbox value="Max?" onChange={(value: ValueType, checked: boolean) => {
                        if (checked) {
                            setFinanced(true)
                            formValue.ExpectedInflation = '2.5'
                        } else if (financed) {
                            setFinanced(false)
                        }
                    }}>Finance Payment</Checkbox>
                </CheckboxGroup>
            </center>
            {(financed) ?
                <TextField name="DownPayment" label="Down payment" accepter={InputNumber} prefx={'$'}/> : null}
            {(financed) ? <TextField name="ExpectedFinancing" label="Expected Finance Rate" accepter={InputNumber}
                                     prefx={'$'}/> : null}

            {(financed) ? <Form.Group controlId={`${"LoanTerm"}-5`}>
                <Form.ControlLabel>{"LoanTerm"} </Form.ControlLabel>
                <Form.Control name={"LoanTerm"} accepter={InputPicker}
                              errorPlacement={"bottomEnd"} title={"Select Month"} data={[{
                    "label": "12 Months", "value": "12"
                }, {
                    "label": "24 Months", "value": "24"
                }, {
                    "label": "36 Months", "value": "36"
                }, {
                    "label": "48 Months", "value": "48"
                },]} style={{width: 155, marginLeft: "auto"}} placement={"topStart"} preventOverflow>
                </Form.Control>
            </Form.Group> : null}
            <Divider/>
            <center>
                <ButtonToolbar>
                    <Button appearance="primary" onClick={handleSubmit}>
                        Submit
                    </Button>
                </ButtonToolbar>
            </center>
        </Form>);
}
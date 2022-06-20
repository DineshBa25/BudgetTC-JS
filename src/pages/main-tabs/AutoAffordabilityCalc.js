import React from 'react';
import {
    Button,
    ButtonToolbar, Checkbox,
    CheckboxGroup, Divider, FlexboxGrid,
    Form,
    InputNumber, InputPicker, Panel,
    Schema, Stack
} from "rsuite";
import {ValueType} from "rsuite/Radio";

export const AutoAffordabilityCalcView = ({activeFormData}) => {
    const [whichLevel, setWhichLevel] = React.useState(1);
    return(
    <div style={{paddingLeft: 10, paddingRight: 10, paddingTop: 15}}>
        <Panel header={<h5>Automobile Affordability Spectrum:</h5>} bordered style={{width: "100%", background: "rgba(0,0,0,0.24)"}}>
                <FlexboxGrid align="bottom">
                    <FlexboxGrid.Item colspan={8}>
                        <div style={{ height: "auto", background: "#1e7202" , borderBottomLeftRadius: 20, borderTopLeftRadius: 20, padding: 20}} onClick={()=>{setWhichLevel(1)}}>
                            <center>
                                <Panel style={(whichLevel===1)? {background: "rgba(0,0,0,1)",borderWidth: 10, borderColor: "#169cdf"} : {background: "rgba(0,0,0,0.76)"}} bordered={true}>
                                    <h4>Very Affordable</h4>
                                    <h2>$13,233</h2>
                                    <h6>$196 for 36 months</h6>
                                </Panel>
                            </center>
                        </div>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={8}>
                        <div style={{height: "auto",  background: "#be8c00", padding: 20 }} >
                            <center>
                                <Panel style={(whichLevel===2)? {background: "rgba(0,0,0,1)",borderWidth: 10, borderColor: "#169cdf"} : {background: "rgba(0,0,0,0.76)"}} bordered={true} onClick={()=>{setWhichLevel(2)}}>
                                    <h4>Affordable</h4>
                                    <h2>$16,434</h2>
                                    <h5>$546 for 36 months</h5>
                                </Panel>
                            </center>
                        </div>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={8}>
                        <div style={{ height: "auto",  background: "#730000", borderBottomRightRadius:20, borderTopRightRadius: 20 , padding:20}} >
                            <center>
                                <Panel style={(whichLevel===3)? {background: "rgba(0,0,0,1)",borderWidth: 10, borderColor: "#169cdf"} : {background: "rgba(0,0,0,0.71)"}} bordered={true} onClick={()=>{setWhichLevel(3)}}>
                                    <h4>Somewhat Affordable</h4>
                                    <h2>$22,453</h2>
                                    <h5>$789 for 36 months</h5>
                                </Panel>
                            </center>
                        </div>
                    </FlexboxGrid.Item>
                </FlexboxGrid>


        </Panel>

        <Divider>Other Information</Divider>

        <Stack wrap style={{paddingBottom:20}} spacing={10} justifyContent={"center"}>
            <Panel header={"Payment Breakdown Table"} bordered style={{maxWidth:400, background: "rgba(0,0,0,0.24)"}}>


            </Panel>
            <Panel header={"Opportunity Cost"} bordered style={{maxWidth:500, background: "rgba(0,0,0,0.24)"}}>
                <h2>Chart</h2>
            </Panel>
            <Panel header={"Monthly Payment Info"} bordered style={{maxWidth:500, background: "rgba(0,0,0,0.24)"}}>
                <h8>The expected total contributions can be seen below. The employer match is for a company matching <b>{activeFormData.EmployerMatchPercent}%</b> of your contributions up to <b>{activeFormData.EmployerMatchUpTo}%</b> of your annual salary.</h8>
                <hr/>
            </Panel>
            <Panel header={"Subsequent Value Estimation"} bordered style={{maxWidth:400, background: "rgba(0,0,0,0.24)"}}>
                <h8>Subsequent Value Estimation</h8>
                <hr/>
                <label>Withdrawal Percent:</label>
                <InputNumber postfix={"%"} value={5} style={{width: 150}}/>
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
        return (
        <Form.Group controlId={`${name}-4`} ref={ref}>
        <Form.ControlLabel>{label} </Form.ControlLabel>
        <Form.Control name={name} prefix={prefix} postfix={postfix} accepter={accepter}
        errorPlacement={"bottomEnd"} {...rest} style={{width: 155}}/>

        </Form.Group>
        );
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
        //store.getState().userData.userDataDocument.tools.retirementCalcR401K
        );

        const handleSubmit = () => {
        if (!formRef.current.check()) {
        console.error('Form Error');
        return;
    }
        console.log(formValue, 'Form Value');
        setActiveFormData(formValue)
        //console.log("attempting to submit to firestore")
        //setUserDataInFireStore({tools: {retirementCalcR401K: formValue}})

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
        if(checked){
        setTradeIn(true)
        formValue.ExpectedInflation= '2.5'
    }
        else if(tradeIn){
        setTradeIn(false)
    }
    }}>Add a Trade In</Checkbox>
        </CheckboxGroup>
        </center>
    {(tradeIn)?<TextField name= "TradeInValue" label="Trade In Value" accepter={InputNumber} prefx={'$'}/>: null}
    {(tradeIn)?<TextField name="AmountOwed" label="Amount Owed" accepter={InputNumber} prefx={'$'}/>:null}

        <Divider/>
        <center>
        <CheckboxGroup style={{width: 200}}>
        <Checkbox value="Max?" onChange={(value: ValueType, checked: boolean) => {
        if(checked){
        setFinanced(true)
        formValue.ExpectedInflation= '2.5'
    }
        else if(financed){
        setFinanced(false)
    }
    }}>Finance Payment</Checkbox>
        </CheckboxGroup>
        </center>
    {(financed)? <TextField name="DownPayment" label="Down payment" accepter={InputNumber} prefx={'$'}/>: null}
    {(financed)? <TextField name="ExpectedFinancing" label="Expected Finance Rate" accepter={InputNumber} prefx={'$'}/>: null}

    {(financed)?<Form.Group controlId={`${"LoanTerm"}-5`} >
        <Form.ControlLabel>{"LoanTerm"} </Form.ControlLabel>
        <Form.Control name={"LoanTerm"} accepter={InputPicker}
        errorPlacement={"bottomEnd"} title={"Select Month"} data={[
    {
        "label": "12 Months",
        "value": "12"
    },
            {
                "label": "24 Months",
                "value": "12"
            },
            {
                "label": "36 Months",
                "value": "12"
            },
            {
                "label": "48 Months",
                "value": "12"
            },
        ]} style={{width: 155, marginLeft:"auto"}} placement={"topStart"} preventOverflow>
        </Form.Control>
        </Form.Group>: null}


        <Divider/>

        <center>
        <ButtonToolbar>
        <Button appearance="primary" onClick={handleSubmit}>
        Submit
        </Button>
        </ButtonToolbar>
        </center>
        </Form>
        );
    }
import React from 'react';
import {
    Button,
    ButtonToolbar, Checkbox,
    CheckboxGroup,
    Drawer,
    Form,
    Input,
    InputNumber,
    Radio,
    RadioGroup,
    Schema,
    Uploader
} from "rsuite";
import {CameraRetro} from "@rsuite/icons/es/icons/legacy";
import {store} from "../../redux/store";
import {setUserDataInFireStore} from "../auth/firebase";
import {ValueType} from "rsuite/Radio";

export const AutoAffordabilityCalcView = () => {
    return (<div><h1>Henlo</h1></div>);
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
    const [maxed, setMaxed] = React.useState(false);
    const [byPercent, setByPercent] = React.useState(false);
    const [adjustForInflation, setAdjustForInflation] = React.useState(false);
    const [formValue, setFormValue] = React.useState({
            YearlyIncome: '68000'
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
                <TextField name="YearlyIncome" label="Yearly Income" accepter={InputNumber} prefx={'$'}/>

                <ButtonToolbar>

                    <Button appearance="primary" onClick={handleSubmit}>
                        Submit
                    </Button>

                </ButtonToolbar>
            </Form>

        </center>);
}
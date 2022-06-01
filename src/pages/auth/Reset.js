import React, { useState } from "react";
import {getAuth, sendPasswordResetEmail, signInWithEmailAndPassword} from "firebase/auth";
import {Button, ButtonToolbar, Form, Panel, Schema} from "rsuite";
import {useNavigate} from "react-router-dom";

const {StringType} = Schema.Types;
const model = Schema.Model({
    email: StringType()
        .isEmail('Please enter a valid email address.')
        .isRequired('This field is required.')
});

function TextField(props) {
    const {name, label, accepter, ...rest} = props;
    return (
        <Form.Group controlId={`${name}-3`}>
            <Form.ControlLabel>{label} </Form.ControlLabel>
            <Form.Control name={name} accepter={accepter} {...rest}/>
        </Form.Group>
    );
}

const Reset = () => {
    const auth = getAuth();
    const handleReset = () => {
        sendPasswordResetEmail(auth, formValue.email)
            .then(() => {
                console.log("success");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("An error has occured: ", errorCode, errorMessage);
            });
    };
    const formRef = React.useRef();
    const [formError, setFormError] = React.useState({});
    const [formValue, setFormValue] = React.useState({
        email: ''
    });
    let navigate = useNavigate();

    const handleOnClick = () => {
        navigate("/auth/login")
    }
    return (
        <div>
            <center>
                <div className={"logodiv"}>
                    <img
                        src="https://firebasestorage.googleapis.com/v0/b/budgettc-c8e98.appspot.com/o/logo10%20Dual%20Theme%20Compatable.png?alt=media&token=449edb64-124d-4abc-8459-8870732c2f72"
                        height="50" width="200" alt={"BudgetTC-Logo"} style={{imageRendering: "crisp-edges"}}/>
                </div>
            </center>
            <Panel header={<h3>Reset Password</h3>} bordered style={{background: "rgba(18,25,45,0.85)", borderWidth: "thick"}}>

                <Form ref={formRef}
                      onChange={setFormValue}
                      onCheck={setFormError}
                      formValue={formValue}
                      model={model}>
                    <TextField name="email" label="Email"/>
                    <ButtonToolbar>
                        <Button appearance="primary" onClick={handleReset}>Send Reset Email</Button>
                        <Button appearance="link" onClick={handleOnClick}>Back to login</Button>
                    </ButtonToolbar>
                </Form>
            </Panel>
        </div>
    );
};

export default Reset;

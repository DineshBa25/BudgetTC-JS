import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import {Button, ButtonToolbar, Form, Panel, Schema} from "rsuite";
import {useNavigate} from "react-router-dom";
import {registerUserToFireStore} from './firebase'

const {StringType} = Schema.Types;
const model = Schema.Model({
    email: StringType()
        .isEmail('Please enter a valid email address.')
        .isRequired('This field is required.'),
    password: StringType()
        .isRequired('This field is required.')
        .minLength(6),
    confirmPassword: StringType()
        .isRequired('This field is required.')
        .minLength(6)

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

const Login = () => {
    const auth = getAuth()

    const formRef = React.useRef();
    const [formError, setFormError] = React.useState({});
    const [formValue, setFormValue] = React.useState({
        email: '',
        password: '',
        confirmPassword: ''
    });
    let navigate = useNavigate();

    const handleRegister = () => {
        if(formValue.password === formValue.confirmPassword)
            createUserWithEmailAndPassword(auth, formValue.email, formValue.password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    registerUserToFireStore(user.uid, formValue)
                    console.log("Registered user: ", user);
                    formValue.email = "";
                    formValue.password = "";
                    formValue.confirmPassword = "";
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log("Error ocured: ", errorCode, errorMessage);
                });
        else
            console.log("Passwords do not match")
        };

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
            <Panel header={<h3>Register</h3>} bordered style={{background: "rgba(18,25,45,0.85)", borderWidth: "thick"}}>

                <Form ref={formRef}
                      onChange={setFormValue}
                      onCheck={setFormError}
                      formValue={formValue}
                      model={model}>
                    <TextField name="email" label="Email" />
                    <TextField name="password" label="Password" type = "password" placeholder={"Password"}/>
                    <TextField name="confirmPassword" type = "password" placeholder = "Confirm Password"/>
                    <ButtonToolbar>
                        <Button appearance="primary" onClick={handleRegister}>Register</Button>
                        <Button appearance="link" onClick={handleOnClick}>Back to login</Button>
                    </ButtonToolbar>
                </Form>
            </Panel>
        </div>
    );
};

export default Login;
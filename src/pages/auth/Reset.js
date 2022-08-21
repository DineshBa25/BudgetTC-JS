import React, { useState } from "react";
import {getAuth, sendPasswordResetEmail, signInWithEmailAndPassword} from "firebase/auth";
import {Button, ButtonToolbar, Form, Notification, Panel, Schema, useToaster} from "rsuite";
import {useNavigate} from "react-router-dom";
import "./auth.css";
import {ScaleLoader} from "react-spinners";

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
    const toaster = useToaster();

    const formRef = React.useRef();
    const [formError, setFormError] = React.useState({});
    const [formValue, setFormValue] = React.useState({
        email: ''
    });
    const resetEmailSentMessage = (
        <Notification type={'success'} header={'Password reset email sent'} duration={15000} closable>
            <h6>A link has been sent to your inbox at {formValue.email} that will allow you to reset your account password.</h6>
        </Notification>
    )

    const unknownErrorMessage = (error) => (
        <Notification type={'error'} header={'Error'} duration={15000} closable>
            <h6>The following error occurred while trying to register:</h6>
            <h8>{error.message}</h8>
        </Notification>
    )

    let navigate = useNavigate();

    const handleOnClick = () => {
        navigate("/auth/login")
    }

    const handleOnRegisterClick = () => {
        navigate("/auth/register")
    }

    //Notification for if email is wrong
    const wrongUserNotification = (
        <Notification type={'error'} header={'Unable to find user'}  duration={15000} closable>
            <h8>Were unable to locate a user in our data base with the username <b>{formValue.email}</b>.</h8>
            <hr/>
            <h6>Please try again or register for a new account.</h6>
            <Button appearance="link" onClick={handleOnRegisterClick}>Register for a BudgetTC account</Button>
        </Notification>
    )
    const [loading, setLoading] = React.useState(false);
    const handleReset = () => {
        setLoading(true); // start loading animation
        sendPasswordResetEmail(auth, formValue.email)
            .then(() => {
                console.log("Success! Password reset email sent.");
                toaster.push(resetEmailSentMessage,{placement: "topStart"});
                setLoading(false); // stop loading animation
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("An error has occurred: ", errorCode, errorMessage);
                if (errorCode === 'auth/user-not-found') { // if error code is user not found
                    setFormError({email: "Invalid username/email"}); // set form error state to error message
                    toaster.push(wrongUserNotification, {placement: "topStart"}) // push notification to top start of screen
                }
                else{
                    toaster.push(unknownErrorMessage(error), {placement: "topStart"}) // push notification to top start of screen
                }
                setLoading(false); // stop loading animation

            });
    };


    return (
        <div>
            <center>
                <div className={"logodiv"}>
                    <img
                        src="https://firebasestorage.googleapis.com/v0/b/budgettc-c8e98.appspot.com/o/logo10%20Dual%20Theme%20Compatable.png?alt=media&token=449edb64-124d-4abc-8459-8870732c2f72"
                        height="50" width="200" alt={"BudgetTC-Logo"} style={{imageRendering: "crisp-edges"}}/>
                </div>
            </center>
            <Panel className={"mainPanel"} header={<h3>Reset Password</h3>} bordered  style={{borderRadius: 20}}>

                {(loading)? <center><div className={"scaleLoader"}><ScaleLoader color={"#fff"} loading={true} height={50} width={10}/></div> </center>: null}

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

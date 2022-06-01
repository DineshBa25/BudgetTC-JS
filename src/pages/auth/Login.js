import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword, setPersistence } from "firebase/auth";
import {Button, IconButton, ButtonToolbar, Divider, Form, InputGroup, Panel, Schema} from "rsuite";
import {useNavigate} from "react-router-dom";
import {FcGoogle} from "react-icons/fc";
import {Button as ButtonMUI} from '@mui/material';
import SignIn from "@rsuite/icons/legacy/SignIn";
import {useDispatch, useSelector} from "react-redux";
import {toggleAuth} from "../../redux/slice/authSlice";
import {addDataToState, firebaseTest, getAndSetUserDataFromFireStore} from './firebase'
import {setRetirementCalcData401K} from "../../redux/slice/userDataSlice";



const {StringType} = Schema.Types;
const model = Schema.Model({
    email: StringType()
        .isEmail('Please enter a valid email address.')
        .isRequired('This field is required.'),
    password: StringType()
        .isRequired('This field is required.')
        .minLength(6)
});

function TextField(props) {
    const {name, label, accepter, ...rest} = props;
    return (
        <Form.Group controlId={`${name}-3`}>
            <Form.ControlLabel>{label} </Form.ControlLabel>
            <Form.Control name={name} accepter={accepter} {...rest} />
        </Form.Group>
    );
}



const Login = () => {
    const formRef = React.useRef();
    const [formError, setFormError] = React.useState({});
    const [formValue, setFormValue] = React.useState({
        email: 'dineshba63@gmail.com',
        password: '1234567'
    });
    const [visible, setVisible] = React.useState(false);

    const handleChange = () => {
        setVisible(!visible);
    };

    let navigate = useNavigate();

    const auth = getAuth();

    const dispatch = useDispatch();


    const handleLogin = () => {
        signInWithEmailAndPassword(auth, formValue.email, formValue.password)
            .then(async (userCredential) => {
                const user = userCredential.user;
                dispatch(toggleAuth(true))
                console.log("Signed in user: ", user);
                await getAndSetUserDataFromFireStore(user.uid).then((value) => {
                    dispatch(setRetirementCalcData401K(value))
                })
                localStorage.setItem("Authenticated", true);
                navigate("/app/dashboard")

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("An error occured: ", errorCode, errorMessage);
            });

    };
    const handleOnClick = () => {
        navigate("/auth/reset")
    }
    const handleOnSignupClick = () => {
        navigate("/auth/register")
    }

    function pressed(event) {
        // If the user presses the "Enter" key on the keyboard
        if (event.key === "Enter") {
            console.log("Enter Pressed")
            if(formValue.password !== "" & formValue.email !== "")
                handleLogin()
            else
                console.error("Username or password is not entered")
        }}
    return (
        <div>
            <center>
                <div className={"logodiv"}>
                    <img
                        src="https://firebasestorage.googleapis.com/v0/b/budgettc-c8e98.appspot.com/o/logo10%20Dual%20Theme%20Compatable.png?alt=media&token=449edb64-124d-4abc-8459-8870732c2f72"
                        height="50" width="200" alt={"BudgetTC-Logo"} style={{imageRendering: "crisp-edges"}}/>
                </div>
            </center>
            <Panel header={<h3>Login</h3>} bordered style={{background: "rgba(18,25,45,0.85)", borderWidth: "thick"}}>

                <Form ref={formRef}
                      onChange={setFormValue}
                      onCheck={setFormError}
                      formValue={formValue}
                      model={model}>
                    <TextField name="email" label="Email"/>
                    <TextField name="password" label="Password" type={"password"} placeholder={"password"} onKeyPress={pressed}   />

                    <ButtonToolbar>
                        <IconButton appearance= "primary" onClick={handleLogin} icon={<SignIn/>}>Sign in</IconButton>
                        <Button appearance="link" onClick={handleOnClick}>Forgot password?</Button>
                        <Button appearance="link" onClick={handleOnSignupClick}>Register</Button>
                    </ButtonToolbar>
                    <Divider>OR</Divider>
                    <ButtonToolbar style={{marginTop: 20}}>

                        <ButtonMUI variant="outlined" startIcon={<FcGoogle size={30}/>}>
                            Sign in with Google
                        </ButtonMUI>
                    </ButtonToolbar>

                </Form>
            </Panel>
        </div>
    );
};


export default Login;
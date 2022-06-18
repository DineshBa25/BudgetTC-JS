import {
    getAuth,
    createUserWithEmailAndPassword,
    sendEmailVerification
} from "firebase/auth";
import React from "react";
import {Button, ButtonToolbar, Form, IconButton, Panel, Schema, Stack} from "rsuite";
import {useNavigate} from "react-router-dom";
import {getAndSetUserDataFromFireStore, registerUserToFireStore} from './firebase'
import CheckIcon from '@rsuite/icons/Check';
import ArowBackIcon from '@rsuite/icons/ArowBack';
import {Dashboard} from "@rsuite/icons";
import {setRetirementCalcData401K} from "../../redux/slice/userDataSlice";
import {toggleAuth} from "../../redux/slice/authSlice";
import {useDispatch} from "react-redux";

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

    const [page, setPage] = React.useState(0)
    let navigate = useNavigate();


    const handleRegister = () => {
        if (formValue.password === formValue.confirmPassword)
            createUserWithEmailAndPassword(auth, formValue.email, formValue.password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    registerUserToFireStore(user.uid, formValue)
                        .then(() => {
                            sendEmailVerification(user).then(() => {
                                console.log("Registered user: ", user);
                                formValue.password = "";
                                formValue.confirmPassword = "";
                                setPage(1)
                            })
                        })

                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log("Error occurred: ", errorCode, errorMessage);
                });
        else
            console.log("Passwords do not match")
    };

    const handleOnClick = () => {
        navigate("/auth/login")
    }

    const checkVerification = () => {
        console.log("Checking email verification status")
        auth.currentUser.reload().then(() => {
                console.log(auth.currentUser.emailVerified)
                if (auth.currentUser.emailVerified === true) {
                    setPage(2)
                    console.log("Email was verified")

                }
            }
        )
    }
    const handleBack = () => {
        setPage(0)
    }
    const dispatch = useDispatch();

    const handleContinue = () => {
        getAndSetUserDataFromFireStore(auth.currentUser.uid).then((value) => {
            dispatch(setRetirementCalcData401K(value))
            dispatch(toggleAuth(true))
            console.log("Signed in user: ", auth.currentUser.email);
            localStorage.setItem("Authenticated", true);
            navigate("/app/dashboard")
        })


    }


    const pagesArray = [
        <Form ref={formRef}
              onChange={setFormValue}
              onCheck={setFormError}
              formValue={formValue}
              formError={formError}
              model={model}>
            <TextField name="email" label="Email"/>
            <TextField name="password" label="Password" type="password" placeholder={"Password"}/>
            <TextField name="confirmPassword" type="password" placeholder="Confirm Password"/>
            <ButtonToolbar>
                <Button appearance="primary" onClick={handleRegister}>Register</Button>
                <Button appearance="link" onClick={handleOnClick}>Back to login</Button>
            </ButtonToolbar>
        </Form>,
        <div>
            <h5>A verification email has been sent to your inbox at <b>{formValue.email}</b></h5>
            <IconButton icon={<ArowBackIcon/>} style={{marginTop: 20, marginRight: 20}} appearance={"primary"}
                        color={"red"} onClick={handleBack}>Back</IconButton>
            <IconButton icon={<CheckIcon/>} style={{marginTop: 20}} appearance={"primary"} color={"green"}
                        onClick={checkVerification}>Verified</IconButton>
        </div>,
        <Stack direction={"column"}>
            <h5>Your email is verified!</h5>
            <h1>Welcome to BudgetTC</h1>
            <IconButton appearance="primary" color="green" icon={<Dashboard/>} onClick={handleContinue}
                        style={{marginTop: 20}}>Continue to Dashboard <i>(Log-in)</i></IconButton>

        </Stack>

    ]
    return (

        <div>
            <center>
                <div className={"logodiv"}>
                    <img
                        src="https://firebasestorage.googleapis.com/v0/b/budgettc-c8e98.appspot.com/o/logo10%20Dual%20Theme%20Compatable.png?alt=media&token=449edb64-124d-4abc-8459-8870732c2f72"
                        height="50" width="200" alt={"BudgetTC-Logo"} style={{imageRendering: "crisp-edges"}}/>
                </div>
            </center>
            <Panel header={<h3>Register</h3>} bordered
                   style={{background: "rgba(18,25,45,0.85)", borderWidth: "thick"}}>
                {pagesArray[page]}
            </Panel>
        </div>
    );
};

export default Login;
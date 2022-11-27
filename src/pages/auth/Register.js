import {
    getAuth,
    createUserWithEmailAndPassword,
    sendEmailVerification
} from "firebase/auth";
import React from "react";
import {
    Button,
    ButtonToolbar,
    Checkbox,
    Form,
    IconButton,
    Notification,
    Panel,
    Schema,
    Stack,
    useToaster
} from "rsuite";
import {useNavigate} from "react-router-dom";
import {getAndSetUserDataFromFireStore, registerUserToFireStore} from './firebase'
import CheckIcon from '@rsuite/icons/Check';
import ArowBackIcon from '@rsuite/icons/ArowBack';
import {Dashboard} from "@rsuite/icons";
import {setRetirementCalcData401K} from "../userDataSlice";
import {toggleAuth} from "../../redux/slice/authSlice";
import {useDispatch} from "react-redux";
import {BarLoader, RingLoader, RiseLoader, ScaleLoader} from "react-spinners";


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
    const {name, label, accepter,help, ...rest} = props;
    return (
        <Form.Group controlId={`${name}-3`}>
            <Form.ControlLabel>{label} </Form.ControlLabel>
            <Form.Control name={name} accepter={accepter} {...rest}/>
            <Form.HelpText>{help}</Form.HelpText>
        </Form.Group>
    );
}



const Register = () => {
    const auth = getAuth()
    const toaster = useToaster();
    const [loading, setLoading] = React.useState(false);
    const [passwordVisible, setPasswordVisible] = React.useState(false);
    let navigate = useNavigate();

    const handleReset = () => {
        toaster.clear();
        navigate("/auth/reset")

    }
    const invalidVerificationMessage = (
        <Notification type={'error'} header={'Email not verified'} duration={15000} closable>
            <h6>Your email has not been verified, please try again or send yourself a new verification link:</h6>
            <hr/>
            <Button appearance="link" >Send new verification link</Button>
        </Notification>
    )
    const usernameAlreadyExistsMessage = (
        <Notification type={'error'} header={'Email already exists'} duration={15000} closable>
            <h6>The email you are trying to use is already linked to another account. If this is your email, try to reset the password.</h6>
            <hr/>
            <Button appearance="link" onClick={handleReset}>Forgot Password? Reset it</Button>
        </Notification>
    )

    const unknownErrorMessage = (error) => (
        <Notification type={'error'} header={'Error'} duration={15000} closable>
            <h6>The following error occurred while trying to register:</h6>
            <h8>{error}</h8>
        </Notification>
    )



    const formRef = React.useRef();
    const [formError, setFormError] = React.useState({});
    const [formValue, setFormValue] = React.useState({
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [page, setPage] = React.useState(0)



    const handleRegister = () => {
        setLoading(true);
        if (formValue.password === formValue.confirmPassword)
            createUserWithEmailAndPassword(auth, formValue.email, formValue.password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    registerUserToFireStore(user.uid, formValue)
                        .then(() => {
                            sendEmailVerification(user).then(() => {
                                console.log("Verification email sent\nRegistered user: ", user);
                                formValue.password = "";
                                formValue.confirmPassword = "";
                                setPage(1)
                                setLoading(false);
                            })
                        })
                        .catch((error) => {
                            console.log("Error registering user or sending verification email: ", error);
                            toaster.push(unknownErrorMessage(error.message), {placement: "topStart"})
                        })

                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log("Error occurred: ", errorCode, errorMessage);
                    if(error.code  === "auth/email-already-in-use"){
                        toaster.push(usernameAlreadyExistsMessage, {placement: "topStart"})
                    } else if(error.code === "auth/invalid-email"){
                        toaster.push(unknownErrorMessage("The email you entered is not in the correct format or is invalid, please try again"), {placement: "topStart"})
                    } else {
                        toaster.push(unknownErrorMessage(error.message), {placement: "topStart"})
                    }
                    setLoading(false);
                });
        else {
            console.log("Passwords do not match")
            toaster.push(unknownErrorMessage("Passwords do not match"), {placement: "topStart"})
            setLoading(false);
        }
    };

    const handleOnClick = () => {
        navigate("/auth/login")
    }

    const checkVerification = () => {
        setLoading(true);
        console.log("Checking email verification status")
        auth.currentUser.reload().then(() => {
                console.log(auth.currentUser.emailVerified)
                if (auth.currentUser.emailVerified === true) {
                    setPage(2)
                    console.log("Email was verified")
                    setLoading(false);
                }
                else {
                    console.log("Email was not verified")
                    toaster.push(invalidVerificationMessage, {placement: "topStart"})
                    setLoading(false);
                }
            }
        )
            .catch((error) => {
                console.log("Error checking email verification status: ", error)
                toaster.push(unknownErrorMessage(error.message), {placement: "topStart"})
                setLoading(false);
            })
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
            <TextField name="password" label="Password" type={passwordVisible ? 'text' : 'password'} placeholder={"Password"}/>
            <TextField name="confirmPassword" label="Confirm Password" placeholder={"confirm password"} type={passwordVisible ? 'text' : 'password'} help={
                <Checkbox style={{translate: "30"}} onChange={(value, checked) => {
                    checked ? setPasswordVisible(true) : setPasswordVisible(false)
                }}> Show Password</Checkbox>}/>

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
                   className={"mainPanel"}  style={{borderRadius: 20}}>
                {(loading)? <center><div className={"scaleLoader"}><ScaleLoader color={"#fff"} loading={true} height={50} width={10}/></div> </center>: null}
                {(!loading)? pagesArray[page]:null}
            </Panel>

        </div>
    );
};

export default Register;

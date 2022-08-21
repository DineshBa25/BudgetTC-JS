import React from "react";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {
    Button,
    IconButton,
    ButtonToolbar,
    Divider,
    Form,
    Panel,
    Schema,
    Checkbox,
    useToaster,
    Notification, Message
} from "rsuite";
import {useNavigate} from "react-router-dom";
import {FcGoogle} from "react-icons/fc";
import {Button as ButtonMUI} from '@mui/material';
import SignIn from "@rsuite/icons/legacy/SignIn";
import {useDispatch} from "react-redux";
import {toggleAuth} from "../../redux/slice/authSlice";
import {getAndSetUserDataFromFireStore} from './firebase'
import {setRetirementCalcData401K} from "../userDataSlice";
import {ScaleLoader} from "react-spinners";
import "./auth.css"

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
    const {name, label, accepter, help, ...rest} = props;
    return (
        <Form.Group controlId={`${name}-3`}>
            <Form.ControlLabel>{label} </Form.ControlLabel>
            <Form.Control name={name} accepter={accepter} {...rest} />
            <Form.HelpText>{help}</Form.HelpText>
        </Form.Group>
    );
}


const Login = () => {
    const formRef = React.useRef();//formRef is a ref to the form element
    const [formError, setFormError] = React.useState({
        email: '',
        password: ''
    });//form error state
    const [formValue, setFormValue] = React.useState({//initial form value
        email: 'dineshba63@gmail.com',
        password: '1234567'
    });
    const [visible, setVisible] = React.useState(false);//for password visibility toggle

    let navigate = useNavigate();//for redirecting to other pages

    const auth = getAuth();//firebase.auth();

    const dispatch = useDispatch();//dispatch for redux

    const toaster = useToaster();//toaster is used to display messages to the user.

    const [loading, setLoading] = React.useState(false);//loading state for switching between loading and not loading
    //handle click if use clicks of password reset button
    //todo: implement password reset functionality such that the email will automatically transfer if entered already on current page
    const handleOnClick = () => {

        navigate("/auth/reset")
    }

    //Handle click if user clicks on register button
    //todo: implement password reset functionality such that the email will automatically transfer if entered already on current page
    const handleOnSignupClick = () => {

        navigate("/auth/register")

    }

    //Notification for when password is wrong
    const invalidLoginMessage = (
        <Notification type={'error'} header={'Invalid Credentials'} duration={15000}>
            <h6>Please try again or reset your password.</h6>

            <Button appearance="link" onClick={handleOnClick}>Forgot password? Reset it</Button>
        </Notification>
    )

    //Notification for invalid login if email is wrong
    const wrongUserNotification = (
        <Notification type={'error'} header={'Unable to find user'}  duration={15000} closable>
            <h8>Were unable to locate a user in our data base with the username <b>{formValue.email}</b>.</h8>
            <hr/>
            <h6>Please try again or register for a new account.</h6>
            <Button appearance="link" onClick={handleOnSignupClick}>Register for a BudgetTC account</Button>
        </Notification>
    )

    // Notification for when firebase auth fails and gives unknown error
    const errorMessageNotification = (errorMsg) => (
        <Notification type={'error'} header={'Sign in Error'}  duration={15000} closable>
            <h6>The following error occurred while trying to sign you in:</h6>
            <h8>{errorMsg}</h8>
        </Notification>
    )

    /**handle submit of form when user clicks login button or presses enter key*/
    const handleLogin = () => {
        setLoading(true);
        signInWithEmailAndPassword(auth, formValue.email, formValue.password) // sign in with email and password
            .then(async (userCredential) => {
                const user = userCredential.user;
                await getAndSetUserDataFromFireStore(user.uid).then((value) => { // get user data from firestore
                    dispatch(setRetirementCalcData401K(value))  // set user data in redux store
                })

                console.log("Signed in user: ", user); // log signed in user to console

                localStorage.setItem("Authenticated", true); // set local storage for auth state to true
                dispatch(toggleAuth(true)) // set auth state in redux store to true
                toaster.clear(); // clear any previous messages
                navigate("/app/dashboard")  // navigate to dashboard page
                setLoading(false);//set loading state to false
            })
            .catch((error) => {
                // clear any previous messages
                const errorCode = error.code; // get error code from error object
                const errorMessage = error.message; // get error message from error object
                console.log("An error occurred: ", errorCode, errorMessage); // log error to console
                if (errorCode === 'auth/wrong-password') { // if error code is wrong password
                    setFormError({password: "Incorrect Password"}); // set form error state to error message

                    toaster.push(invalidLoginMessage, {placement: "topStart"}) // push invalid login message to toaster
                } else if (errorCode === 'auth/user-not-found') { // if error code is user not found
                    setFormError({email: "Invalid username/email"}); // set form error state to error message
                    toaster.push(wrongUserNotification, {placement: "topStart"}) // push notification to top start of screen
                } else { // if error code is unknown
                    toaster.push(errorMessageNotification(errorMessage), {placement: "topStart",}) // push error message to toaster
                }
                setLoading(false);//set loading state to false
            });

    };

    // if enter key is pressed, call handleLogin function
    /**Event handler for when the Enter key is pressed
     * @param event contains the keypress event*/
    function pressed(event) {
        // If the user presses the "Enter" key on the keyboard
        if (event.key === "Enter") {
            console.log("Enter Pressed")
            if (formValue.password !== "" && formValue.email !== "")  // if password and email are not empty
            {
                handleLogin()
            }
            else  // if password or email are empty
                console.error("Username or password is not entered")
        }
    }

    return (
        <div>
        <div>
            <center>
                <div className={"logodiv"}>
                    <img
                        src="https://firebasestorage.googleapis.com/v0/b/budgettc-c8e98.appspot.com/o/logo10%20Dual%20Theme%20Compatable.png?alt=media&token=449edb64-124d-4abc-8459-8870732c2f72"
                        height="50" width="200" alt={"BudgetTC-Logo"} style={{imageRendering: "crisp-edges"}}/>
                </div>
            </center>
            <Panel header={<h3>Login</h3>} bordered className={"mainPanel"} style={{borderRadius: 20}}>
                {(loading)? <center><div style={{height: 200, marginTop: 50}}><ScaleLoader color={"#fff"} loading={true} height={50} width={10}/></div> </center>: null}
                {(!loading)?
                <Form ref={formRef}
                      onChange={setFormValue}
                      onCheck={setFormError}
                      formError={formError}
                      formValue={formValue}
                      model={model}
                >
                    <Form.Group controlId="email">
                        <Form.ControlLabel>Email</Form.ControlLabel>
                        <Form.Control name="email" />
                    </Form.Group>
                    <TextField name="password" label="Password" type={visible ? 'text' : 'password'} help={
                        <Checkbox style={{translate: "30"}} onChange={(value, checked) => {
                            checked ? setVisible(true) : setVisible(false)
                        }}> Show Password</Checkbox>
                    } placeholder={"password"} onKeyPress={pressed}/>


                    <ButtonToolbar>
                        <IconButton appearance="primary" onClick={handleLogin} icon={<SignIn/>}>Sign in</IconButton>
                        <Button appearance="link" onClick={handleOnClick}>Forgot password?</Button>
                        <Button appearance="link" onClick={handleOnSignupClick}>Register</Button>
                    </ButtonToolbar>
                    <Divider>OR</Divider>
                    <ButtonToolbar style={{marginTop: 20}}>

                        <ButtonMUI variant="outlined" startIcon={<FcGoogle size={30}/>}>
                            Sign in with Google
                        </ButtonMUI>
                    </ButtonToolbar>

                </Form> : null}
                <hr/>
                <Message showIcon type="warning" style={{marginTop: 25}}>NOTE: This site is still under construction</Message>
            </Panel>

        </div>


        </div>
    );
};


export default Login;
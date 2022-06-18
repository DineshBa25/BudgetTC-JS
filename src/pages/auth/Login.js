import React from "react";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {Button, IconButton, ButtonToolbar, Divider, Form, Panel, Schema, Checkbox} from "rsuite";
import {useNavigate} from "react-router-dom";
import {FcGoogle} from "react-icons/fc";
import {Button as ButtonMUI} from '@mui/material';
import SignIn from "@rsuite/icons/legacy/SignIn";
import {useDispatch} from "react-redux";
import {toggleAuth} from "../../redux/slice/authSlice";
import {getAndSetUserDataFromFireStore} from './firebase'
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
    const formRef = React.useRef();
    const [formError, setFormError] = React.useState({});
    const [formValue, setFormValue] = React.useState({
        email: 'dineshba63@gmail.com',
        password: '1234567'
    });
    const [visible, setVisible] = React.useState(false);

    let navigate = useNavigate();

    const auth = getAuth();

    const dispatch = useDispatch();


    const handleLogin = () => {

        signInWithEmailAndPassword(auth, formValue.email, formValue.password)
            .then(async (userCredential) => {
                const user = userCredential.user;
                await getAndSetUserDataFromFireStore(user.uid).then((value) => {
                    dispatch(setRetirementCalcData401K(value))
                })

                console.log("Signed in user: ", user);

                localStorage.setItem("Authenticated", true);
                dispatch(toggleAuth(true))
                navigate("/app/dashboard")

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("An error occurred: ", errorCode, errorMessage);
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
            if (formValue.password !== "" && formValue.email !== "")
                handleLogin()
            else
                console.error("Username or password is not entered")
        }
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
            <Panel header={<h3>Login</h3>} bordered style={{background: "rgba(18,25,45,0.85)", borderWidth: "thick"}}>

                <Form ref={formRef}
                      onChange={setFormValue}
                      onCheck={setFormError}
                      formError={formError}
                      formValue={formValue}
                      model={model}>
                    <TextField name="email" label="Email"/>
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

                </Form>
            </Panel>
        </div>
    );
};


export default Login;
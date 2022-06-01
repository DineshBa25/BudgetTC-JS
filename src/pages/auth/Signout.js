import React, {useState} from "react";
import {getAuth, signOut} from "firebase/auth";
import {Button, ButtonToolbar, Form, IconButton, Modal, Panel, Radio, Schema} from "rsuite";
import {useNavigate} from "react-router-dom";
import {Exit} from "@rsuite/icons";


const Signout = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const formRef = React.useRef();
    const [formError, setFormError] = React.useState({});
    const [formValue, setFormValue] = React.useState({
        email: '',
        password: ''
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
            <Panel header={<h3>You're all signed out now!</h3>} bordered
                   style={{background: "rgba(18,25,45,0.85)", borderWidth: "thick"}}>
                <ButtonToolbar>
                    <Button appearance="link" onClick={handleOnClick}>Back to login</Button>
                </ButtonToolbar>
            </Panel>
        </div>
    );
};

export function SignoutButton() {
    const auth = getAuth();
    let navigate = useNavigate();
    const handleSignout = () => {
        signOut(auth)
            .then(() => {
                localStorage.setItem("Authenticated", false)
                console.log("Signed out")
                console.log(localStorage.getItem("Authenticated"))
                navigate("/auth/signout")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("An error occured signing out: ", errorCode, errorMessage);
            })
    };
    const [open, setOpen] = React.useState(false);
    const [backdrop, setBackdrop] = React.useState('static');
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div><ButtonToolbar>
                <IconButton appearance="primary" color="red" icon={<Exit/>} onClick={handleOpen}>Sign-out</IconButton>
            </ButtonToolbar>
    <Modal backdrop={backdrop} keyboard={false} open={open} size="sm" onClose={handleClose}>
        <Modal.Body>
            <h4>Are you sure that you want to sign-out?</h4>
            <Radio>Don't prompt for confirmation again</Radio>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={handleSignout} appearance="primary" color={"red"}>
                Yes, sign-out
            </Button>
            <Button onClick={handleClose} appearance="primary" >
                No, take me back
            </Button>
        </Modal.Footer>
    </Modal></div>
    );
}

export default Signout;
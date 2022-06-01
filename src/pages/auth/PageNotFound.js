import React, {useState} from "react";
import {Button, ButtonToolbar, Form, Modal, Panel, Radio, Schema} from "rsuite";
import {useNavigate} from "react-router-dom";


const PageNotFound = () => {
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
            <Panel header={<h3>Hmmm... the page you are trying to access is not available</h3>} bordered
                   style={{background: "rgba(18,25,45,0.85)", borderWidth: "thick"}}>
                <ButtonToolbar>
                    <Button appearance="link" onClick={handleOnClick}>Back to login</Button>
                </ButtonToolbar>
            </Panel>
        </div>
    );
};

export default PageNotFound;
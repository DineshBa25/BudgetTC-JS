import React from 'react';
import {Panel} from "rsuite";

let theme = "dark"

const LearnTab = () => {
    return (
        <div className={"auth"}>
            <center>
                <div className={"inner"}>
                    <Panel header={<h3>Comming Soon!</h3>} bordered
                           style={{background: "rgba(18,25,45,0.85)", borderWidth: "thick"}}>
                        Come back once this page is complete.
                    </Panel>
                </div>
            </center>
        </div>
    );
}

export default LearnTab
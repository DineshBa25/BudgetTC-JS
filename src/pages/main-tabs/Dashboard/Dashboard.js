import React from 'react';
import {Panel} from "rsuite";

const Dashboard = () => {
    return (
        <div className={"auth"}>
            <center>
                <div className={"inner"}>
                    <Panel header={<h3>Coming Soon!</h3>} bordered
                           style={{background: "rgba(18,25,45,0.85)", borderWidth: "thick"}}>
                        This is the dashboard tab. Select another tab on the left to continue. Come back once this page
                        is complete.
                    </Panel>
                </div>
            </center>
        </div>
    );
}

export default Dashboard
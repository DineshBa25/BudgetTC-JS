import React from 'react';
import {Badge, Calendar, Divider, IconButton, Panel, Stack} from "rsuite";
import './LearnTab.css';
import Typography from "@mui/material/Typography";
import List from "rsuite/List";
import EditIcon from "@rsuite/icons/Edit";

let theme = "dark"

const LearnTab = () => {
    return (
        <div className={"box8"} style={{width: "100%", height: "100%"}}>
            <div className="infoTab" style={{
                background: "rgba(21,23,31,0.89)",

                marginTop: 10,
                marginBottom: 10,
                width: 390,
                borderRadius: 7
            }}/>


            <div className="courseMaterialPanel" style={{
                background: "rgba(21,23,31,0.65)",
                marginRight: 70,
            }}>
                <Stack justifyContent={"flex-start"} wrap spacing={20}>
                    <Panel shaded bordered bodyFill className={"panel1"}>
                        <center>
                            <img
                                src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcohenwoodworking.com%2Fwp-content%2Fuploads%2F2016%2F09%2Fimage-placeholder-500x500.jpg&f=1&nofb=1"
                                height="180" width="280" style={{borderTopRightRadius: 10, borderTopLeftRadius: 10}}/>
                        </center>
                        <Panel header="Introduction" style={{
                            background: "rgba(27,29,36,0.85)",
                            borderTopLeftRadius: 0,
                            borderTopRightRadius: 0
                        }}>
                            <p>
                                <small>
                                    Introduction to financial management for a better life. Handling money to eliminate
                                    financial stress.
                                </small>
                            </p>
                        </Panel>
                    </Panel>
                    <Panel shaded bordered bodyFill className={"panel1"}>
                        <img
                            src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcohenwoodworking.com%2Fwp-content%2Fuploads%2F2016%2F09%2Fimage-placeholder-500x500.jpg&f=1&nofb=1"
                            height="180" width="280" style={{borderTopRightRadius: 10, borderTopLeftRadius: 10}}/>
                        <Panel header="RSUITE" style={{background: "rgba(27,29,36,0.85)"}}>
                            <p>
                                <small>
                                    A suite of React components, sensible UI design, and a friendly development
                                    experience.
                                </small>
                            </p>
                        </Panel>
                    </Panel>
                    <Panel shaded bordered bodyFill className={"panel1"}>
                        <img
                            src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcohenwoodworking.com%2Fwp-content%2Fuploads%2F2016%2F09%2Fimage-placeholder-500x500.jpg&f=1&nofb=1"
                            height="180" width="280" style={{borderTopRightRadius: 10, borderTopLeftRadius: 10}}/>
                        <Panel header="RSUITE" style={{background: "rgba(27,29,36,0.85)"}}>
                            <p>
                                <small>
                                    A suite of React components, sensible UI design, and a friendly development
                                    experience.
                                </small>
                            </p>
                        </Panel>
                    </Panel>
                </Stack>
            </div>

        </div>
    );
}

export default LearnTab
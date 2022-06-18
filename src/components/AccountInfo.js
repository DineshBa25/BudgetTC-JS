import React from "react";
import {Avatar, Button, Drawer, IconButton, Stack} from "rsuite";
import {SignoutButton} from "../pages/auth/Signout";
import {store} from "../redux/store";
import EditIcon from "@rsuite/icons/Edit";

/**Manages and Displays the current user's information (email, account picture). Also allows the user to manage
 * email and password preferences from within the portal while logged in*/
function AccountInfo() {
    /* Used to Determine the Open State of aADrawer */
    const [open, setOpen] = React.useState(false);
    /* Handles the click when user wants to open AccountInfo Drawer*/
    const handleOpen = () => setOpen(true);
    return (
        <div>
              <IconButton icon={
                <Avatar circle
                        src={(store.getState().userData.userDataDocument !== undefined) ? store.getState().userData.userDataDocument.userInformation.accountPicture : null}
                />} style={{background: "rgba(255,255,255,0)"}} onClick={handleOpen}/>
            <div className="modal-container">
                <Drawer backdrop={"static"} open={open} onClose={() => setOpen(false)} size={"sm"}>
                    <Drawer.Header style={{background: "rgba(42,45,51,0.75)"}}>
                        <Drawer.Title>Account Information</Drawer.Title>
                        <SignoutButton/>
                    </Drawer.Header>
                    <Drawer.Body style={{overflowX: "hidden", background: "rgb(32,34,42)"}}>
                        <center>
                            <h4 style={{marginTop: 15, paddingBottom: 30}}>You're currently signed in as:</h4>
                            <Avatar
                                size="lg"
                                circle
                                src={(store.getState().userData.userDataDocument !== undefined) ? store.getState().userData.userDataDocument.userInformation.accountPicture : null}
                            />
                            <h5>{(store.getState().userData.userDataDocument !== undefined) ? store.getState().userData.userDataDocument.userInformation.email : null}</h5>

                            <hr/>
                            <h5>Motivational Quotes Texting Service</h5>
                            <h10>(Powered by Twillo)</h10>
                            <Stack direction={"column"} style={{paddingTop: 20}}>
                                <h8>Phone Number: <b>(123)-456-7891</b></h8>
                                <h8>Frequency: <b>Every Day (12:00 AM)</b></h8>
                                <IconButton icon={<EditIcon />} style={{marginTop: 20}} appearance={"primary"} >Edit</IconButton>
                            </Stack>
                            <hr/>
                            <h8>Current plan: <b>Engage (Free)</b></h8>
                            <Button appearance={"link"} >Report a problem or suggestion</Button>
                        </center>
                    </Drawer.Body>
                </Drawer>
            </div>
        </div>
    );
}

export default AccountInfo;
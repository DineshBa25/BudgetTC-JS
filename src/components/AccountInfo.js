import React from "react";
import {Avatar, Drawer, IconButton} from "rsuite";
import {SignoutButton} from "../pages/auth/Signout";
import {store} from "../redux/store";

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
                    src={store.getState().userData.userDataDocument.userInformation.accountPicture}
            />} style={{background: "rgba(255,255,255,0)"}} onClick={handleOpen}/>
        <div className="modal-container">
            <Drawer backdrop={"static"} open={open} onClose={() => setOpen(false)} size={"xs"}>
                <Drawer.Header  style={{ background: "rgba(42,45,51,0.75)"}}>
                    <Drawer.Title>Account Information</Drawer.Title>
                    <SignoutButton/>
                </Drawer.Header>
                <Drawer.Body style={{overflowX: "hidden", background: "rgba(10,24,49,0.27)"}}>
                    <center>
                        <h4 style={{marginTop: 15, paddingBottom:30}}>You're currently signed in as:</h4>
                        <Avatar
                            size="lg"
                            circle
                            src={store.getState().userData.userDataDocument.userInformation.accountPicture}
                        />
                        <h5>{store.getState().userData.userDataDocument.userInformation.email}</h5>
                        <hr/>
                    </center>
                </Drawer.Body>
            </Drawer>
        </div>
        </div>
    );
}

export default AccountInfo;
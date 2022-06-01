import React from 'react';
import {Button, ButtonToolbar, Drawer, Form, IconButton, Radio, RadioGroup, Uploader} from "rsuite";
import GearIcon from "@rsuite/icons/Gear";

function Settings() {
    const [open, setOpen] = React.useState(false);
    return (
        <div>
            <IconButton icon={<GearIcon/>} onClick={() => setOpen(true)} style={{background: "rgba(255,255,255,0)"}}/>

            <Drawer backdrop={"static"} open={open} onClose={() => setOpen(false)} style={{width: 370}}>
                <Drawer.Header>
                    <Drawer.Title>Settings</Drawer.Title>
                    <Drawer.Actions>
                        <Button onClick={() => setOpen(false)}>Cancel</Button>
                        <Button onClick={() => setOpen(false)} appearance="primary">
                            Save
                        </Button>
                    </Drawer.Actions>
                </Drawer.Header>
                <Drawer.Body style={{overflowX: "hidden"}}>
                    <SettingsForm/>
                </Drawer.Body>
            </Drawer>
        </div>
    );
}

function SettingsForm() {
    return (
        <Form layout="horizontal" style={{width: 370}}>
            <Form.Group controlId="theme">
                <Form.ControlLabel style={{width: 75}}>Theme</Form.ControlLabel>
                <Form.Control name="radio" accepter={RadioGroup} inline appearance="picker">
                    <Radio value="Dark"> Dark</Radio>
                    <Radio value="Light" disabled={true}>Light</Radio>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="background">
                <Form.ControlLabel style={{width: 75}}>Background</Form.ControlLabel>
                <Form.Control name="background" accepter={Uploader} style={{width: 160}}/>
            </Form.Group>
            <Form.Group>
                <ButtonToolbar>
                    <Button appearance="primary">Submit</Button>
                </ButtonToolbar>
            </Form.Group>
        </Form>
    )
}

export default Settings;
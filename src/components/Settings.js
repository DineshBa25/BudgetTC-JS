import React from 'react';
import {Button, ButtonToolbar, Drawer, Form, Radio, RadioGroup, Uploader} from "rsuite";
import {CameraRetro} from "@rsuite/icons/es/icons/legacy";

function Settings({open, setOpen}) {
    return (
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
                <Form.Control name="background" accepter={Uploader}  listType="picture"  action="//jsonplaceholder.typicode.com/posts/" style={{width: 160}}>
                    <button>
                        <CameraRetro />
                    </button>
                </Form.Control>
            </Form.Group>
            <Form.Group>
                <ButtonToolbar>
                    <Button appearance="primary">Submit</Button>
                </ButtonToolbar>
            </Form.Group>
        </Form>
    </Drawer.Body>
        </Drawer>
    );
}


export default Settings;
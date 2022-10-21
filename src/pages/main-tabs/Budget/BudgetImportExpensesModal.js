import React from "react";
import {Button, ButtonGroup, Modal, Stack, Table} from "rsuite";
import {database} from "../../../configs/firebaseConfig";
import {update, ref} from "firebase/database";
class BudgetImportExpensesModal extends React.Component {
    constructor() {
        super();
        this.state= {
            currentStep: 1,
            disableImport: false,
            fileData: null,
            incomeData: null,
            showModal: false,
        }
    }

    //mount component only when modal is open
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps.show;
    }
    componentDidMount() {
        console.log("componentDidMount");
    }

    toObject = (arr) => {
        const rv = {};
        for (let i = 0; i < arr.length; ++i)
            if (arr[i] !== undefined) rv[`newItem${i}`] = arr[i];
        return rv;
    }

    async handleUploadToFirebase(data) {
        console.log("handleUploadToFirebase");
        //convert amount to number
        for(let i = 0; i < data.length; i++) {
            await update(ref(database, `users/testUser/unallocatedExpenses/`), {
                [data[i].id]: data[i]
            }).
            then(() => {
                console.log("pushed to firebase");
                //set current step to 3
                this.setState({currentStep: 3});
            }).catch((error) => {
                console.log("error pushing to firebase: ", error);
            });
        }

        //update the unallocated expenses in the parent component
        console.log("updating unallocated expenses in parent component", data);
        this.props.addToUnallocatedExpenses(data);

    }


    componentWillUnmount() {
        this.setState({
            currentStep: 1,
            disableImport: false,
            fileData: null
        })
        console.log("unmounting")
    }

    //handle when user clicks on "Next" button maxStep = 2
    handleNext = () => {
        if (this.state.currentStep < 3) {
            this.setState({currentStep: this.state.currentStep + 1});
        }
    }

    handlePrevious = () => {
        if (this.state.currentStep > 1) {
            this.setState({currentStep: this.state.currentStep - 1});
        }
    }

    handleClose = () => {
        this.props.handleClose();
        this.setState({
            currentStep: 1,
            disableImport: false,
            fileData: null});
        //unmount component
        this.componentWillUnmount();
    }
    render() {

        const steps = [
            <div>
                <h4>Select a file</h4>
                <p>You can browse your file directory by selecting the button below. You can also drag files in
                    the box below to upload them.</p>
                <Stack direction={"column"} justifyContent={"center"}>
                    <input type="file" title={"Browse (or Drag)"} id="file" accept=".csv" onInput={()=>{this.setState({disableImport: false})}} style={{ marginTop: 15, background: "#1a1d24", height: 50, textAlign: "center", padding: 10, paddingTop: 13, borderRadius: 15}}/>
                    <Button disabled={this.state.disableImport} id={"submit"} onClick={() => {
                        //check if file is .csv
                        let file = document.getElementById("file").files[0];
                        if (file.name.split(".")[1] !== "csv") {
                            alert("Please select a .csv file");
                            return;
                        }
                        //log file data
                        //console.log(file);
                        //read .csv file
                        let reader = new FileReader();
                        reader.readAsText(file);
                        reader.onload = () => {
                            //go through each line and item and add to matrix
                            let matrix = [];
                            let incomeArray = [];
                            let object = {};
                            let lines = reader.result.split("\n");
                            for (let i = 0; i < lines.length-1; i++) {
                                //go through line and add to matrix, remove quotes
                                let line = lines[i].split(",");
                                if(parseFloat(line[1]) > 0) {
                                    object = {
                                        "date": line[0],
                                        "amount": line[1],
                                        "name": line[4]
                                    }
                                    incomeArray.push(object);
                                } else if(parseFloat(line[1]) < 0) {
                                    object = {
                                        date: line[0],
                                        //remove negative sign
                                        amount: Number(line[1].substring(1)),
                                        name: line[4].substring(line[4].indexOf("AUTHORIZED ON ") + 19, line[4].length - 27),
                                        id: line[4].substring(line[4].length - 27, line[4].length - 10)
                                    }
                                    matrix.push(object);
                                }
                            }
                            //log matrix
                            console.log(matrix);
                            this.setState({fileData: matrix, incomeData: incomeArray , disableImport: true});
                        }
                    }}
                            style={{marginTop: 15}} appearance={"primary"}>
                        Import
                    </Button>
                </Stack>
            </div>,
            <div>
                <p>Here's what we are importing:</p>
                <h4>Income</h4>
                <Table data={this.state.incomeData}  autoHeight >
                    <Table.Column flexGrow align="center" fixed>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.Cell dataKey="name" />
                    </Table.Column>
                    <Table.Column width={100} align="center">
                        <Table.HeaderCell>Date</Table.HeaderCell>
                        <Table.Cell dataKey="date" />
                    </Table.Column>
                    <Table.Column width={200} align="center">
                        <Table.HeaderCell>Amount</Table.HeaderCell>
                        <Table.Cell dataKey="amount" />
                    </Table.Column>
                </Table>
                <hr/>
                <h4>Expenses</h4>
                { (this.state.fileData!== null)?
                    <Table virtualized autoHeight style={{marginTop: 15}} data={this.state.fileData}>
                    <Table.Column flexGrow align="center" fixed>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.Cell dataKey="name" />
                    </Table.Column>
                    <Table.Column width={100}>
                        <Table.HeaderCell>Date</Table.HeaderCell>
                        <Table.Cell dataKey="date" />
                    </Table.Column>

                        <Table.Column width={100}>
                            <Table.HeaderCell>Amount</Table.HeaderCell>
                            <Table.Cell dataKey="amount" />
                        </Table.Column>
                    </Table>
                    : null}
                <Button appearance={"primary"} style={{marginTop: 15}} onClick={()=>this.handleUploadToFirebase(this.state.fileData)}>
                    Upload to budget
                </Button>
            </div>,
            <div>
                <h4>Successfully uploaded to budget</h4>
                <p>Imported {(this.state.fileData !==null)? this.state.fileData.length: "no"} expenses.</p>
            </div>
        ]

        return (
            <Modal  backdrop={"static"} keyboard={false} open={this.props.show}>
                <Modal.Header>Import Expenses From .csv File</Modal.Header>
                <Modal.Body>
                    <center>
                        {steps[this.state.currentStep - 1]}
                        <hr/>
                        <ButtonGroup>
                            <Button disabled={this.state.currentStep === 1} onClick={this.handlePrevious}>
                                Previous
                            </Button>
                            <Button disabled={this.state.currentStep === 3 || !this.state.disableImport} onClick={this.handleNext}>
                                Next
                            </Button>
                        </ButtonGroup>
                    </center>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.handleClose} color={"red"}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>);
    }
}

export default BudgetImportExpensesModal;
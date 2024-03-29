import React from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import {formatter} from "./BudgetFormatters";
import {Button as RSButton} from 'rsuite'; // I'm using rsuite for the rest of the app
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";


class BudgetExpenseItemTransferList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            checked: [],
            left: props.left,
            right: props.right,
            originalLeft: props.left,
            originalRight: props.right,
        };
    }


    //function that checks if there are any changes between the original and current state
    //if there are changes, it returns true, otherwise false
    checkChanges = () => {
        let left = this.state.left;
        let right = this.state.right;
        let originalLeft = this.state.originalLeft;
        let originalRight = this.state.originalRight;
        let leftChanges = false;
        let rightChanges = false;
        if (left.length !== originalLeft.length){
            leftChanges = true;
        } else {
            for (let i = 0; i < left.length; i++){
                if (left[i].id !== originalLeft[i].id){
                    leftChanges = true;
                    break;
                }
            }
        }
        if (right.length !== originalRight.length){
            rightChanges = true;
        } else {
            for (let i = 0; i < right.length; i++){
                if (right[i].id !== originalRight[i].id){
                    rightChanges = true;
                    break;
                }
            }
        }
        return leftChanges || rightChanges;
    }


    //function that determines if the user has made any changes to the transfer list, and returns a {} with the changes of the form {addedToLeft: [], removedFromLeft: [], addedToRight: [], removedFromRight: []}
    getChanges = () => {

        //modify the originalLeft and originalRight to reflect the changes
        this.setState({
            originalLeft: this.state.left,
            originalRight: this.state.right,
        });

        return {left: this.state.left, right: this.state.right};
    }

    not = (a, b) => {
        return a.filter((value) => b.indexOf(value) === -1);
    }

    intersection = (a, b) => {
        return a.filter((value) => b.indexOf(value) !== -1);
    }

    union = (a, b) => {
        return [...a, ...this.not(b, a)];
    }

    leftChecked = () => {
        return this.intersection(this.state.checked, this.state.left);
    }

    rightChecked = () => {
        return this.intersection(this.state.checked, this.state.right);
    }

    handleToggle = (value) => () => {
        const currentIndex = this.state.checked.indexOf(value);
        const newChecked = [...this.state.checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        this.setState({
            checked: newChecked,
        });
    }

    numberOfChecked = (items) => this.intersection(this.state.checked, items).length;

    handleToggleAll = (items) => () => {
        if (this.numberOfChecked(items) === items.length) {
            this.setState({checked: this.not(this.state.checked, items)});
        } else {
            this.setState({checked: this.union(this.state.checked, items)});
        }
    }

    handleCheckedRight = () => {
        this.setState((state) => ({
            //check if the item id is the same as anything in the list that is being added to, if so, change the id to temp1, temp2, etc.
            right: this.union(state.right, this.leftChecked()),
            left: this.not(state.left, this.leftChecked()),
            checked: this.not(state.checked, this.leftChecked()),
        }));
    }

    handleCheckedLeft = () => {
        this.setState((state) => ({
            left: this.union(state.left, this.rightChecked()),
            right: this.not(state.right, this.rightChecked()),
            checked: this.not(state.checked, this.rightChecked()),
        }));
    }

    handleAllRight = () => {
        this.setState((state) => ({
            right: this.union(state.right, state.left),
            left: [],
        }));
    }

    handleAllLeft = () => {
        this.setState((state) => ({
            left: this.union(state.left, state.right),
            right: [],
        }));
    }

    handleDeleteCheckedBothSide = () => {
        this.setState((state) => ({
            left: this.not(state.left, this.leftChecked()),
            right: this.not(state.right, this.rightChecked()),
            checked: this.not(state.checked, this.leftChecked()),
        }));
    }

    customList = (title, items, originalItems) => (
        <Card>
            <CardHeader
                sx={{padding: 1}}
                avatar={
                    <Checkbox
                        onClick={this.handleToggleAll(items)}
                        checked={
                            this.numberOfChecked(items) === items.length && items.length !== 0
                        }
                        indeterminate={
                            this.numberOfChecked(items) !== items.length &&
                            this.numberOfChecked(items) !== 0
                        }
                        disabled={items.length === 0}
                        inputProps={{'aria-label': 'all items selected'}}
                    />
                }
                title={title}
                subheader={`${this.numberOfChecked(items)}/${items.length} selected`}
            />
            <Divider />
            <List sx={{padding: 1}} dense component="div" role="list" style={{height: 150,  overflowY: "auto"}}>
                {items.map((value) => {
                    const labelId = `transfer-list-all-item-${value}-label`;

                    //check if the item is in the original list, if it is make it red
                    let isOriginal = false;
                    if(originalItems.includes(value)){
                        isOriginal = true;
                    }

                    //render)
                    return (
                        <ListItem
                            key={value}
                            role="listitem"
                            button
                            onClick={this.handleToggle(value)}
                            style={{borderStyle: !isOriginal ? "solid": "none", borderWidth: 2, borderColor: "red"}}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    checked={this.state.checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{'aria-labelledby': labelId}}
                                />
                            </ListItemIcon>
                            <ListItemText>
                                    <Typography fontSize={13}>{value[1].name}</Typography>
                                <Typography color={"red"} fontSize={12}>{formatter.format(value[1].amount)} <b style={{color: "#ababab"}}>({(value[1].date !== undefined)? value[1].date : "No date"})</b></Typography>
                            </ListItemText>
                        </ListItem>
                    );
                })}
                <ListItem />
            </List>
        </Card>
    );




    render(){
        const {left, right} = this.state;



        return(
            <div style={{background: "#30303a", borderRadius: 15, padding: 15}}>
                <center>
                <div>
                    <h4>Allocate Expenses</h4>
                    <p>Here you can select the expenses the you have imported that are part of this spending subcategory.</p>
                </div>
                </center>
                <hr/>
                <Grid container spacing={2} justify="center" alignItems="center">
                    <Grid flex={6} item>{this.customList('Unallocated Expenses', left, this.state.originalLeft)}</Grid>
                    <Grid width={100} item>
                            <Grid container direction="column" alignItems="center">
                                <Button
                                    variant="outlined"
                                    size="small"
                                    className="button"
                                    onClick={this.handleCheckedRight}
                                    disabled={this.leftChecked().length === 0}
                                    aria-label="move selected right"
                                >
                                    &gt;
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    className="button"
                                    onClick={this.handleCheckedLeft}
                                    disabled={this.rightChecked().length === 0}
                                    aria-label="move selected left"
                                >
                                    &lt;
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    className="button"
                                    onClick={this.handleAllRight}
                                    disabled={left.length === 0}
                                    aria-label="move all right"
                                >
                                    &gt;&gt;
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    className="button"
                                    onClick={this.handleAllLeft}
                                    disabled={right.length === 0}
                                    aria-label="move all left"
                                >
                                    &lt;&lt;
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    color={"error"}
                                    className="button"
                                    onClick={this.handleDeleteCheckedBothSide}
                                    disabled={this.leftChecked().length === 0 && this.rightChecked().length === 0}
                                    aria-label="delete selected">
                                    <DeleteIcon/>
                                </Button>
                            </Grid>
                        </Grid>
                    <Grid flex={6} item>{this.customList('Allocated Expenses', right, this.state.originalRight)}</Grid>
                </Grid>
                <hr/>

                <center>
                    <RSButton appearance={"primary"} disabled={!this.checkChanges()} onClick ={()=>this.props.handleExpenseAllocation(this.getChanges())}>Save Expense Allocation</RSButton>
                </center>
            </div>
        );
    }
}

export default BudgetExpenseItemTransferList;
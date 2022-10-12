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



class BudgetExpenseItemTransferList extends React.Component{
    constructor(props){
        console.log("BudgetExpenseItemTransferList left", props.left, "right", props.right);
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

    componentDidMount() {
        this.setState({
            loading: false,
        });
    }

    //function that checks if there are any changes between the original and current state
    //if there are changes, it returns true, otherwise false
    checkChanges = () => {
        let left = this.state.left;
        let right = this.state.right;
        let originalLeft = this.state.originalLeft;
        let originalRight = this.state.originalRight;

        for (let i = 0; i < left.length; i++) {
            if (originalLeft.includes(left[i]) === false) {
                return true;
            }
        }

        for (let i = 0; i < right.length; i++) {
            if (originalRight.includes(right[i]) === false) {
                return true;
            }
        }
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
        let temp = [...a, ...this.not(b, a)]
        console.log(temp)
        //make sure that the first item in the array is temp1 and increment by 1 for each new item
        for (let i = 0; i < temp.length; i++){
            temp[i][0] = "item" + (i + 1);
        }
        return temp;
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
            <List sx={{padding: 1}} dense component="div" role="list">
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
                        >
                            <ListItemIcon>
                                <Checkbox
                                    checked={this.state.checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{'aria-labelledby': labelId}}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={value[1].name} style={{color: !isOriginal ? 'red' : 'white'}}/>
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
                    <Grid item>{this.customList('Unallocated Expenses', left, this.state.originalLeft)}</Grid>
                    <Grid item>
                            <Grid container direction="column" alignItems="center">
                                <Button
                                    variant="outlined"
                                    size="small"
                                    onClick={this.handleCheckedRight}
                                    disabled={this.leftChecked().length === 0}
                                    aria-label="move selected right"
                                >
                                    &gt;
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    onClick={this.handleCheckedLeft}
                                    disabled={this.rightChecked().length === 0}
                                    aria-label="move selected left"
                                >
                                    &lt;
                                </Button>
                            </Grid>
                        </Grid>
                    <Grid item>{this.customList('Allocated Expenses', right, this.state.originalRight)}</Grid>
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
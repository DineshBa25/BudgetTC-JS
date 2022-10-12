
import React from "react";
import {Popover, Stack, Whisper} from "rsuite";
import ArrowLeftLineIcon from '@rsuite/icons/ArrowLeftLine';
import ArrowRightLineIcon from '@rsuite/icons/ArrowRightLine';
import "./Calendar.css";
import dayjs from "dayjs";

/**
 * Manages the items used by the calendar and the budget page based on the month selected.
 * @param value
 * @param setValue
 * @returns {JSX.Element}
 * @constructor
 */
class DatePickerTC extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            monthValue: new Date().getMonth()+1,
            //todays year
            yearValue: new Date().getFullYear(),
        }
    }

    handleMonthDecrement = () => {
        if (this.state.monthValue === 1) {
            this.setState({
                monthValue: 12,
                yearValue: this.state.yearValue - 1
            }, () => {
                console.log("Month decremented to: " + this.state.monthValue);
                this.props.modifyStateForMonthView(this.state.monthValue, this.state.yearValue);
            })
        } else {
            this.setState({
                monthValue: this.state.monthValue - 1
            }, () => {
                console.log("Month decremented to: " + this.state.monthValue);
                this.props.modifyStateForMonthView(this.state.monthValue, this.state.yearValue);
            })}
    }

    handleMonthIncrement = () => {
        if (this.state.monthValue === 12) {
            this.setState({
                monthValue: 1,
                yearValue: this.state.yearValue + 1
            }, () => {
                console.log("Month incremented to: " + this.state.monthValue);
                this.props.modifyStateForMonthView(this.state.monthValue, this.state.yearValue);
            })} else {

            this.setState({
                monthValue: this.state.monthValue + 1
            }, () => {
                console.log("Month incremented to: " + this.state.monthValue);
                this.props.modifyStateForMonthView(this.state.monthValue, this.state.yearValue);
            })}
    }

    render() {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const speaker = (
            <Popover title="Title">

            </Popover>
        );

        return (
            <Stack justifyContent={"center"} >
                <div onClick={() => this.handleMonthDecrement()}><ArrowLeftLineIcon className={"leftArrow"}/></div>
                <Whisper placement="bottom" trigger="hover" controlId="control-id-hover-enterable"
                         speaker={speaker} enterable>
                    <div className="date-picker"><h2 className={"monthSelectorMainText"}>{months[this.state.monthValue-1] + " " + this.state.yearValue} </h2></div>
                </Whisper>

                <div onClick={() => this.handleMonthIncrement()}><ArrowRightLineIcon className={"rightArrow"} /></div>
             </Stack>

        );
    }
}
export default DatePickerTC;
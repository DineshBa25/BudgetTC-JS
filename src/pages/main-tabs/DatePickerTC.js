import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {LocalizationProvider, StaticDatePicker, DatePicker as MUIDatePicker, Static} from "@mui/lab";
import {Button as ButtonMUI, TextField, IconButton as IconButtonMUI} from "@mui/material";
import React from "react";
import {isWeekend} from "date-fns";
import {DatePicker, IconButton, Stack} from "rsuite";
import {KeyboardArrowRight, MoreHorizTwoTone, MoreRounded} from "@mui/icons-material";
import {BiImport} from "react-icons/bi";
import ImportIcon from '@rsuite/icons/Import';
import {AiOutlinePlus} from "react-icons/ai";
import ArrowLeftLineIcon from '@rsuite/icons/ArrowLeftLine';
import ArrowRightLineIcon from '@rsuite/icons/ArrowRightLine';

const DatePickerTC = ({value, setValue}) => {

    const [open, setOpen] = React.useState(false);

    const handleOnDateClick = () => {
        console.log("date clicked");
    }
    const handleLeftArrowClick = () => {
        console.log("left arrow clicked");
    }
    const handleRightArrowClick = () => {
        console.log("right arrow clicked");
    }

    /*<Stack direction={"row"} justifyContent={"center"} spacing={20}>

                <DatePicker oneTap format="yyyy MMM" size={"lg"} style={{ width: 150 }} />


                <ButtonMUI variant="outlined" color={'info'}
                           startIcon={<ImportIcon/>}>
                    Import
                </ButtonMUI>
            <IconButtonMUI variant="" color={'info'}
                         ><MoreHorizTwoTone/></IconButtonMUI>

        </Stack>*/
    return <div >
        <Stack justifyContent={"center"} direction={"row"}>
            <div onClick={handleLeftArrowClick}><ArrowLeftLineIcon style={{fontSize: "3em", cursor: "pointer"}}/></div>
            <div onClick={handleOnDateClick} style={{ cursor: "pointer"}}><h2>October 2022</h2></div>
            <div onClick={handleRightArrowClick}><ArrowRightLineIcon style={{fontSize: "3em" , cursor: "pointer"}} /></div>
        </Stack>

    </div>


}
export default DatePickerTC;
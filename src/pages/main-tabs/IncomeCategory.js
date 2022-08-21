import React from 'react';
import {
    Card,
    CardContent,
    InputAdornment,
    OutlinedInput,
    Paper,
    Table as TableMUI,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import {StyledTableCell, StyledTableRow} from "./BudgetCategory"
import {IconButton, Panel, Stack} from "rsuite";

function IncomeCategory({incomeState}) {
    return(
        <Card key={"One Time Income"} id={"One Time Income"} sx={{minWidth: 275}}
              style={{
                  marginBottom: 10, marginLeft: 10, marginRight: 10, borderRadius: 7, background:  "rgba(30,31,40,0.92)"
              }}>
            <CardContent>

                <TableContainer component={Paper}>
                    <TableMUI sx={{minWidth: 400}} size="small"
                              aria-label="a dense table">
                        <TableHead>
                            <TableRow >
                                <StyledTableCell style={{background: "#00a916", color: "#000"}}><b>One Time Income</b></StyledTableCell>
                                <StyledTableCell align="center" style={{background: "#00a916", color: "#000"}}>Amount
                                    Expected</StyledTableCell>
                                <StyledTableCell align="right"
                                                 style={{background: "#00a916", color: "#000", width:150}} />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Object.entries(incomeState.oneTime).map((value) => {

                                return (<StyledTableRow
                                        key={value[1].name}
                                        onClick={() => {
                                            console.log(value[1].name, " clicked");
                                        }}
                                        style={{background: "#121418"}}>
                                        <StyledTableCell  component="th"
                                                          scope="row">
                                            <TextField id="standard-basic"
                                                       variant="standard"
                                                       fullWidth size={"small"}
                                                       defaultValue={value[1].name}
                                                       key={value[1].id}
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <OutlinedInput
                                                id="outlined-adornment-amount"
                                                startAdornment={<InputAdornment
                                                    position="start">$</InputAdornment>}
                                                style={{
                                                    top: '0px',
                                                    width: "40%",
                                                    minWidth: 120
                                                }}

                                                size={"small"}
                                                defaultValue={value[1].amount}

                                            />
                                        </StyledTableCell>
                                        <StyledTableCell align="right">

                                            <IconButton aria-label="edit"
                                                        style={{
                                                            marginRight: 0,
                                                            background: "rgba(0,0,0,0)"
                                                        }}
                                                        icon={<EditOutlinedIcon
                                                            color={"primary"}/>}/>
                                            <IconButton aria-label="delete"
                                                        style={{background: "rgba(0,0,0,0)"}}
                                                        icon={<DeleteIcon
                                                            color={"error"}/>}/>

                                        </StyledTableCell>
                                    </StyledTableRow>

                                );

                            })}
                        </TableBody>
                    </TableMUI>
                </TableContainer>

                {Object.entries(incomeState.categories).map(cat => {
                    return(<TableContainer component={Paper} style={{marginTop: 20}}>
                        <TableMUI sx={{minWidth: 400}} size="small"
                                  aria-label="a dense table">
                            <TableHead>
                                <TableRow >
                                    <StyledTableCell style={{background: "#00a916", color: "#000"}}><b>{cat[1].name}</b></StyledTableCell>
                                    <StyledTableCell align="center" style={{background: "#00a916", color: "#000"}}>Amount
                                        Expected</StyledTableCell>
                                    <StyledTableCell align="right"
                                                     style={{background: "#00a916", color: "#000", width:150}} />
                                </TableRow>

                            </TableHead>
                            <TableBody>
                                {Object.entries(cat[1].items).map(value => {return (
                                    <StyledTableRow
                                        key={value[1].name}
                                        onClick={() => {
                                            console.log(value[1].name, " clicked");
                                        }}
                                        >
                                        <StyledTableCell  component="th"
                                                          scope="row">
                                            <TextField id="standard-basic"
                                                       variant="standard"
                                                       fullWidth size={"small"}
                                                       defaultValue={value[1].name}
                                                       key={value[1].id}
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <OutlinedInput
                                                id="outlined-adornment-amount"
                                                startAdornment={<InputAdornment
                                                    position="start">$</InputAdornment>}
                                                style={{
                                                    top: '0px',
                                                    width: 150,
                                                    minWidth: 120
                                                }}
                                                size={"small"}
                                                defaultValue={value[1].amount}
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell align="right">

                                            <IconButton aria-label="edit"
                                                        style={{
                                                            marginRight: 0,
                                                            background: "rgba(0,0,0,0)"
                                                        }}
                                                        icon={<EditOutlinedIcon
                                                            color={"primary"}/>}/>
                                            <IconButton aria-label="delete"
                                                        style={{background: "rgba(0,0,0,0)"}}
                                                        icon={<DeleteIcon
                                                            color={"error"}/>}/>

                                        </StyledTableCell>
                                    </StyledTableRow>
                                );})}
                            </TableBody>
                        </TableMUI>
                    </TableContainer>);
                })}
            </CardContent>
        </Card>
    )
}


export default IncomeCategory;
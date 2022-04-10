import React, { useState, Component }  from 'react';
import './App.css';
// import default style
import 'rsuite/styles/index.less'; // or 'rsuite/dist/rsuite.min.css'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    NavLink, useRouteMatch
} from "react-router-dom";

import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

import CloseIcon from '@mui/icons-material/Close';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

import MuiAlert from '@mui/material/Alert';
/**
 * Support personalized configurations such as localization, Right to Left, and themes
 */

import {
    Button,
    CustomProvider,
    ButtonToolbar,
    Sidenav,
    Toggle,
    Dropdown,
    Nav,
    Navbar,
    Popover,
    Whisper,
    Panel,
    Carousel,
    TagInput,
    Table,
    PanelGroup,
    Avatar,
    Placeholder,
    Loader,
    Calendar,
    Steps,
    ButtonGroup, Message, toaster, Notification, Modal, Tag, IconButton, Badge
} from 'rsuite';
import EditIcon from '@rsuite/icons/Edit';

import ModelIcon from '@rsuite/icons/Model';
import GearIcon from '@rsuite/icons/Gear';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import List from 'rsuite/List';
import {Divider} from "rsuite";
import DashBoardIcon from '@rsuite/icons/Gear';
import {Dashboard, Icon} from "@rsuite/icons";
import CalendarIcon from '@rsuite/icons/Calendar';
import BarChartIcon from '@rsuite/icons/BarChart';
import TableIcon from '@rsuite/icons/Table';

import {styled, alpha, ThemeProvider} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import { Container, Header, Content, Footer, Sidebar } from 'rsuite';
import 'react-reflex/styles.css'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import {AngleLeft, AngleRight, GearCircle, LogoAnalytics} from "@rsuite/icons/es/icons/legacy";
import {GoogleLogin} from "react-google-login";
import login from "./components/Login";
import GetName from "./components/Login"
import Login from "./components/Login"
import {FiSettings} from "react-icons/fi";
import {GrSettingsOption} from "react-icons/gr";
import {FcSettings} from "react-icons/fc";
import Group from "@rsuite/icons/legacy/Group";
import Magic from "@rsuite/icons/legacy/Magic";
import { useEffect } from 'react';
import {
    Alert, Card, CardActions, CardContent,
    Checkbox,
    createTheme,
    Fab, FormControlLabel, Input,
    InputAdornment,
    InputLabel,
    LinearProgress,
    ListItem,
    ListItemAvatar,
    ListItemIcon,
    ListItemText,
    MenuList, OutlinedInput,
    Paper,
    Skeleton,
    Snackbar,
    SpeedDial,
    SpeedDialAction,
    SpeedDialIcon,
    Stack, Switch,
    Tab,
    TableBody,
    TableCell, tableCellClasses,
    TableContainer,
    TableHead, TablePagination,
    TableRow, TableSortLabel,
    Tabs,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Tooltip,
    withStyles
} from "@mui/material";
import PropTypes from "prop-types";
import {AutoSizer} from "rsuite/cjs/Picker/VirtualizedList";
import clsx from "clsx";
import Home from "@rsuite/icons/legacy/Home";
import {
    ReflexContainer,
    ReflexSplitter,
    ReflexElement
} from 'react-reflex'
import {CompanyProfile, MiniChart, TechnicalAnalysis} from "react-tradingview-embed";
import {
    Add,
    Cloud,
    ContentCopy,
    ContentCut,
    ContentPaste,
    FileCopy, ImportExportRounded,
    More,
    Print,
    Save,
    Share
} from "@mui/icons-material";

import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import PlaceholderGraph from "rsuite/cjs/Placeholder/PlaceholderGraph";
import {Container as Cont} from '@mui/material';
import {SearchBar} from "rsuite/Picker";
import SI from "nodejs-stock-info";
import * as dateFns from "date-fns";
import {DatePicker, LocalizationProvider, StaticDatePicker} from "@mui/lab";
import {isWeekend} from "date-fns";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { visuallyHidden } from '@mui/utils';
import {Table as TableMUI} from '@mui/material';


function App() {
    const [theme, setTheme] = useState('dark');
    const [expanded, setExpanded] = React.useState(true);
    const [activeKey, setActiveKey] = React.useState('1');
    const [text1, setText1] = React.useState('1');

    const switchTheme = e => setTheme('dark' );
    const switchThemeDark = e => setTheme('light' );

    const pages = ['Products', 'Pricing', 'Blog'];
    const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const headerStyles = {
        padding: 18,
        fontSize: 16,
        height: 56,
        background: '#34c3ff',
        color: ' #fff',
        whiteSpace: 'nowrap',
        overflow: 'hidden'
    };

    const contentStyle = {
        position: 'fixed',
        height:  'calc(100% - 100px)',
        width: "calc(60% - 55px)",
        overflow: 'auto'
    };



    const iconStyles = {
        width: 56,
        height: 56,
        padding: 18,
        lineHeight: '56px',
        textAlign: 'center'
    };

    const NavToggle = ({ expand, onChange }) => {
        return (
            <Navbar appearance="subtle" className="nav-toggle">
                <Navbar.Body>

                    <Nav pullRight>
                        <Nav.Item onClick={onChange} style={{ width: 56, textAlign: 'center' }}>
                            {expand ? <AngleLeft /> : <AngleRight />}
                        </Nav.Item>
                    </Nav>
                </Navbar.Body>
            </Navbar>
        );
    };
    const DefaultPopover = React.forwardRef(({ content, ...props }, ref) => {
        return (
            <Popover ref={ref} title="Title" {...props}>
                <p>This is a Popover </p>
                <p>{content}</p>
            </Popover>
        );
    });
    const CustomComponent = ({ placement, loading, children }) => (
        <Whisper
            trigger="click"
            placement={placement}
            controlId={`control-id-${placement}`}
            speaker={
                loading ? (
                    <Popover />
                ) : (
                    <DefaultPopover content={`I am positioned to the ${placement}`} />
                )
            }
        >
            <Button appearance="subtle">{children || placement}</Button>
        </Whisper>
    );
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const speaker = (
        <Popover title="Account Information">
            <Stack spacing={2}>
                <Login/>
                <Button color={"primary"}>Sign In</Button>
            </Stack>
        </Popover>
    );
    const [expand, setExpand] = React.useState(true);

    function change(){
        setExpand(!expand)
        console.log(contentStyle.height)
    }
    const NavLink = React.forwardRef(({ href, children, ...rest }, ref) => (
        <Link ref={ref} to={href} {...rest}>
            {children}
        </Link>
    ));

    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height
        };
    }
    return (
        <Router>
        <CustomProvider theme={theme}>
            <Navbar>

                <Nav pullLeft>
                    <img src="https://firebasestorage.googleapis.com/v0/b/budgettc-c8e98.appspot.com/o/logo10%20Dual%20Theme%20Compatable.png?alt=media&token=449edb64-124d-4abc-8459-8870732c2f72" height= "55" width="205"/>
                </Nav>

                <Nav pullRight>
                    <Nav.Item >
                        <Whisper
                            placement="bottomEnd"
                            trigger="focus"
                            controlId="control-id-hover-enterable"
                            speaker={speaker}
                            enterable
                        >
                            <GearIcon/>
                        </Whisper>
                    </Nav.Item>
                    <Nav.Item >
                        <Whisper
                            placement="bottomEnd"
                            trigger="click"
                            controlId="control-id-hover-enterable"
                            speaker={speaker}
                            enterable
                        >
                        <Avatar circle src = "https://lh3.googleusercontent.com/a-/AOh14GhWX-xBXupbSBvTu5RSCeMs9XINLbIG-cgMd5TX1A=s96-c"> </Avatar>
                            </Whisper>
                    </Nav.Item>



                </Nav>
            </Navbar>
            <div className={'div1'}>
                <Container>
                    <Sidebar
                        style={{ display: 'flex', flexDirection: 'column' }}
                        width={expand ? 260 : 56}
                        collapsible
                    >
                        <Sidenav expanded={expand} defaultOpenKeys={['3']} appearance="default"
                                 activeKey={activeKey}
                                 onSelect={setActiveKey}>
                            <Sidenav.Body>
                                <Nav>
                                    <Nav.Item eventKey= {1} as={NavLink} href= "/dashboard"  icon={<Dashboard />}>
                                        Dashboard
                                    </Nav.Item>
                                    <Nav.Item eventKey={2} as={NavLink} href= "/learn"  icon={<ModelIcon/>}>
                                        Learn
                                    </Nav.Item>
                                    <Nav.Item eventKey={3} as={NavLink} href= "/budget"  icon={<TableIcon/>}>
                                        Budget Book
                                    </Nav.Item>
                                    <Nav.Item eventKey={4} as={NavLink} href= "/investments"  icon={<BarChartIcon/>}>
                                        Investments
                                    </Nav.Item>
                                    <Nav.Item eventKey={5} as={NavLink} href= "/calendar"  icon={<CalendarIcon/>}>
                                        Calendar
                                    </Nav.Item>
                                    <Dropdown
                                        eventKey="6"
                                        trigger="hover"
                                        title="Advanced"
                                        icon={<Magic />}
                                        placement="rightStart"
                                    >
                                        <Dropdown.Item eventKey="6-1">Geo</Dropdown.Item>
                                        <Dropdown.Item eventKey="6-2">Devices</Dropdown.Item>
                                        <Dropdown.Item eventKey="6-3">Brand</Dropdown.Item>
                                        <Dropdown.Item eventKey="6-4">Loyalty</Dropdown.Item>
                                        <Dropdown.Item eventKey="6-5">Visit Depth</Dropdown.Item>
                                    </Dropdown>
                                    <Dropdown
                                        eventKey="7"
                                        trigger="hover"
                                        title="Settings"
                                        icon={<GearCircle />}
                                        placement="rightStart"
                                    >
                                        <Dropdown.Item eventKey="7-1" onClick={switchTheme}>Dark Theme</Dropdown.Item>
                                        <Dropdown.Item eventKey="7-2" onClick={switchThemeDark}>Light Theme</Dropdown.Item>
                                    </Dropdown>
                                </Nav>
                            </Sidenav.Body>
                        </Sidenav>
                        <NavToggle expand={expand} onChange={() => change()}/>
                    </Sidebar>
                <Content>
                        <Routes>
                            <Route exact path="/dashboard" element = {<div className={'box4'}> <DashboardTab/></div>}/>
                            <Route exact path="/learn" element = {<div className={'box4'}> <LearnTab/> </div>}/>
                            <Route exact path="/investments" element = {<Home1/>}>
                                <Route path = "stocks" element = {<Home1/>}/>
                            </Route>
                            <Route exact path="/budget" element = {<div className={'box4'}> <BudgetTab/></div>} />
                            <Route exact path="/calendar" element = {<div className={'box'}><CalendarTab/></div>}/>

                        </Routes>
                </Content>
                </Container>
            </div>



        </CustomProvider>
            </Router>
    );
}

function CalendarTab(){
    const [dateSelected, setDateSelected] = React.useState("Select a Date");
    const [dateSelected1, setDateSelected1] = React.useState("Select a Date");

    function viewerFormat(dateString) {
        var splitDateSting = dateString.toDateString().toLowerCase().split(" ")
        var formattedDateString = ""
        var daysDict = {
            "mon": "Monday",
            "tue": "Tuesday",
            "wed": "Wednesday",
            "thu": "Thursday",
            "fri": "Friday",
            "sat": "Saturday",
            "sun": "Sunday"
        }
        var monthsDict = {
            "jan": "January",
            "feb": "February",
            "mar": "March",
            "apr": "April",
            "may": "May",
            "jun": "June",
            "jul": "July",
            "aug": "August",
            "sep": "September",
            "oct": "October",
            "nov": "November",
            "dec": "December"
        }
        formattedDateString += daysDict[splitDateSting[0]]+", <br> hello"
        return(
            <center>
                <h2>
                    {daysDict[splitDateSting[0]]},
                </h2>
                <h2>
                    {monthsDict[splitDateSting[1]]} {splitDateSting[2]}, {splitDateSting[3]}
                </h2>
            </center>);

    }
    const data = ['Mortgage payment due', 'Geico Car Insurance Due', 'Netflix Annual Subscription Restarts', 'Basket-Ball Game Fund'];

    const [step, setStep] = React.useState(0);
    const onChange = nextStep => {
        setStep(nextStep < 0 ? 0 : nextStep > 4 ? 4 : nextStep);
    };

    const onNext = () => onChange(step + 1);
    const onPrevious = () => onChange(step - 1);

    var questionsDict = {
        "0": "What type of event is this?",
        "1": "What type of Goal is this?",
        "2": "What is the Name of this goal?",
        "3": "How much do you aim to save for this goal",
        "4": "What is the timeframe of {this} goal?",
        "5": "What type of expense is this?",
        "6": "What is the cost of [this expense]",
        "7": "How often is this expense charged?",
        "8": "when is this expense charged?",


    }
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });
    const [alignment, setAlignment] = React.useState('web');

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
        console.log(newAlignment);
    };

    var testElementDict = {
        "0": <ThemeProvider theme={darkTheme}>
            <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                onChange={handleChange}
                fullWidth={true}
            >
                <ToggleButton value="Goal">Goal</ToggleButton>
                <ToggleButton value="Expense">Expense</ToggleButton>
            </ToggleButtonGroup>
        </ThemeProvider>,
        "1":  <ThemeProvider theme={darkTheme}>
            <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                onChange={handleChange}
                fullWidth={true}
            >
                <ToggleButton value="Short Term">Short Term</ToggleButton>
                <ToggleButton value="Long Term">Long Term</ToggleButton>
            </ToggleButtonGroup>
        </ThemeProvider>,
        "2" : <ThemeProvider theme={darkTheme}>
            <TextField id="Goal Name" label="Goal Name" variant="outlined" fullWidth/>
        </ThemeProvider>,
        "3" :  <ThemeProvider theme={darkTheme}>
            <OutlinedInput
                id="outlined-adornment-amount"
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                style={{top:'0px'}}
                fullWidth
            /> </ThemeProvider>,
        "4" : <ThemeProvider theme={darkTheme}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label="Basic example"
                    onChange={(newValue) => {
                        console.log(newValue)
                    }}
                    renderInput={(params) => <TextField {...params} fullWidth/>}

                />
            </LocalizationProvider>
        </ThemeProvider>
    }

    const [type, setType] = React.useState('info');
    const message = (
        <Notification type={"success"} header={"Event added to Calendar"} placement="leftStart" closable>
            <Paragraph width={320} rows={3} />
        </Notification>
    );

    const [open, setOpen] = React.useState(false);

    const handleClick1 = () => {
        setOpen(true);
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    function getTodoList(date) {
        const day = dateFns.getDate(date);

        switch (day) {
            case 3:
                return [
                    { title: 'Lastpass Renews' , price: 36.45, simpleTitle: 'Lastpass', colorState: 'cyan' },
                    { title: 'Geico Charges' , price: 114.26, simpleTitle: 'Geico', colorState: 'red'},

                ];
            case 5:
                return [
                    { title: 'Chegg Renews' , price: 15.99, simpleTitle: 'Chegg' , colorState: 'cyan'},
                    { title: 'Motortrend Renews' , price: 4.99 , simpleTitle: 'Motortrend' , colorState: 'cyan'},

                ];
            case 6:
                return [
                    { title: 'Vacation Goal Ends' , price: 0 , simpleTitle: 'Vacation Goal-End', colorState: 'green'}

                ];
            case 8:
                return [
                    { title: 'Cable TV Renews' , price: 78.54  , simpleTitle: 'Cable TV', colorState: 'cyan'},

                ];
            case 10:
                return [
                    { title: 'Amazon Music Unlimited Renews' , price: 0.99  , simpleTitle: 'Amazon Music', colorState: 'cyan'},
                    { title: 'Accord Payment Charges' , price:
                        540.48, simpleTitle: 'Accord Pay.', colorState: 'red'},

                ];
            case 15:
                return [
                    {  title: 'Hulu Renews', price: 7.99  , simpleTitle: 'Hulu', colorState: 'cyan'},
                    {  title: 'Spotify Renews' , price: 3.99  , simpleTitle: 'Spotify', colorState: 'cyan'},
                    {  title: 'Amazon Renews' , price: 12.99  , simpleTitle: 'Amazon', colorState: 'cyan'},
                    { title: 'Basket-Ball Game fund Deadline', price: 0   , simpleTitle: 'Basket Ball Game Fund', colorState: 'green'}
                ];
            case 16:
                return [
                    { title: 'Netflix Renews' , price: 16.99  , simpleTitle: 'Netflix', colorState: 'cyan'},
                    { title: 'Statefarm Charges' , price: 178.87  , simpleTitle: 'Statefarm', colorState: 'red'},

                ];
            case 17:
                return [
                    { title: 'Electricity Bill Charges' , price: 128.59 , simpleTitle: 'Elec. Bill' , colorState: 'red'}

                ];
            case 19:
                return [
                    { title: 'Pet Insurance renews' , price: 36.5 , simpleTitle: 'Pet Insur.' , colorState: 'red'}

                ];
            case 23:
                return [
                    { title: 'DSC renews' , price: 12.54 , simpleTitle: 'DSC' , colorState: 'cyan'}

                ];
            case 27:
                return [
                    { title: 'Volkswagen Golf GTI Payment Charges' , price: 450.65  , simpleTitle: 'VW Golf Payment', colorState: 'red'}

                ];
            default:
                return [];
        }
    }
    function renderCell(date) {
        const list = getTodoList(date);
        const displayList = list.filter((item, index) => index < 2);

        if (list.length) {
            const moreCount = list.length - displayList.length;
            const moreItem = (
                    <Whisper
                        placement="top"
                        trigger="click"
                        speaker={
                            <Popover>
                                {list.map((item, index) => (
                                    <p key={index}>
                                        {item.title}
                                    </p>
                                ))}
                            </Popover>
                        }
                    >
                        <a>{moreCount} more</a>
                    </Whisper>
            );

            return (
                    <Stack spacing={0.25} direction={"column"}>
                    {displayList.map((item, index) => (
                                <Tag color={item.colorState} size={"sm"} onCl>
                             <span
                                 style={{
                                     color: '#0a0a0a',
                                     fontSize : 11
                                 }}
                             >
                                 <b>{item.simpleTitle}</b>
                             </span>
                                </Tag>
                    ))}
                    {moreCount ? moreItem : null}
                    </Stack>
            );
        }

        return null;
    }
    return (
        <div className={"box8"}>
            <div className="test1" bgcolor={'#7bfff9'}>
                <div className={"header"}>
                    <center>
                        <Typography variant="h4" gutterBottom component="div">
                            {dateSelected}
                        </Typography>
                    </center>
                </div>
                <Divider variant="middle"/>
                <div className={"box9"}>
                    <List bordered>
                        {getTodoList(dateSelected1).map((item, index) => (

                            <List.Item key={item['title']} index={index + 1}>
                                <IconButton color={"primary"} placement={"right"} icon = {<EditIcon/>} size={"sm"}/> &nbsp;<Badge  color= {item['colorState']} /> &nbsp;{item['title']}   &nbsp; {(item["price"]<= 0)? "" : <span style={{
                                color: "red",
                                fontSize : 13
                            }}><b>(${item['price']})</b></span>}

                          </List.Item>))}
                   </List>
                </div>
                <Divider variant="middle"/>
                <AddWidget></AddWidget>
            </div>

            <div className="test2" bgcolor={'#7bfff9'}>
                <Calendar onSelect={(date: Date) => setDateSelected1(date)} onChange={(date: Date) => setDateSelected(viewerFormat(date))} renderCell={renderCell} />
            </div>

        </div>
    )
}

function AddWidget(){
    const [step, setStep] = React.useState(0);
    const [open, setOpen] = React.useState(false);

    const onChange = nextStep => {
        setStep(nextStep < 0 ? 0 : nextStep > 4 ? 4 : nextStep);
    };


    const onNext = () => onChange(step + 1);
    const onPrevious = () => onChange(step - 1);


    var questionsDict = {
        "0": "What type of event is this?",
        "1": "What type of Goal is this?",
        "2": "What is the Name of this goal?",
        "3": "How much do you aim to save for this goal",
        "4": "What is the timeframe of {this} goal?",
        "5": "What type of expense is this?",
        "6": "What is the cost of [this expense]",
        "7": "How often is this expense charged?",
        "8": "when is this expense charged?",


    }
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });
    const [alignment, setAlignment] = React.useState('web');

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
        console.log(newAlignment);
    };
    const handleClick1 = () => {
        setOpen(true);
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };


    var testElementDict = {
        "0": <ThemeProvider theme={darkTheme}>
            <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                onChange={handleChange}
                fullWidth={true}
            >
                <ToggleButton value="Goal">Goal</ToggleButton>
                <ToggleButton value="Expense">Expense</ToggleButton>
            </ToggleButtonGroup>
        </ThemeProvider>,
        "1":  <ThemeProvider theme={darkTheme}>
            <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                onChange={handleChange}
                fullWidth={true}
            >
                <ToggleButton value="Short Term">Short Term</ToggleButton>
                <ToggleButton value="Long Term">Long Term</ToggleButton>
            </ToggleButtonGroup>
        </ThemeProvider>,
        "2" : <ThemeProvider theme={darkTheme}>
            <TextField id="Goal Name" label="Goal Name" variant="outlined" fullWidth/>
        </ThemeProvider>,
        "3" :  <ThemeProvider theme={darkTheme}>
            <OutlinedInput
                id="outlined-adornment-amount"
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                style={{top:'0px'}}
                fullWidth
            /> </ThemeProvider>,
        "4" : <ThemeProvider theme={darkTheme}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label="Basic example"
                    onChange={(newValue) => {
                        console.log(newValue)
                    }}
                    renderInput={(params) => <TextField {...params} fullWidth/>}

                />
            </LocalizationProvider>
        </ThemeProvider>
    }

    return(
      <div>
          <div className={"widget"}>
          <center>
              <h6>Add to calendar</h6>
          </center>

          <div>
              <div className={"stepper"}>
                  <Steps current={step} s>
                      <Steps.Item/>
                      <Steps.Item/>
                      <Steps.Item/>
                      <Steps.Item/>
                      <Steps.Item/>
                  </Steps>
              </div>
              <Panel header={questionsDict[(step).toString()]}>
                  {testElementDict[step]}
              </Panel>



              <ThemeProvider theme={darkTheme}>
                  <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
                      <Alert onClose={handleClose} severity="success" sx={{width: '100%'}}>
                          Added to Calendar
                      </Alert>
                  </Snackbar>
              </ThemeProvider>

          </div>
      </div>
          <hr/>
          <ButtonGroup>
              <Button onClick={onPrevious} disabled={step === 0}>
                  Previous
              </Button>
              <Button onClick={onNext} disabled={step === 4}>
                  Next
              </Button>
          </ButtonGroup>
          <Button className={"button"} onClick={handleClick1} disabled={step !== 4}
                  appearance="primary">
              Submit
          </Button>
      </div>
    );
}



function DashboardTab(){
    const styles = {
        background: '#000',
        position: 'relative'
    };

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });
    return(
        <div style={styles}>
            <Message full showIcon type="warning">
                Work in Progress. Coming Soon!
            </Message>
            <ThemeProvider theme={darkTheme}>
                <Skeleton variant="rectangular" style={{minHeight:130, marginTop:5}} width={'100%'} height={1000} animation={"wave"} />
            </ThemeProvider>
        </div>
    );

}

function BudgetTab(){
    const [monthSelected, setMonthSelected] = React.useState('Default');

    const styles = {
        background: '#000',
        position: 'relative'
    };

    const darkTheme = createTheme({
        palette: {
            mode: 'dark'
        },
    });
    const darkTheme1 = createTheme({
        palette: {
            mode: 'dark',
            background: '#000000'
        },
    });
    const [value, setValue] = React.useState(new Date());

    return(
        <div className={"box8"} >
            <div className="test2" style={{width: "calc(100% - 485px)",  backgroundColor: "#10131a"}}>
                <ThemeProvider theme={darkTheme1}>
                    <Card sx={{ minWidth: 275 }} style={{margin:10}}>
                        <CardContent>
                            <Typography sx={{ fontSize: 25 }} color="yellow" gutterBottom>
                                Housing
                            </Typography>
                            <SampleTable category={"housing"}/>

                        </CardContent>
                        <CardActions>
                            <IconButton color={"secondary"} size="small" icon={<AddCircleIcon fontSize="small" />}/>
                        </CardActions>

                    </Card>
                    <Card sx={{ minWidth: 275 }} style={{margin:10}}>
                        <CardContent>
                            <Typography sx={{ fontSize: 25 }} variant={"h6"} color={"green"} gutterBottom>
                                Personal/Fun Money
                            </Typography>
                            <SampleTable category={"personalFunMoney"}/>

                        </CardContent>
                        <CardActions>
                            <IconButton color={"secondary"} size="small" icon={<AddCircleIcon fontSize="small" />}/>
                        </CardActions>
                    </Card>
                    <Card sx={{ minWidth: 275 }} style={{margin:10}}>
                        <CardContent>
                            <table className="ui orange table">
                                <thead>
                                <tr>
                                    <th>Food</th>
                                    <th>Calories</th>
                                    <th>Protein</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>Apples</td>
                                    <td>200</td>
                                    <td>0g</td>
                                </tr>
                                <tr>
                                    <td>Orange</td>
                                    <td>310</td>
                                    <td>0g</td>
                                </tr>
                                </tbody>
                            </table>
                        </CardContent>
                    </Card>


                </ThemeProvider>
                <SpeedDial
                    ariaLabel="SpeedDial basic example"
                    sx={{ position: 'absolute', bottom: 70, right: 30 }}
                    icon={<SpeedDialIcon />}
                />
            </div>
            <div className="test1" style={{width:"485px"}}>
                <div className={"dateSelect"}>
                    <center>
                        <ThemeProvider theme={darkTheme1}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <StaticDatePicker
                                    toolbarTitle={"Select Month"}
                                    views={['year', 'month']}
                                    orientation="landscape"
                                    openTo="day"
                                    value={value}
                                    shouldDisableDate={isWeekend}
                                    onChange={(newValue) => {
                                        setValue(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                            <hr/>
                        </ThemeProvider>
                    </center>
                </div>

                <Divider variant="middle"/>
                <AddWidget></AddWidget>
            </div>
        </div>
    );

}

function LearnTab(){
    const styles = {
        background: '#000',
        position: 'relative'
    };

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });
    return(
        <div style={styles}>
            <Message full showIcon type="warning">
                Work in Progress. Coming Soon!
            </Message>

        </div>
    );

}

function createData(name, amountAllocated) {
    return { name, amountAllocated };
}

const housingRows = [
    createData('AAA Road Side Assistance', 20.00),
    createData('Car Maintenance Fund', 135.00),
    createData('Car Related Fee\'s (Toll, Registration, etc', 60.00),
    createData('Gasoline', 140.00),
    createData('Honda Civic Payment', 415.00),
    createData('Metro Bus Membership', 20.00),
    createData('Statefarm Car Insurance', 154.99),
    createData('Volkswagen Golf GTi Payment', 450.00),
];

const personalFunMoneyRows = [
    createData('Amazon Subscription', 12.99),
    createData('Bali Vacation Fund', 400.0),
    createData('Dollar Shave Club Subscription', 127.64),
    createData('Hulu Subscription', 5.79),
    createData('LastPass Subscription', 4),
    createData('Netflix Subscription', 10.99),
    createData('Spotify Subcription', 4.99),
    createData('Technology Fund', 150),
    createData('Tx -> Colorado Road Trip Fund', 300.00),
];


function SampleTable(category){
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: "#191c1e",
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    let rows ={}

    if(category.category === 'personalFunMoney')
    {console.log("--"+category.category)
        rows = personalFunMoneyRows}
    else{
        console.log("++"+ category.category)
        rows = housingRows
    }


    return (
            <TableContainer component={Paper}>
                <TableMUI sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell><b>Subcategory/Expense</b></StyledTableCell>
                            <StyledTableCell align="center">Amount Allocated</StyledTableCell>
                            <StyledTableCell align="right" ></StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row">
                                    <TextField id="standard-basic" variant="standard" fullWidth size={"small"} defaultValue={row.name}/>
                                </StyledTableCell>
                                <StyledTableCell align="center"><OutlinedInput
                                    id="outlined-adornment-amount"
                                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                    style={{top:'0px'}}

                                    size={"small"}
                                    defaultValue={row.amountAllocated}
                                /> </StyledTableCell>
                                <StyledTableCell align="right">

                                        <IconButton aria-label="edit" style={{marginRight:10}}  icon={<EditOutlinedIcon color={"primary"}/>}/>
                                        <IconButton aria-label="delete" icon={<DeleteIcon color={"error"}/>}/>

                                    </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </TableMUI>
            </TableContainer>
        );
}

function Home1() {
    const [active, setActive] = React.useState('home');
    const [value, setValue] = React.useState(0);
    const [theme, setTheme] = useState('light');
    const [symbolSelected, setSymbolSelected]= React.useState("ge")

    const [symbol1, setSymbol1] = MyHook()

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    return (

        <div className={'box2'}>

            <CustomNav appearance="tabs" active={active} onSelect={setActive}/>
             <About active={active}/>
        </div>


    );
}

const input1 = <Input placeholder="Default Input" />

function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}


function TradingViewWidget(){
    const forceUpdate = useForceUpdate();
    const [symbol1, setSymbol1] = MyHook()

    console.log("----------",{symbol1})


    return(
        <div on>
    <CompanyProfile widgetPropsAny={{"newProp": true, "symbol": 'ge'+
            "", "width": '100%', "height":'auto',   "isTransparent": true} } />
    <MiniChart widgetPropsAny={{"newProp": true, "symbol": symbol1  +
            "", "width": '100%', 'autoSize' : 'true' ,  "isTransparent": true, }} />
    <TechnicalAnalysis widgetPropsAny={{"newProp": true, "symbol": symbol1 +
            "", "width": '100%', 'autoSize' : 'true',   "isTransparent": true, }} />
            <h2>{symbol1}</h2>
        </div>

);
}
let symbols: 'Test'
function About({ active}) {
    const [text1, setText1] = React.useState('');

    if(active=="News"){
    return (
        <div>
            <h2>First Tab</h2>
        </div>
    );}
    else if(active == "Stocks" || active == "home"){
        return(<StockTable />);
        }
    else if(active == "Cryptocurrencies"){
        return(<div className={'box5'}><CryptoTable/></div>)
    }
    else{
        return(<Solution text1={text1} setText1={setText1} active={active}/>);
    }
}


function StockTable(){
    const [active, setActive] = React.useState('AAPL');

    const [symbol1, setSymbol1] = MyHook()
    const SI = require('nodejs-stock-info')

    const aapl = new SI("AAPL")

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    const actions = [
        { icon: <Add />, name: 'Add Equity' },
        { icon: <Print />, name: 'Print (Not Available)' },
    ];
    return(
    <ReflexContainer orientation={"vertical"}>
        <ReflexElement className="left-pane" flex={0.6}>
            <div>
                <div className={'box6'}>
                <Box  alignItems={'right'}>
                <Table style={styles}
                       autoHeight
                       background-color={'#5c6681'}
                       data={[
                           {
                               "assetType": "EQUITY",
                               "assetMainType": "EQUITY",
                               "cusip": "037833100",
                               "symbol": "AAPL",
                               "description": "Apple Inc. - Common Stock",
                               "bidPrice": 165.22,
                               "bidSize": 200,
                               "bidId": "Q",
                               "askPrice": 165.36,
                               "askSize": 200,
                               "askId": "Q",
                               "lastPrice": 165.36,
                               "lastSize": 0,
                               "lastId": "Q",
                               "openPrice": 164.98,
                               "highPrice": 166.69,
                               "lowPrice": 162.15,
                               "bidTick": " ",
                               "closePrice": 167.3,
                               "netChange": -1.94,
                               "totalVolume": 91095739,
                               "quoteTimeInLong": 1645573621105,
                               "tradeTimeInLong": 1645573621105,
                               "mark": 165.22,
                               "exchange": "q",
                               "exchangeName": "NASD",
                               "marginable": true,
                               "shortable": true,
                               "volatility": 0.0149,
                               "digits": 4,
                               "52WkHigh": 182.94,
                               "52WkLow": 116.21,
                               "nAV": 0,
                               "peRatio": 27.7757,
                               "divAmount": 0.88,
                               "divYield": 0.53,
                               "divDate": "2022-02-04 00:00:00.000",
                               "securityStatus": "Normal",
                               "regularMarketLastPrice": 164.32,
                               "regularMarketLastSize": 59710,
                               "regularMarketNetChange": -2.98,
                               "regularMarketTradeTimeInLong": 1645563600965,
                               "netPercentChangeInDouble": -1.1596,
                               "markChangeInDouble": -2.08,
                               "markPercentChangeInDouble": -1.2433,
                               "regularMarketPercentChangeInDouble": -1.7812,
                               "delayed": true,
                               "realtimeEntitled": false
                           },
                           {
                               "assetType": "EQUITY",
                               "assetMainType": "EQUITY",
                               "cusip": "345370860",
                               "symbol": "F",
                               "description": "Ford Motor Company Common Stock",
                               "bidPrice": 17.4,
                               "bidSize": 2500,
                               "bidId": "P",
                               "askPrice": 17.41,
                               "askSize": 2000,
                               "askId": "K",
                               "lastPrice": 17.4,
                               "lastSize": 0,
                               "lastId": "P",
                               "openPrice": 17.67,
                               "highPrice": 17.76,
                               "lowPrice": 17.07,
                               "bidTick": " ",
                               "closePrice": 18.04,
                               "netChange": -0.64,
                               "totalVolume": 98467230,
                               "quoteTimeInLong": 1645573612210,
                               "tradeTimeInLong": 1645573587765,
                               "mark": 17.4,
                               "exchange": "n",
                               "exchangeName": "NYSE",
                               "marginable": true,
                               "shortable": true,
                               "volatility": 0.0249,
                               "digits": 2,
                               "52WkHigh": 25.87,
                               "52WkLow": 11.13,
                               "nAV": 0,
                               "peRatio": 4.0683,
                               "divAmount": 0.3,
                               "divYield": 1.66,
                               "divDate": "2022-01-28 00:00:00.000",
                               "securityStatus": "Normal",
                               "regularMarketLastPrice": 17.29,
                               "regularMarketLastSize": 23192,
                               "regularMarketNetChange": -0.75,
                               "regularMarketTradeTimeInLong": 1645572600008,
                               "netPercentChangeInDouble": -3.5477,
                               "markChangeInDouble": -0.64,
                               "markPercentChangeInDouble": -3.5477,
                               "regularMarketPercentChangeInDouble": -4.1574,
                               "delayed": true,
                               "realtimeEntitled": false
                           },
                           {
                               "assetType": "EQUITY",
                               "assetMainType": "EQUITY",
                               "cusip": "438128308",
                               "assetSubType": "ADR",
                               "symbol": "HMC",
                               "description": "Honda Motor Company, Ltd. Common Stock",
                               "bidPrice": 31,
                               "bidSize": 100,
                               "bidId": "P",
                               "askPrice": 32,
                               "askSize": 200,
                               "askId": "P",
                               "lastPrice": 31.18,
                               "lastSize": 20400,
                               "lastId": "N",
                               "openPrice": 31.49,
                               "highPrice": 31.52,
                               "lowPrice": 31.05,
                               "bidTick": " ",
                               "closePrice": 31.87,
                               "netChange": -0.69,
                               "totalVolume": 1101380,
                               "quoteTimeInLong": 1645569679832,
                               "tradeTimeInLong": 1645572600009,
                               "mark": 31.18,
                               "exchange": "n",
                               "exchangeName": "NYSE",
                               "marginable": true,
                               "shortable": true,
                               "volatility": 0.0263,
                               "digits": 2,
                               "52WkHigh": 33.42,
                               "52WkLow": 27.11,
                               "nAV": 0,
                               "peRatio": 7.9387,
                               "divAmount": 0,
                               "divYield": 0,
                               "divDate": "",
                               "securityStatus": "Normal",
                               "regularMarketLastPrice": 31.18,
                               "regularMarketLastSize": 204,
                               "regularMarketNetChange": -0.69,
                               "regularMarketTradeTimeInLong": 1645572600009,
                               "netPercentChangeInDouble": -2.165,
                               "markChangeInDouble": -0.69,
                               "markPercentChangeInDouble": -2.165,
                               "regularMarketPercentChangeInDouble": -2.165,
                               "delayed": true,
                               "realtimeEntitled": false
                           },
                           {
                               "assetType": "EQUITY",
                               "assetMainType": "EQUITY",
                               "cusip": "45031U101",
                               "symbol": "STAR",
                               "description": "iStar Inc. Common Stock",
                               "bidPrice": 23.06,
                               "bidSize": 100,
                               "bidId": "K",
                               "askPrice": 26.92,
                               "askSize": 500,
                               "askId": "K",
                               "lastPrice": 24.08,
                               "lastSize": 54200,
                               "lastId": "N",
                               "openPrice": 24.8,
                               "highPrice": 24.8,
                               "lowPrice": 23.76,
                               "bidTick": " ",
                               "closePrice": 25,
                               "netChange": -0.92,
                               "totalVolume": 797355,
                               "quoteTimeInLong": 1645567501686,
                               "tradeTimeInLong": 1645572600006,
                               "mark": 24.08,
                               "exchange": "n",
                               "exchangeName": "NYSE",
                               "marginable": true,
                               "shortable": true,
                               "volatility": 0.0526,
                               "digits": 2,
                               "52WkHigh": 27.75,
                               "52WkLow": 16.31,
                               "nAV": 0,
                               "peRatio": 25.4445,
                               "divAmount": 0.5,
                               "divYield": 2,
                               "divDate": "2021-11-30 00:00:00.000",
                               "securityStatus": "Normal",
                               "regularMarketLastPrice": 24.08,
                               "regularMarketLastSize": 542,
                               "regularMarketNetChange": -0.92,
                               "regularMarketTradeTimeInLong": 1645572600006,
                               "netPercentChangeInDouble": -3.68,
                               "markChangeInDouble": -0.92,
                               "markPercentChangeInDouble": -3.68,
                               "regularMarketPercentChangeInDouble": -3.68,
                               "delayed": true,
                               "realtimeEntitled": false
                           },
                           {
                               "assetType": "EQUITY",
                               "assetMainType": "EQUITY",
                               "cusip": "717081103",
                               "symbol": "PFE",
                               "description": "Pfizer, Inc. Common Stock",
                               "bidPrice": 47.53,
                               "bidSize": 400,
                               "bidId": "P",
                               "askPrice": 47.57,
                               "askSize": 100,
                               "askId": "T",
                               "lastPrice": 47.56,
                               "lastSize": 0,
                               "lastId": "T",
                               "openPrice": 47.54,
                               "highPrice": 48.31,
                               "lowPrice": 47.345,
                               "bidTick": " ",
                               "closePrice": 48.53,
                               "netChange": -0.97,
                               "totalVolume": 34809721,
                               "quoteTimeInLong": 1645573273940,
                               "tradeTimeInLong": 1645573584910,
                               "mark": 47.53,
                               "exchange": "n",
                               "exchangeName": "NYSE",
                               "marginable": true,
                               "shortable": true,
                               "volatility": 0.0144,
                               "digits": 2,
                               "52WkHigh": 61.71,
                               "52WkLow": 33.36,
                               "nAV": 0,
                               "peRatio": 12.4346,
                               "divAmount": 1.6,
                               "divYield": 3.3,
                               "divDate": "2022-01-27 00:00:00.000",
                               "securityStatus": "Normal",
                               "regularMarketLastPrice": 47.53,
                               "regularMarketLastSize": 55537,
                               "regularMarketNetChange": -1,
                               "regularMarketTradeTimeInLong": 1645572600001,
                               "netPercentChangeInDouble": -1.9988,
                               "markChangeInDouble": -1,
                               "markPercentChangeInDouble": -2.0606,
                               "regularMarketPercentChangeInDouble": -2.0606,
                               "delayed": true,
                               "realtimeEntitled": false
                           },
                           {
                               "assetType": "EQUITY",
                               "assetMainType": "EQUITY",
                               "cusip": "67066G104",
                               "symbol": "NVDA",
                               "description": "NVIDIA Corporation - Common Stock",
                               "bidPrice": 236.4,
                               "bidSize": 200,
                               "bidId": "P",
                               "askPrice": 236.75,
                               "askSize": 100,
                               "askId": "P",
                               "lastPrice": 236.65,
                               "lastSize": 0,
                               "lastId": "P",
                               "openPrice": 230.35,
                               "highPrice": 240.6399,
                               "lowPrice": 230,
                               "bidTick": " ",
                               "closePrice": 236.42,
                               "netChange": 0.23,
                               "totalVolume": 63281382,
                               "quoteTimeInLong": 1645573584259,
                               "tradeTimeInLong": 1645573618514,
                               "mark": 236.4,
                               "exchange": "q",
                               "exchangeName": "NASD",
                               "marginable": true,
                               "shortable": true,
                               "volatility": 0.0328,
                               "digits": 4,
                               "52WkHigh": 346.47,
                               "52WkLow": 115.665,
                               "nAV": 0,
                               "peRatio": 61.492,
                               "divAmount": 0.16,
                               "divYield": 0.07,
                               "divDate": "2022-03-02 00:00:00.000",
                               "securityStatus": "Normal",
                               "regularMarketLastPrice": 233.9,
                               "regularMarketLastSize": 13336,
                               "regularMarketNetChange": -2.52,
                               "regularMarketTradeTimeInLong": 1645563600840,
                               "netPercentChangeInDouble": 0.0973,
                               "markChangeInDouble": -0.02,
                               "markPercentChangeInDouble": -0.0085,
                               "regularMarketPercentChangeInDouble": -1.0659,
                               "delayed": true,
                               "realtimeEntitled": false
                           },
                           {
                               "assetType": "EQUITY",
                               "assetMainType": "EQUITY",
                               "cusip": "00206R102",
                               "symbol": "T",
                               "description": "AT&T Inc.",
                               "bidPrice": 23.75,
                               "bidSize": 3700,
                               "bidId": "P",
                               "askPrice": 23.8,
                               "askSize": 3100,
                               "askId": "P",
                               "lastPrice": 23.76,
                               "lastSize": 0,
                               "lastId": "T",
                               "openPrice": 23.77,
                               "highPrice": 24.1,
                               "lowPrice": 23.57,
                               "bidTick": " ",
                               "closePrice": 23.87,
                               "netChange": -0.11,
                               "totalVolume": 46952255,
                               "quoteTimeInLong": 1645573446016,
                               "tradeTimeInLong": 1645573446016,
                               "mark": 23.75,
                               "exchange": "n",
                               "exchangeName": "NYSE",
                               "marginable": true,
                               "shortable": true,
                               "volatility": 0.0185,
                               "digits": 2,
                               "52WkHigh": 33.88,
                               "52WkLow": 22.02,
                               "nAV": 0,
                               "peRatio": 8.6349,
                               "divAmount": 2.08,
                               "divYield": 8.71,
                               "divDate": "2022-01-07 00:00:00.000",
                               "securityStatus": "Normal",
                               "regularMarketLastPrice": 23.75,
                               "regularMarketLastSize": 54340,
                               "regularMarketNetChange": -0.12,
                               "regularMarketTradeTimeInLong": 1645572600002,
                               "netPercentChangeInDouble": -0.4608,
                               "markChangeInDouble": -0.12,
                               "markPercentChangeInDouble": -0.5027,
                               "regularMarketPercentChangeInDouble": -0.5027,
                               "delayed": true,
                               "realtimeEntitled": false
                           },
                           {
                               "assetType": "EQUITY",
                               "assetMainType": "EQUITY",
                               "cusip": "060505104",
                               "symbol": "BAC",
                               "description": "Bank of America Corporation Common Stock",
                               "bidPrice": 45.67,
                               "bidSize": 500,
                               "bidId": "P",
                               "askPrice": 45.8,
                               "askSize": 600,
                               "askId": "P",
                               "lastPrice": 45.75,
                               "lastSize": 0,
                               "lastId": "T",
                               "openPrice": 45.17,
                               "highPrice": 45.98,
                               "lowPrice": 45.04,
                               "bidTick": " ",
                               "closePrice": 45.96,
                               "netChange": -0.21,
                               "totalVolume": 51903462,
                               "quoteTimeInLong": 1645573557522,
                               "tradeTimeInLong": 1645573557522,
                               "mark": 45.67,
                               "exchange": "n",
                               "exchangeName": "NYSE",
                               "marginable": true,
                               "shortable": true,
                               "volatility": 0.015,
                               "digits": 2,
                               "52WkHigh": 50.11,
                               "52WkLow": 34.0201,
                               "nAV": 0,
                               "peRatio": 12.9101,
                               "divAmount": 0.84,
                               "divYield": 1.83,
                               "divDate": "2022-03-03 00:00:00.000",
                               "securityStatus": "Normal",
                               "regularMarketLastPrice": 45.56,
                               "regularMarketLastSize": 41398,
                               "regularMarketNetChange": -0.4,
                               "regularMarketTradeTimeInLong": 1645572600001,
                               "netPercentChangeInDouble": -0.4569,
                               "markChangeInDouble": -0.29,
                               "markPercentChangeInDouble": -0.631,
                               "regularMarketPercentChangeInDouble": -0.8703,
                               "delayed": true,
                               "realtimeEntitled": false
                           },
                           {
                               "assetType": "EQUITY",
                               "assetMainType": "EQUITY",
                               "cusip": "77543R102",
                               "symbol": "ROKU",
                               "description": "Roku, Inc. - Class A Common Stock",
                               "bidPrice": 122.9,
                               "bidSize": 2800,
                               "bidId": "P",
                               "askPrice": 123.1,
                               "askSize": 100,
                               "askId": "Q",
                               "lastPrice": 123.1,
                               "lastSize": 700,
                               "lastId": "D",
                               "openPrice": 113.11,
                               "highPrice": 128.16,
                               "lowPrice": 112.01,
                               "bidTick": " ",
                               "closePrice": 112.46,
                               "netChange": 10.64,
                               "totalVolume": 46992483,
                               "quoteTimeInLong": 1645573585092,
                               "tradeTimeInLong": 1645573599428,
                               "mark": 122.9,
                               "exchange": "q",
                               "exchangeName": "NASD",
                               "marginable": true,
                               "shortable": true,
                               "volatility": 0.0522,
                               "digits": 4,
                               "52WkHigh": 490.7613,
                               "52WkLow": 102.6,
                               "nAV": 0,
                               "peRatio": 65.6866,
                               "divAmount": 0,
                               "divYield": 0,
                               "divDate": "",
                               "securityStatus": "Normal",
                               "regularMarketLastPrice": 121.97,
                               "regularMarketLastSize": 1396,
                               "regularMarketNetChange": 9.51,
                               "regularMarketTradeTimeInLong": 1645563600735,
                               "netPercentChangeInDouble": 9.4611,
                               "markChangeInDouble": 10.44,
                               "markPercentChangeInDouble": 9.2833,
                               "regularMarketPercentChangeInDouble": 8.4563,
                               "delayed": true,
                               "realtimeEntitled": false
                           },
                           {
                               "assetType": "EQUITY",
                               "assetMainType": "EQUITY",
                               "cusip": "88160R101",
                               "symbol": "TSLA",
                               "description": "Tesla, Inc.  - Common Stock",
                               "bidPrice": 831.89,
                               "bidSize": 100,
                               "bidId": "P",
                               "askPrice": 832.87,
                               "askSize": 200,
                               "askId": "A",
                               "lastPrice": 832.4,
                               "lastSize": 0,
                               "lastId": "P",
                               "openPrice": 834.13,
                               "highPrice": 856.7338,
                               "lowPrice": 801.1001,
                               "bidTick": " ",
                               "closePrice": 856.98,
                               "netChange": -24.58,
                               "totalVolume": 27712564,
                               "quoteTimeInLong": 1645573618195,
                               "tradeTimeInLong": 1645573620123,
                               "mark": 831.89,
                               "exchange": "q",
                               "exchangeName": "NASD",
                               "marginable": true,
                               "shortable": true,
                               "volatility": 0.0442,
                               "digits": 4,
                               "52WkHigh": 1243.49,
                               "52WkLow": 539.49,
                               "nAV": 0,
                               "peRatio": 174.1256,
                               "divAmount": 0,
                               "divYield": 0,
                               "divDate": "",
                               "securityStatus": "Normal",
                               "regularMarketLastPrice": 821.53,
                               "regularMarketLastSize": 8117,
                               "regularMarketNetChange": -35.45,
                               "regularMarketTradeTimeInLong": 1645563600590,
                               "netPercentChangeInDouble": -2.8682,
                               "markChangeInDouble": -25.09,
                               "markPercentChangeInDouble": -2.9277,
                               "regularMarketPercentChangeInDouble": -4.1366,
                               "delayed": true,
                               "realtimeEntitled": false
                           },
                           {
                               "assetType": "EQUITY",
                               "assetMainType": "EQUITY",
                               "cusip": "007903107",
                               "symbol": "AMD",
                               "description": "Advanced Micro Devices, Inc. - Common Stock",
                               "bidPrice": 116.62,
                               "bidSize": 200,
                               "bidId": "P",
                               "askPrice": 116.74,
                               "askSize": 100,
                               "askId": "Q",
                               "lastPrice": 116.75,
                               "lastSize": 0,
                               "lastId": "P",
                               "openPrice": 115.27,
                               "highPrice": 119.2,
                               "lowPrice": 113.61,
                               "bidTick": " ",
                               "closePrice": 113.83,
                               "netChange": 2.92,
                               "totalVolume": 141507378,
                               "quoteTimeInLong": 1645573621159,
                               "tradeTimeInLong": 1645573609865,
                               "mark": 116.62,
                               "exchange": "q",
                               "exchangeName": "NASD",
                               "marginable": true,
                               "shortable": true,
                               "volatility": 0.02,
                               "digits": 4,
                               "52WkHigh": 164.4599,
                               "52WkLow": 72.5,
                               "nAV": 0,
                               "peRatio": 44.2237,
                               "divAmount": 0,
                               "divYield": 0,
                               "divDate": "",
                               "securityStatus": "Normal",
                               "regularMarketLastPrice": 115.65,
                               "regularMarketLastSize": 1,
                               "regularMarketNetChange": 1.82,
                               "regularMarketTradeTimeInLong": 1645563600811,
                               "netPercentChangeInDouble": 2.5652,
                               "markChangeInDouble": 2.79,
                               "markPercentChangeInDouble": 2.451,
                               "regularMarketPercentChangeInDouble": 1.5989,
                               "delayed": true,
                               "realtimeEntitled": false
                           },
                           {
                               "assetType": "EQUITY",
                               "assetMainType": "EQUITY",
                               "cusip": "69608A108",
                               "symbol": "PLTR",
                               "description": "Palantir Technologies Inc. Class A Common Stock",
                               "bidPrice": 10.56,
                               "bidSize": 100,
                               "bidId": "T",
                               "askPrice": 10.58,
                               "askSize": 5000,
                               "askId": "P",
                               "lastPrice": 10.59,
                               "lastSize": 100,
                               "lastId": "P",
                               "openPrice": 10.7,
                               "highPrice": 11.185,
                               "lowPrice": 10.3,
                               "bidTick": " ",
                               "closePrice": 11.02,
                               "netChange": -0.43,
                               "totalVolume": 104392902,
                               "quoteTimeInLong": 1645573617533,
                               "tradeTimeInLong": 1645573613529,
                               "mark": 10.56,
                               "exchange": "n",
                               "exchangeName": "NYSE",
                               "marginable": true,
                               "shortable": true,
                               "volatility": 0.0366,
                               "digits": 2,
                               "52WkHigh": 30.19,
                               "52WkLow": 10.3,
                               "nAV": 0,
                               "peRatio": 0,
                               "divAmount": 0,
                               "divYield": 0,
                               "divDate": "",
                               "securityStatus": "Normal",
                               "regularMarketLastPrice": 10.48,
                               "regularMarketLastSize": 17700,
                               "regularMarketNetChange": -0.54,
                               "regularMarketTradeTimeInLong": 1645572600006,
                               "netPercentChangeInDouble": -3.902,
                               "markChangeInDouble": -0.46,
                               "markPercentChangeInDouble": -4.1742,
                               "regularMarketPercentChangeInDouble": -4.9002,
                               "delayed": true,
                               "realtimeEntitled": false
                           },
                           {
                               "assetType": "EQUITY",
                               "assetMainType": "EQUITY",
                               "cusip": "369604301",
                               "symbol": "GE",
                               "description": "General Electric Company Common Stock",
                               "bidPrice": 94.28,
                               "bidSize": 100,
                               "bidId": "K",
                               "askPrice": 94.55,
                               "askSize": 500,
                               "askId": "K",
                               "lastPrice": 94.15,
                               "lastSize": 0,
                               "lastId": "N",
                               "openPrice": 92.64,
                               "highPrice": 95.2249,
                               "lowPrice": 92.37,
                               "bidTick": " ",
                               "closePrice": 92.69,
                               "netChange": 1.46,
                               "totalVolume": 7693344,
                               "quoteTimeInLong": 1645569445159,
                               "tradeTimeInLong": 1645573197386,
                               "mark": 94.28,
                               "exchange": "n",
                               "exchangeName": "NYSE",
                               "marginable": true,
                               "shortable": true,
                               "volatility": 0.0201,
                               "digits": 2,
                               "52WkHigh": 116.165,
                               "52WkLow": 88.05,
                               "nAV": 0,
                               "peRatio": 0,
                               "divAmount": 0.32,
                               "divYield": 0.35,
                               "divDate": "2022-03-07 00:00:00.000",
                               "securityStatus": "Normal",
                               "regularMarketLastPrice": 94.15,
                               "regularMarketLastSize": 5765,
                               "regularMarketNetChange": 1.46,
                               "regularMarketTradeTimeInLong": 1645572600002,
                               "netPercentChangeInDouble": 1.5751,
                               "markChangeInDouble": 1.59,
                               "markPercentChangeInDouble": 1.7154,
                               "regularMarketPercentChangeInDouble": 1.5751,
                               "delayed": true,
                               "realtimeEntitled": false
                           },
                           {
                               "assetType": "ETF",
                               "assetMainType": "EQUITY",
                               "cusip": "78467X109",
                               "assetSubType": "ETF",
                               "symbol": "DIA",
                               "description": "SPDR Dow Jones Industrial Average ETF",
                               "bidPrice": 337.35,
                               "bidSize": 500,
                               "bidId": "P",
                               "askPrice": 337.45,
                               "askSize": 500,
                               "askId": "P",
                               "lastPrice": 337.35,
                               "lastSize": 0,
                               "lastId": "P",
                               "openPrice": 338.79,
                               "highPrice": 340.26,
                               "lowPrice": 333.58,
                               "bidTick": " ",
                               "closePrice": 340.98,
                               "netChange": -3.63,
                               "totalVolume": 7936048,
                               "quoteTimeInLong": 1645573618771,
                               "tradeTimeInLong": 1645573571038,
                               "mark": 337.35,
                               "exchange": "p",
                               "exchangeName": "PACIFIC",
                               "marginable": true,
                               "shortable": true,
                               "volatility": 0.0152,
                               "digits": 2,
                               "52WkHigh": 369.4985,
                               "52WkLow": 305.68,
                               "nAV": 0,
                               "peRatio": 0,
                               "divAmount": 3.0932,
                               "divYield": 0.91,
                               "divDate": "2022-01-21 00:00:00.000",
                               "securityStatus": "Normal",
                               "regularMarketLastPrice": 336.01,
                               "regularMarketLastSize": 628,
                               "regularMarketNetChange": -4.97,
                               "regularMarketTradeTimeInLong": 1645572600004,
                               "netPercentChangeInDouble": -1.0646,
                               "markChangeInDouble": -3.63,
                               "markPercentChangeInDouble": -1.0646,
                               "regularMarketPercentChangeInDouble": -1.4576,
                               "delayed": true,
                               "realtimeEntitled": false
                           },
                           {
                               "assetType": "EQUITY",
                               "assetMainType": "EQUITY",
                               "cusip": "81762P102",
                               "symbol": "NOW",
                               "description": "ServiceNow, Inc. Common Stock",
                               "bidPrice": 552.01,
                               "bidSize": 200,
                               "bidId": "P",
                               "askPrice": 555,
                               "askSize": 200,
                               "askId": "P",
                               "lastPrice": 552.01,
                               "lastSize": 0,
                               "lastId": "P",
                               "openPrice": 544.07,
                               "highPrice": 561.95,
                               "lowPrice": 539.3964,
                               "bidTick": " ",
                               "closePrice": 556.01,
                               "netChange": -4,
                               "totalVolume": 1161985,
                               "quoteTimeInLong": 1645572876884,
                               "tradeTimeInLong": 1645573472943,
                               "mark": 552.01,
                               "exchange": "n",
                               "exchangeName": "NYSE",
                               "marginable": true,
                               "shortable": true,
                               "volatility": 0.0925,
                               "digits": 2,
                               "52WkHigh": 707.6,
                               "52WkLow": 448.27,
                               "nAV": 0,
                               "peRatio": 490.1401,
                               "divAmount": 0,
                               "divYield": 0,
                               "divDate": "",
                               "securityStatus": "Normal",
                               "regularMarketLastPrice": 550.15,
                               "regularMarketLastSize": 1014,
                               "regularMarketNetChange": -5.86,
                               "regularMarketTradeTimeInLong": 1645572600002,
                               "netPercentChangeInDouble": -0.7194,
                               "markChangeInDouble": -4,
                               "markPercentChangeInDouble": -0.7194,
                               "regularMarketPercentChangeInDouble": -1.0539,
                               "delayed": true,
                               "realtimeEntitled": false
                           }
                       ]}
                       onRowClick={data => {
                           setActive(data.symbol)
                       }}

                >
                    <Table.Column width={70} align="center" fixed>
                        <Table.HeaderCell>Equity Name</Table.HeaderCell>
                        <Table.Cell dataKey="symbol" />
                    </Table.Column>

                    <Table.Column flexGrow={2} minWidth={180}>
                        <Table.HeaderCell>Company Name</Table.HeaderCell>
                        <Table.Cell dataKey="description" />
                    </Table.Column>

                    <Table.Column width={150} >
                        <Table.HeaderCell>Price</Table.HeaderCell>
                        <Table.Cell>
                            {rowData => {
                            function handleAction() {
                                alert(`id:${rowData.symbol}`);
                            }
                            return (
                                <h6>
                                    Unavailable
                                </h6>

                            );
                        }}</Table.Cell>
                    </Table.Column>


                    <Table.Column width={100}>
                        <Table.HeaderCell>Amount</Table.HeaderCell>
                        <Table.Cell dataKey="mark" />
                    </Table.Column>


                    <Table.Column width={120} fixed="right">
                        <Table.HeaderCell>Action</Table.HeaderCell>

                        <Table.Cell>
                            {rowData => {
                                function handleAction() {
                                    alert(`id:${rowData.symbol}`);
                                }
                                return (
                                    <span>
                <a onClick={handleAction}> Edit </a> | <a onClick={handleAction}> Remove </a>
              </span>
                                );
                            }}
                        </Table.Cell>
                    </Table.Column>
                </Table>


                    <Box style={{position:'sticky', bottom:0}} sx={{ width: '100%-1px', marginLeft:0.7}} bgcolor={'rgba(35,35,35,0.66)'} height={45} >
                        <Fab variant={'extended'} color="primary" aria-label="add"
                            sx={{position:'sticky',bottom: 16, right: 16,top:10, marginTop: 1, marginBottom: 1, height:27}}
                             style={{left: 16, flexDirection: 'end'}}
                             pullright={true}
                        >
                            <Add/>
                            &nbsp; Add Equity
                        </Fab>

                        <SpeedDial
                            ariaLabel="SpeedDial basic example"
                            sx={{ position: 'absolute', bottom: 16, right: 16 }}
                            icon={<ImportExportRounded />}
                        >
                            {actions.map((action) => (
                                <SpeedDialAction
                                    key={action.name}
                                    icon={action.icon}
                                    tooltipTitle={action.name}
                                />
                            ))}
                        </SpeedDial>
                </Box>
                </Box>
            </div>
            <div className={'box7'} >
            <ThemeProvider theme={darkTheme}>
                    <Skeleton variant="rectangular" style={{minHeight:130, marginLeft:5, marginTop:5}} width={'100%'} height={150} animation={"wave"} />
                </ThemeProvider>
            </div>
            </div>
        </ReflexElement>
        <ReflexSplitter/>
        <ReflexElement className="right-pane" flex={0.4}>
            <div bgcolor={'#000000'} background={'#000000'}>
                <MiniChart widgetPropsAny={{"newProp": true, "symbol": active +
                        "", "width": '100%', 'autoSize' : 'true',  "colorTheme": "dark" }} />
                <CompanyProfile widgetPropsAny={{"newProp": true, "symbol": active+
                        "", "width": '100%', "height":'auto',   "colorTheme": "dark"} } />
                <TechnicalAnalysis widgetPropsAny={{"newProp": true, "symbol": active +
                        "", "width": '100%', 'autoSize' : 'true',   "colorTheme": "dark" }} />
            </div>
        </ReflexElement>
    </ReflexContainer>



    );
}

const MyHook = () => {
    let symbol1;
    let setSymbol1;
    [symbol1, setSymbol1] = useState('GE')
    // use effect for example if you need to run something at state updates
    useEffect(() => {
        // do something on foo changes
        console.log(symbol1)
    }, [symbol1])

    return [symbol1,setSymbol1] // returning state and setState you can use them by your component

}

function CryptoTable() {
    const [active, setActive] = React.useState('BTCUSD');

    const [symbol1, setSymbol1] = MyHook()
    const SI = require('nodejs-stock-info')

    const aapl = new SI("AAPL")

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    const actions = [
        { icon: <Add />, name: 'Add Equity' },
        { icon: <Print />, name: 'Print (Not Available)' },
    ];
    return(
        <ReflexContainer orientation={"vertical"}>
            <ReflexElement className="left-pane" flex={0.6}>
                <div>
                    <div className={'box6'}>
                        <Box  alignItems={'right'}>
        <Table style={styles}
        autoHeight
        background-color={'#5c6681'}
        data={[
            {
                "symbol": "BTC",
                "cryptocurrency": "Bitcoin",
                "price": 45626.91 ,
                "volume": 12,
            },
            {
                "symbol": "ETH",
                "cryptocurrency": "Ethereum",
                "price": 3423.97 ,
                "volume": 10,
            },
            {
                "symbol": "ADA",
                "cryptocurrency": "Cardano",
                "price": 1.149 ,
                "volume":  353,
            },
            {
                "symbol": "SHIB",
                "cryptocurrency": "Shibu Inu",
                "price":  0.0000256,
                "volume": 32432 ,
            },
            {
                "symbol": "DOGE",
                "cryptocurrency": "Dogecoin",
                "price":  0.1369,
                "volume": 3425 ,
            },
            {
                "symbol": "LRC",
                "cryptocurrency": "Loopring",
                "price": 1.123 ,
                "volume":  342,
            },
            {
                "symbol": "AMP",
                "cryptocurrency": "Amp",
                "price": 0.02724 ,
                "volume": 3224 ,
            },
            {
                "symbol": "ANKR",
                "cryptocurrency": "Anker",
                "price": 0.09447 ,
                "volume": 4323 ,
            },
            {
                "symbol": "SOL",
                "cryptocurrency": "Solana",
                "price":  131.78,
                "volume": 55 ,
            }

        ]}
        onRowClick={data => {
            setActive(data.symbol + "USD")
        }}
    >
        <Table.Column width={70} fixed>
            <Table.HeaderCell>Symbol</Table.HeaderCell>
            <Table.Cell dataKey="symbol" />
        </Table.Column>

        <Table.Column flexGrow={2} minWidth={110}>
            <Table.HeaderCell>Cryptocurrency</Table.HeaderCell>
            <Table.Cell dataKey="cryptocurrency" />
        </Table.Column>

        <Table.Column width={150} >
            <Table.HeaderCell>Price</Table.HeaderCell>
            <Table.Cell dataKey="price" />
        </Table.Column>

        <Table.Column width={100}>
            <Table.HeaderCell>Amount</Table.HeaderCell>
            <Table.Cell dataKey="volume" />
        </Table.Column>


        <Table.Column width={120} fixed="right">
            <Table.HeaderCell>Action</Table.HeaderCell>

            <Table.Cell>
                {rowData => {
                    function handleAction() {
                        alert(`id:${rowData.id}`);
                    }
                    return (
                        <span>
                <a onClick={handleAction}> Edit </a> | <a onClick={handleAction}> Remove </a>
              </span>
                    );
                }}
            </Table.Cell>
        </Table.Column>


        </Table>


    <Box style={{position:'sticky', bottom:0}} sx={{ width: '100%-1px', marginLeft:0.7}} bgcolor={'rgba(35,35,35,0.66)'} height={45} >
        <Stack direction={"row"}>
        <Fab variant={'extended'} color="primary" aria-label="add"
             sx={{position:'sticky',bottom: 16, right: 16,top:10, marginTop: 1, marginBottom: 1, height:27}}
             style={{left: 16, flexDirection: 'center'}}
             pullright={true}
        >
            <Add/>
            &nbsp; Add Equity
        </Fab>
        <Typography variant={'overline'} color={""} aria-label="add"
             sx={{position:'sticky',bottom: 16, right: 16,top:10, marginLeft:4, marginTop: 1.25, height:27}}
             style={{left: 16, flexDirection: 'center'}}
             pullright={true}
        >
            Total Crypto Investments: $#####.##
        </Typography>
        </Stack>
        <SpeedDial
            ariaLabel="SpeedDial basic example"
            sx={{ position: 'absolute', bottom: 16, right: 16 }}
            icon={<ImportExportRounded />}
        >
            {actions.map((action) => (
                <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                />
            ))}
        </SpeedDial>
    </Box>
</Box>
</div>
    <div className={'box7'} >
        <ThemeProvider theme={darkTheme}>
            <Skeleton variant="rectangular" style={{minHeight:130, marginLeft:5, marginTop:5}} width={'100%'} height={150} animation={"wave"} />
        </ThemeProvider>
    </div>
</div>
</ReflexElement>
    <ReflexSplitter/>
    <ReflexElement className="right-pane" flex={0.4}>
        <div>
            <MiniChart widgetPropsAny={{"newProp": true, "symbol": active +
                    "", "width": '100%', "height": "400", 'autoSize' : 'true' }} />
            <TechnicalAnalysis widgetPropsAny={{"newProp": true, "symbol": active +
                    "", "width": '100%', 'autoSize' : 'true' }} />
        </div>
    </ReflexElement>
</ReflexContainer>);
}

function SnackBar(){
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const [open, setOpen] = React.useState(false);

    const handleClick1 = () => {
        setOpen(true);
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    const action = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
                UNDO
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );
    const actions = [
        { icon: <FileCopy />, name: 'Copy' },
        { icon: <Save />, name: 'Save' },
        { icon: <Print />, name: 'Print' },
        { icon: <Share />, name: 'Share' },
    ];
    return( <div>
        <Button variant="outlined" onClick={handleClick1}>
            Open snackbar
        </Button>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                This is a sample snackbar message!
            </Alert>
        </Snackbar>
        <SpeedDial
            ariaLabel="SpeedDial basic example"
            sx={{ position: 'absolute', bottom: 16, right: 16 }}
            icon={<SpeedDialIcon />}
        >
            {actions.map((action) => (
                <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                />
            ))}
        </SpeedDial>
        <Steps current={1}>
            <Steps.Item/>
            <Steps.Item />
            <Steps.Item />
            <Steps.Item />
        </Steps>

    </div>);


}

function Solution({ text1, setText1, active}){

    const [collapsed, setCollapsed] = React.useState(false)
    const handleCollapseToggle = () => {
        setCollapsed(!collapsed);
    };
    const actions = [
        { icon: <Add />, name: 'Add Equity' },
        { icon: <Print />, name: 'Print (Not Available)' },
    ];
    return(<div>
        <h2> {active}</h2>
        <Box sx={{ width: '100%' }}>
            <LinearProgress />
        </Box>

        <SnackBar/>
        <Input defaultValue={text1} onChange={setText1} onSelect={console.log(text1)} placeholder="Default" />

        <ProSidebar collapsed={collapsed}>
            <Menu iconShape="square">
                <Tooltip title="Add" arrow placement="right">
                    <MenuItem icon={<TableIcon />} title={"Dashboard"}>Dashboard</MenuItem>
                </Tooltip>

                <SubMenu title="Components" icon={<GearIcon />}>
                    <MenuItem>Component 1</MenuItem>
                    <MenuItem>Component 2</MenuItem>
                </SubMenu>
                <MenuItem icon={<MenuIcon/>} onClick={handleCollapseToggle}> Collapse </MenuItem>
            </Menu>
        </ProSidebar>
        <Box width={500} height={200} bgcolor={'#9f0000'} flex={1} justifyContent={'flex-end'} >
            <Fab color="primary" aria-label="add"
                 sx={{position:'sticky', marginBottom:0, bottom: 0, right: 0}}
                position={"sticky"}

            >

                <More/>
            </Fab>
        </Box>
    </div>);
}

function Product(){
    return(<div>
        <Loader size="sm" />
        <Input placeholder="Default TExt" />
    </div>);
}

const styles = {
    marginBottom: 0,
    marginLeft: 5
};

const { Paragraph } = Placeholder;

const CustomNav = ({ active, onSelect, ...props }) => {
    return (
        <div>
        <Nav {...props} activeKey={active} onSelect={onSelect} style={styles}>
            <Nav.Item eventKey= "Stocks" >Stocks</Nav.Item>
            <Nav.Item eventKey="Cryptocurrencies">Cryptocurrencies</Nav.Item>
            <Nav.Item eventKey="Other Assets">Other Assets</Nav.Item>
            <Nav.Item eventKey="Overview">Portfolio Overview</Nav.Item>

            <Nav.Item eventKey= "Testing">Testing</Nav.Item>
            </Nav>
        </div>
    );
};

export default App;
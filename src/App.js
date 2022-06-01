import React, {useEffect, useState} from 'react';
import './App.css';
import 'rsuite/styles/index.less';
import {BrowserRouter as Router, Route, Link, Routes, Outlet, useNavigate} from "react-router-dom";
import {
    CustomProvider,
    Sidenav,
    Nav,
    Navbar,
} from 'rsuite';
import ModelIcon from '@rsuite/icons/Model';
import {Dashboard} from "@rsuite/icons";
import CalendarIcon from '@rsuite/icons/Calendar';
import BarChartIcon from '@rsuite/icons/BarChart';
import TableIcon from '@rsuite/icons/Table';
import {ThemeProvider} from '@mui/material/styles';
import {Container, Content, Sidebar} from 'rsuite';
import 'react-reflex/styles.css'
import {AngleLeft, AngleRight} from "@rsuite/icons/es/icons/legacy";
import InvestmentTab from "./pages/main-tabs/InvestmentTab"
import {createTheme} from "@mui/material";
import 'react-pro-sidebar/dist/css/styles.css';
import ToolsIcon from '@rsuite/icons/Tools';
import ToolsTab from "./pages/main-tabs/ToolsTab";
import Settings from "./components/Settings";
import AccountInfo from "./components/AccountInfo";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Reset from "./pages/auth/Reset";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {useSelector, useDispatch} from "react-redux";
import {saveUser} from "./redux/slice/authSlice";

import {setRetirementCalcData401K} from "./redux/slice/userDataSlice";
import {initializeApp} from "firebase/app";
import Signout from "./pages/auth/Signout";
import PageNotFound from "./pages/auth/PageNotFound";
import ProtectedRoute from "./utilities/ProtectedRoute";
import {persistor} from "./redux/store";
import {PersistGate} from "redux-persist/integration/react";
import LearnTab from "./pages/main-tabs/LearnTab";
import DashboardTab from "./pages/main-tabs/Dashboard/Dashboard"
import BudgetTab from "./pages/main-tabs/BudgetTab";
import CalendarTab from "./pages/main-tabs/CalendarTab";
import {setTheme} from "./redux/slice/themeSlice";
import {firebaseTest} from "./pages/auth/firebase";
import {auth} from "./configs/firebaseConfig";

let themeSet = "dark";

function App() {
    const [theme] = useState('dark');
    const [activeKey, setActiveKey] = React.useState('1');
    themeSet = theme;

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            background: "#14171e"

        },

    });
    const lightTheme = createTheme({
        palette: {
            mode: 'light',
        },
    });


    const NavToggle = ({expand, onChange}) => {
        return (
            <Navbar appearance="subtle" className="nav-toggle">
                <Navbar.Body>

                    <Nav pullRight>
                        <Nav.Item onClick={onChange} style={{width: 56, textAlign: 'center'}}>
                            {expand ? <AngleLeft/> : <AngleRight/>}
                        </Nav.Item>
                    </Nav>
                </Navbar.Body>
            </Navbar>
        );
    };
    const [expand, setExpand] = React.useState(false);

    const NavLink = React.forwardRef(({href, children, ...rest}, ref) => (
        <Link ref={ref} to={href} {...rest}>
            {children}
        </Link>
    ));


    const user = useSelector((state) => state.auth.value);
    console.log("user from state", user);
    const dispatch = useDispatch();
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(saveUser(user.refreshToken));
            } else {
                dispatch(saveUser(undefined));
                dispatch(setRetirementCalcData401K(undefined))
            }
        });
    }, [auth, dispatch]);


    return (


            <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
                <CustomProvider theme={theme}>
                    <Router>
                        <Routes>
                            <Route exact path="/app" element={
                                <ProtectedRoute>
                                    <div>
                                        <Navbar>

                                            <Nav>
                                                <img
                                                    src="https://firebasestorage.googleapis.com/v0/b/budgettc-c8e98.appspot.com/o/logo10%20Dual%20Theme%20Compatable.png?alt=media&token=449edb64-124d-4abc-8459-8870732c2f72"
                                                    height="55" width="205" alt={"BudgetTC-Logo"}/>
                                            </Nav>
                                            {//Ending financial stress,for a better life.
                                                 }
                                            <Nav><h6 style={{marginTop: 25, marginLeft: 10, color: "#797979"}}><i>“Don’t tell me what you value, show me your budget, and I’ll tell you what you value.” - Ray Dalio</i></h6></Nav>
                                            <Nav pullRight>
                                                <Nav.Item>
                                                    <Settings/>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <AccountInfo/>
                                                </Nav.Item>


                                            </Nav>
                                        </Navbar>
                                        <div className={'div1'}>
                                            <Container>
                                                <Sidebar
                                                    width={expand ? 260 : 56}
                                                    collapsible

                                                >
                                                    <Sidenav expanded={expand} defaultOpenKeys={['3']}
                                                             appearance="default"
                                                             activeKey={activeKey}
                                                             onSelect={setActiveKey}
                                                             style={{height: "100%"}}
                                                    >
                                                        <Sidenav.Body>
                                                            <Nav>
                                                                <Nav.Item eventKey={1} as={NavLink}
                                                                          href="/app/dashboard"
                                                                          icon={<Dashboard/>}>
                                                                    Dashboard
                                                                </Nav.Item>
                                                                <Nav.Item eventKey={2} as={NavLink} href="/app/learn"
                                                                          icon={<ModelIcon/>}>
                                                                    Learn
                                                                </Nav.Item>
                                                                <Nav.Item eventKey={3} as={NavLink} href="/app/budget"
                                                                          icon={<TableIcon/>}>
                                                                    Budget Book
                                                                </Nav.Item>
                                                                <Nav.Item eventKey={4} as={NavLink}
                                                                          href="/app/investments"
                                                                          icon={<BarChartIcon/>}>
                                                                    Investments
                                                                </Nav.Item>
                                                                <Nav.Item eventKey={5} as={NavLink} href="/app/tools"
                                                                          icon={<ToolsIcon/>}>
                                                                    Financial Tools
                                                                </Nav.Item>
                                                                <Nav.Item eventKey={6} as={NavLink} href="/app/calendar"
                                                                          icon={<CalendarIcon/>}>
                                                                    Calendar
                                                                </Nav.Item>

                                                            </Nav>

                                                        </Sidenav.Body>
                                                    </Sidenav>
                                                    <NavToggle expand={expand} onChange={() => setExpand(!expand)}/>
                                                </Sidebar>

                                                <Content>
                                                    <Outlet/>
                                                </Content>
                                            </Container>
                                        </div>
                                    </div>
                                </ProtectedRoute>}>
                                <Route path="dashboard"
                                       element={<div className={'box4'}><DashboardTab/></div>}/>
                                <Route path="learn" element={<div className={'box4'}><LearnTab/></div>}/>
                                <Route path="investments"
                                       element={<div className={'box4'}><InvestmentTab/></div>}/>
                                <Route path="tools" element={<div className={'box4'}><ToolsTab/></div>}/>
                                <Route path="budget" element={<div className={'box4'}><BudgetTab/></div>}/>
                                <Route path="calendar"
                                       element={<div className={'box4'}><CalendarTab/></div>}/>
                            </Route>
                            <Route exact path="/auth" element={
                                <div className={"auth"}>
                                    <center>
                                        <div className={"inner"}>
                                            <Outlet/>
                                        </div>
                                    </center>
                                </div>}>
                                <Route path="login" element={<Login/>}/>
                                <Route path="register" element={<Register/>}/>
                                <Route path="reset" element={<Reset/>}/>
                                <Route path="signout" element={<Signout/>}/>
                                <Route path="pagenotfound" element={<PageNotFound/>}/>
                            </Route>

                        </Routes>
                    </Router>
                </CustomProvider>
            </ThemeProvider>
    );
}

export default App;
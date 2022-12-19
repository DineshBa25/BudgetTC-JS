import React, {useEffect, useState} from 'react';
import './App.css';
import 'rsuite/styles/index.less';
import {BrowserRouter as Router, Route, Link, Routes, Outlet} from "react-router-dom";
import {
    CustomProvider,
    Sidenav,
    Nav,
    Navbar, useToaster, Toggle
} from 'rsuite';
import {Dashboard} from "@rsuite/icons";
import CalendarIcon from '@rsuite/icons/Calendar';
import BarChartIcon from '@rsuite/icons/BarChart';
import TableIcon from '@rsuite/icons/Table';
import {ThemeProvider} from '@mui/material/styles';
import {Container, Content, Sidebar, Button} from 'rsuite';
import 'react-reflex/styles.css'
import {AngleLeft, AngleRight} from "@rsuite/icons/es/icons/legacy";
import InvestmentTab from "./pages/main-tabs/investment/InvestmentTab"
import {createTheme} from "@mui/material";
import ToolsIcon from '@rsuite/icons/Tools';
import ToolsTab from "./pages/main-tabs/financialToolsPages/ToolsTab";
import Settings from "./components/Settings";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Reset from "./pages/auth/Reset";
import {onAuthStateChanged} from "firebase/auth";
import {useDispatch} from "react-redux";
import {saveUser} from "./redux/slice/authSlice";
import {setRetirementCalcData401K} from "./pages/userDataSlice";
import Signout from "./pages/auth/Signout";
import PageNotFound from "./pages/auth/PageNotFound";
import ProtectedRoute from "./utilities/ProtectedRoute";
import DashboardTab from "./pages/main-tabs/Dashboard/Dashboard"
import CalendarTab from "./pages/main-tabs/calendar/CalendarTab";
import {auth} from "./configs/firebaseConfig";
import BudgetClass from "./pages/main-tabs/Budget/BudgetClass";
import HeaderBar from "./components/HeaderBar";

export function withToaster(Component) {
    return function WrapperComponent(props) {
        const toaster = useToaster();
        return <Component {...props} toaster={toaster}/>;
    };
}

function App() {
    const [activeKey, setActiveKey] = React.useState('1');

    const [theme, setTheme] = useState('dark');

    const darkTheme = createTheme({
        palette: {
            mode: theme,

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
    }, [dispatch]);


    const [open, setOpen] = React.useState(false);


    const toaster = useToaster();

    console.log("App loaded")

    return (
        <div className={`${theme}`}>
            <ThemeProvider theme={darkTheme}>
                <CustomProvider theme={theme}>
                    <Router>
                        <Routes>
                            <Route exact path="/app" element={
                                <ProtectedRoute>
                                    <div>
                                        <HeaderBar  theme={theme} setTheme={setTheme}/>
                                        <div className={'div1'}>
                                            <Container>
                                                <Sidebar
                                                    width={expand ? 260 : 56}
                                                    collapsible>
                                                    <Sidenav expanded={expand} defaultOpenKeys={['3']}
                                                             appearance="default"
                                                             activeKey={activeKey}
                                                             onSelect={setActiveKey}
                                                             style={{height: "100%"}}>
                                                        <Sidenav.Body>
                                                            <Nav>
                                                                <Nav.Item eventKey={7} as={NavLink} href="/app/budget"
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
                                                    <Settings open={open} setOpen={setOpen}/>
                                                    <Outlet/>
                                                </Content>
                                            </Container>
                                        </div>
                                    </div>
                                </ProtectedRoute>}>
                                <Route path="dashboard"
                                       element={<div className={'box4'}><DashboardTab/></div>}/>
                                <Route path="investments"
                                       element={<div className={'box4'}><InvestmentTab/></div>}/>
                                <Route path="tools" element={<div className={'box4'}><ToolsTab/></div>}/>
                                <Route path="budget/*" element={
                                    <div className={'box4'}>
                                        <BudgetClass toaster={toaster}/>
                                     </div>}/>
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
        </div>
    );
}

export default App;

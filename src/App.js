import React, {useEffect, useState} from 'react';
import './App.css';
import 'rsuite/styles/index.less';
import {BrowserRouter as Router, Route, Link, Routes, Outlet} from "react-router-dom";
import {
    CustomProvider,
    Sidenav,
    Nav,
    Navbar, IconButton, Stack
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
import {onAuthStateChanged} from "firebase/auth";
import {useSelector, useDispatch} from "react-redux";
import {saveUser} from "./redux/slice/authSlice";
import {setQuote, setRetirementCalcData401K} from "./redux/slice/userDataSlice";
import Signout from "./pages/auth/Signout";
import PageNotFound from "./pages/auth/PageNotFound";
import ProtectedRoute from "./utilities/ProtectedRoute";
import LearnTab from "./pages/main-tabs/LearnTab";
import DashboardTab from "./pages/main-tabs/Dashboard/Dashboard"
import BudgetTab from "./pages/main-tabs/BudgetTab";
import CalendarTab from "./pages/main-tabs/CalendarTab";
import {auth} from "./configs/firebaseConfig";
import ReloadIcon from '@rsuite/icons/Reload';
import {updateUserDataInFireStore} from "./pages/auth/firebase";
import GearIcon from "@rsuite/icons/Gear";
import {RingLoader} from "react-spinners";

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

    const quote = useSelector((state) => state.userData.userDataDocument);
    console.log("document from state", quote);


    let quotes = [
        '“Diligence is the mother of good luck.” — Benjamin Franklin',
        '“What you do speaks so loudly that I cannot hear what you say.” — Ralph Waldo Emerson',
        'Don’t look for the needle in the haystack. Just buy the haystack.” — Jack Bogle',
        '“There is a gigantic difference between earning a great deal of money and being rich.” — Marlene Dietrich',
        '“Give me six hours to chop down a tree and I will spend the first four sharpening the axe.” — Abraham Lincoln',
        '“If we command our wealth, we shall be rich and free. If our wealth commands us, we are poor indeed.” — Edmund Burke',
        '“Follow your passion; it will lead you to your purpose.” — Oprah Winfrey',
        '“A journey of a thousand miles must begin with a single step.” — Lao Tzu',
        '“No one has ever become poor by giving.” — Anne Frank',
        '“Yesterday ended last night. Today is a brand-new day.” — Zig Ziglar',
        '“Our greatest glory is not in never failing, but in rising every time we fall.” — Confucius',
        '“Wealth is largely the result of habit.” — John Jacob Astor',
        '“Passion is the genesis of genius.” — Tony Robbins',
        '“Do what you love. When you love your work, you become the best worker in the world.“ — Uri Geller',
        '“We should remember that good fortune often happens when opportunity meets with preparation.” ― Thomas A. Edison',
        '“The way to achieve your own success is to be willing to help somebody else get it first.” ― Iyanla Vanzant',
        '“All you need is the plan, the road map, and the courage to press on to your destination.” ― Earl Nightingale',
        '“You can’t build a reputation on what you’re going to do.” ― Confucius',
        '“The best way to predict the future is to create it.” ― Abraham Lincoln',
        '“It takes as much energy to wish as it does to plan.” ― Eleanor Roosevelt',
        '“Reject the basic assumptions of civilization, especially the importance of material possessions.” ― Chuck Palahniuk',
        '“A budget is telling your money where to go instead of wondering where it went.” ― Dave Ramsey',
        '“The value we provide most to others is the same value we appreciate most from others.” ― Simon Sinek',
        '“Never spend your money before you’ve earned it.” ― Thomas Jefferson',
        '“Sacrifice is a part of life. It’s supposed to be. it’s not something to regret. It’s something to aspire to.” ― Mitch Albom',
        '“Do not save what is left after spending; instead spend what is left after saving.” ― Warren Buffett',
        '“Money is only a tool. It will take you wherever you wish, but it will not replace you as the driver.” — Ayn Rand',
        '“If there is no struggle, there is no progress.” ― Frederick Douglass',
        '“If you would be wealthy, think of saving as well as getting.” ― Benjamin Franklin',
        '“Debt is like any other trap, easy enough to get into, but hard enough to get out of.” ― Josh Billings',
        '“The key is not to prioritize what’s on your schedule, but to schedule your priorities.” ― Stephen Covey',
        '“Setting goals is the first step in turning the invisible into the visible.” ― Tony Robbins',
        '“Victory is always possible for the person who refuses to stop fighting.” ― Napoleon Hill',
        '“You can, you should, and if you’re brave enough to start, you will.” ― Steven King',
        '“Do something today that your future self will thank you for.” ― Anonymous',
        '“A pessimist sees the difficulty in every opportunity; an optimist sees the opportunity in every difficulty.” ― Winston Churchill',
        '“You will never reach your destination if you stop and throw stones at every dog that barks.”  ― Winston Churchill',
        '“Both poverty and riches are the offspring of thought.” ― Napolean Hill',
        '“The greater the obstacle, the more glory in overcoming it.” ― Moliere',
        '“Start by doing what’s necessary; then do what’s possible; and suddenly you are doing the impossible.” ― Frances of Assisi',
        '“Don’t let your learning lead to knowledge. Let your learning lead to action” ― Jim Rohn',
        '“Whether you think you can or you think you can’t, you’re right.” ― Henry Ford',
        '“Success is not final; failure is not fatal: It is the courage to continue that counts.”– Winston S. Churchill',
        '“It is only through labor and painful effort, by grim energy and resolute courage; that we move on to better things.”– Theodore Roosevelt',
        '“What you’re thinking is what you’re becoming.” ― Muhammad Ali',
        '“Success is the sum of small efforts, repeated day in and day out.” — Robert Collier\n',
    ]

    const [open, setOpen] = React.useState(false);
    const [quoteReload, setQuoteReload] = React.useState(false);


    return (
    <div>
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
                                        <Nav className={"scrollGradient"} style={{ width: "calc(100% - 370px)", height: 55, overflowX: "auto"}}><div><Stack alignItems={"flex-end"} ><h6
                                            style={{marginLeft: 20, color: "#797979", marginTop:23}}>
                                            <i>{(quote == null) ? "null" : quotes[quote.quote]}</i></h6>
                                            <IconButton size={"xs"} icon={<ReloadIcon/>} loading={quoteReload}
                                                        style={{marginLeft: 10, background: "rgba(255,255,255,0)"}}
                                                        onClick={() => {
                                                            setQuoteReload(true);
                                                            console.log("reload quote icon pressed:");
                                                            let randInt = Math.floor(Math.random() * 45)
                                                            updateUserDataInFireStore({quote: randInt})
                                                                .then(() => {
                                                                    dispatch(setQuote(randInt))
                                                                    setQuoteReload(false);
                                                                })
                                                        }
                                                        }/></Stack></div></Nav>

                                        <Nav pullRight>
                                            <Nav.Item>

                                                <IconButton icon={<GearIcon/>} onClick={() => setOpen(true)}
                                                            style={{background: "rgba(255,255,255,0)"}}/>


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
                                                <Settings open={open} setOpen={setOpen}/>
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

            </div>

    );

}

export default App;
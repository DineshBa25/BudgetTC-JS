import {IconButton, Message, Nav, Navbar, Stack, useToaster} from "rsuite";
import ReloadIcon from "@rsuite/icons/Reload";
import {updateUserDataInFireStore} from "../pages/auth/firebase";
import GearIcon from "@rsuite/icons/Gear";
import AccountInfo from "./AccountInfo";
import React, {useState} from "react";
import {useSelector} from "react-redux";
import {setQuote} from "../pages/userDataSlice";
import {store} from "../redux/store";

const HeaderBar = () => {

    const toaster = useToaster();

    const quoteMessage = (
        <Message type={'success'} closable>
            <p>Your quote has been changed</p>
        </Message>
    )




    const [quote, setQuote] = useState(store.getState().userData.userDataDocument.quote);


    const [open, setOpen] = React.useState(false);

    const [quoteReload, setQuoteReload] = React.useState(false);

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

    return(
        <Navbar>
            <Nav>
                <img
                    src="https://firebasestorage.googleapis.com/v0/b/budgettc-c8e98.appspot.com/o/logo10%20Dual%20Theme%20Compatable.png?alt=media&token=449edb64-124d-4abc-8459-8870732c2f72"
                    height="55" width="205" alt={"BudgetTC-Logo"}/>
            </Nav>
            <Nav className={"scrollGradient"}
                 style={{width: "calc(100% - 370px)", height: 55, overflowX: "auto"}}>
                <div>
                    <Stack alignItems={"flex-end"}>
                        <h6 style={{marginLeft: 20, color: "#797979", marginTop: 23}}>
                            <i>{(quote === undefined) ? "null" : quotes[quote]}</i>
                        </h6>
                        <IconButton size={"xs"} icon={<ReloadIcon/>}
                                    loading={quoteReload}
                                    style={{
                                        marginLeft: 10,
                                        background: "rgba(255,255,255,0)"
                                    }}
                                    onClick={() => {
                                        setQuoteReload(true);
                                        console.log("reload quote icon pressed:");
                                        let randInt = Math.floor(Math.random() * 45)
                                        updateUserDataInFireStore({quote: randInt})
                                            .then(() => {
                                                setQuote(randInt);
                                                toaster.push(quoteMessage, {placement: "bottomEnd"});
                                                setQuoteReload(false);
                                            })
                                    }
                                    }/>
                    </Stack>
                </div>
            </Nav>
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
    )
}

export default HeaderBar;
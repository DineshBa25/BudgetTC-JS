import React, {useEffect, useState} from 'react';
import Typography from "@mui/material/Typography";
import {Badge, Button, Calendar, Divider, Form, IconButton, InputNumber, Nav, Table} from "rsuite";
import List from "rsuite/List";
import EditIcon from "@rsuite/icons/Edit";
import App from "../../App";
import themeSet from "../../App";
import {ReflexContainer, ReflexElement, ReflexSplitter} from "react-reflex";
import Box from "@mui/material/Box";
import {createTheme, Fab, Skeleton, SpeedDial, Stack} from "@mui/material";
import {Add, ImportExportRounded, Print} from "@mui/icons-material";
import {CompanyProfile, MiniChart, TechnicalAnalysis} from "react-tradingview-embed";
import SI from "nodejs-stock-info";


const CustomNav = ({active, onSelect, ...props}) => {
    return (
        <div>
            <Nav {...props} activeKey={active} onSelect={onSelect} style={{
                marginBottom: 0,
                marginLeft: 5
            }}>
                <Nav.Item eventKey="Stocks">Stocks</Nav.Item>
                <Nav.Item eventKey="Cryptocurrencies">Cryptocurrencies</Nav.Item>
                <Nav.Item eventKey="Other Assets">Other Assets</Nav.Item>
                <Nav.Item eventKey="Overview">Portfolio Overview</Nav.Item>

                <Nav.Item eventKey="Testing">Testing</Nav.Item>
            </Nav>
        </div>
    );
};
const styles = {
    marginBottom: 0,
    marginLeft: 0
};

let theme = "dark"


function InvestmentTab() {

    const [active, setActive] = React.useState('home');
    const [activeSymbol, setActiveSymbol] = React.useState('SPX500USD');
    return (
        <div className={"box8"}>
            <ReflexContainer orientation={"vertical"}>
                <ReflexElement className="left-pane" flex={0.6}>
                    <div className="test3" style={{
                        background: theme === "dark" ? "#292934" : "#ececf1",
                        marginLeft: 10,
                        marginTop: 10,
                        marginBottom: 10,
                        borderTopRightRadius: 7,
                        borderTopLeftRadius: 7,
                        height: "calc(100% - 155px)"
                    }}>
                        <CustomNav appearance="tabs" active={active} onSelect={setActive} />
                        <div style={{width: "calc(100% -20px)"}}>
                            <About active={active} setActiveSymbol={setActiveSymbol}/>
                        </div>

                    </div>
                </ReflexElement>
                <ReflexSplitter/>
                <ReflexElement className="right-pane" flex={0.4}>
                    <div className="test4" style={{
                        background: theme === "dark" ? "#292934" : "#ececf1",
                        marginTop: 10,
                        marginBottom: 10,
                        borderRadius: 7
                    }}>
                        <MiniChart widgetPropsAny={{
                            "newProp": true,
                            "symbol": activeSymbol,
                            "width": '100%',
                            'autoSize': 'true'
                        }}/>
                        <CompanyProfile widgetPropsAny={{
                            "newProp": true,
                            "symbol": activeSymbol,
                            "width": '100%',
                            "height": 'auto'
                        }}/>
                        <TechnicalAnalysis widgetPropsAny={{
                            "newProp": true,
                            "symbol": activeSymbol,
                            "width": '100%',
                            'autoSize': 'true'
                        }}/>

                    </div>
                </ReflexElement>
            </ReflexContainer>
        </div>
    );

}

function About({active, setActiveSymbol}) {
    const [text1, setText1] = React.useState('');

    if (active == "News") {
        return (
            <div>
                <h2>First Tab</h2>
            </div>
        );
    } else if (active == "Stocks" || active == "home") {
        return (<StockTable setActiveSymbol={setActiveSymbol}/>);
    } else if (active == "Cryptocurrencies") {
        return (<div className={'box5'}><CryptoTable/></div>)
    } else {
        return (<div/>);
    }
}


function StockTable({setActiveSymbol}) {
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
        {icon: <Add/>, name: 'Add Equity'},
        {icon: <Print/>, name: 'Print (Not Available)'},
    ];

    const InputDollar = <InputNumber prefix="$"/>;
    return (
        <div>
            <div className={'box6'}>
                <Box alignItems={'right'}>
                    <Table
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
                            setActiveSymbol(data.symbol)
                        }}

                    >
                        <Table.Column width={70} align="center" fixed>
                            <Table.HeaderCell>Equity Name</Table.HeaderCell>
                            <Table.Cell dataKey="symbol"/>
                        </Table.Column>

                        <Table.Column flexGrow={2} minWidth={180}>
                            <Table.HeaderCell>Company Name</Table.HeaderCell>
                            <Table.Cell dataKey="description"/>
                        </Table.Column>

                        <Table.Column width={150}>
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
                            <Table.Cell dataKey="mark"/>
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
                    <Box style={{position: 'sticky', bottom: 0}} sx={{width: '100%-20px'}}
                         bgcolor={'rgba(35,35,35,0.66)'} height={45}>
                        <Fab variant={'extended'} color="primary" aria-label="add"
                             sx={{
                                 position: 'sticky',
                                 bottom: 16,
                                 right: 16,
                                 top: 10,
                                 marginTop: 1,
                                 marginBottom: 1,
                                 height: 27
                             }}
                             style={{left: 16, flexDirection: 'end'}}
                        >
                            <Add/>
                            &nbsp; Add Equity
                        </Fab>


                    </Box>
                </Box>
            </div>
            <div className={"box7"} style={{background: theme === "dark" ? "rgba(30,31,40,0.87)" : "#f8f8f8"}}>
                <center>
                    <h5 style={{marginTop: 10}}>Configure Equity Details for "{active}"</h5>
                </center>
                <Form layout="inline" style={{marginTop: 10, marginLeft: 20}}>
                    <Form.Group controlId="username-8">
                        <Form.ControlLabel>Equity Symbol:</Form.ControlLabel>
                        <Form.Control placeholder="Lookup Symbol" name="username" style={{width: 160}}/>
                    </Form.Group>
                    <Form.Group controlId="Shares">
                        <Form.ControlLabel>Shares:</Form.ControlLabel>
                        <Form.Control name="Shares" accepter={InputNumber} style={{width: 130}}/>
                    </Form.Group>
                    <Form.Group controlId="Amount">
                        <Form.ControlLabel>Amount:</Form.ControlLabel>
                        <Form.Control name="Amount" accepter={InputNumber} prefix={"$"} style={{width: 130}}>

                        </Form.Control>
                    </Form.Group>


                    <Button appearance={"primary"}>Apply</Button>
                </Form>
            </div>
        </div>


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

    return [symbol1, setSymbol1] // returning state and setState you can use them by your component

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
        {icon: <Add/>, name: 'Add Equity'},
        {icon: <Print/>, name: 'Print (Not Available)'},
    ];
    return (
        <ReflexContainer orientation={"vertical"}>
            <ReflexElement className="left-pane" flex={0.6}>
                <div>
                    <div className={'box6'}>
                        <Box alignItems={'right'}>
                            <Table style={styles}
                                   autoHeight
                                   background-color={'#5c6681'}
                                   data={[
                                       {
                                           "symbol": "BTC",
                                           "cryptocurrency": "Bitcoin",
                                           "price": 45626.91,
                                           "volume": 12,
                                       },
                                       {
                                           "symbol": "ETH",
                                           "cryptocurrency": "Ethereum",
                                           "price": 3423.97,
                                           "volume": 10,
                                       },
                                       {
                                           "symbol": "ADA",
                                           "cryptocurrency": "Cardano",
                                           "price": 1.149,
                                           "volume": 353,
                                       },
                                       {
                                           "symbol": "SHIB",
                                           "cryptocurrency": "Shibu Inu",
                                           "price": 0.0000256,
                                           "volume": 32432,
                                       },
                                       {
                                           "symbol": "DOGE",
                                           "cryptocurrency": "Dogecoin",
                                           "price": 0.1369,
                                           "volume": 3425,
                                       },
                                       {
                                           "symbol": "LRC",
                                           "cryptocurrency": "Loopring",
                                           "price": 1.123,
                                           "volume": 342,
                                       },
                                       {
                                           "symbol": "AMP",
                                           "cryptocurrency": "Amp",
                                           "price": 0.02724,
                                           "volume": 3224,
                                       },
                                       {
                                           "symbol": "ANKR",
                                           "cryptocurrency": "Anker",
                                           "price": 0.09447,
                                           "volume": 4323,
                                       },
                                       {
                                           "symbol": "SOL",
                                           "cryptocurrency": "Solana",
                                           "price": 131.78,
                                           "volume": 55,
                                       }

                                   ]}
                                   onRowClick={data => {
                                       setActive(data.symbol + "USD")
                                   }}
                            >
                                <Table.Column width={70} fixed>
                                    <Table.HeaderCell>Symbol</Table.HeaderCell>
                                    <Table.Cell dataKey="symbol"/>
                                </Table.Column>

                                <Table.Column flexGrow={2} minWidth={110}>
                                    <Table.HeaderCell>Cryptocurrency</Table.HeaderCell>
                                    <Table.Cell dataKey="cryptocurrency"/>
                                </Table.Column>

                                <Table.Column width={150}>
                                    <Table.HeaderCell>Price</Table.HeaderCell>
                                    <Table.Cell dataKey="price"/>
                                </Table.Column>

                                <Table.Column width={100}>
                                    <Table.HeaderCell>Amount</Table.HeaderCell>
                                    <Table.Cell dataKey="volume"/>
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


                            <Box style={{position: 'sticky', bottom: 0}} sx={{width: '100%-1px', marginLeft: 0.7}}
                                 bgcolor={'rgba(35,35,35,0.66)'} height={45}>
                                <Stack direction={"row"}>
                                    <Fab variant={'extended'} color="primary" aria-label="add"
                                         sx={{
                                             position: 'sticky',
                                             bottom: 16,
                                             right: 16,
                                             top: 10,
                                             marginTop: 1,
                                             marginBottom: 1,
                                             height: 27
                                         }}
                                         style={{left: 16, flexDirection: 'center'}}
                                    >
                                        <Add/>
                                        &nbsp; Add Equity
                                    </Fab>
                                    <Typography variant={'overline'} color={""} aria-label="add"
                                                sx={{
                                                    position: 'sticky',
                                                    bottom: 16,
                                                    right: 16,
                                                    top: 10,
                                                    marginLeft: 4,
                                                    marginTop: 1.25,
                                                    height: 27
                                                }}
                                                style={{left: 16, flexDirection: 'center'}}
                                    >
                                        Total Crypto Investments: $#####.##
                                    </Typography>
                                </Stack>
                                <SpeedDial
                                    ariaLabel="SpeedDial basic example"
                                    sx={{position: 'absolute', bottom: 16, right: 16}}
                                    icon={<ImportExportRounded/>}
                                >

                                    ))}
                                </SpeedDial>
                            </Box>
                        </Box>
                    </div>
                    <div className={'box7'}>

                    </div>
                </div>
            </ReflexElement>
            <ReflexSplitter/>
            <ReflexElement className="right-pane" flex={0.4}>
                <div>
                    <MiniChart widgetPropsAny={{
                        "newProp": true, "symbol": active, "width": '100%', "height": "400"
                    }}/>
                    <TechnicalAnalysis widgetPropsAny={{
                        "newProp": true, "symbol": active, "width": '100%', 'autoSize': 'true'
                    }}/>
                </div>
            </ReflexElement>
        </ReflexContainer>);
}

export default InvestmentTab;
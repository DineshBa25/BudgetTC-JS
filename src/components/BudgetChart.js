import { useState } from "react";
import { Pie } from "@visx/shape";
import { Group } from "@visx/group";
import { Text } from "@visx/text";
import {GradientPinkBlue} from "@visx/gradient";

const coins = [
    { symbol: "ADA", amount: 200, color: "#0033ad", inUSD: 1.48 },
    { symbol: "SOL", amount: 5, color: "#00ffbd", inUSD: 37.6 },
    { symbol: "BTC", amount: 0.005, color: "#F7931A", inUSD: 37363 },
];

export default function Home() {
    const [active, setActive] = useState(null);
    const width = 400;
    const height = 350
    const half = width / 2;
    const margin = { top: 40, right: 20, bottom: 40, left: 20 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const radius = Math.min(innerWidth, innerHeight) / 2;
    const centerY = innerHeight / 2;
    const centerX = innerWidth / 2;
    const donutThickness = 50;
    return (

        <main>
            <svg width={470} height={height}>
                <GradientPinkBlue id="visx-pie-gradient" />
                <rect rx={14} width={470} height={"375px"} fill="url('#visx-pie-gradient')" />
                <Group Group top={centerY + margin.top} left={centerX + margin.left}>
                    <Pie
                        data={coins}
                        pieValue={(data) => data.amount * data.inUSD}
                        outerRadius={centerY}
                        innerRadius={({ data }) => {
                            const size = active && active.symbol == data.symbol ? 35: 27;
                            return half - size;
                        }}
                        padAngle={0.01}
                    >
                        {(pie) => {
                            return pie.arcs.map((arc) => {
                                return (
                                    <g
                                        key={arc.data.symbol}
                                        onMouseEnter={() => setActive(arc.data)}
                                        onMouseLeave={() => setActive(null)}
                                    >
                                        <path d={pie.path(arc)} fill={arc.data.color}></path>
                                    </g>
                                );
                            });
                        }}
                    </Pie>

                    {active ? (
                        <>
                            <Text textAnchor="middle" fill="#fff" fontSize={40} dy={-20}>
                                {`$${Math.floor(active.amount * active.inUSD)}`}
                            </Text>

                            <Text
                                textAnchor="middle"
                                fill={active.color}
                                fontSize={20}
                                dy={20}
                            >
                                {`${active.amount} ${active.symbol}`}
                            </Text>
                        </>
                    ) : (
                        <>
                            <Text textAnchor="middle" fill="#fff" fontSize={40} dy={-20}>
                                {`$${Math.floor(
                                    coins.reduce((acc, coin) => acc + coin.amount * coin.inUSD, 0)
                                )}`}
                            </Text>

                            <Text textAnchor="middle" fill="#aaa" fontSize={20} dy={20}>
                                {`${coins.length} Assets`}
                            </Text>
                        </>
                    )}
                </Group>
            </svg>
        </main>
    );
}
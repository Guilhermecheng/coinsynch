'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function Chart() {
    const [coinData, setCoinData] = useState<any>([]);

    useEffect(() => {
        async function getData() {
            const response = await axios.get('https://api.coincap.io/v2/assets/ethereum/history?interval=d1');
            setCoinData(response.data.data);
            console.log(response.data)
        }

        getData();
    }, [])


    return (
        <ResponsiveContainer className="w-full h-full rounded-r-xl overflow-hidden">
            <AreaChart
                width={500}
                height={400}
                data={coinData}
                margin={{
                    top: 0,
                    right: 0,
                    left: 0,
                    bottom: 0,
                }}

            >
                <CartesianGrid strokeDasharray="3 3" />
                <Area type="monotone" dataKey="priceUsd" stroke="#F4CC8F" fill="#F4CC8F" />
            </AreaChart>
        </ResponsiveContainer>
    )
}
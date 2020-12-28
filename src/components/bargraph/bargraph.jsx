import React, {useState, useEffect} from 'react';
import {BarChart, Bar, XAxis, YAxis, Legend} from 'recharts';


const BarGraph = ({totalCount, activeCount}) => {
    const [chartData, setChartData] = useState([]);
      // console.log("totalCount",totalCount);
     //  console.log("activeCount",activeCount);

    useEffect(() => {
        const inactive = totalCount - activeCount;
        const data = [{name: "Active", count: activeCount},{name: "Inactive", count: inactive}];
        setChartData(data);

    },[totalCount, activeCount])
    return (
        <>
        <BarChart width={600} height = {300} data={chartData} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
            <XAxis dataKey='name'/>
            <YAxis />
            <Legend/>
            <Bar dataKey='count' fill="#8884d8"/>
        </BarChart>
        </>
    )
}

export default BarGraph;
import { Box } from "@mui/material";
import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Link, useLocation } from 'react-router-dom';

import {
    RiDeleteBin6Line,
    RiAddBoxFill,
    RiArrowDownSLine,
    RiArrowLeftSLine,
    RiArrowRightSLine,
} from "react-icons/ri";
const data = [
    { name: "Group A", value: 400, color: "#0088FE" },
    { name: "Group B", value: 300, color: "#00C49F" },
    { name: "Group C", value: 300, color: "#FFBB28" },
    { name: "Group D", value: 200, color: "#FF8042" },
];

const data1 = [
    { name: "Group A", value: 400, color: "darkgreen" },
    { name: "Group B", value: 300, color: "green" },
    { name: "Group C", value: 300, color: "#FFBB28" },
    { name: "Group D", value: 200, color: "#FF8042" },
];


function RiskManagement() {

    const [activeButton, setActiveButton] = useState('Dashboard');

    const handleClick = (buttonName) => {
        setActiveButton(buttonName);
    };
    return (
        <div className="app-main__inner">
            <div className="main-card mb-3 card">
                <div className="card-header">
                    <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
                        Risk Management
                    </div>
                    <div className="btn-actions-pane-right">
                        <Link
                            to="/"
                            className="btn btn-outline-primary d-flex justify-content-center align-items-sm-center"
                            data-toggle="modal"
                            data-target="#exampleModalLong"
                        >
                            <RiAddBoxFill
                                size={25}
                                className="mx-2"
                            />
                            Create New
                        </Link>


                    </div>

                </div>

                <div className="flex-container">
                    <div className="flex-item">
                        <div>
                            <button
                                onClick={() => handleClick('Dashboard')}
                                className="btn px-3 mr-3 font-weight-bold" // Added font-weight-bold class
                                style={{ fontSize: '15px' }} // Added inline style for font size
                            >
                                Actual Risk
                            </button>


                        </div>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Tooltip contentStyle={{ background: "#FFF" }} />
                                <Pie
                                    data={data}
                                    innerRadius={"70%"}
                                    outerRadius={"90%"}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {data.map((item) => (
                                        <Cell key={item.name} fill={item.color} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="legend-container">
                            {data.map((item) => (
                                <div className="legend-item" key={item.name}>
                                    <div
                                        className="legend-color"
                                        style={{ backgroundColor: item.color }}
                                    ></div>
                                    <div className="legend-text">
                                        <span>{item.name}</span>
                                        <span>{item.value}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex-item">
                        <div>
                            <button
                                onClick={() => handleClick('Dashboard')}
                                className="btn px-3 mr-3 font-weight-bold" // Added font-weight-bold class
                                style={{ fontSize: '15px' }} // Added inline style for font size
                            >
                                Residual Risk
                            </button>

                        </div>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Tooltip contentStyle={{ background: "#FFF" }} />
                                <Pie
                                    data={data1}
                                    innerRadius={"70%"}
                                    outerRadius={"90%"}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {data1.map((item) => (
                                        <Cell key={item.name} fill={item.color} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="legend-container">
                            {data1.map((item) => (
                                <div className="legend-item" key={item.name}>
                                    <div
                                        className="legend-color"
                                        style={{ backgroundColor: item.color }}
                                    ></div>
                                    <div className="legend-text">
                                        <span>{item.name}</span>
                                        <span>{item.value}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
}

export default RiskManagement;



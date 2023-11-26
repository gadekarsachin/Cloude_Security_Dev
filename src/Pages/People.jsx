
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import React, { useState } from "react";
import CustomDropdown from '../components/Dropdown/CustomDropdown';
import { useSelector } from "react-redux";
import { deleteUser, getUsers } from "../helperFunctions/apiFunction";
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';

import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import {
    RiDeleteBin6Line,
    RiAddBoxFill,
    RiArrowDownSLine,
    RiArrowLeftSLine,
    RiArrowRightSLine,
} from "react-icons/ri";
import { Button } from '@mui/material';
import styled from '@emotion/styled';
import { blue } from '@mui/material/colors';

const Custombuttons = styled(Button)`border: 1px solid lightgrey,`;

const TableRowHeader = styled(TableRow)`border: 1px solid lightgrey;background-color: #3f6ad8;`;

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };

}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function People() {
    const { user } = useSelector((state) => state.clientData);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const [page, setPage] = useState({
        limit: 10,
        page: 1,
        totalPages: 1,
        totalResults: 4,
        sortby: "asc",
        searchBy: "",
    });

    const {
        refresh: { token },
    } = user;
    function fetchUsers(obj) {
        const param = `/users?page=${obj.page}&sortBy=${obj.sortby}&limit=${obj.limit}&searchBy=${obj.searchBy}`;
        setLoading(true);
        getUsers(param, token)
            .then((res) => {
                setLoading(false);
                if (res.code === 200) {
                    const { limit, page, totalPages, totalResults, results } = res.data;
                    console.log("🚀 ~ file: UserManagementPage.jsx:43 ~ .then ~ results", results)
                    setPage({
                        limit: limit,
                        page: page,
                        totalPages: totalPages,
                        totalResults: totalResults,
                    });
                    setUsers(results);
                }
            })
            .catch((e) => {
                console.log(e);
            });
    }
    function goForPreAndNext(type) {
        const obj = { ...page };
        if (type === "pre") {
            if (Number(page.page) - 1 > 0) {
                obj["page"] = page.page - 1;
                setPage({ ...obj });
                fetchUsers({ ...obj });
            }
        }
        if (type === "next") {
            if (users.length > 0) {
                obj["page"] = page.page + 1;
                setPage({ ...obj });
                fetchUsers({ ...obj });
            }
        }
    }
    return (

        <div className="app-main__inner">
            <div className="main-card mb-3 card">
                <div className="card-header">
                    <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
                        People
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
                            Add New
                        </Link>
                    </div>
                </div>
                <div className="card-header d-flex justify-content-between">
                    <div className="">
                        <input type="text" className="form-control form-control-sm" placeholder="Search By" />
                    </div>
                    <div>
                        <CustomDropdown />
                        <Custombuttons variant='detailed'>Reset</Custombuttons>
                        <Custombuttons variant='detailed'>Send Reminder</Custombuttons>
                        <Custombuttons variant='detailed' style={{ marginLeft: 20 }}>Export</Custombuttons>
                    </div>
               
                </div>
                <div className="mb-3 mt-3 text-center">
                    <div className="paginate-cont">
                        <span
                            style={{
                                opacity: Number(page.page) - 1 > 0 ? 1 : 0.4,
                                cursor: "pointer",
                            }}
                            onClick={() => goForPreAndNext("pre")}
                            className="hover-effect"
                        >
                            <RiArrowLeftSLine size={15} />
                        </span>
                        <span>{Number(page.page) - 1}</span>
                        <span
                        >{page.page}</span>
                        <span>{Number(page.page) + 1}</span>
                        <span
                            style={{
                                opacity: users.length > 0 ? 1 : 0.4,
                                cursor: "pointer",
                            }}
                            onClick={() => goForPreAndNext("next")}
                            className="hover-effect"
                        >
                            <RiArrowRightSLine size={15} />
                        </span>
                    </div>
                </div>

                <div
                    className="table-responsive"
                    style={{
                        height: "430px",
                        fontFamily: "poppins"
                    }}
                >
                    <table className="align-middle text-truncate mb-0 table table-borderless table-hover ">
                        <thead>
                            <tr style={{
                                color: "#ffffff",
                                backgroundColor: "#3f6ad7",
                            }}>
                                <th className="text-center">
                              Person Name
                                </th>
                                <th className="text-center">
                                   status
                                </th>
                                <th className="text-center">Start Date</th>
                                <th className="text-center">End Date</th>
                                {/* <th className="text-center">Role</th>
                  <th className="text-center">Status</th>
                  <th className="text-center">Actions</th> */}
                            </tr>
                        </thead>

                        <TableBody >
                            {rows.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row" style={{ textAlign: "start", borderBottom: "1px solid lightgrey" }}>
                                      
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right" style={{ textAlign: "start", borderBottom: "1px solid lightgrey" }}>{row.calories}
                                    </TableCell>
                                    <TableCell align="right" style={{ textAlign: "start", borderBottom: "1px solid lightgrey" }}>{row.fat}</TableCell>
                                    <TableCell align="right" style={{ textAlign: "start", borderBottom: "1px solid lightgrey" }}>{row.carbs}</TableCell>

                                </TableRow>
                            ))}
                        </TableBody>


                    </table>
                </div>
            </div>
        </div>
    );
}

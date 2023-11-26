// import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
import React, { useState, useEffect } from "react";
// import CustomDropdown from "../components/Dropdown/CustomDropdown";
import { useSelector } from "react-redux";
import { deleteUser, getUsers } from "../helperFunctions/apiFunction";
import { Link, useLocation } from "react-router-dom";
// import { FaUser } from "react-icons/fa";
// import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import { RiDeleteBin6Line, RiAddBoxFill } from "react-icons/ri";
import { Button } from "@mui/material";
import styled from "@emotion/styled";
// import { blue } from "@mui/material/colors";
import { CiEdit } from "react-icons/ci";
// import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// import SubmenuCreate from "./SubmenuCreate";
import AddVendor from "../components/modal/add/AddVendor";
import AddQuestionnaire from "../components/modal/add/AddQuestionnaire";
import EditVendor from "../components/modal/edit/EditVendor";
import EditQuestionnaire from "../components/modal/edit/EditQuestionnaire";
import handleDelete from "../helperFunctions/deleteFunction";

export default function VendorManagement() {
  const { user } = useSelector((state) => state.clientData);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fieldsArray, setFieldsArray] = useState([]);
  const [showModalVEdit, setShowModalVEdit] = useState(false);
  const [showModalQEdit, setShowModalQEdit] = useState(false);
  const [editDataV, setEditDataV] = useState({});
  const [editDataQ, setEditDataQ] = useState({});
  const navigate = useNavigate();
  const [page, setPage] = useState({
    limit: 10,
    page: 1,
    totalPages: 1,
    totalResults: 4,
    sortby: "asc",
    searchBy: "",
  });

  const [selectedOption, setSelectedOption] = useState("Vendors");
  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };
  const optionStyle = {
    // Add a bottom border
    cursor: "pointer",
    padding: "8px 16px",
    fontSize: "20px",
    color: "gray",
  };

  const tableStyle = {
    // padding: "16px",
    marginTop: "16px",
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10; // Items per page

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
          console.log(
            "🚀 ~ file: UserManagementPage.jsx:43 ~ .then ~ results",
            results
          );
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

  const [getTitle, Settitle] = useState("");
  const [gethead, Sethead] = useState([]);
  const [getheadQ, SetheadQ] = useState([]);
  // console.log("gethead", gethead);
  const [getData, SetData] = useState([]);
  const [getDataQ, setDataQ] = useState([]);
  // const [gettoggle, settoggle] = useState(true);

  const location = useLocation();
  // const dataToSend = location.state?.dataToSend || {};
  const dataToSendQuestion = {
    id: "65001690bc06b751241e7502",
    menuname: "Questionnairedata",
  };
  const dataToSend =
    { id: "652e71327fa6be7cf0a5db19", menuname: "List of Vendors" } || {};
  const pathSubMenu = "/vendorManagement";
  console.log("dataToSend", dataToSend);
  const [refreshToken, setRefreshToken] = useState("");
  console.log("wwwwwwwww", refreshToken);

  useEffect(() => {
    const Ldata = localStorage.getItem("user_info");
    console.log("userInfo", Ldata);

    if (Ldata) {
      const parsedData = JSON.parse(Ldata);
      if (parsedData.refresh && parsedData.refresh.token) {
        const token = parsedData.refresh.token;
        setRefreshToken(token);
        //fetchData(token);
      } else {
        console.log("Refresh token not found in the data.");
      }
    } else {
      console.log("Data not found in localStorage.");
    }
  }, []);

  //
  useEffect(() => {
    if (refreshToken) {
      fetchData(refreshToken);
    }
  }, [refreshToken]);

  function fetchData(token) {
    setLoading(true); // Set loading to true before fetching data
    SetData([]);

    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `http://localhost:8000/v1/template/getTemplate/${dataToSend.id}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        // console.log("result", result);
        const parsedResult = JSON.parse(result);
        // console.log("parsed res", parsedResult);
        const MainTitle = parsedResult[0].temp.name;
        // console.log("titleFromData", MainTitle);
        Settitle(MainTitle);
        const fieldsArray = parsedResult[0].fields;
        // console.log("fieldsArray", fieldsArray);
        setFieldsArray(parsedResult);
        const Mainhead = parsedResult[0].fields;
        Sethead(Mainhead);
        // console.log("Mainhead", Mainhead);
      })
      .catch((error) => console.log("error", error));

    fetch(
      `http://localhost:8000/v1/template/getTemplate/${dataToSendQuestion.id}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        // console.log("result", result);
        const parsedResult = JSON.parse(result);
        // console.log("parsed res", parsedResult);
        const MainTitle = parsedResult[0].temp.name;
        // console.log("titleFromData", MainTitle);
        Settitle(MainTitle);
        const fieldsArray = parsedResult[0].fields;
        // console.log("fieldsArray", fieldsArray);
        setFieldsArray(parsedResult);
        const Mainhead = parsedResult[0].fields;
        SetheadQ(Mainhead);
        // console.log("Mainhead", Mainhead);
      })
      .catch((error) => console.log("error", error));
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${refreshToken}`);

    const requestOptions1 = {
      method: "GET",
      headers: headers,
      redirect: "follow",
      headers: {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzgxMDgyNTQyYTM4NWE4MWYyMDY1ZDEiLCJpYXQiOjE2OTY0ODc0MjgsImV4cCI6MTY5OTA3OTQyOCwidHlwZSI6InJlZnJlc2gifQ.PUx7UBTSDgEz4fLIwDxNSYz1W8tq5BBTNfsGhGzFTog",
      },
    };

    //   fetch(
    //     `http://localhost:8000/v1/collection/VendorManagement?page=${currentPage}&limit=${limit}`,
    //     requestOptions1
    //   )
    //     .then((response1) => response1.text())
    //     .then((result1) => {
    //       const parsedResult1 = JSON.parse(result1);
    //       console.log("result1 vendor", parsedResult1.data);
    //       console.log("result1 vendor", parsedResult1.data.length);

    //       setTotalPages(parsedResult1.totalPages);
    //       SetData(parsedResult1.data);
    //       setLoading(false); // Set loading to false after data is fetched
    //       console.log("result1 vendor", result1);
    //       console.log("result1 vendor", getData);
    //       // const MainData = parsedResult1[0].fields;
    //       // console.log("MainData", MainData);
    //     })
    //     .catch((error) => console.log("error", error));
    // }

    fetch(
      `http://localhost:8000/v1/collection/vendordata?page=${currentPage}&limit=${limit}`,
      requestOptions1
    )
      .then((response1) => response1.text())
      .then((result1) => {
        // console.log("result1 hrushi", result1);
        const parsedResult1 = JSON.parse(result1);
        console.log("result1", parsedResult1.data);
        console.log("result1", parsedResult1.data.length);

        setTotalPages(parsedResult1.totalPages);
        // const MainData = parsedResult1[0].fields;
        SetData(parsedResult1.data);
        // console.log("MainData", MainData);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => console.log("error", error));

    fetch(
      `http://localhost:8000/v1/collection/questionnairedata?page=${currentPage}&limit=${limit}`,
      requestOptions1
    )
      .then((response1) => response1.text())
      .then((result1) => {
        const parsedResult1 = JSON.parse(result1);
        setTotalPages(parsedResult1.totalPages);
        setDataQ(parsedResult1.data);
        setLoading(false); // Set loading to false after data is fetched
        console.log("result1 hrushi data Q", parsedResult1);
        // console.log("result1", parsedResult1.data);
        // console.log("result1", parsedResult1.data.length);

        // const MainData = parsedResult1[0].fields;

        // console.log("MainData", MainData);
      })
      .catch((error) => console.log("error", error));
  }

  // console.log(`get data from `, getData);
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    console.log("handleNextPage");
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Generate an array of page numbers for rendering (show 3 numbers if more than 4, else show all)
  const renderPageNumbers = () => {
    const pageNumbers = [];
    if (totalPages <= 4) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <li
            key={i}
            onClick={() => handlePageClick(i)}
            className={currentPage === i ? "active" : ""}
          >
            {i}
          </li>
        );
      }
    } else {
      const midPoint = Math.ceil(totalPages / 2);
      let startPage, endPage;
      if (currentPage <= midPoint) {
        startPage = 1;
        endPage = 3;
      } else if (currentPage >= totalPages - midPoint + 1) {
        startPage = totalPages - 2;
        endPage = totalPages;
      } else {
        startPage = currentPage - 1;
        endPage = currentPage + 1;
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
          <li
            key={i}
            onClick={() => handlePageClick(i)}
            className={currentPage === i ? "active" : ""}
          >
            {i}
          </li>
        );
      }
    }
    return pageNumbers;
  };

  const [showModal, setShowModal] = useState(false);
  const [showModalV, setShowModalV] = useState(false);
  const [getId, setId] = useState("");

  const handleModalOpen = (_id) => {
    console.log("Clicked delete for _id:", _id);
    setId(_id);
    setShowModal(true);
  };
  const handleModalOpenV = (_id) => {
    // console.log("Clicked delete for _id:", _id);
    // setId(_id);
    setShowModalV(true);
  };

  const handleDeleteClick = () => {
    const requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(
      `http://localhost:8000/v1/collection/${dataToSend.menuname}/${getId}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        // console.log(result);

        // Perform any necessary UI updates or actions after successful deletion
        setShowModal(false); // Close the modal
        fetchData();
      })
      .catch((error) => console.log("error", error));
    setShowModal(false);
  };

  useEffect(() => {
    // Initial data fetching when the component mounts
    fetchData();
  }, []);

  // useEffect(() => {
  //   fetchData(); // Fetch data whenever dataToSend changes
  // }, [dataToSend]);

  function searchColletion(data) {
    // console.log("data",data);
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `http://localhost:8000/v1/collection/vendordata?page=${currentPage}&limit=${limit}&keyword=${data}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        const parsedResult1 = JSON.parse(result);
        console.log("ccccccccccccccccccccc", parsedResult1);
        setTotalPages(parsedResult1.totalPages);
        // const MainData = parsedResult1[0].fields;
        SetData(parsedResult1.data);
      })
      .catch((error) => console.log("error", error));
  }

  const handelEditV = (row) => {
    setShowModalVEdit(true);
    setEditDataV(row);
  };
  const handelEditQ = (row) => {
    setShowModalQEdit(true);
    setEditDataQ(row);
  };

  return (
    <div className="app-main__inner ">
      <div className="main-card mb-3 card ">
        <div className="card-header " style={{ border: "none" }}>
          <div className="card-header-title font-size-lg text-none font-weight-normal">
            {/* {dataToSend.menuname ? dataToSend.menuname : "Evidence Task"} */}
            List of Vendors{" "}
          </div>
          <div className="btn-actions-pane-right"></div>

          {/* searchbar expot add  */}
          <div className="btn-actions-pane-right d-flex ">
            <input
              type="text"
              className="form-control form-control-sm p-3"
              placeholder="Search"
              onChange={(e) => searchColletion(e.target.value)}
            />
            {/* <Custombuttons variant="detailed" style={{ padding: "20px 20px" }}>
              Export
            </Custombuttons> */}
            <button
              className="btn  btn-outline-secondary text-capitalize"
              style={{
                fontWeight: "bold",
                padding: "5px 10px",
                fontSize: "18px",
                border: "1px solid lightgray",
              }}
              onClick={() => {
                // Your click handler code here
              }}
            >
              Export
            </button>

            {selectedOption === "Vendors" ? (
              <button
                className="btn btn-outline-primary d-flex justify-content-center align-items-sm-center text-capitalize"
                onClick={() => {
                  setShowModalV(true);
                }}
                data-toggle="modal"
                data-target="#exampleModalLong"
              >
                <RiAddBoxFill size={25} className="mx-2" />
                Create Vendor
              </button>
            ) : (
              <>
                <button
                  className="btn btn-outline-primary d-flex justify-content-center align-items-sm-center text-capitalize"
                  onClick={() => {
                    setShowModal(true);
                  }}
                  data-toggle="modal"
                  data-target="#exampleModalLong"
                >
                  <RiAddBoxFill size={25} className="mx-2" />
                  Create Questionnaire
                </button>
              </>
            )}
          </div>
        </div>
        {/* <div className="card-header d-flex justify-content-between">
          <div className="limitcont border px-2 py-1 rounded">
            <span style={{ textTransform: "capitalize" }}>
              Limit{" " + page.limit}
              <RiArrowDownSLine size={15} id="ldarr" />
            </span>
            <div className="plimits">
              <div>10</div>
              <div>25</div>
              <div>50</div>
              <div>100</div>
            </div>
          </div>
        </div> */}
        <div className="mb-3 mt-3 text-center">
          {/* <div className="paginate-cont">
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
            <span>{page.page}</span>
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
          </div> */}
          <div>
            <div
              className="d-flex"
              style={{ borderBottom: "2px solid lightgray" }}
            >
              <div
                style={
                  selectedOption === "Vendors"
                    ? {
                        ...optionStyle,
                        borderBottom: "2px solid blue",
                      }
                    : optionStyle
                }
                onClick={() => handleOptionClick("Vendors")}
              >
                Vendors
              </div>
              <div
                style={
                  selectedOption === "Questionnaire"
                    ? {
                        ...optionStyle,
                        borderBottom: "2px solid blue",
                      }
                    : optionStyle
                }
                onClick={() => handleOptionClick("Questionnaire")}
              >
                Questionnaire
              </div>
            </div>

            {/* If Questionnaire  */}
            {/* If Questionnaire  */}
            {/* If Questionnaire  */}

            {selectedOption === "Questionnaire" && (
              //table below
              <div
                className="table-responsive"
                style={{
                  height: "430px",
                  fontFamily: "poppins",
                }}
              >
                {loading ? (
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ height: "100%" }}
                  >
                    <div className="spinner-border text-primary" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                    <div className="ml-2">Loading...</div> {/* Add this line */}
                  </div>
                ) : (
                  // gettoggle ? (
                  //   <table className="align-middle text-truncate mb-0 table table-borderless table-hover ">
                  //     <thead>
                  //       <tr
                  //         style={{
                  //           color: "#ffffff",
                  //           backgroundColor: "#3f6ad7",
                  //         }}
                  //       >
                  //         <th className="text-center">Evidence Task</th>
                  //         <th className="text-center">Assignee</th>
                  //         <th className="text-center">Status</th>
                  //         <th className="text-center">Action</th>
                  //         {/* <th className="text-center">Role</th>
                  //         <th className="text-center">Status</th>
                  //         <th className="text-center">Actions</th> */}
                  //       </tr>
                  //     </thead>

                  //     <TableBody>
                  //       {rows.map((row) => (
                  //         <TableRow
                  //           key={row.name}
                  //           sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  //         >
                  //           <TableCell
                  //             component="th"
                  //             scope="row"
                  //             style={{
                  //               textAlign: "start",
                  //               borderBottom: "1px solid lightgrey",
                  //             }}
                  //           >
                  //             <AssignmentTurnedInOutlinedIcon
                  //               style={{ marginRight: 8, opacity: 0.3 }}
                  //             />
                  //             {row.name}
                  //           </TableCell>
                  //           <TableCell
                  //             align="right"
                  //             style={{
                  //               textAlign: "start",
                  //               borderBottom: "1px solid lightgrey",
                  //             }}
                  //           >
                  //             {row.calories}
                  //           </TableCell>
                  //           <TableCell
                  //             align="right"
                  //             style={{
                  //               textAlign: "start",
                  //               borderBottom: "1px solid lightgrey",
                  //             }}
                  //           >
                  //             {row.fat}
                  //           </TableCell>
                  //           <TableCell
                  //             align="right"
                  //             style={{
                  //               textAlign: "start",
                  //               borderBottom: "1px solid lightgrey",
                  //             }}
                  //           >
                  //             {row.carbs}
                  //           </TableCell>
                  //         </TableRow>
                  //       ))}
                  //     </TableBody>
                  //   </table>
                  // ) :

                  <table className="align-middle text-truncate mb-0 table table-borderless table-hover ">
                    <thead>
                      <tr
                        style={{
                          color: "#ffffff",
                          backgroundColor: "#3f6ad7",
                        }}
                      >
                        {getheadQ.length > 0 ? (
                          <>
                            {getheadQ.map((item, index) => (
                              <th key={item._id} className="text-center">
                                {item.name}
                              </th>
                            ))}
                            {/* Add a static "Action" header */}
                            <th className="text-center">Action</th>
                          </>
                        ) : (
                          <>
                            <th className="text-center">Evidence Task</th>
                            <th className="text-center">Assignee</th>
                            <th className="text-center">Status</th>
                            {/* <th className="text-center">Action</th> */}
                          </>
                        )}
                      </tr>
                    </thead>

                    <TableBody>
                      {/* {console.log("getdata dddd", getData)} */}

                      {getDataQ && getDataQ.length > 0 ? (
                        getDataQ.map((row) => (
                          <TableRow
                            key={row._id}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell>{row.questionnaireId}</TableCell>
                            <TableCell>{row.questionnaireTitle}</TableCell>
                            <TableCell>{row.questionnaireLinks}</TableCell>

                            {/* <TableCell>
                              <a
                                href={row.ReferenceLink}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Reference Link
                              </a>
                            </TableCell> */}
                            {/* <TableCell>{row.Recommendation}</TableCell>
                            <TableCell>{row.CloudAPIs}</TableCell> */}
                            <TableCell>
                              <div className="d-flex">
                                <span
                                  title="Edit Record"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => handelEditQ(row)}
                                >
                                  <CiEdit
                                    className="text-danger mx-3"
                                    size={22}
                                  />
                                </span>
                                <span
                                  title="Delete Record"
                                  style={{ cursor: "pointer" }}
                                  onClick={() =>
                                    handleDelete(
                                      "questionnairedata",
                                      row._id,
                                      fetchData
                                    )
                                  }
                                >
                                  <RiDeleteBin6Line className="text-danger1" />
                                </span>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={13}>
                            <div
                              className="d-flex justify-content-center align-items-center"
                              style={{ height: "100%" }}
                            >
                              <div
                                className="spinner-border text-primary"
                                role="status"
                              >
                                <span className="sr-only">Loading...</span>
                              </div>
                              <div className="ml-2">Loading...</div>{" "}
                              {/* Add this line */}
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </table>
                )}
              </div>
            )}

            {/* If Vendor   */}
            {/* If Vendor   */}
            {/* If Vendor   */}

            {selectedOption === "Vendors" && (
              <div
                className="table-responsive"
                style={{
                  height: "430px",
                  fontFamily: "poppins",
                }}
              >
                {loading ? (
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ height: "100%" }}
                  >
                    <div className="spinner-border text-primary" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                    <div className="ml-2">Loading...</div> {/* Add this line */}
                  </div>
                ) : (
                  // gettoggle ? (
                  //   <table className="align-middle text-truncate mb-0 table table-borderless table-hover ">
                  //     <thead>
                  //       <tr
                  //         style={{
                  //           color: "#ffffff",
                  //           backgroundColor: "#3f6ad7",
                  //         }}
                  //       >
                  //         <th className="text-center">Evidence Task</th>
                  //         <th className="text-center">Assignee</th>
                  //         <th className="text-center">Status</th>
                  //         <th className="text-center">Action</th>
                  //         {/* <th className="text-center">Role</th>
                  //         <th className="text-center">Status</th>
                  //         <th className="text-center">Actions</th> */}
                  //       </tr>
                  //     </thead>

                  //     <TableBody>
                  //       {rows.map((row) => (
                  //         <TableRow
                  //           key={row.name}
                  //           sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  //         >
                  //           <TableCell
                  //             component="th"
                  //             scope="row"
                  //             style={{
                  //               textAlign: "start",
                  //               borderBottom: "1px solid lightgrey",
                  //             }}
                  //           >
                  //             <AssignmentTurnedInOutlinedIcon
                  //               style={{ marginRight: 8, opacity: 0.3 }}
                  //             />
                  //             {row.name}
                  //           </TableCell>
                  //           <TableCell
                  //             align="right"
                  //             style={{
                  //               textAlign: "start",
                  //               borderBottom: "1px solid lightgrey",
                  //             }}
                  //           >
                  //             {row.calories}
                  //           </TableCell>
                  //           <TableCell
                  //             align="right"
                  //             style={{
                  //               textAlign: "start",
                  //               borderBottom: "1px solid lightgrey",
                  //             }}
                  //           >
                  //             {row.fat}
                  //           </TableCell>
                  //           <TableCell
                  //             align="right"
                  //             style={{
                  //               textAlign: "start",
                  //               borderBottom: "1px solid lightgrey",
                  //             }}
                  //           >
                  //             {row.carbs}
                  //           </TableCell>
                  //         </TableRow>
                  //       ))}
                  //     </TableBody>
                  //   </table>
                  // ) :

                  <table className="align-middle text-truncate mb-0 table table-borderless table-hover ">
                    <thead>
                      <tr
                        style={{
                          color: "#ffffff",
                          backgroundColor: "#3f6ad7",
                        }}
                      >
                        {/* {console.log("Get head vendor", gethead)} */}
                        {gethead.length > 0 ? (
                          <>
                            {gethead.map((item) => (
                              <th key={item._id} className="text-center">
                                {item.name}
                              </th>
                            ))}
                            {/* Add a static "Action" header */}
                            <th className="text-center">Action</th>
                          </>
                        ) : (
                          <>
                            <th className="text-center">Evidence Task</th>
                            <th className="text-center">Assignee</th>
                            <th className="text-center">Status</th>
                            {/* <th className="text-center">Action</th> */}
                          </>
                        )}
                      </tr>
                    </thead>
                    <TableBody>
                      {getData && getData.length > 0 ? (
                        getData.map((row) => (
                          <TableRow
                            key={row._id}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell>{row.vendorLegalName}</TableCell>
                            <TableCell>{row.vendorType}</TableCell>
                            <TableCell>{row.vendorStatus}</TableCell>
                            <TableCell>{row.vendorComplianceStatus}</TableCell>
                            <TableCell>
                              {row.questionnaire.questionnaireResponse.join(
                                ","
                              )}
                            </TableCell>

                            {/* <TableCell>
                              <a
                                href={row.ReferenceLink}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Reference Link
                              </a>
                            </TableCell> */}

                            <TableCell>
                              <div className="d-flex">
                                <span
                                  title="Edit Record"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => handelEditV(row)}
                                >
                                  <CiEdit
                                    className="text-danger mx-3"
                                    size={22}
                                  />
                                </span>
                                <span
                                  title="Delete Record"
                                  style={{ cursor: "pointer" }}
                                  onClick={() =>
                                    handleDelete(
                                      "vendordata",
                                      row._id,
                                      fetchData
                                    )
                                  }
                                >
                                  <RiDeleteBin6Line className="text-danger1" />
                                </span>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={13}>
                            <div
                              className="d-flex justify-content-center align-items-center"
                              style={{ height: "100%" }}
                            >
                              <div
                                className="spinner-border text-primary"
                                role="status"
                              >
                                <span className="sr-only">Loading...</span>
                              </div>
                              <div className="ml-2">Loading...</div>{" "}
                              {/* Add this line */}
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </table>
                )}
              </div>
            )}
          </div>

          {/* <div className="pagination">
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
              <RiArrowLeftSLine size={15} />
            </button>
            <ul className="page-numbers inline-list">{renderPageNumbers()}</ul>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              <RiArrowRightSLine size={15} />
            </button>
          </div> */}

          <style>
            {`
          .pagination {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 20px;
          }

          .pagination button,
          .pagination li {
            margin: 0 5px;
            padding: 0px 5px;
            border: 1px solid #3f6ad7;
            background-color: #fff;
            color: #3f6ad7;
            cursor: pointer;
            border-radius: 50%;
            font-size:15px;
          }

          .pagination button:hover,
          .pagination li.active {
            background-color: #3f6ad7;
            color: #fff;
          }

          .inline-list {
            display: flex;
            list-style: none;
            padding: 0;
            margin-top: auto;
            margin-bottom: auto;
          }

          .inline-list li {
            margin-right: 5px;
          }

          /* YourComponent.css */
          .table-container {
            max-height: 430px;
            overflow-y: auto;
          }
      
          table {
            width: 100%;
            border-collapse: collapse;
          }
      
          table th {
            background-color: #3f6ad7;
            color: #ffffff;
            position: sticky;
            top: 0;
            z-index: 1;
          }
      
          table th, table td {
            padding: 8px;
            text-align: center;
          }          
        `}
          </style>
        </div>
      </div>

      <AddQuestionnaire
        showModal={showModal}
        setShowModal={setShowModal}
        fetchData={fetchData}
      />
      <AddVendor
        showModal={showModalV}
        setShowModal={setShowModalV}
        fetchData={fetchData}
      />
      <EditVendor
        showModalVEdit={showModalVEdit}
        setShowModalVEdit={setShowModalVEdit}
        fetchData={fetchData}
        editDataV={editDataV}
        setEditDataV={setEditDataV}
      />
      <EditQuestionnaire
        showModalQEdit={showModalQEdit}
        setShowModalQEdit={setShowModalQEdit}
        fetchData={fetchData}
        editDataQ={editDataQ}
        setEditDataQ={setEditDataQ}
      />

      {/* <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Document</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div></div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              console.log("yes");
            }}
          >
            Create
          </Button>
        </Modal.Footer>
      </Modal> */}
    </div>
  );
}

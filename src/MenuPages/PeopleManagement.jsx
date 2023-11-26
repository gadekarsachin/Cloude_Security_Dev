import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import React, { useState, useEffect } from "react";
import CustomDropdown from "../components/Dropdown/CustomDropdown";
import { useSelector } from "react-redux";
import { deleteUser, getUsers } from "../helperFunctions/apiFunction";
import { Link, useLocation } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import {
  RiDeleteBin6Line,
  RiAddFill,
  RiArrowDownSLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
} from "react-icons/ri";
import { Button } from "@mui/material";
import styled from "@emotion/styled";
import { blue } from "@mui/material/colors";
import { CiEdit } from "react-icons/ci";
// import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import AddPerson from "../components/modal/add/AddPerson";
import { RiAddBoxFill } from "react-icons/ri";
import EditPeopleManagement from "../components/modal/edit/EditPeopleManagement";
import handleDelete from "../helperFunctions/deleteFunction";

const Custombuttons = styled(Button)`
  border: 1px solid lightgrey;
`;

const TableRowHeader = styled(TableRow)`
  border: 1px solid lightgrey;
  background-color: #3f6ad8;
`;

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function PeopleManagement() {
  const { user } = useSelector((state) => state.clientData);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fieldsArray, setFieldsArray] = useState([]);
  const navigate = useNavigate();
  const [page, setPage] = useState({
    limit: 10,
    page: 1,
    totalPages: 1,
    totalResults: 4,
    sortby: "asc",
    searchBy: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10; // Items per page
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [editedField, setEditedField] = useState({});
  // console.log("showedit", showModalEdit);

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

  const [getTitle, Settitle] = useState("");
  const [gethead, Sethead] = useState([]);
  const [getData, SetData] = useState([]);
  const [gettoggle, settoggle] = useState(true);

  const location = useLocation();
  // const dataToSend = location.state?.dataToSend || {};
  const dataToSend =
    { id: "652e8bbad3daed2b388167a6", menuname: "peopledata_2" } || {};
  const pathSubMenu = "/peopleManagement";
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
        const parsedResult = JSON.parse(result);
        const MainTitle = parsedResult[0].temp.name;
        Settitle(MainTitle);
        setFieldsArray(parsedResult);
        const Mainhead = parsedResult[0].fields;
        Sethead(Mainhead);
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
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzgxMDgyNTQyYTM4NWE4MWYyMDY1ZDEiLCJpYXQiOjE2OTc2MzI4NjIsImV4cCI6MTcwMDIyNDg2MiwidHlwZSI6InJlZnJlc2gifQ.vx47iCNK8MqLjLgyXEtnC9bpO2VnGQyy96quA2jChos",
      },
    };

    fetch(
      `http://localhost:8000/v1/collection/peopledata?page=${currentPage}&limit=${limit}`,
      requestOptions1
    )
      .then((response1) => response1.text())
      .then((result1) => {
        const parsedResult1 = JSON.parse(result1);
        console.log("result11111", parsedResult1);
        // console.log("result1", parsedResult1.data);
        // console.log("result1", parsedResult1.data.length);

        setTotalPages(parsedResult1.totalPages);
        // const MainData = parsedResult1[0].fields;
        SetData(parsedResult1.data);
        // console.log("MainData", MainData);
        setLoading(false); // Set loading to false after data is fetched
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

  // const [showModal, setShowModal] = useState(false);
  const [getId, setId] = useState("");

  const handleModalOpen = (_id) => {
    console.log("Clicked delete for _id:", _id);
    setId(_id);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };
  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    // Handle the uploaded file here
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
        console.log(result);

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

  function searchColletion(data) {
    // console.log("data",data);
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `http://localhost:8000/v1/collection/peopledata?page=${currentPage}&limit=${limit}&keyword=${data}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        console.log("result from people", result);
        const parsedResult1 = JSON.parse(result);
        setTotalPages(parsedResult1.totalPages);
        // const MainData = parsedResult1[0].fields;
        SetData(parsedResult1.data);
      })
      .catch((error) => console.log("error", error));
  }

  function createNew() {
    console.log("Edit button clicked for template with Data");
    // Replace '/edit-template' with the actual route of your edit page
    navigate("/submenuCreate", {
      state: { fieldsArray: fieldsArray },
    });
  }

  const handleEdit = (row) => {
    console.log("gr", row);
    setEditedField(row); // Clear the editedField state
    setShowModalEdit(true); // Open the modal
  };

  return (
    <div className="app-main__inner">
      <div className="main-card mb-3 card">
        <div className="card-header">
          <div className="card-header-title font-size-lg text-none font-weight-normal">
            {"List of employee"}
          </div>
          <div className="btn-actions-pane-right">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Search By"
              onChange={(e) => searchColletion(e.target.value)}
            />

            <button
              className="btn btn-outline-primary d-flex justify-content-center align-items-sm-center text-capitalize"
              onClick={() => {
                handleModalOpen();
              }}
              data-toggle="modal"
              data-target="#exampleModalLong"
            >
              <RiAddBoxFill size={25} className="mx-2" />
              Create New
            </button>
          </div>
        </div>
        <div className="card-header d-flex justify-content-between">
          {/* <div className=""> */}
          {/* <Custombuttons variant="detailed" style={{ margin: 10 }}>
              Status
            </Custombuttons>
            <Custombuttons variant="detailed" style={{ margin: 10 }}>
              Reset
            </Custombuttons>
          </div>
          <div>
            <Custombuttons variant="detailed" style={{ margin: 10 }}>
              Export
            </Custombuttons>
            <Custombuttons variant="detailed" style={{ margin: 10 }}>
              Send Reminder
            </Custombuttons>
            <Custombuttons variant="detailed" style={{ margin: 10 }}>
              Bulk Action
            </Custombuttons>
          </div> */}
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
        </div>
        <div className="mb-3 mt-3 text-center">
          <div className="pagination">
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
          </div>
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

        <div
          className="table-responsive"
          style={{
            height: "430px",
            fontFamily: "poppins",
          }}
        >
          {false ? (
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
            <table>
              <thead>
                <tr
                  style={{
                    color: "#ffffff",
                    backgroundColor: "#3f6ad7",
                    position: "sticky",
                    top: "0px",
                    zIndex: "1",
                  }}
                >
                  {/* {console.log("people gethead", gethead)} */}
                  {gethead.length > 0 ? (
                    <>
                      <>
                        {gethead.map((item) => (
                          <th key={item._id} className="text-center">
                            {item.name}
                          </th>
                        ))}
                        {/* Add a static "Action" header */}
                        <th className="text-center">Action</th>
                      </>
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
                {/* {console.log("hellow", getData)} */}
                {getData && getData.length > 0 ? (
                  getData.map((row) => (
                    <TableRow
                      key={row._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>{row.empStatus}</TableCell>
                      <TableCell>{row.empDepartment}</TableCell>
                      <TableCell>{row.empDesignation}</TableCell>
                      <TableCell>
                        {row.trainingCompletionStatus.join(", ")}
                      </TableCell>
                      <TableCell>{row.trainingAssignedOn}</TableCell>
                      <TableCell>
                        {row.trainingCompletedOn.join(", ")}
                      </TableCell>

                      <TableCell>
                        <div className="d-flex">
                          <span
                            title="Edit Record"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              handleEdit(row);
                              console.log("ddscd", showModalEdit);
                            }}
                          >
                            <CiEdit className="text-danger mx-3" size={22} />
                          </span>
                          <span
                            title="Delete Record"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              handleDelete("peopledata", row._id, fetchData)
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
      </div>

      <AddPerson
        showModal={showModal}
        setShowModal={setShowModal}
        fetchData={fetchData}
      />

      <EditPeopleManagement
        setEditedField={setEditedField}
        setShowModalEdit={setShowModalEdit}
        editedField={editedField}
        showModalEdit={showModalEdit}
        fetchData={fetchData}
      />
      {/* <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Document</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            First Question and Answer
            <div className="mb-3">
              <label>1st Person Name </label>
              <input
                type="text"
                value={formData.questions[0]}
                onChange={(e) => handleQuestionChange(0, e)}
              />
            </div>
            <div className="mb-3">
              <label>Description 1</label>
              <input
                type="text"
                value={formData.answers[0]}
                onChange={(e) => handleAnswerChange(0, e)}
              />
            </div>
          </div>

          <div>
            Second Question and Answer
            <div className="mb-3">
              <label>2st Person Name </label>
              <input
                type="text"
                value={formData.questions[1]}
                onChange={(e) => handleQuestionChange(1, e)}
              />
            </div>
            <div className="mb-3">
              <label>Description 2</label>
              <input
                type="text"
                value={formData.answers[1]}
                onChange={(e) => handleAnswerChange(1, e)}
              />
            </div>
          </div>
          <div>
            <label>Upload File</label>
            Other form fields go here
            <input type="file" accept=".pdf" onChange={handleFileUpload} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={saveFormData}>
            Create
          </Button>
        </Modal.Footer>
      </Modal> */}
    </div>
  );
}

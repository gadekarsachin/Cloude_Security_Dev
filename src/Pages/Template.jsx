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
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import { CiEdit } from "react-icons/ci";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { edittemplate } from "../redux/dataSlice";
import toast from "react-hot-toast";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import {
  RiDeleteBin6Line,
  RiAddBoxFill,
  RiArrowDownSLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
} from "react-icons/ri";

import styled from "@emotion/styled";
import { blue } from "@mui/material/colors";

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
  // createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  // createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  // createData("Eclair", 262, 16.0, 24, 6.0),
  // createData("Cupcake", 305, 3.7, 67, 4.3),
  // createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function Template() {
  // State to store the API response data
  const [getTemplate, setGetTemplate] = useState([]);
  const { user } = useSelector((state) => state.clientData);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const [page, setPage] = useState({
    limit: 2,
    page: 1,
    totalPages: 1,
    totalResults: 4,
    sortby: "asc",
    searchBy: "",
  });
  //  search functionality variable
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchResultsTotal, setSearchResultsTotal] = useState(0);
  const [searchTimeout, setSearchTimeout] = useState(null);
  // pagination variable
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10); // Default value, you can change this as needed // You can adjust the number of rows per page as needed
  const limit = 10; // Items per page
  console.log(getTemplate.length);
  const [totalPages, setTotalPages] = useState(1);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const handleChangePage = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      handleChangePage(newPage);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      handleChangePage(newPage);
    }
  };
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  // ...

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

  // ...

  function checkforLimitClick() {
    const plimit = document.querySelector(".plimits");
    for (let i = 0; i < plimit?.childNodes?.length; i++) {
      plimit.childNodes[i].addEventListener("click", (e) => {
        const obj = { ...page };
        obj["limit"] = e.target.innerText;
        setPage({ ...obj });
      });
    }
  }

  var t = 1;
  useEffect(() => {
    if (t === 1) {
      checkforLimitClick();
      t = 0;
    }
  }, []);

  const handleLimitChange = (newLimit) => {
    setPage({ ...page, limit: newLimit });
    // Perform any other actions you need when the limit changes
  };
  // end pagination variable

  //
  // Simulate fetching data from API (use the actual API call in your code)
  // Inside your useEffect where you fetch data from the API
  const fetchApiData = async () => {
    try {
      console.log("Fetching data with searchQuery:", searchQuery);
      console.log("Current page:", currentPage);
      const response = await fetch(
        `http://localhost:8000/v1/template/getTemplate?page=${currentPage}&limit=${limit}&keyword=${searchQuery}`
      );
      const data = await response.json();
      console.log("API response:", data);

      if (searchQuery.length > 0) {
        console.log("Updating search results:", data["results"]);
        setSearchResults(data); // Update search results
        setSearchResultsTotal(data["totalResults"]);
      } else {
        console.log("Updating template list:", data["results"]);
        setGetTemplate(data["results"]); // Update template list
        setTotalPages(Math.ceil(data["totalResults"] / limit));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearchQueryChange = (newQuery) => {
    setSearchQuery(newQuery);
    // Reset currentPage to 1 when search query changes
    setCurrentPage(1);
  };

  useEffect(() => {
    const fetchApiData = async () => {
      try {
        console.log("Fetching data with searchQuery:", searchQuery);
        console.log("Current page:", currentPage);
        const response = await fetch(
          `http://localhost:8000/v1/template/getTemplate?page=${currentPage}&limit=${limit}&keyword=${searchQuery}`
        );
        console.log("API request made.");
        const data = await response.json();
        console.log("API response:", data);

        if (searchQuery.length > 0) {
          console.log("Updating search results:", data["results"]);
          setSearchResults(data); // Update search results
          setSearchResultsTotal(data["totalResults"]);
        } else {
          console.log("Updating template list:", data["results"]);
          setGetTemplate(data["results"]); // Update template list
          setTotalPages(Math.ceil(data["totalResults"] / limit));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Clear the previous timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    // Set a new timeout to fetch data after a delay (e.g., 500ms)
    const newSearchTimeout = setTimeout(() => {
      fetchApiData();
    }, 500); // Adjust the delay time as needed

    setSearchTimeout(newSearchTimeout);

    // Cleanup: Clear the timeout when the component unmounts or when searchQuery changes
    return () => {
      clearTimeout(newSearchTimeout);
    };
  }, [currentPage, searchQuery]);
  // Only run the effect when searchQuery changes

  // useEffect(() => {
  //   fetchApiData();
  // }, [currentPage, searchQuery, searchResults]);

  //
  //
  function setEdit(data) {
    console.log("Edit button clicked for template with Data:", data);
    // Replace '/edit-template' with the actual route of your edit page
    navigate(`/edit-template`, { state: { data: data } });
  }
  const handleOpen = (row) => {
    setSelectedRow(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // Function to handle delete button click
  const handleDelete = async (id) => {
    // Replace 'http://localhost:8000' with your actual API base URL
    const response = await fetch(
      `http://localhost:8000/v1/template/deleteTemplate/${id}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      // If the delete operation was successful, fetch the updated template list
      const updatedResponse = await fetch(
        "http://localhost:8000/v1/template/getTemplate"
      );
      const updatedData = await updatedResponse.json();
      setGetTemplate(updatedData.results);

      // Display success toast message
      toast.success("Delete Template successfully", {
        position: "bottom-right",
        autoClose: 2000, // Auto close the toast after 3 seconds
      });
    } else {
      // Handle error if necessary
      console.error("Error deleting the template.");
      // Display error toast message
      toast.error("An error occurred while deleting the template.");
    }
    handleClose();
  };

  console.log("searchResults:", searchResults);
  console.log("getTemplate:", getTemplate);
  //
  return (
    <div className="app-main__inner">
      <div className="main-card mb-3 card">
        <div className="card-header">
          <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
            Template
          </div>
        </div>
        <div className="card-header d-flex justify-content-between">
          <div className="">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Search By"
              value={searchQuery}
              onChange={(e) => handleSearchQueryChange(e.target.value)}
            />
          </div>
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
        `}
          </style>
        </div>
        {/*  */}

        <div
          className="table-responsive"
          style={{
            height: "430px",
            fontFamily: "poppins",
          }}
        >
          <table className="align-middle text-truncate mb-0 table table-borderless table-hover ">
            <thead>
              <tr
                style={{
                  color: "#ffffff",
                  backgroundColor: "#3f6ad7",
                }}
              >
                <th className="text-center">Template Name</th>
                {/* <th className="text-center">
                                     Assignee
                                </th>
                                <th className="text-center">Status</th> */}
                <th className="text-center">Action</th>
              </tr>
            </thead>

            {/*  */}
            <tbody>
              {(searchQuery.length > 0 ? searchResults : getTemplate).map(
                (row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      style={{
                        textAlign: "start",
                        borderBottom: "1px solid lightgrey",
                      }}
                    >
                      {row.temp.name}
                    </TableCell>
                    <TableCell
                      align="right"
                      style={{
                        textAlign: "start",
                        borderBottom: "1px solid lightgrey",
                      }}
                    >
                      <CiEdit
                        className="text-danger mx-3"
                        size={22}
                        onClick={() => setEdit(row)}
                      />
                      <RiDeleteBin6Line
                        className="text-danger1"
                        onClick={() => handleOpen(row)}
                      />
                    </TableCell>
                  </TableRow>
                )
              )}
            </tbody>

            {/*  */}
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle style={{ color: "#3F6AD7" }}>
                Confirm Delete Template
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Are you sure you want to delete this Template?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button
                  onClick={() => handleDelete(selectedRow.id)}
                  style={{ color: "#FF0000" }}
                >
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          </table>
        </div>
      </div>
    </div>
  );
}

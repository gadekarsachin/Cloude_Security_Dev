import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import {
  RiAddBoxFill,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiArrowDownSLine,
} from "react-icons/ri";
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const Custombuttons = styled(Button)`
  border: 1px solid lightgrey;
`;

function ScanReport() {
  const { user } = useSelector((state) => state.clientData);
  const navigate = useNavigate();
  const location = useLocation();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  const [getTitle, Settitle] = useState("");
  const [gethead, Sethead] = useState([]);
  const [getData, SetData] = useState([]);
  const [gettoggle, settoggle] = useState(true);
  const [fieldsArray, setFieldsArray] = useState([]);
  const selectedOption = "someValue"; // Declare and initialize selectedOption

  const [page, setPage] = useState({
    limit: 10,
    page: 1,
    totalPages: 1,
    totalResults: 4,
    sortby: "asc",
    searchBy: "",
  });

  const dataToSend = {
    id: "64f8509607e7a348bcbfc0f2",
    menuname: "integrationdata",
  };
  const pathSubMenu = "/inventory";

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10; // Items per page

  //function fetchData() {
  useEffect(() => {
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
    const requestOptions1 = {
      method: "GET",
      redirect: "follow",
      headers: {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzgxMDgyNTQyYTM4NWE4MWYyMDY1ZDEiLCJpYXQiOjE2OTc2MzI4NjIsImV4cCI6MTcwMDIyNDg2MiwidHlwZSI6InJlZnJlc2gifQ.vx47iCNK8MqLjLgyXEtnC9bpO2VnGQyy96quA2jChos",
      },
    };
    fetch(
      `http://localhost:8000/v1/collection/discoveryscandata?page=${currentPage}&limit=100`,
      requestOptions1
    )
      .then((response1) => response1.text())
      .then((result1) => {
        const parsedResult1 = JSON.parse(result1);
        // console.log("result1", result1);
        console.log("result1", parsedResult1.data);
        console.log("result1", parsedResult1.data.length);

        setTotalPages(parsedResult1.totalPages);
        // const MainData = parsedResult1[0].fields;
        SetData(generateOutputData(parsedResult1.data));
        console.log("MainData", generateOutputData(parsedResult1.data));
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => console.log("error", error));
  }, [currentPage]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

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

  const handleDelete = () => {
    // Perform the delete action and update the data in your database.
    // Make a DELETE request to your API endpoint and then update the state.
    setShowModal(false);

    if (deleteItemId !== null) {
      fetch(`YOUR_DELETE_API_ENDPOINT/${deleteItemId}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then(() => {
          const updatedData = data.filter((item) => item.id !== deleteItemId);
          setData(updatedData);
        })
        .catch((error) => {
          console.error("Error deleting data:", error);
        });
    }
  };

  // useEffect (( ) => {
  //   generateOutputData(getData)
  // }, [getData]
  // )

  function generateOutputData(datas) {
    console.log("mmmmm", data);
    const output = [];
    datas.forEach((data) => {
      // For cloudcontrol_data
      for (const region in data.cloudcontrol_data?.regions) {
        for (const category in data.cloudcontrol_data.regions[region]) {
          output.push({
            Region: region,
            "Resource Categories": category,
            "Resource ID": null,
          });
        }
      }

      // For boto3_data -> regions
      for (const region in data.boto3_data?.regions) {
        for (const category in data.boto3_data.regions[region]) {
          output.push({
            Region: region,
            "Resource Categories": category,
            "Resource ID": null,
          });
        }
      }

      // For boto3_data -> Global
      for (const category in data.boto3_data?.Global) {
        if (category === "AWS::IAM::ManagedPolicies") {
          for (const resource of data.boto3_data.Global[category]) {
            output.push({
              Region: "Global",
              "Resource Categories": category,
              "Resource ID": resource.PolicyName,
            });
          }
        } else {
          output.push({
            Region: "Global",
            "Resource Categories": category,
            "Resource ID": null,
          });
        }
      }
    });
    console.log("output", output);
    return output;
  }

  return (
    <div className="app-main__inner">
      <div className="main-card mb-3 card">
        <div className="card-header">
          <div className="card-header-title font-size-lg text-none font-weight-normal">
            {"List of assets"}
          </div>
          <div className="btn-actions-pane-right">
            <button
              className="btn btn-outline-primary d-flex justify-content-center align-items-sm-center text-capitalize"
              onClick={() => {
                navigate("/submenuCreate", {
                  state: {
                    fieldsArray: fieldsArray,
                    dataToSend: dataToSend,
                    pathSubMenu: pathSubMenu,
                  },
                });
              }}
              data-toggle="modal"
              data-target="#exampleModalLong"
            >
              <RiAddBoxFill size={25} className="mx-2" />
              {"Create New Scan"}
            </button>
          </div>
        </div>
        <div className="card-header d-flex justify-content-between">
          <div className="">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Search By"
              //onChange={(e) => searchColletion(e.target.value)}
            />
          </div>
          <div>
            {/* <CustomDropdown /> */}
            <Custombuttons variant="detailed">Reset</Custombuttons>
            <Custombuttons variant="detailed" style={{ marginLeft: 20 }}>
              Export
            </Custombuttons>
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
              font-size: 15px;
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
        <div className="table-responsive">
          {loading ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "100%" }}
            >
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <div className="ml-2">Loading...</div>
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
                  <th className="text-center">Region</th>
                  <th className="text-center">Resource Category</th>
                  <th className="text-center">Resource Id</th>
                  {/* Add other table headers here as needed */}
                </tr>
              </thead>
              {console.log("getData", getData)}
              <TableBody>
                {getData?.map((item, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{item.Region}</TableCell>
                    <TableCell>{item["Resource Categories"]}</TableCell>
                    <TableCell>{item["Resource ID"]}</TableCell>
                    {/* ... Other table data fields ... */}
                  </TableRow>
                ))}
              </TableBody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
export default ScanReport;

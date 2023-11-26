import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { RiAddBoxFill, RiCheckboxFill, RiSave2Fill } from "react-icons/ri";

import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { CiEdit } from "react-icons/ci";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function AuditEvidencePage() {
  const [state, setState] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [auditData, setAuditData] = useState(null);
  const [standard, setStandard] = useState([]);
  const [selectedAuditStandard, setSelectedAuditStandard] = useState("");
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null); // Define or import 'user' state
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false); // Define or import 'loading' state
  const [page, setPage] = useState([]);
  const [gethead, Sethead] = useState([]);
  const [getData, SetData] = useState([]);
  const [fieldsArray, setFieldsArray] = useState([]);
  const navigate = useNavigate();
  const [expandedRequirement, setExpandedRequirement] = useState({});
  const [expandedSectionDescription, setExpandedSectionDescription] = useState(
    {}
  );
  const [expandedControlDescription, setExpandedControlDescription] = useState(
    {}
  );
  const [expandedRequirementTitle, setExpandedRequirementTitle] = useState({});
  const [expandedRequirementDescription, setExpandedRequirementDescription] =
    useState({});

  const handleToggleRequirement = (index) => {
    setExpandedRequirement((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const handleToggleSectionDescription = (index) => {
    setExpandedSectionDescription((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const handleToggleControlDescription = (index) => {
    setExpandedControlDescription((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const handleToggleRequirementTitle = (index) => {
    setExpandedRequirementTitle((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const handleToggleRequirementDescription = (index) => {
    setExpandedRequirementDescription((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const location = useLocation();
  const { selectedAuditId } = location.state || {};
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [evidence, setEvidence] = useState("");
  const [apiResponse, setApiResponse] = useState(null);
  const [controlIds, setControlIds] = useState([]);
  //
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

  const dataToSend =
    { id: "64f858b107e7a348bcbfc13b", menuname: "evidencetaskdata" } || {};
  const pathSubMenu = "/evidence";
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
      } else {
        console.log("Refresh token not found in the data.");
      }
    } else {
      console.log("Data not found in localStorage.");
    }
  }, []);

  useEffect(() => {
    if (refreshToken) {
      fetchData(refreshToken);
    }
  }, [refreshToken]);

  console.log(`AuditEvidence011 = ${selectedAuditId}`);

  const handleCheckboxChange = (e, controlId, _id) => {
    const isChecked = e.target.checked;

    // Check if the checkbox is checked or unchecked and update the state accordingly
    if (isChecked) {
      setSelectedCheckboxes((prevSelected) => [
        ...prevSelected,
        { controlId, _id },
      ]);
    } else {
      setSelectedCheckboxes((prevSelected) =>
        prevSelected.filter((item) => item.controlId !== controlId)
      );
    }
  };

  const handleTextareaChange = (event) => {
    setEvidence(event.target.value);
  };

  // Fetch the latest "TaskId" from the server, you can replace the URL with your actual API endpoint.
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the form from submitting
    const numberOfTasks = 1; // Change this to the desired number of tasks

    try {
      setLoading(true);
      await createMultipleTasks(numberOfTasks); // Call the function to create tasks
      setLoading(false);
    } catch (error) {
      console.error("An error occurred while creating tasks:", error);
      setLoading(false);
    }
  };
  const createMultipleTasks = async (numberOfTasks) => {
    for (let i = 0; i < numberOfTasks; i++) {
      try {
        const latestTaskIdResponse = await fetch(
          "http://localhost:8000/v1/collection/evidencetaskdata",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!latestTaskIdResponse.ok) {
          console.error('Failed to fetch the latest "TaskId."');
          return;
        }
        // Assuming the response contains the latest "TaskId" as a number.
        const latestTaskId = parseFloat(await latestTaskIdResponse.text());

        // Increase the latest "TaskId" by 0.1.
        const newTaskId = (latestTaskId + i * 0.1).toFixed(1);
        //
        const data = {
          TaskId: newTaskId.toString(),
          AuditId: selectedAuditId,
          TaskRequirements:
            selectedCheckboxes.map((item) => item.controlId).join("\n") +
            "\n" +
            evidence,
          TaskAssignee: "Not Assigned",
          TaskStatus: "Default",
          TaskCreatedOn: "",
          TaskCreatedBy: "",
          TaskCompletedOn: "",
          TaskCompletedBy: "",
        };
        const response = await fetch(
          "http://localhost:8000/v1/collection/evidencetaskdata",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );

        if (response.ok) {
          // Handle success, e.g., reset form fields or show a success message
          setSelectedCheckboxes([]);
          setEvidence("");
          console.log("Task created successfully!");

          // Assuming the response contains the created task data, you can access it like this:
          const responseData = await response.json();
          console.log("Response Data:", responseData);
          //window.location.href = `/v1/collection/evidencetaskdata?page=1&limit=10&taskData=${responseData.taskData}`;
        } else {
          // Handle errors, e.g., show an error message
          console.error("Failed to create the task.");
        }
      } catch (error) {
        console.error("An error occurred while sending the request:", error);
      }
    }
  };
  function setEdit(data) {
    console.log("Edit button clicked for template with Data:", data);
    // Replace '/edit-template' with the actual route of your edit page
    navigate("/submenuCreate", {
      state: {
        data: data,
        fieldsArray: fieldsArray,
        dataToSend: dataToSend,
        pathSubMenu: pathSubMenu,
      },
    });
  }

  const fetchData = async () => {
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${refreshToken}`);

    const requestOptions1 = {
      method: "GET",
      headers: headers,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "http://localhost:8000/v1/collection/auditdata?page=1&limit=10",
        requestOptions1
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json(); // Assuming the response is in JSON format

      // Filter the data to include only items with auditId equal to selectedAuditId
      const filteredData = data.data.filter(
        (item) => item.auditId === selectedAuditId
      );

      // Set selectedAuditStandard based on the first item's auditStandard (assuming there's at least one item)
      if (filteredData.length > 0) {
        // if (filteredData && Array.isArray(filteredData) && filteredData.length > 0) {
        setSelectedAuditStandard(filteredData[0].auditStandard);
      }

      // Update the state with the filtered data
      setAuditData(filteredData);

      return filteredData; // Return the filtered data
    } catch (error) {
      // Handle any errors that occurred during the fetch
      console.error("Fetch error:", error);
      throw error; // Re-throw the error to indicate failure
    }
  };
  useEffect(() => {
    if (refreshToken) {
      fetchData(refreshToken);
    }
  }, [refreshToken]);

  useEffect(() => {
    setLoading(true); // Set loading to true before fetching data

    fetchData()
      .then((filteredData) => {
        const headers = new Headers();
        headers.append("Authorization", `Bearer ${refreshToken}`);

        const requestOptions1 = {
          method: "GET",
          headers: headers,

          redirect: "follow",
        };
        if (selectedAuditStandard) {
          let endpoint = "";
          if (selectedAuditStandard === "PCI DSS 4.0") {
            endpoint = "pcidssv4data";
          } else if (selectedAuditStandard === "PCI DSS 3.2.1") {
            endpoint = "pcidssv321data";
          } else if (selectedAuditStandard === "ISO 27001") {
            endpoint = "iso27001data";
          }
          // Use the fetch method to make a request based on the selected audit standard
          return fetch(
            `http://localhost:8000/v1/collection/${endpoint}?page=1&limit=10`,
            requestOptions1
          )
            .then((response1) => response1.text())
            .then((data) => {
              console.log("result1", data);
              const resultData = JSON.parse(data);
              // Filter the data to include only items with auditId equal to selectedAuditId
              const secondFilteredData = resultData.data.filter(
                (item) => item.auditId === selectedAuditId
              );
              // Update the state with the second filtered data
              setStandard(resultData.data);
              console.log(`resultData ${data}`);
            });
        }
      })

      .catch((error) => {
        // Handle any errors that occurred during the fetch
        console.error("Fetch error:", error);
      })
      .finally(() => {
        setLoading(false); // Set loading back to false regardless of success or failure
      });
  }, [selectedAuditId, selectedAuditStandard, setRefreshToken]);

  //
  console.log(`asf = ${standard}`);
  console.log(`standard = ${JSON.parse(JSON.stringify(standard))}`);
  console.log(`type = ${typeof standard}`);

  //
  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <div>
        <div className="app-main__inner scoping_page_wrapper">
          <div className="main-card mb-3 card">
            <div className="card-header">
              <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
                Audit Evidence
              </div>
              <div className="btn-actions-pane-right">
                <button className="btn btn-outline-primary d-flex align-items-center">
                  <RiAddBoxFill size={25} className="mr-2 ml-0" /> Create
                  Evidence Task
                </button>
              </div>
            </div>
            <div className="card-body">
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
                <div className="table-responsive scoping_table_wrapper">
                  {selectedAuditStandard === "PCI DSS 4.0" && (
                    <table className="align-middle text-truncate mb-0 table table-borderless table-hover">
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
                          <th
                            className="text-center"
                            style={{ width: "1000px" }}
                          >
                            Req Id
                          </th>
                          <th
                            className="text-center"
                            style={{ width: "100px" }}
                          >
                            Requirement
                          </th>
                          <th className="text-center">Description</th>
                          <th className="text-center">Section Id</th>
                          <th className="text-center">Description</th>
                          <th className="text-center">Control Id</th>
                          <th className="text-center">Description</th>
                          <th className="evidence-text">Evidence</th>
                          <th className="text-center">Request More Evidence</th>
                        </tr>
                      </thead>
                      <tbody>
                        {standard.length > 0 ? (
                          standard.map((item, index) => (
                            <tr key={index} className="mytrs">
                              <TableCell>{item.RequirementID}</TableCell>

                              <TableCell
                                style={{
                                  whiteSpace: "normal",
                                  wordWrap: "break-word",
                                  width: "10%", // Set the width to 100% to fit within the 50% container
                                }}
                              >
                                {expandedRequirement[index] ? (
                                  <>
                                    {item.Requirement}{" "}
                                    <button
                                      style={{
                                        backgroundColor: "transparent", // Remove background color
                                        border: "none", // Remove border
                                        color: "#2F84EA", // Set the text color
                                      }}
                                      onClick={() =>
                                        handleToggleRequirement(index)
                                      }
                                    >
                                      Show Less
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    {item.Requirement.slice(0, 40)}{" "}
                                    {item.Requirement.length > 40 && (
                                      <button
                                        style={{
                                          backgroundColor: "transparent", // Remove background color
                                          border: "none", // Remove border
                                          color: "#2F84EA", // Set the text color
                                        }} // Change the color here
                                        onClick={() =>
                                          handleToggleRequirement(index)
                                        }
                                      >
                                        Show More
                                      </button>
                                    )}
                                  </>
                                )}
                              </TableCell>

                              <TableCell>{item.RequirementDe}</TableCell>

                              <TableCell>{item.SectionID}</TableCell>

                              <TableCell
                                style={{
                                  whiteSpace: "normal",
                                  wordWrap: "break-word",
                                  width: "50%", // Set the width to 100% to fit within the 50% container
                                }}
                              >
                                {expandedSectionDescription[index] ? (
                                  <>
                                    {item.SectionDescription}{" "}
                                    <button
                                      style={{
                                        backgroundColor: "transparent", // Remove background color
                                        border: "none", // Remove border
                                        color: "#2F84EA", // Set the text color
                                      }}
                                      onClick={() =>
                                        handleToggleSectionDescription(index)
                                      }
                                    >
                                      Show Less
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    {item.SectionDescription.slice(0, 40)}{" "}
                                    {item.SectionDescription.length > 40 && (
                                      <button
                                        style={{
                                          backgroundColor: "transparent", // Remove background color
                                          border: "none", // Remove border
                                          color: "#2F84EA", // Set the text color
                                        }} // Change the color here
                                        onClick={() =>
                                          handleToggleSectionDescription(index)
                                        }
                                      >
                                        Show More
                                      </button>
                                    )}
                                  </>
                                )}
                              </TableCell>

                              <TableCell>{item.ControlID}</TableCell>

                              <TableCell
                                style={{
                                  whiteSpace: "normal",
                                  wordWrap: "break-word",
                                  width: "50%", // Set the width to 100% to fit within the 50% container
                                }}
                              >
                                {expandedControlDescription[index] ? (
                                  <>
                                    {item.ControlDescription}{" "}
                                    <button
                                      style={{
                                        backgroundColor: "transparent", // Remove background color
                                        border: "none", // Remove border
                                        color: "#2F84EA", // Set the text color
                                      }}
                                      onClick={() =>
                                        handleToggleControlDescription(index)
                                      }
                                    >
                                      Show Less
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    {item.ControlDescription.slice(0, 40)}{" "}
                                    {item.ControlDescription.length > 40 && (
                                      <button
                                        style={{
                                          backgroundColor: "transparent", // Remove background color
                                          border: "none", // Remove border
                                          color: "#2F84EA", // Set the text color
                                        }} // Change the color here
                                        onClick={() =>
                                          handleToggleControlDescription(index)
                                        }
                                      >
                                        Show More
                                      </button>
                                    )}
                                  </>
                                )}
                              </TableCell>

                              <td>
                                <button className="btn btn-outline-primary d-flex align-items-center justify-content-center m-auto">
                                  {"Evidence"}
                                </button>
                              </td>
                              <td>
                                <div className="switch-animate switch-on">
                                  <input
                                    type="checkbox"
                                    defaultChecked={false}
                                    data-toggle="toggle"
                                    data-onstyle="success"
                                    onChange={(e) =>
                                      handleCheckboxChange(
                                        e,
                                        item.ControlID,
                                        item._id
                                      )
                                    }
                                  />
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          //
                          <div>
                            {/* <div className="no-data-message">No data available</div> */}
                          </div>
                        )}
                      </tbody>
                      <tfoot className="mt-3">
                        <tr>
                          <td colSpan={6}>
                            <button
                              onClick={handleModalOpen}
                              className="btn btn-outline-primary d-flex align-items-center justify-content-center m-auto"
                            >
                              <RiCheckboxFill size={25} className="mr-2 ml-0" />
                              Next
                            </button>
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  )}
                  {/*  */}
                  {selectedAuditStandard === "PCI DSS 3.2.1" && (
                    <table className="align-middle text-truncate mb-0 table table-borderless table-hover">
                      <thead>
                        <tr
                          style={{
                            color: "#ffffff",
                            backgroundColor: "#3f6ad7",
                          }}
                        >
                          <th
                            className="text-center"
                            style={{ width: "1000px" }}
                          >
                            Req Id
                          </th>
                          <th
                            className="text-center"
                            style={{ width: "100px" }}
                          >
                            Requirement
                          </th>
                          <th className="text-center">Description</th>
                          <th className="text-center">Control Id</th>
                          <th className="text-center">Description</th>
                          <th className="evidence-text">Evidence</th>
                          <th className="text-center">Request More Evidence</th>
                        </tr>
                      </thead>
                      <tbody>
                        {standard.length > 0 ? (
                          standard.map((item, index) => (
                            <tr key={index} className="mytrs">
                              <TableCell>{item.RequirementID}</TableCell>

                              <TableCell
                                style={{
                                  whiteSpace: "normal",
                                  wordWrap: "break-word",
                                  width: "10%", // Set the width to 100% to fit within the 50% container
                                }}
                              >
                                {expandedRequirementTitle[index] ? (
                                  <>
                                    {item.RequirementTitle}{" "}
                                    <button
                                      style={{
                                        backgroundColor: "transparent", // Remove background color
                                        border: "none", // Remove border
                                        color: "#2F84EA", // Set the text color
                                      }}
                                      onClick={() =>
                                        handleToggleRequirementTitle(index)
                                      }
                                    >
                                      Show Less
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    {item.RequirementTitle.slice(0, 40)}{" "}
                                    {item.RequirementTitle.length > 40 && (
                                      <button
                                        style={{
                                          backgroundColor: "transparent", // Remove background color
                                          border: "none", // Remove border
                                          color: "#2F84EA", // Set the text color
                                        }} // Change the color here
                                        onClick={() =>
                                          handleToggleRequirementTitle(index)
                                        }
                                      >
                                        Show More
                                      </button>
                                    )}
                                  </>
                                )}
                              </TableCell>

                              <TableCell
                                style={{
                                  whiteSpace: "normal",
                                  wordWrap: "break-word",
                                  width: "50%", // Set the width to 100% to fit within the 50% container
                                }}
                              >
                                {expandedRequirementDescription[index] ? (
                                  <>
                                    {item.RequirementDescription}{" "}
                                    <button
                                      style={{
                                        backgroundColor: "transparent", // Remove background color
                                        border: "none", // Remove border
                                        color: "#2F84EA", // Set the text color
                                      }}
                                      onClick={() =>
                                        handleToggleRequirementDescription(
                                          index
                                        )
                                      }
                                    >
                                      Show Less
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    {item.RequirementDescription.slice(0, 40)}{" "}
                                    {item.RequirementDescription.length >
                                      40 && (
                                      <button
                                        style={{
                                          backgroundColor: "transparent", // Remove background color
                                          border: "none", // Remove border
                                          color: "#2F84EA", // Set the text color
                                        }} // Change the color here
                                        onClick={() =>
                                          handleToggleRequirementDescription(
                                            index
                                          )
                                        }
                                      >
                                        Show More
                                      </button>
                                    )}
                                  </>
                                )}
                              </TableCell>

                              <TableCell>{item.ControlID}</TableCell>

                              <TableCell
                                style={{
                                  whiteSpace: "normal",
                                  wordWrap: "break-word",
                                  width: "50%", // Set the width to 100% to fit within the 50% container
                                }}
                              >
                                {expandedControlDescription[index] ? (
                                  <>
                                    {item.ControlDescription}{" "}
                                    <button
                                      style={{
                                        backgroundColor: "transparent", // Remove background color
                                        border: "none", // Remove border
                                        color: "#2F84EA", // Set the text color
                                      }}
                                      onClick={() =>
                                        handleToggleControlDescription(index)
                                      }
                                    >
                                      Show Less
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    {item.ControlDescription.slice(0, 40)}{" "}
                                    {item.ControlDescription.length > 40 && (
                                      <button
                                        style={{
                                          backgroundColor: "transparent", // Remove background color
                                          border: "none", // Remove border
                                          color: "#2F84EA", // Set the text color
                                        }} // Change the color here
                                        onClick={() =>
                                          handleToggleControlDescription(index)
                                        }
                                      >
                                        Show More
                                      </button>
                                    )}
                                  </>
                                )}
                              </TableCell>

                              <td>
                                <button className="btn btn-outline-primary d-flex align-items-center justify-content-center m-auto">
                                  {"Evidence"}
                                </button>
                              </td>
                              <td>
                                <div className="switch-animate switch-on">
                                  <input
                                    type="checkbox"
                                    defaultChecked={false}
                                    data-toggle="toggle"
                                    data-onstyle="success"
                                    onChange={(e) =>
                                      handleCheckboxChange(
                                        e,
                                        item.ControlID,
                                        item._id
                                      )
                                    }
                                  />
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          //
                          <div></div>
                        )}
                      </tbody>
                      <tfoot className="mt-3">
                        <tr>
                          <td colSpan={6}>
                            <button
                              onClick={handleModalOpen}
                              className="btn btn-outline-primary d-flex align-items-center justify-content-center m-auto"
                            >
                              <RiCheckboxFill size={25} className="mr-2 ml-0" />
                              Next
                            </button>
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Modal
        className="create_modal_wrapper"
        show={showModal}
        onHide={handleModalClose}
      >
        <Modal.Header>
          <Modal.Title className="text-danger">
            Create evidence task
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div>
              <div className="form-group">
                <label>Selected Control IDs</label>
                {/* Display selected Control IDs in the modal */}
                {selectedCheckboxes.map((item) => (
                  <div key={item.controlId}>{item.controlId}</div>
                ))}
              </div>
              <div className="form-group">
                <label>What evidence is needed</label>
                <textarea
                  rows={3}
                  className="form-control form-control-sm"
                  placeholder="Enter evidence is needed"
                  value={evidence}
                  onChange={handleTextareaChange}
                ></textarea>
              </div>

              <div className="form-group">
                <button className="btn btn-outline-primary d-flex align-items-center justify-content-center m-auto">
                  <RiSave2Fill size={25} className="mr-2 ml-0" /> Submit
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

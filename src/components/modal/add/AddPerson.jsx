import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Button } from "@mui/material";

function AddPerson({ showModal, setShowModal, fetchData }) {
  const [formData, setFormData] = useState({
    empId: "",
    empStatus: "",
    empDepartment: "",
    empDesignation: "",

    trainingCompletionStatus: "",
    trainingAssignedOn: "",
    trainingCompletedOn: "",
  });

  const [finalData, setFinalData] = useState({
    empId: "",
    empStatus: "",
    empDepartment: "",
    empDesignation: "",

    trainingCompletionStatus: [""],
    trainingAssignedOn: [""],
    trainingCompletedOn: [""],
  });

  useEffect(() => {
    setFinalData({
      empId: formData.empId,
      empStatus: formData.empStatus,
      empDepartment: formData.empDepartment,
      empDesignation: formData.empDesignation,

      trainingCompletionStatus: [formData.trainingCompletionStatus],
      trainingAssignedOn: [formData.trainingAssignedOn],
      trainingCompletedOn: [formData.trainingCompletedOn],
    });
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzgxMDgyNTQyYTM4NWE4MWYyMDY1ZDEiLCJpYXQiOjE2OTc2MzI4NjIsImV4cCI6MTcwMDIyNDg2MiwidHlwZSI6InJlZnJlc2gifQ.vx47iCNK8MqLjLgyXEtnC9bpO2VnGQyy96quA2jChos",
      },
      body: JSON.stringify(finalData), // Serialize the form data
    };
    fetch("http://localhost:8000/v1/collection/peopledata", requestOptions) // Replace with your backend API endpoint
      .then((response) => response.text())
      .then((data) => {
        // if (data.code === 200) {
        setShowModal(false);
        fetchData();
        // } else {
        // }
      })
      .catch((error) => console.log("error", error));

    setShowModal(false);
  };
  return (
    <div>
      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-danger" style={{ fontSize: "1.1rem" }}>
            ADD NEW
          </Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ fontWeight: "bold" }}>
          <div className="app-main__inner">
            <div className="row">
              <div>
                <form onSubmit={handleSubmit}>
                  <div>
                    <label>Employee ID</label>
                    <input
                      type="number"
                      name="empId"
                      value={formData.empId}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "10px",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        fontSize: "16px",
                      }}
                    />
                  </div>
                  <div>
                    <label>Employee Status</label>
                    <input
                      type="text"
                      name="empStatus"
                      value={formData.empStatus}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "10px",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        fontSize: "16px",
                      }}
                    />
                  </div>
                  <div>
                    <label>Employee Department</label>
                    <input
                      type="text"
                      name="empDepartment"
                      value={formData.empDepartment}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "10px",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        fontSize: "16px",
                      }}
                    />
                  </div>
                  <div>
                    <label>Employee Designation</label>
                    <input
                      type="text"
                      name="empDesignation"
                      value={formData.empDesignation}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "10px",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        fontSize: "16px",
                      }}
                    />
                  </div>
                  <div>
                    <label>Training Completion Status</label>
                    <input
                      type="text"
                      name="trainingCompletionStatus"
                      value={formData.trainingCompletionStatus}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "10px",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        fontSize: "16px",
                      }}
                    />
                  </div>
                  <div>
                    <label>Start Date</label>
                    <input
                      type="date"
                      name="trainingAssignedOn"
                      value={formData.trainingAssignedOn}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "10px",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        fontSize: "16px",
                      }}
                    />
                  </div>
                  <div>
                    <label>Completion Date</label>
                    <input
                      type="date"
                      name="trainingCompletedOn"
                      value={formData.trainingCompletedOn}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "10px",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        fontSize: "16px",
                      }}
                    />
                  </div>
                  <Button type="submit" variant="contained">
                    Submit
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            style={{ fontWeight: "bold" }}
            onClick={() => {
              setShowModal(false);
            }}
          >
            Cancel
          </Button>
          {/* <Button
            variant="danger"
            style={{ fontWeight: "bold" }}
            onClick={() => {
              // handleSubmit();
              console.log("Data Stored in the backend", formData);
            }}
          >
            Submit
          </Button> */}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddPerson;

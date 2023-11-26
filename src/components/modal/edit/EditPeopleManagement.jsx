import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Button } from "@mui/material";

function EditPeopleManagement({
  setEditedField,
  setShowModalEdit,
  editedField,
  showModalEdit,
  fetchData,
}) {
  const [finalData, setFinalData] = useState();
  //   console.log("edirs", editedField);
  //   console.log("final", finalData);

  const updateData = async () => {
    try {
      const requestOptions = {
        method: "PUT", // Use PUT or POST, depending on your API
        headers: {
          "Content-Type": "application/json",
          authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzgxMDgyNTQyYTM4NWE4MWYyMDY1ZDEiLCJpYXQiOjE2OTc2MzI4NjIsImV4cCI6MTcwMDIyNDg2MiwidHlwZSI6InJlZnJlc2gifQ.vx47iCNK8MqLjLgyXEtnC9bpO2VnGQyy96quA2jChos",
        },
        body: JSON.stringify(finalData),
      };
      console.log("body", JSON.stringify(finalData)); // Send the edited data

      const response = await fetch(
        `http://localhost:8000/v1/collection/peopledata/${editedField._id}`,
        requestOptions
      );
      console.log("response", response);

      if (response) {
        fetchData(); // Refresh data
        setShowModalEdit(false); // Close the modal
      } else {
        console.log("errorrr while editing fetch");
      }
    } catch (error) {
      console.log("errorrr while editing fetch");
    }
  };
  const handleCloseModal = () => {
    setShowModalEdit(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateData();
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    setEditedField((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  useEffect(() => {
    setFinalData({
      empId: editedField.empId,

      empStatus: editedField.empStatus,
      empDepartment: editedField.empDepartment,
      empDesignation: editedField.empDesignation,

      trainingCompletionStatus: editedField.trainingCompletionStatus,
      trainingAssignedOn: editedField.trainingAssignedOn,
      trainingCompletedOn: editedField.trainingCompletedOn,
    });
  }, [editedField]);

  return (
    <Modal show={showModalEdit} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title className="text-danger" style={{ fontSize: "1.1rem" }}>
          Edit Data
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
                    type="text"
                    name="empId"
                    value={editedField.empId}
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
                    value={editedField.empStatus}
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
                    value={editedField.empDepartment}
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
                    value={editedField.empDesignation}
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
                    value={editedField.trainingCompletionStatus}
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
                    value={editedField.trainingAssignedOn}
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
                    value={editedField.trainingCompletedOn}
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
            setShowModalEdit(false);
          }}
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditPeopleManagement;

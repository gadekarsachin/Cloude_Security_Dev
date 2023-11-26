import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Button } from "@mui/material";

function EditPolicy({
  showModalEdit,
  setShowModalEdit,
  editData,
  setEditData,
  fetchData,
}) {
  const [finalData, setFinalData] = useState();

  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    // Handle the uploaded file here
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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
        `http://localhost:8000/v1/collection/documentdata/${editData._id}`,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateData();
  };

  useEffect(() => {
    setFinalData({
      docTitle: editData.docTitle,
      assignee: editData.assignee,
      status: editData.status,
    });
  }, [editData]);
  return (
    <div>
      <Modal
        show={showModalEdit}
        onHide={() => {
          setShowModalEdit(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-danger" style={{ fontSize: "1.1rem" }}>
            Create New
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontWeight: "bold" }}>
          <div className="app-main__inner">
            <div className="row">
              <div>
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="docTitle"
                    placeholder="Title"
                    style={{
                      width: "100%",
                      padding: "10px",
                      marginBottom: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      fontSize: "16px",
                    }}
                    value={editData.docTitle}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="assignee"
                    placeholder="assignee"
                    style={{
                      width: "100%",
                      padding: "10px",
                      marginBottom: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      fontSize: "16px",
                    }}
                    value={editData.assignee}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="status"
                    placeholder="status"
                    style={{
                      width: "100%",
                      padding: "10px",
                      marginBottom: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      fontSize: "16px",
                    }}
                    value={editData.status}
                    onChange={handleChange}
                  />
                  <div>
                    <label>Upload File</label>
                    {/* Other form fields go here */}
                    <input
                      type="file"
                      accept=".pdf"
                      style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "10px",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        fontSize: "16px",
                      }}
                      onChange={handleFileUpload}
                    />
                  </div>

                  <button
                    type="submit"
                    style={{
                      background: "#007BFF",
                      color: "#fff",
                      padding: "10px 20px",
                      border: "none",
                      borderRadius: "5px",
                      fontSize: "16px",
                      cursor: "pointer",
                    }}
                  >
                    Submit
                  </button>
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
          <Button
            variant="primary"
            onClick={() => {
              console.log("yes");
            }}
          >
            Create New
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditPolicy;

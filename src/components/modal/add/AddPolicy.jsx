import React from "react";
import { Modal } from "react-bootstrap";
import { Button } from "@mui/material";

function AddPolicy({
  showModal,
  setShowModal,
  fetchData,
  formData,
  setFormData,
}) {
  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    // Handle the uploaded file here
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can access the form data from the 'formData' state
    console.log("Form Data:", formData);

    // Make a POST request to store the data in the backend
    const requestOptions = {
      method: "POST", // Use the appropriate HTTP method (POST in this case)
      headers: {
        "Content-Type": "application/json",

        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzgxMDgyNTQyYTM4NWE4MWYyMDY1ZDEiLCJpYXQiOjE2OTc2MzI4NjIsImV4cCI6MTcwMDIyNDg2MiwidHlwZSI6InJlZnJlc2gifQ.vx47iCNK8MqLjLgyXEtnC9bpO2VnGQyy96quA2jChos",
      },
      body: JSON.stringify(formData), // Serialize the form data
    };

    fetch("http://localhost:8000/v1/collection/documentdata", requestOptions) // Replace with your backend API endpoint
      .then((response) => response.text())
      .then((data) => {
        // console.log(data);
        // You can add logic here to handle the response from the backend

        // if (data.code === 200) {
        // console.log("Data saved successfully:", data);
        setShowModal(false);
        fetchData();
        // console.log("FetchData Called");
        // } else {
        // Handle errors or display a message to the user
        // console.error("Error while saving data:", data, data.message);
        // You can display an error message to the user if needed
        // }
      })
      .catch((error) => console.log("error", error));

    // Close the modal after submission
    setShowModal(false);
  };

  return (
    <div>
      <Modal show={showModal} onHide={handleModalClose}>
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
                    value={formData.docTitle}
                    onChange={handleInputChange}
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
                    value={formData.assignee}
                    onChange={handleInputChange}
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
                    value={formData.status}
                    onChange={handleInputChange}
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
            onClick={handleModalClose}
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

export default AddPolicy;

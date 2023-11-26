import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Button } from "@mui/material";

function AddVendor({ showModal, setShowModal, fetchData }) {
  const [formData, setFormData] = useState({
    vendorLegalName: "",
    vendorType: "",
    vendorStatus: "",
    vendorComplianceStatus: "",

    questionnaireResponse: "",
  });
  const [finalData, setFinalData] = useState({
    vendorLegalName: "",
    vendorType: "",
    vendorStatus: "",
    vendorComplianceStatus: "",
    questionnaire: {
      questionnaireResponse: [],
    },
  });
  useEffect(() => {
    setFinalData({
      vendorLegalName: formData.vendorLegalName,
      vendorType: formData.vendorType,
      vendorStatus: formData.vendorStatus,
      vendorComplianceStatus: formData.vendorComplianceStatus,
      questionnaire: {
        questionnaireResponse: [formData.questionnaireResponse],
      },
    });
  }, [formData]);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzgxMDgyNTQyYTM4NWE4MWYyMDY1ZDEiLCJpYXQiOjE2OTc2MzI4NjIsImV4cCI6MTcwMDIyNDg2MiwidHlwZSI6InJlZnJlc2gifQ.vx47iCNK8MqLjLgyXEtnC9bpO2VnGQyy96quA2jChos",
      },
      body: JSON.stringify(finalData), // Serialize the form data
    };

    fetch("http://localhost:8000/v1/collection/vendordata", requestOptions) // Replace with your backend API endpoint
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
                  <input
                    type="text"
                    name="vendorLegalName"
                    placeholder="Name"
                    style={{
                      width: "100%",
                      padding: "10px",
                      marginBottom: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      fontSize: "16px",
                    }}
                    value={formData.vendorLegalName}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    name="vendorType"
                    placeholder="Type"
                    style={{
                      width: "100%",
                      padding: "10px",
                      marginBottom: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      fontSize: "16px",
                    }}
                    value={formData.vendorType}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    name="vendorStatus"
                    placeholder="Status"
                    style={{
                      width: "100%",
                      padding: "10px",
                      marginBottom: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      fontSize: "16px",
                    }}
                    value={formData.vendorStatus}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    name="vendorComplianceStatus"
                    placeholder="Compliance Status"
                    style={{
                      width: "100%",
                      padding: "10px",
                      marginBottom: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      fontSize: "16px",
                    }}
                    value={formData.vendorComplianceStatus}
                    onChange={handleInputChange}
                  />

                  <input
                    type="text"
                    name="questionnaireResponse"
                    placeholder="Risk"
                    style={{
                      width: "100%",
                      padding: "10px",
                      marginBottom: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      fontSize: "16px",
                    }}
                    value={formData.questionnaireResponse}
                    onChange={(e) => handleInputChange(e)}
                  />

                  <Button type="submit">Submit</Button>
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

export default AddVendor;

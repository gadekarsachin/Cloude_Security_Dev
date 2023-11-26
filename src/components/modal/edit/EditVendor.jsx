import React, { useState, useEffect } from "react";

import { Modal } from "react-bootstrap";
import { Button } from "@mui/material";

function EditVendor({
  showModalVEdit,
  setShowModalVEdit,
  fetchData,
  editDataV,
  setEditDataV,
}) {
  const [finalData, setFinalData] = useState();

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
        `http://localhost:8000/v1/collection/vendordata/${editDataV._id}`,
        requestOptions
      );
      console.log("response", response);

      if (response) {
        fetchData(); // Refresh data
        setShowModalVEdit(false); // Close the modal
      } else {
        console.log("errorrr while editing fetch");
      }
    } catch (error) {
      console.log("errorrr while editing fetch");
    }
  };

  useEffect(() => {
    setFinalData({
      vendorLegalName: editDataV.vendorLegalName,
      vendorType: editDataV.vendorType,
      vendorStatus: editDataV.vendorStatus,
      vendorComplianceStatus: editDataV.vendorComplianceStatus,
      questionnaire: {
        questionnaireResponse: [editDataV.questionnaireResponse],
      },
    });
  }, [editDataV]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setEditDataV((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateData();
  };
  return (
    <div>
      <div>
        <Modal
          show={showModalVEdit}
          onHide={() => {
            setShowModalVEdit(false);
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
                      value={editDataV.vendorLegalName}
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
                      value={editDataV.vendorType}
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
                      value={editDataV.vendorStatus}
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
                      value={editDataV.vendorComplianceStatus}
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
                      value={editDataV.questionnaireResponse}
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
                setShowModalVEdit(false);
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
    </div>
  );
}

export default EditVendor;

import React, { useState } from "react";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AWS from "../assets/images/AWS-logo.jpg";
import Azure from "../assets/images/Azure-Logo-PNG.png";
import GCP from "../assets/images/GCP-Logo.png";

function Configure({
  setStep,
  selectedProvider,
  setFormDataAWS,
  formDataAWS,
  scope,
  formDataAzure,
  setFormDataAzure,
  formDataGCP,
  setFormDataGCP,
  uploadedJson,
  setUploadedJson,
}) {
  const navigate = useNavigate();

  const titleStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "20px",
  };

  const logoStyle = {
    width: "80px",
    height: "auto",
    borderRadius: "20px",
    marginBottom: "10px",
    marginRight: "10px",
  };

  const headingStyle = {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "20px",
  };

  const sectionStyle = {
    marginBottom: "20px",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    marginBottom: "20px",
  };

  const buttonStyle = {
    marginRight: "1rem",
  };
  const inputFileStyle = {
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  };

  const uploadedJsonContainerStyle = {
    marginTop: "10px",
  };

  const listStyle = {
    listStyleType: "disc",
    paddingLeft: "20px",
  };

  const listItemStyle = {
    marginBottom: "5px",
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormDataAWS({
      ...formDataAWS,
      [name]: value,
    });
  };
  const handleInputChangeAzure = (e) => {
    const { name, value } = e.target;
    setFormDataAzure({
      ...formDataAzure,
      [name]: value,
    });
  };
  const handleInputChangeGCP = (e) => {
    const { name, value } = e.target;
    setFormDataGCP({
      ...formDataGCP,
      [name]: value,
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target.result;
        setUploadedJson(JSON.parse(content));
      };
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <div style={titleStyle}>
        <img
          src={
            selectedProvider === "AWS"
              ? AWS
              : selectedProvider === "Azure"
              ? Azure
              : selectedProvider === "GCP"
              ? GCP
              : ""
          }
          alt="Logo"
          style={logoStyle}
        />
        <Typography style={headingStyle}>Configure Account</Typography>
      </div>

      {selectedProvider === "AWS" ? (
        <>
          <div>
            <div style={sectionStyle}>
              <Typography variant="h5">{scope} Details</Typography>
              <Typography
                style={{
                  margin: "10px 0",
                }}
              >
                Add the necessary details for Prisma Cloud to apply permissions
                for capabilities and create a stack.
              </Typography>
              <input
                type="text"
                style={inputStyle}
                name="accID"
                placeholder="Account ID"
                value={formDataAWS.accID}
                onChange={handleInputChange}
              />
              <input
                type="text"
                style={inputStyle}
                name="accname"
                placeholder="Account Name"
                value={formDataAWS.accname}
                onChange={handleInputChange}
              />
            </div>
            <div style={sectionStyle}>
              <Typography variant="h6">Apply Permissions for Cloud</Typography>
              <Button
                variant="contained"
                style={buttonStyle}
                onClick={() => {
                  // Add your logic for creating an IAM role here
                }}
              >
                Create IAM Role
              </Button>
              <Button
                variant="contained"
                style={buttonStyle}
                onClick={() => {
                  // Add your logic for downloading an IAM role CFT here
                }}
              >
                Download IAM Role CFT
              </Button>
            </div>
            <input
              type="text"
              style={inputStyle}
              name="role"
              placeholder="IAM Role ARN"
              value={formDataAWS.role}
              onChange={handleInputChange}
            />
          </div>
        </>
      ) : selectedProvider === "Azure" ? (
        <>
          <div>
            <div style={sectionStyle}>
              <Typography variant="h5">{scope} Details</Typography>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gridGap: "10px",
                }}
              >
                <input
                  type="text"
                  style={inputStyle}
                  name="tenantID"
                  placeholder="Tenant ID"
                  value={formDataAzure.tenantID}
                  onChange={handleInputChangeAzure}
                />
                <input
                  type="text"
                  style={inputStyle}
                  name="accname"
                  placeholder="Account Name"
                  value={formDataAzure.accname}
                  onChange={handleInputChangeAzure}
                />
              </div>
              <input
                type="text"
                style={inputStyle}
                name="subID"
                placeholder="Subscription ID"
                value={formDataAzure.subID}
                onChange={handleInputChangeAzure}
              />
              <div style={sectionStyle}>
                <Typography variant="h6">Download IAM Role CFT</Typography>
                <Button
                  variant="contained"
                  style={buttonStyle}
                  onClick={() => {
                    // Add your logic for downloading an IAM role CFT here
                  }}
                >
                  Download
                </Button>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gridGap: "10px",
                }}
              >
                <input
                  type="text"
                  style={inputStyle}
                  name="appID"
                  placeholder="Application ID"
                  value={formDataAzure.appID}
                  onChange={handleInputChangeAzure}
                />
                <input
                  type="text"
                  style={inputStyle}
                  name="appClientSecret"
                  placeholder="Application Client Secret"
                  value={formDataAzure.appClientSecret}
                  onChange={handleInputChangeAzure}
                />
              </div>
              <input
                type="text"
                style={inputStyle}
                name="enterpriseID"
                placeholder="Enterprise ID"
                value={formDataAzure.enterpriseID}
                onChange={handleInputChangeAzure}
              />
            </div>
          </div>
        </>
      ) : selectedProvider === "GCP" ? (
        <div>
          <div style={sectionStyle}>
            <Typography variant="h5">Details</Typography>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gridGap: "10px",
              }}
            >
              <input
                type="text"
                style={inputStyle}
                name="prjID"
                placeholder="Project ID"
                value={formDataGCP.prjID}
                onChange={handleInputChangeGCP}
              />
              <input
                type="text"
                style={inputStyle}
                name="accname"
                placeholder="Account Name"
                value={formDataGCP.accname}
                onChange={handleInputChangeGCP}
              />
            </div>
          </div>

          <div style={sectionStyle}>
            <Typography variant="h6">
              Download the terraform and complete the steps to configure account
            </Typography>
            <Button
              variant="contained"
              style={buttonStyle}
              onClick={() => {
                // Add your logic for downloading an IAM role CFT here
              }}
            >
              Download Terraform script
            </Button>
          </div>

          <div style={sectionStyle}>
            <Typography
              variant="h6"
              style={{
                alignItems: "center",
              }}
            >
              Upload your JSON file here
            </Typography>
            <input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              style={inputFileStyle}
            />
            {uploadedJson && (
              <div style={uploadedJsonContainerStyle}>
                <Typography variant="h6" style={titleStyle}>
                  Contents of Uploaded JSON:
                </Typography>
                <ul style={listStyle}>
                  {Object.keys(uploadedJson).map((key, index) => (
                    <li key={index} style={listItemStyle}>
                      <strong>{key}:</strong> {uploadedJson[key]}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}

      <div style={{ position: "fixed", bottom: "5rem", right: "3rem" }}>
        <Button
          variant="contained"
          style={buttonStyle}
          onClick={() => {
            setStep("Get Started");
          }}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          style={buttonStyle}
          onClick={() => {
            setStep("Review");
          }}
        >
          Next
        </Button>

        <Button
          variant="contained"
          onClick={() => {
            navigate("/inventory");
          }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default Configure;

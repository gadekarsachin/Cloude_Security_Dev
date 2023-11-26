import React from "react";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AWS from "../assets/images/AWS-logo.jpg";
import Azure from "../assets/images/Azure-Logo-PNG.png";
import GCP from "../assets/images/GCP-Logo.png";

function Review({
  setStep,
  selectedProvider,
  scope,
  formDataAWS,
  formDataAzure,
  formDataGCP,
  uploadedJson,
}) {
  const navigate = useNavigate();

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    width: "100%",
    maxWidth: "600px",
    margin: "0 auto",
  };

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
    textAlign: "left",
    width: "100%",
  };

  const detailsStyle = {
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
    width: "100%",
  };

  const detailRowStyle = {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  };

  const detailLabelStyle = {
    fontWeight: "bold",
    width: "50%",
  };

  return (
    <div style={containerStyle}>
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
        <Typography style={headingStyle}>Review Status</Typography>
      </div>

      <div style={sectionStyle}>
        <Typography style={{ marginBottom: "5px", fontSize: "14px" }}>
          Review your account details
        </Typography>
        <Typography
          variant="h6"
          style={{ marginBottom: "10px", fontWeight: "bold" }}
        >
          Account Details
        </Typography>

        {selectedProvider === "AWS" ? (
          <>
            {" "}
            <div style={detailsStyle}>
              <div style={detailRowStyle}>
                <span style={detailLabelStyle}>Scope</span>
                <span>{scope}</span>
              </div>
              <div style={detailRowStyle}>
                <span style={detailLabelStyle}>Account Name</span>
                <span>{formDataAWS.accname}</span>
              </div>
              <div style={detailRowStyle}>
                <span style={detailLabelStyle}>Account ID</span>
                <span>{formDataAWS.accID}</span>
              </div>
              <div style={detailRowStyle}>
                <span style={detailLabelStyle}>IAM Role ARN</span>
                <span>{formDataAWS.role}</span>
              </div>
            </div>
          </>
        ) : selectedProvider === "Azure" ? (
          <>
            <div style={detailsStyle}>
              <div style={detailRowStyle}>
                <span style={detailLabelStyle}>Scope</span>
                <span>{scope}</span>
              </div>

              <div style={detailRowStyle}>
                <span style={detailLabelStyle}>Account Name</span>
                <span>{formDataAzure.accname}</span>
              </div>
              <div style={detailRowStyle}>
                <span style={detailLabelStyle}>Tenant ID</span>
                <span>{formDataAzure.tenantID}</span>
              </div>
              <div style={detailRowStyle}>
                <span style={detailLabelStyle}>Subscription ID</span>
                <span>{formDataAzure.subID}</span>
              </div>
              <div style={detailRowStyle}>
                <span style={detailLabelStyle}>App ID</span>
                <span>{formDataAzure.appID}</span>
              </div>
              <div style={detailRowStyle}>
                <span style={detailLabelStyle}>App Client Secret</span>
                <span>{formDataAzure.appClientSecret}</span>
              </div>
              <div style={detailRowStyle}>
                <span style={detailLabelStyle}>Enterprise ID</span>
                <span>{formDataAzure.enterpriseID}</span>
              </div>
            </div>
          </>
        ) : selectedProvider === "GCP" ? (
          <>
            <div style={detailsStyle}>
              <div style={detailRowStyle}>
                <span style={detailLabelStyle}>Scope</span>
                <span>{scope}</span>
              </div>
              <div style={detailRowStyle}>
                <span style={detailLabelStyle}>Account Name</span>
                <span>{formDataGCP.accname}</span>
              </div>
              <div style={detailRowStyle}>
                <span style={detailLabelStyle}>Project ID</span>
                <span>{formDataGCP.prjID}</span>
              </div>
              {/* <div style={detailRowStyle}> */}
              {uploadedJson && (
                <div>
                  {Object.keys(uploadedJson).map((key, index) => (
                    <div key={index} style={detailRowStyle}>
                      <span style={detailLabelStyle}>{key}:</span>
                      <span>{uploadedJson[key]}</span>
                    </div>
                  ))}
                </div>
              )}
              {/* </div> */}
            </div>
          </>
        ) : (
          <></>
        )}
      </div>

      <div style={{ position: "fixed", bottom: "5rem", right: "3rem" }}>
        <Button
          variant="contained"
          style={{ marginRight: "1rem" }}
          onClick={() => {
            setStep("Configure");
          }}
        >
          Previous
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

export default Review;

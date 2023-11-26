import { Button } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AWS from "../assets/images/AWS-logo.jpg";
import Azure from "../assets/images/Azure-Logo-PNG.png";
import GCP from "../assets/images/GCP-Logo.png";
import GetStarted from "./GetStarted";
import Configure from "./Configure";
import Review from "./Review";

function CreateNewIntegration() {
  const [selectedProvider, setSelectedProvider] = useState("");
  const [step, setStep] = useState("");
  const [scope, setScope] = useState("");
  const [uploadedJson, setUploadedJson] = useState(null);

  const [formDataAWS, setFormDataAWS] = useState({
    accname: "",
    accID: "",
    role: "",
  });
  const [formDataAzure, setFormDataAzure] = useState({
    tenantID: "",
    accname: "",
    subID: "",
    appID: "",
    appClientSecret: "",
    enterpriseID: "",
  });
  const [formDataGCP, setFormDataGCP] = useState({
    accname: "",
    prjID: "",
  });
  const navigate = useNavigate();

  const titleStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "10px",
  };

  const subtitleStyle = {
    fontSize: "16px",
    color: "#777",
    marginBottom: "20px",
  };

  const gridContainer = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)", // Three columns in each row
    gap: "20px", // Adjust the gap between logos
  };

  const gridItem = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    border: "1px solid #ccc",
    backgroundColor: "#f4f4f4",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "transform 0.2s",
  };

  const logoStyle = {
    width: "80px",
    height: "auto",
    borderRadius: "20px",
  };

  const handleIntegrationSelect = (integrationName) => {
    setSelectedProvider(integrationName);
    console.log(`Selected integration: ${selectedProvider}`);
    // Redirect to the new integration page or perform further actions
    navigate("/newIntegration");
  };

  return (
    <div className="app-main__inner">
      <div className="main-card mb-3 card">
        {step === "Get Started" ? (
          <GetStarted
            selectedProvider={selectedProvider}
            setStep={setStep}
            setScope={setScope}
            scope={scope}
          />
        ) : step === "Configure" ? (
          <>
            <Configure
              selectedProvider={selectedProvider}
              setStep={setStep}
              setFormDataAWS={setFormDataAWS}
              formDataAWS={formDataAWS}
              scope={scope}
              formDataAzure={formDataAzure}
              setFormDataAzure={setFormDataAzure}
              formDataGCP={formDataGCP}
              setFormDataGCP={setFormDataGCP}
              uploadedJson={uploadedJson}
              setUploadedJson={setUploadedJson}
            />
          </>
        ) : step === "Review" ? (
          <>
            <Review
              selectedProvider={selectedProvider}
              setStep={setStep}
              scope={scope}
              formDataAWS={formDataAWS}
              formDataAzure={formDataAzure}
              formDataGCP={formDataGCP}
              uploadedJson={uploadedJson}
            />
          </>
        ) : (
          <div>
            <div style={titleStyle}>Add Cloud Account</div>
            <div style={subtitleStyle}>
              Onboard and secure your account across multiple service providers
            </div>
            <div style={gridContainer}>
              <div
                style={{
                  ...gridItem,
                  border:
                    selectedProvider === "AWS"
                      ? "2px solid 	#1E90FF"
                      : "1px solid #ccc",
                  backgroundColor:
                    selectedProvider === "AWS" ? "lightblue" : "",
                }}
                onClick={() => handleIntegrationSelect("AWS")}
              >
                <img src={AWS} alt="AWS" style={logoStyle} />
                <div>Amazon Web Services</div>
              </div>
              <div
                style={{
                  ...gridItem,
                  border:
                    selectedProvider === "Azure"
                      ? "2px solid 	#1E90FF"
                      : "1px solid #ccc",
                  backgroundColor:
                    selectedProvider === "Azure" ? "lightblue" : "",
                }}
                onClick={() => handleIntegrationSelect("Azure")}
              >
                <img src={Azure} alt="Azure" style={logoStyle} />
                <div>Azure</div>
              </div>
              <div
                style={{
                  ...gridItem,
                  border:
                    selectedProvider === "GCP"
                      ? "2px solid 	#1E90FF"
                      : "1px solid #ccc",
                  backgroundColor:
                    selectedProvider === "GCP" ? "lightblue" : "",
                }}
                onClick={() => handleIntegrationSelect("GCP")}
              >
                <img src={GCP} alt="GCP" style={logoStyle} />
                <div>Google Cloud Platform</div>
              </div>
            </div>
            <div style={{ position: "fixed", bottom: "5rem", right: "3rem" }}>
              <Button
                variant="contained"
                style={{ marginRight: "1rem" }}
                onClick={() => {
                  setStep("Get Started");
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
        )}
      </div>
    </div>
  );
}

export default CreateNewIntegration;

import React from "react";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AWS from "../assets/images/AWS-logo.jpg";
import Azure from "../assets/images/Azure-Logo-PNG.png";
import GCP from "../assets/images/GCP-Logo.png";
import { Provider } from "react-redux";

function GetStarted({ selectedProvider, setStep, scope, setScope }) {
  const navigate = useNavigate();

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    width: "100%",
    maxWidth: "800px",
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

  const cardContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  };

  const gridContainer = {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "20px",
  };

  const buttonStyle = {
    width: "100%",
    padding: "20px",
    // textAlign: "center",
    marginBottom: "20px",
    border: "1px solid #ccc",
    cursor: "pointer",
    transition: "background-color 0.2s",
    backgroundColor: "#f4f4f4",
    borderRadius: "8px",
    fontSize: "20px",
  };

  const selectedButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#3f51b5",
    color: "#fff",
  };

  const recommendedTagStyle = {
    backgroundColor: "#f4f4f4", // Recommended tag background color
    color: "gray", // Recommended tag text color
    padding: "2px 4px",
    fontSize: "15px",
    borderRadius: "8px",
    position: "absolute",
    top: "0",
    right: "0",
  };

  return (
    <div>
      <div style={containerStyle}>
        <div style={titleStyle}>
          <img
            src={
              selectedProvider === "AWS" ? (
                AWS
              ) : selectedProvider === "Azure" ? (
                Azure
              ) : selectedProvider === "GCP" ? (
                GCP
              ) : (
                <></>
              )
            }
            alt="Logo"
            style={logoStyle}
          />
          <Typography style={headingStyle}>Get Started</Typography>
        </div>

        <Typography variant="h6" style={{ marginBottom: "20px" }}>
          Scope
        </Typography>
        {selectedProvider === "AWS" ? (
          <>
            <div style={cardContainerStyle}>
              <div style={gridContainer}>
                <div
                  style={
                    scope === "Organization"
                      ? { ...selectedButtonStyle }
                      : { ...buttonStyle }
                  }
                  onClick={() => setScope("Organization")}
                >
                  <div style={{ position: "relative" }}>
                    <div
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      Organization
                    </div>
                    <div
                      style={{
                        fontSize: "15px",
                      }}
                    >
                      Secure your account including the members' accounts
                    </div>
                    <div style={recommendedTagStyle}>Recommended</div>
                  </div>
                </div>
                <div
                  style={
                    scope === "Account"
                      ? { ...selectedButtonStyle }
                      : { ...buttonStyle }
                  }
                  onClick={() => setScope("Account")}
                >
                  <div
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    Account
                  </div>
                  <div
                    style={{
                      fontSize: "15px",
                    }}
                  >
                    Secure your specific {selectedProvider} account
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : selectedProvider === "Azure" ? (
          <>
            <div style={cardContainerStyle}>
              <div style={gridContainer}>
                <div
                  style={
                    scope === "Tenant"
                      ? { ...selectedButtonStyle }
                      : { ...buttonStyle }
                  }
                  onClick={() => setScope("Tenant")}
                >
                  <div style={{ position: "relative" }}>
                    <div
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      Tenant
                    </div>
                    <div
                      style={{
                        fontSize: "15px",
                      }}
                    >
                      Secure all management Groups,Subscriptions and Active
                      Directory
                    </div>
                    <div style={recommendedTagStyle}>Recommended</div>
                  </div>
                </div>
                <div
                  style={
                    scope === "Subscription"
                      ? { ...selectedButtonStyle }
                      : { ...buttonStyle }
                  }
                  onClick={() => setScope("Subscription")}
                >
                  <div
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    Subscription
                  </div>
                  <div
                    style={{
                      fontSize: "15px",
                    }}
                  >
                    Secure your specific {selectedProvider} account
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : selectedProvider === "GCP" ? (
          <>
            <div style={cardContainerStyle}>
              <div style={gridContainer}>
                <div
                  style={
                    scope === "Organization"
                      ? { ...selectedButtonStyle }
                      : { ...buttonStyle }
                  }
                  onClick={() => setScope("Organization")}
                >
                  <div style={{ position: "relative" }}>
                    <div
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      Organization
                    </div>
                    <div
                      style={{
                        fontSize: "15px",
                      }}
                    >
                      Secure your GCP Organization and all associated Projects
                    </div>
                    <div style={recommendedTagStyle}>Recommended</div>
                  </div>
                </div>
                <div
                  style={
                    scope === "Project"
                      ? { ...selectedButtonStyle }
                      : { ...buttonStyle }
                  }
                  onClick={() => setScope("Project")}
                >
                  <div
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    Project
                  </div>
                  <div
                    style={{
                      fontSize: "15px",
                    }}
                  >
                    Secure your GCP Project
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>Please go back and select something</>
        )}
      </div>
      <div style={{ position: "fixed", bottom: "5rem", right: "3rem" }}>
        <Button
          variant="contained"
          style={{ marginRight: "1rem" }}
          onClick={() => {
            setStep("");
          }}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          style={{ marginRight: "1rem" }}
          onClick={() => {
            setStep("Configure");
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

export default GetStarted;

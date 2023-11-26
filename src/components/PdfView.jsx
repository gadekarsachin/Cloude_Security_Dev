import { Button } from "@mui/material";
import React, { useState } from "react";

const PdfView = () => {
  // Dummy data for the left side options

  const [isChecked, setIsChecked] = useState(false);
  const options = [
    {
      title: "Document Info",
      description: "Dummy description for Document Info.",
    },
    {
      title: "Document Name",
      description: "Dummy description for Document Name.",
    },
  ];

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const handleSubmit = () => {
    if (isChecked) {
      // Submit the form or perform your action here
      alert("Form Submitted!");
    } else {
      alert("Please accept the terms and conditions.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "stretch",
        padding: "20px",
      }}
    >
      <div
        style={{
          flex: 1,
          padding: "10px",
          background: "#f0f0f0",
        }}
      >
        {options.map((option, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "10px",
              marginBottom: "10px",
              backgroundColor: "white",
            }}
          >
            <h3>{option.title}</h3>
            <p>{option.description}</p>
          </div>
        ))}
        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: "5px",
            padding: "10px",
            marginBottom: "10px",
            backgroundColor: "white",
          }}
        >
          <div
            style={{
              display: "flex",
            }}
          >
            <input
              type="checkbox"
              id="acceptTerms"
              checked={isChecked}
              onChange={handleCheckboxChange}
              style={{
                margin: "10px",
              }}
            />
            <label
              htmlFor="acceptTerms"
              style={{
                padding: "10px",
              }}
            >
              I agree that I have completed the training
            </label>
          </div>

          <Button
            variant="contained"
            onClick={handleSubmit}
            //   style={{
            //     background: "#007BFF",
            //     color: "#fff",
            //     padding: "10px 20px",
            //     border: "none",
            //     borderRadius: "5px",
            //     fontSize: "16px",
            //     cursor: "pointer",
            //   }}
          >
            Submit
          </Button>
        </div>
      </div>
      <div style={{ flex: 3 }}>
        <iframe
          src="https://www.example.com/sample.pdf"
          title="PDF Viewer"
          width="100%"
          height="600px"
        />
      </div>
    </div>
  );
};

export default PdfView;

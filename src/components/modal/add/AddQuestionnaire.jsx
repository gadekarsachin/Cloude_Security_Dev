import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Button } from "@mui/material";

const initialFormData = {
  questionnaireId: "",
  questionnaireTitle: "",
  questionnaireQuestion: [""],
};

function AddQuestionnaire({ showModal, setShowModal, fetchData }) {
  const [formData, setFormData] = useState(initialFormData);

  const handleQuestionChange = (event, index) => {
    const { value } = event.target;
    const updatedQuestions = [...formData.questionnaireQuestion];
    updatedQuestions[index] = value;
    setFormData({ ...formData, questionnaireQuestion: updatedQuestions });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddQuestion = () => {
    setFormData({
      ...formData,
      questionnaireQuestion: [...formData.questionnaireQuestion, ""],
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzgxMDgyNTQyYTM4NWE4MWYyMDY1ZDEiLCJpYXQiOjE2OTc2MzI4NjIsImV4cCI6MTcwMDIyNDg2MiwidHlwZSI6InJlZnJlc2gifQ.vx47iCNK8MqLjLgyXEtnC9bpO2VnGQyy96quA2jChos",
      },
      body: JSON.stringify(formData), // Serialize the form data
    };

    fetch(
      "http://localhost:8000/v1/collection/questionnairedata",
      requestOptions
    ) // Replace with your backend API endpoint
      .then((response) => response.text())
      .then((data) => {
        // if (data.code === 200) {
        setFormData(initialFormData);
        setShowModal(false);
        fetchData();
        // } else {
        // }
      })
      .catch((error) => console.log("error", error));

    setShowModal(false);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Questionnaire</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="app-main__inner">
            <div className="row">
              <form onSubmit={handleSubmit}>
                <label>
                  Questionnaire ID:
                  <input
                    type="number"
                    name="questionnaireId"
                    style={inputStyle}
                    value={formData.questionnaireId}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Questionnaire Name:
                  <input
                    type="text"
                    name="questionnaireTitle"
                    style={inputStyle}
                    value={formData.questionnaireTitle}
                    onChange={handleInputChange}
                  />
                </label>

                <div>
                  <h3>User Questions</h3>
                  {formData.questionnaireQuestion.map((question, index) => (
                    <div key={index}>
                      <input
                        type="text"
                        name="questionnaireQuestion"
                        style={inputStyle}
                        value={question}
                        onChange={(event) => handleQuestionChange(event, index)}
                      />
                    </div>
                  ))}
                  <button type="button" onClick={handleAddQuestion}>
                    + Add Question
                  </button>
                </div>
                <br />
                <button type="submit">Submit</button>
              </form>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              // Handle the "ADD" action
            }}
          >
            ADD
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  fontSize: "16px",
};

export default AddQuestionnaire;

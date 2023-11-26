import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Button } from "@mui/material";

function EditQuestionnaire({
  showModalQEdit,
  setShowModalQEdit,
  fetchData,
  editDataQ,
  setEditDataQ,
}) {
  const [finalData, setFinalData] = useState();
  console.log("editdataQ", editDataQ);

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
      // console.log("body", JSON.stringify(finalData)); // Send the edited data

      const response = await fetch(
        `http://localhost:8000/v1/collection/questionnairedata/${editDataQ._id}`,
        requestOptions
      );
      console.log("response", response);

      if (response) {
        fetchData(); // Refresh data
        setShowModalQEdit(false); // Close the modal
      } else {
        console.log("errorrr while editing fetch");
      }
    } catch (error) {
      console.log("errorrr while editing fetch");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditDataQ({
      ...editDataQ,
      [name]: value,
    });
  };

  const handleQuestionChange = (event, index) => {
    const updatedQuestions = [...editDataQ.questionnaireQuestion];
    updatedQuestions[index] = event.target.value;
    setEditDataQ({ ...editDataQ, questionnaireQuestion: updatedQuestions });
  };

  const handleAddQuestion = () => {
    setEditDataQ({
      ...editDataQ,
      questionnaireQuestion: [...editDataQ.questionnaireQuestion, ""],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateData();
  };

  useEffect(() => {
    setFinalData({
      questionnaireId: editDataQ.questionnaireId,
      questionnaireTitle: editDataQ.questionnaireTitle,
      questionnaireQuestion: editDataQ.questionnaireQuestion,
    });
  }, [editDataQ]);

  return (
    <div>
      <Modal
        show={showModalQEdit}
        onHide={() => {
          setShowModalQEdit(false);
        }}
      >
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
                    value={editDataQ.questionnaireId}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Questionnaire Name:
                  <input
                    type="text"
                    name="questionnaireTitle"
                    style={inputStyle}
                    value={editDataQ.questionnaireTitle}
                    onChange={handleChange}
                  />
                </label>

                <div>
                  <h3>User Questions</h3>
                  {editDataQ?.questionnaireQuestion?.map((question, index) => (
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
                <Button type="submit " variant="contained">
                  Submit
                </Button>
              </form>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowModalQEdit(false);
            }}
          >
            Cancel
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
export default EditQuestionnaire;

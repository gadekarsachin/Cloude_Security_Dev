import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import SelectMp from "./SelectMp";
// import axios from "axios";

import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function CreateNew() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [status, setStatus] = useState("");

  const navigate = useNavigate();
  const [templateName, setTemplateName] = useState("");
  const [tempId, setTempId] = useState("");
  const [sections, setSections] = useState([
    { _id: 1, name: "", type: "", unique: false },
  ]);

  const [fieldValues, setFieldValues] = useState({});
  //
  const location = useLocation();
  const { data, fieldsArray, dataToSend } = location.state || {};

  console.log(`Create New dataToSend ${dataToSend}`);
  //
  //
  useEffect(() => {
    if (data) {
      // setTemplateName(data.temp.name);
      // setTempId(data.id);
      // setSections(data.fields);
    }
    if (fieldsArray) {
      // Do something with fieldsArray if needed
    }
  }, [data, fieldsArray]);

  //
  console.log(`dtatatat ${JSON.stringify(data)}`);
  // console.log(`data id  ${JSON.stringify(data._id)}`);
  console.log(`fieldsArray ${JSON.stringify(fieldsArray)}`);

  // console.log("Fields Array:");
  // fieldsArray.forEach((section) => {
  //   console.log("Section Name:", section.temp.name);
  //   section.fields.forEach((field) => {
  //     console.log("Field Name:", field.name);
  //     console.log("Field Type:", field.type);
  //   });
  // });
  //

  const [formData, setFormData] = useState({});

  // const handleFieldChange = (fieldId, value) => {
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [fieldId]: value,
  //   }));
  // };

  const handleFieldChange = (fieldId, value) => {
    setFieldValues((prevValues) => ({
      ...prevValues,
      [fieldId]: value,
    }));
  };

  useEffect(() => {
    if (data) {
      const initialFieldValues = {};
      data.fields.forEach((field) => {
        initialFieldValues[field._id] = field.value;
      });
      setFieldValues(initialFieldValues);
    }
  }, [data]);

  console.log(`formData ${JSON.stringify(formData)}`);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Create an array of fields in the desired format
    const formattedData = fieldsArray.map((section) =>
      section.fields.map((field) => ({
        _id: field._id,
        name: field.name,
        value: fieldValues[field._id] || "", // Use formData to populate the field value
      }))
    );

    // Flatten the array to a single level
    const flattenedData = formattedData.flat();

    console.log("Formatted Data:", flattenedData);

    try {
      let response;
      let url;

      if (data) {
        // If data is available, it means you are updating
        url = `http://localhost:8000/v1/collection/${encodeURIComponent(
          fieldsArray[0].temp.name
        )}/${data._id}`;
        response = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ fields: flattenedData }),
        });
      } else {
        // If data is not available, it means you are creating
        url = `http://localhost:8000/v1/collection/${encodeURIComponent(
          fieldsArray[0].temp.name
        )}`;
        response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ fields: flattenedData }),
        });
      }

      if (response.ok) {
        const responseData = await response.json();
        console.log("Response:", responseData);
        // Handle navigation or any other logic here
        navigate("/evidencetask", {
          state: { dataToSend: dataToSend },
        });
      } else {
        console.error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //

  // console.log(`dtaa ta id ${JSON.stringify(fieldsArray)}`);
  return (
    <div className="app-main__inner">
      <div className="card-header d-flex justify-content-between">
        <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
          {fieldsArray && data
            ? fieldsArray.map((section) => (
                <h5 key={section._id}>edit {section.temp.name}</h5>
              ))
            : fieldsArray.map((section) => (
                <h5 key={section._id}>Create New {section.temp.name}</h5>
              ))}
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 col-lg-12">
          <div className="main-card mb-3 card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {fieldsArray && data
                  ? fieldsArray.map((section) => (
                      <div key={section._id}>
                        {/* <h5>{section.temp.name}</h5> */}
                        {section.fields.map((field) => {
                          console.log("data:", data); // Log the value of data
                          console.log("section.fields:", section.fields); // Log the value of section.fields

                          const matchingDataField = data.fields.find(
                            (dataField) => dataField.name === field.name
                          );

                          const fieldValue =
                            fieldValues[field._id] !== undefined
                              ? fieldValues[field._id]
                              : matchingDataField
                              ? matchingDataField.value
                              : ""; // Default value

                          return (
                            <div className="col-md-6" key={field._id}>
                              <div className="position-relative form-group">
                                <label htmlFor={field._id}>{field.name}</label>
                                {field.type === "String" && (
                                  <input
                                    type="text"
                                    id={`text-${field._id}`}
                                    className="form-control"
                                    value={fieldValue}
                                    onChange={(e) =>
                                      handleFieldChange(
                                        field._id,
                                        e.target.value
                                      )
                                    }
                                  />
                                )}
                                {field.type === "Number" && (
                                  <input
                                    type="text" // Use "text" instead of "number"
                                    id={`number-${field._id}`}
                                    className="form-control"
                                    value={fieldValue}
                                    onChange={(e) =>
                                      handleFieldChange(
                                        field._id,
                                        e.target.value
                                      )
                                    }
                                  />
                                )}
                                {field.type === "Date and Time" && (
                                  <input
                                    type="datetime-local"
                                    id={`datetime-local-${field._id}`}
                                    className="form-control"
                                    value={fieldValue}
                                    onChange={(e) =>
                                      handleFieldChange(
                                        field._id,
                                        e.target.value
                                      )
                                    }
                                  />
                                )}
                                {/* Other field type checks... */}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ))
                  : fieldsArray.map((section) => (
                      <div key={section._id}>
                        {/* <h5>{section.temp.name}</h5> */}
                        {section.fields.map((field) => {
                          return (
                            <div className="col-md-6" key={field._id}>
                              <div className="position-relative form-group">
                                <label htmlFor={field._id}>{field.name}</label>
                                {field.type === "String" && (
                                  <input
                                    type="text"
                                    id={field._id}
                                    className="form-control"
                                    onChange={(e) =>
                                      handleFieldChange(
                                        field._id,
                                        e.target.value
                                      )
                                    }
                                  />
                                )}
                                {field.type === "Number" && (
                                  <input
                                    type="text"
                                    id={field._id}
                                    className="form-control"
                                    onChange={(e) =>
                                      handleFieldChange(
                                        field._id,
                                        e.target.value
                                      )
                                    }
                                  />
                                )}
                                {field.type === "Date and Time" && (
                                  <input
                                    type="datetime-local"
                                    id={field._id}
                                    className="form-control"
                                    onChange={(e) =>
                                      handleFieldChange(
                                        field._id,
                                        e.target.value
                                      )
                                    }
                                  />
                                )}
                                {/* Other field type checks... */}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ))}
                <button type="submit" className="btn btn-success px-5">
                  {fieldsArray && data ? "Update" : "Create"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateNew;

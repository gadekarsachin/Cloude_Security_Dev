import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const { v4: uuid } = require("uuid");

const EditTemplate = () => {
  const [templateName, setTemplateName] = useState("");
  const [tempId, setTempId] = useState("");
  const [role, setRole] = useState(""); // Role state
  const [submenu, setSubmenu] = useState([{ name: "" }]); // Submenu state
  const navigate = useNavigate();

  const [sections, setSections] = useState([
    { _id: 1, name: "", type: "", unique: false, selectedTemplate: "" },
  ]);

  //

  const [templates, setTemplates] = useState([]);
  const fetchTemplates = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/v1/template/getTemplate?page=1&limit=100&keyword="
      );

      if (!response.ok) {
        throw new Error("Failed to fetch templates.");
      }

      const data = await response.json();
      setTemplates(data.results);
    } catch (error) {
      console.error("Error fetching templates:", error);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  //
  const location = useLocation();
  const { data } = location.state;
  //
  useEffect(() => {
    if (data) {
      setTemplateName(data.temp.name);
      setTempId(data.id);
      setSections(data.fields);
      setRole(data.role); // Set role
      setSubmenu(data.submenu); // Set submenu

      const updatedSections = data.fields.map((section) => ({
        ...section,
        selectedTemplate: section.selectedTemplateId, // Assuming this field holds the template ID
      }));
      setSections(updatedSections);
    }
  }, [data]);
  //
  const handleAddSection = () => {
    const newSectionId = sections.length + 1;
    setSections([
      ...sections,
      { id: newSectionId, name: "", type: "", unique: false },
    ]);
  };

  console.log(`happy person ${sections}`);

  const handleDeleteSection = (id) => {
    const updatedSections = sections.filter((section) => section._id !== id);
    setSections(updatedSections);
  };

  //
  const handleAddSubmenu = () => {
    setSubmenu([...submenu, { name: "" }]);
  };

  const handleDeleteSubmenu = (index) => {
    const updatedSubmenu = [...submenu];
    updatedSubmenu.splice(index, 1);
    setSubmenu(updatedSubmenu);
  };
  //

  const handleTemplateNameChange = (e) => {
    setTemplateName(e.target.value);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmenuChange = (index, value) => {
    const updatedSubmenu = [...submenu];
    updatedSubmenu[index].name = value;
    setSubmenu(updatedSubmenu);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      temp: {
        name: templateName,
      },
      _id: tempId,
      // fields: sections.map(({ ...rest }) => ({ id: uuid(), ...rest })),
      fields: sections.map(({ id, selectedTemplate, ...rest }) => ({
        ...rest,
        selectedTemplateId: selectedTemplate,
        selectedTemplateName: templates.find(
          (template) => template.id === selectedTemplate
        )?.temp.name,
      })), // Remove 'id' field from sections
      role: role, // Add role to the data
      submenu: submenu.map((item) => ({ name: item.name })), // Add submenu to the data
    };
    // const data = {
    //   temp: {
    //     name: templateName,
    //   },
    //   _id: tempId,
    //   fields: sections.map(({ id, ...rest }) => ({ id: id + 1, ...rest })), // Increment 'id' field in sections
    // };
    console.log(`data: ${JSON.stringify(data)}`);

    try {
      if (sections.length === 0) {
        throw new Error("Sections array cannot be empty.");
      }

      // Replace this with the actual template ID you want to update

      const response = await fetch(
        `http://localhost:8000/v1/template/updateTemplate/${tempId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      if (response.ok) {
        const responseData = await response.json();
        console.log("responseData", responseData);
        navigate(`/template`); // Navigate to `/template` after successful update
      } else {
        // Handle error response if needed
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSectionChange = (id, field, value) => {
    setSections((prevSections) => {
      const updatedSections = prevSections.map((section) => {
        if (section._id === id) {
          return { ...section, [field]: value ?? "" };
        }
        return section;
      });
      return updatedSections;
    });
  };

  return (
    <div className="app-main__inner">
      <div className="card-header d-flex justify-content-between">
        <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
          Update Template
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 col-lg-12">
          <div className="main-card mb-3 card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="col-md-6">
                    <div className="position-relative form-group">
                      <label htmlFor="name">Name Of Template</label>
                      <input
                        placeholder="Enter Name of Template"
                        className="form-control"
                        value={templateName}
                        onChange={handleTemplateNameChange}
                      />
                    </div>
                  </div>

                  {/*  */}
                  <div className="col-md-3">
                    <div className="position-relative form-group">
                      <label htmlFor="role">Role</label>
                      <select
                        className="form-control"
                        value={role}
                        onChange={handleRoleChange}
                      >
                        <option value="">Select Role</option>
                        <option value="user">User</option>
                        <option value="client">Client</option>
                      </select>
                    </div>
                  </div>
                </div>
                {/*  */}
                {sections.map((section) => {
                  const handleNameChange = (id, value) => {
                    setSections((prevSections) => {
                      const updatedSections = prevSections.map((section) =>
                        section._id === id
                          ? { ...section, name: value }
                          : section
                      );
                      return updatedSections;
                    });
                  };

                  const handleTypeChange = (id, value) => {
                    setSections((prevSections) => {
                      const updatedSections = prevSections.map((section) =>
                        section._id === id
                          ? { ...section, type: value }
                          : section
                      );
                      return updatedSections;
                    });
                  };

                  const handleUniqueChange = (id, checked) => {
                    setSections((prevSections) => {
                      const updatedSections = prevSections.map((section) => {
                        if (section._id === id) {
                          return { ...section, unique: "true" };
                        } else {
                          return { ...section, unique: "false" };
                        }
                      });
                      return updatedSections;
                    });
                  };

                  console.log(`section.unique ${section.unique}`);
                  console.log(`section.type ${section.type}`);
                  console.log(`section._id ${section._id}`);

                  return (
                    <div className="form-wizard-content" key={section._id}>
                      <div>
                        <div className="form-section">
                          <div className="form-row">
                            <div className="col-md-4">
                              <div className="position-relative form-group">
                                <label>Property Name</label>
                                <input
                                  id={`name-${section._id}`}
                                  placeholder="Enter Property Name"
                                  className="form-control"
                                  value={section ? section.name : ""}
                                  onChange={(e) =>
                                    handleNameChange(
                                      section._id,
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-md-2">
                              <div className="position-relative form-group">
                                <label>Type</label>
                                <select
                                  id={`type-${section._id}`}
                                  className="form-control"
                                  value={section ? section.type : ""}
                                  onChange={(e) =>
                                    handleTypeChange(
                                      section._id,
                                      e.target.value
                                    )
                                  }
                                >
                                  <option value="">Select Type</option>
                                  <option value="String">String</option>
                                  <option value="Number">Number</option>
                                  <option value="Date and Time">
                                    Date and Time
                                  </option>
                                </select>
                                <p className=""></p>
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="position-relative form-group">
                                <label>Template</label>
                                <select
                                  id={`template-${section.id}`}
                                  className="form-control"
                                  value={section.selectedTemplate}
                                  onChange={(e) => {
                                    const selectedTemplateId = e.target.value;
                                    const selectedTemplateName = templates.find(
                                      (template) =>
                                        template.id === selectedTemplateId
                                    )?.temp.name;
                                    console.log(
                                      "Selected Template ID:",
                                      selectedTemplateId,
                                      "Selected Template Name:",
                                      selectedTemplateName
                                    );
                                    setSections((prevSections) => {
                                      return prevSections.map((prevSection) =>
                                        prevSection._id === section._id
                                          ? {
                                              ...prevSection,
                                              selectedTemplate:
                                                selectedTemplateId,
                                            }
                                          : prevSection
                                      );
                                    });
                                  }}
                                >
                                  <option value="">Select Template</option>
                                  {templates.map((template) => (
                                    <option
                                      key={template.id}
                                      value={template.id}
                                      selected={
                                        template.id === section.selectedTemplate
                                      }
                                    >
                                      {template.temp.name}
                                    </option>
                                  ))}
                                </select>

                                <p className=""></p>
                              </div>
                            </div>
                            <div className="col-md-2">
                              <div className="position-relative form-group primary-field">
                                <input
                                  id={`unique-${section._id}`}
                                  type="radio"
                                  value="primaryValue"
                                  style={{ marginRight: 5 }}
                                  checked={section.unique === "true"}
                                  onChange={(e) =>
                                    handleUniqueChange(
                                      section._id,
                                      e.target.checked
                                    )
                                  }
                                />
                                <label>Primary Field</label>
                              </div>
                            </div>

                            <div className="col-md-1">
                              <div className="position-relative form-group">
                                <Button
                                  variant="danger"
                                  onClick={() =>
                                    handleDeleteSection(section._id)
                                  }
                                >
                                  <FontAwesomeIcon icon={faTrash} /> Delete
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                ></div>

                {/* <div className="divider"></div> */}

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <AddBoxIcon
                    style={{ fontSize: "30px" }}
                    onClick={handleAddSection}
                  />
                </div>
                <div className="divider"></div>
                <div className="col-md-11">
                  <div className="position-relative form-group">
                    {submenu.map((item, index) => (
                      <div key={index} className="form-group">
                        <label htmlFor={`submenu-${index}`}>
                          Submenu {index + 1}
                        </label>
                        <div className="d-flex align-items-center">
                          <input
                            type="text"
                            id={`submenu-${index}`}
                            className="form-control mr-5"
                            value={item.name}
                            onChange={(e) =>
                              handleSubmenuChange(index, e.target.value)
                            }
                          />
                          <div className="col-md-2">
                            <div className="position-relative form-group">
                              <Button
                                variant="danger"
                                onClick={() => handleDeleteSubmenu(index)}
                              >
                                <FontAwesomeIcon icon={faTrash} /> Delete
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <AddBoxIcon
                    style={{ fontSize: "30px" }}
                    onClick={handleAddSubmenu}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <button type="submit" className="btn btn-success px-2 mt-2">
                    Update Template
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTemplate;

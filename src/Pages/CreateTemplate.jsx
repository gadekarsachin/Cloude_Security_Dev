import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CreateTemplate = () => {
  const [templateName, setTemplateName] = useState("");
  const [role, setRole] = useState("");
  const [submenu, setSubmenu] = useState([{ name: "" }]);
  const [sections, setSections] = useState([
    { id: 1, name: "", type: "", unique: false, selectedTemplate: "" },
  ]);
  const navigate = useNavigate();

  //
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState("");

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

  const handleAddSection = () => {
    const newSectionId = sections.length + 1;
    setSections([
      ...sections,
      { id: newSectionId, name: "", type: "", unique: false },
    ]);
  };

  const handleDeleteSection = (id) => {
    const updatedSections = sections.filter((section) => section.id !== id);
    setSections(updatedSections);
  };

  //
  const handleSubmenuChange = (index, value) => {
    const updatedSubmenu = [...submenu];
    updatedSubmenu[index].name = value;
    setSubmenu(updatedSubmenu);
  };

  const handleDeleteSubmenu = (index) => {
    const updatedSubmenu = [...submenu];
    updatedSubmenu.splice(index, 1);
    setSubmenu(updatedSubmenu);
  };

  const handleAddSubmenu = () => {
    setSubmenu([...submenu, { name: "" }]);
  };

  //
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      temp: {
        name: templateName,
      },
      fields: sections.map(({ id, selectedTemplate, ...rest }) => ({
        ...rest,
        selectedTemplateId: selectedTemplate,
        selectedTemplateName: templates.find(
          (template) => template.id === selectedTemplate
        )?.temp.name,
      })),
      role: role,
      submenu: submenu.map((item) => ({ name: item.name })),
    };

    console.log(`data: ${JSON.stringify(data)}`);

    try {
      if (sections.length === 0) {
        throw new Error("Sections array cannot be empty.");
      }

      const response = await fetch(
        "http://localhost:8000/v1/template/addTemplate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

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

  const handleTemplateNameChange = (e) => {
    setTemplateName(e.target.value);
  };

  const handleSectionChange = (id, field, value) => {
    setSections((prevSections) => {
      const updatedSections = prevSections.map((section) => {
        if (section.id === id) {
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
          Create New Template
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
                  <div className="col-md-3">
                    <div className="position-relative form-group">
                      <label htmlFor="role">Role</label>
                      <select
                        className="form-control"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                      >
                        <option value="">Select Role</option>
                        <option value="user">User</option>
                        <option value="client">Client</option>
                      </select>
                    </div>
                  </div>
                </div>

                {sections.map((section) => {
                  const handlenameChange = (e) => {
                    const { value } = e.target;
                    const updatedSections = [...sections];
                    const sectionIndex = updatedSections.findIndex(
                      (s) => s.id === section.id
                    );
                    updatedSections[sectionIndex] = { ...section, name: value };
                    setSections(updatedSections);
                  };

                  const handleTypeChange = (e) => {
                    const { value } = e.target;
                    handleSectionChange(section.id, "type", value);
                  };

                  const handleuniqueChange = (id) => {
                    setSections((prevSections) => {
                      const updatedSections = prevSections.map((section) => ({
                        ...section,
                        unique: section.id === id,
                      }));
                      return updatedSections;
                    });
                  };

                  return (
                    <div className="form-wizard-content" key={section.id}>
                      <div>
                        <div className="form-section">
                          <div className="form-row">
                            <div className="col-md-4">
                              <div className="position-relative form-group">
                                <label>Property Name</label>
                                <input
                                  id={`name-${section.id}`}
                                  placeholder="Enter Property Name"
                                  className="form-control"
                                  value={section ? section.name : ""}
                                  onChange={handlenameChange}
                                />
                              </div>
                            </div>
                            <div className="col-md-2">
                              <div className="position-relative form-group">
                                <label>Type</label>
                                <select
                                  id={`type-${section.id}`}
                                  className="form-control"
                                  value={section ? section.type : ""}
                                  onChange={handleTypeChange}
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
                                        prevSection.id === section.id
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
                                  id={`unique-${section.id}`}
                                  type="radio"
                                  value="primaryValue"
                                  style={{ marginRight: 5 }}
                                  checked={section ? section.unique : false}
                                  onChange={() =>
                                    handleuniqueChange(section.id)
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
                                    handleDeleteSection(section.id)
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
                    Save Template
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

export default CreateTemplate;

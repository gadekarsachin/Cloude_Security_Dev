import React, { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createNewIntegration,
  updateIntegration,
} from "../helperFunctions/apiFunction";
import { IntegrationForm } from "../helperFunctions/wedata";

function CreateIntegrationForm() {
  const { user, isEdit, edit } = useSelector((state) => state.clientData);
  const [activeOption, setOption] = useState("0");
  const [forminputs, setForminputs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    integrationName: "",
    integrationConfig: [],
  });
  const {
    refresh: { token },
    id,
  } = user;

  const navigate = useNavigate();

  function submit(e) {
    e.preventDefault();
    const formdata = {};
    for (let i = 0; i < e.target.length; i++) {
      if (e.target[i].type === "text") {
        formdata[e.target[i].name] = e.target[i].value;
      }
    }
    const obj = {};
    obj["integrationName"] = activeOption;
    obj["integrationConfig"] = [{ ...formdata }];
    obj["integrationTimestamp"] = new Date().toISOString();

    setFormData(obj);
    if (isEdit) {
      if (
        !Object.values(formdata).includes("") &&
        Object.values(formdata).length > 0
      ) {
        // console.log(formdata, Object.values(formdata));
        update(obj);
      } else {
        console.log(formdata, Object.values(formdata));
        toast.error("Please Provide All The Fields");
      }
    } else {
      if (activeOption !== "0") {
        if (
          !Object.values(formdata).includes("") &&
          Object.values(formdata).length > 0
        ) {
          // console.log(formdata, Object.values(formdata));
          create(obj);
        } else {
          console.log(formdata, Object.values(formdata));
          toast.error("Please Provide All The Fields");
        }
      } else {
        toast.error("Please Select Integration Type");
      }
    }
  }

  async function create(obj) {
    setLoading(true);
    const res = await createNewIntegration(obj, token);
    setLoading(false);
    if (res.code === 200) {
      toast.success("Integration Created Successfuly !");
      navigate("/integrations");
    } else {
      toast.error(res.message);
    }
  }

  async function update(obj) {
    setLoading(true);
    const params = "/integration/" + formData?.id;
    const res = await updateIntegration(params, obj, token);
    setLoading(false);
    if (res.code === 200) {
      toast.success("Integration Updated Successfuly !");
      navigate("/integrations");
    } else {
      toast.error(res.message);
    }
  }

  useEffect(() => {
    const arr = IntegrationForm[activeOption]
      ? IntegrationForm[activeOption]
      : [];
    setForminputs(arr);
  }, [activeOption]);

  useEffect(() => {
    if (isEdit) {
      // console.log("edit in intergation", edit);
      setFormData({ ...edit });
      setOption(edit.integrationName);
    }
  }, [isEdit]);

  return (
    <div className="app-main__inner">
      <div className="card-header d-flex justify-content-between">
        <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
          Create Integration
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 col-lg-12">
          <div className="main-card mb-3 card">
            <div className="card-body">
              <form
                onSubmit={(e) => {
                  submit(e);
                }}
              >
                <div className="form-wizard-content">
                  <div>
                    <div className="form-row">
                      <div className="col-md-6">
                        <div className="position-relative form-group">
                          <label htmlFor="integrationName">
                            Select Integration
                          </label>
                          <select
                            className="form-control myselecttag"
                            onChange={(e) => {
                              setOption(
                                isEdit
                                  ? formData.integrationName
                                  : e.target.value
                              );
                            }}
                            disabled={
                              isEdit
                                ? formData.integrationName &&
                                  formData.integrationConfig.length > 0
                                  ? true
                                  : false
                                : false
                            }
                          >
                            <option value="0">
                              {isEdit
                                ? formData.integrationName
                                : "Select Your Integration"}
                            </option>
                            {isEdit
                              ? null
                              : Object.keys(IntegrationForm).map((item, i) => (
                                <option value={item} key={i * 8.9}>
                                  {item.toUpperCase()}
                                </option>
                              ))}
                          </select>
                          <p
                            className="text-danger"
                            id="integrationName_error"
                          ></p>
                        </div>
                      </div>
                    </div>
                    <div className="form-row">
                      {forminputs.length > 0 &&
                        forminputs.map((item, i) => {
                          return (
                            <div className="col-md-6" key={i * 3.67}>
                              <div className="position-relative form-group">
                                <label htmlFor={item.idname}>
                                  {item.lebel}
                                </label>
                                <input
                                  type={item.type}
                                  name={item.idname}
                                  id={item.idname}
                                  className="form-control"
                                  defaultValue={
                                    formData?.integrationConfig.length > 0
                                      ? formData?.integrationConfig[0][item.idname]
                                      : ""
                                  }
                                />
                                <p
                                  className="text-danger"
                                  id={item.idname + "_error"}
                                ></p>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
                <div className="divider"></div>
                <div>
                  {loading ? (
                    <div className="btn btn-warning text-dark px-5">
                      <span
                        className="spinner-border text-dark mx-2"
                        style={{
                          height: "16px",
                          width: "16px",
                        }}
                      ></span>
                      {isEdit ? "Updating" : "Creating"}
                    </div>
                  ) : (
                    <button type="submit" className="btn btn-success px-5">
                      {isEdit ? "Update" : "Create"}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateIntegrationForm;

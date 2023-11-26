import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createNewUser, updateUser } from "../helperFunctions/apiFunction";
import {
  isPassword,
  validateFormCreate,
  validateFormUpdate,  
} from "../helperFunctions/helperFunction";
import { editUser } from "../redux/dataSlice";
import SelectMp from "./SelectMp";

function CreateEvidencetask() {
  const { user, isEdit, edit } = useSelector((state) => state.clientData);
  const [activeRole, setActiveRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    status: true,
    name: "",
    email: "",
    phoneNumber: "",
    mobileNumber: "",
    role: "",
  });
  const [status, setStatus] = useState({
    active: true,
    deactive: false,
  });
  const [userPassword, setUserPassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    refresh: { token },
  } = user;

  function submit(e) {
    e.preventDefault();
    const formdata = {};
    for (let i = 0; i < e.target.length; i++) {
      formdata[e.target[i].name] = e.target[i].value;
    }
    if (!isEdit) {
      if (!validateFormCreate(formdata)) {
        return;
      }
    } else {
      if (!validateFormUpdate(formdata)) {
        return;
      }
    }
    setLoading(true);
    if (userPassword.newPassword === userPassword.confirmPassword) {
      if (activeRole !== "Select Your Role" && activeRole) {
        document.getElementById("role_error").innerHTML = "";
        const obj = {
          name: formData.name,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          mobileNumber: formData.mobileNumber,
        };
        if (!isEdit) {
          obj["password"] = userPassword.newPassword;
        }
        obj["role"] = activeRole.id;
        obj["status"] = status.active ? 1 : 0;
        if (userPassword.newPassword === userPassword.confirmPassword) {
          if (isEdit) {
            update(obj);
          } else {
            create(obj);
          }
        }
      } else {
        setLoading(false);
        document.getElementById("role_error").innerHTML = "Please select role";
      }
    } else {
      toast.error("Password not matched !");
    }
  }

  function update(obj) {
    const param = "/users/" + edit.id;
    updateUser(param, obj, token).then((res) => {
      setLoading(false);
      if (res.code === 200) {
        dispatch(editUser({ data: {}, isEdit: false }));
        toast.success(res.message);
        navigate("/user-management/users");
      } else {
        toast.error(res.message);
      }
    });
  }

  function create(obj) {
    createNewUser(obj, token)
      .then((res) => {
        setLoading(false);
        // console.log("create user response:: ", res);
        if (res.code === 200) {
          toast.success(res.message);
          navigate("/user-management/users");
        } else {
          toast.error(res.message);
        }
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  }

  function handleChange(val, key) {
    const obj = { ...formData };
    obj[key] = val;
    setFormData(obj);
  }

  useEffect(() => {
    if (isEdit) {
      setFormData({ ...edit });
    }
  }, [isEdit]);

  const handlePassword = (value, type, e) => {
    const pass1 = document.getElementById("new_pass_error");
    const pass2 = document.getElementById("confirm_pass_error");
    const obj = { ...userPassword };

    if (obj["newPassword"].length >= 2) {
      pass1.innerHTML = `Password should contain Minimum eight characters, 
      at least one letter,  one number and one 
      special character.`;
      console.log(isPassword(obj["newPassword"]));
      if (isPassword(obj["newPassword"])) {
        pass1.classList.remove("text-danger");
        pass1.classList.add("text-info");
      } else {
        pass1.classList.add("text-danger");
      }
    } else {
      pass1.innerHTML = "";
    }

    if (type === 1) {
      obj["newPassword"] = value;
      setUserPassword(obj);
    } else if (type === 2) {
      if (obj["newPassword"]) {
        if (obj["newPassword"].indexOf(value) > -1) {
          pass2.innerHTML = "";
          obj["confirmPassword"] = value;
          setUserPassword(obj);
        } else {
          pass2.innerHTML = "Sorry! Password not Matched";
          pass2.classList.add("text-danger");
        }
      } else {
        pass1.innerHTML = "Please Enter New Password";
        pass1.classList.add("text-danger");
      }
    }
  };

  return (
    <div className="app-main__inner">
      <div className="card-header d-flex justify-content-between">
        <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
          {isEdit ? "Update" : "Create New"} User
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
                          <label htmlFor="name">User Name</label>
                          <input
                            name="name"
                            id="name"
                            placeholder="First Name"
                            type="text"
                            className="form-control"
                            value={formData.name}
                            onChange={(e) =>
                              handleChange(e.target.value, "name")
                            }
                          />
                          <p className="text-danger" id="name_error"></p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="position-relative form-group">
                          <label htmlFor="email">User Email</label>
                          <input
                            name="email"
                            id="email"
                            placeholder="Enter Email"
                            type="email"
                            className="form-control"
                            value={formData.email}
                            onChange={(e) =>
                              handleChange(e.target.value, "email")
                            }
                          />
                          <p className="text-danger" id="email_error"></p>
                        </div>
                      </div>
                      {!isEdit ? (
                        <>
                          <div className="col-md-6">
                            <div className="position-relative form-group">
                              <label htmlFor="user_new_password">
                                New Password
                              </label>
                              <input
                                name="user_new_password"
                                id="user_new_password"
                                type="password"
                                className="form-control"
                                value={userPassword.newPassword}
                                onChange={(e) =>
                                  handlePassword(e.target.value, 1)
                                }
                              />
                              <p className="" id="new_pass_error"></p>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="position-relative form-group">
                              <label htmlFor="user_confirm_password">
                                Confirm Password
                              </label>
                              <input
                                name="user_confirm_password"
                                id="user_confirm_password"
                                type="password"
                                className="form-control"
                                value={userPassword.confirmPassword}
                                onChange={(e) =>
                                  handlePassword(e.target.value, 2)
                                }
                              />
                              <p className="" id="confirm_pass_error"></p>
                            </div>
                          </div>
                        </>
                      ) : null}
                    </div>
                    <div className="form-row">
                      <div className="col-md-6">
                        <div className="position-relative form-group">
                          <label htmlFor="phone_number">Phone Number</label>
                          <input
                            name="phone_number"
                            id="phone_number"
                            type="number"
                            className="form-control"
                            value={formData.phoneNumber}
                            onChange={(e) =>
                              handleChange(e.target.value, "phoneNumber")
                            }
                          />
                          <p
                            className="text-danger"
                            id="phone_number_error"
                          ></p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="position-relative form-group">
                          <label htmlFor="mobile_number">Mobile Number</label>
                          <input
                            name="mobile_number"
                            id="mobile_number"
                            type="number"
                            className="form-control"
                            value={formData.mobileNumber}
                            onChange={(e) =>
                              handleChange(e.target.value, "mobileNumber")
                            }
                          />
                          <p
                            className="text-danger"
                            id="mobile_number_error"
                          ></p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="position-relative form-group">
                          <label htmlFor="rolesearch">Select Roles</label>
                          <SelectMp setRole={(item) => setActiveRole(item)} />
                        </div>
                        <p className="text-danger" id="role_error"></p>
                      </div>
                      <div className="col-md-6">
                        <div className="position-relative form-group">
                          <label htmlFor="rolesearch">Status</label>
                          <div className=" d-flex">
                            <span>
                              <input
                                type="radio"
                                id="user_status"
                                name="user_status"
                                checked={status.active}
                                onChange={(e) => {
                                  // console.log(e.target.checked);
                                  const obj = { ...status };
                                  obj.active = true;
                                  obj.deactive = false;
                                  setStatus({ ...obj });
                                }}
                              />
                              <label
                                htmlFor="user_status"
                                className="text-success mx-2"
                              >
                                Active
                              </label>
                            </span>
                            <span>
                              <input
                                type="radio"
                                id="user_status"
                                name="user_status"
                                checked={status.deactive}
                                onChange={(e) => {
                                  const obj = { ...status };
                                  obj.deactive = true;
                                  obj.active = false;
                                  setStatus({ ...obj });
                                }}
                              />
                              <label
                                htmlFor="user_status"
                                className="text-danger mx-2"
                              >
                                Deactive
                              </label>
                            </span>
                          </div>
                        </div>
                      </div>
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

export default CreateEvidencetask;

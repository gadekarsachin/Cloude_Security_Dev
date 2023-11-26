import React, { useState, useEffect } from "react";
// import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { createNewUser, updateUser } from "../helperFunctions/apiFunction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditUserForm() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const EditUserData = location.state && location.state.data;
  console.log("EditUserData", location.state.data);

  const [formData, setFormData] = useState({
    name: EditUserData.name,
    email: EditUserData.email,
    phone_number: "",
    mobile_number: "",
    role: EditUserData.role,
    status: "",
  });

  const [formData_Valid, setFormData_Valid] = useState({
    name: false,
    email: false,
    phone_number: false,
    mobile_number: false,
    role: false,
    status: false,
  });

  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleStatusChange = (e) => {
    const { value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      status: value === "true" ? "active" : "deactive",
    }));
  };

  const handleEmailBlur = () => {
    setEmailError("");
  };

  const isValidEmail = (email) => {
    // Regular expression to check email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    let formValidity = true;

    if (!formData.name) {
      setFormData_Valid((prevFormData) => ({
        ...prevFormData,
        name: true,
      }));
    } else {
      setFormData_Valid((prevFormData) => ({
        ...prevFormData,
        name: false,
      }));
    }

    if (formData.email.trim() === "") {
      setEmailError("Enter email id");
      formValidity = false;
    } else if (!isValidEmail(formData.email)) {
      formValidity = false;
      setEmailError("Enter valid email id");
    } else {
      // console.log('Valid email:', formData.email);
    }

    if (!formData.role) {
      setFormData_Valid((prevFormData) => ({
        ...prevFormData,
        role: true,
      }));
    } else {
      setFormData_Valid((prevFormData) => ({
        ...prevFormData,
        role: false,
      }));
    }

    if (formData.name === "" || formData.email === "" || formData.role === "") {
      return;
    }

    if (!formValidity) {
      // If formValidity is false, return without executing the remaining code
      return;
    }

    let obj = {
      name: formData.name,
      email: formData.email,
      role: formData.role,
    };

    console.log("obj", obj);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: JSON.stringify(obj),
      redirect: "follow",
    };

    fetch(`http://localhost:8000/v1/user/${EditUserData.id}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log("result", result);
        toast.success("User Data Updated successfully", {
          position: "bottom-right",
          autoClose: 3000, // Auto close the toast after 3 seconds
        });
        navigate("/user-management");
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="app-main__inner">
      <div className="card-header d-flex justify-content-between">
        <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
          Edit User Details
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 col-lg-12">
          <div className="main-card mb-3 card">
            <div className="card-body">
              <form>
                <ToastContainer />
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
                              setFormData({
                                ...formData,
                                name: e.target.value,
                              })
                            }
                          />
                          {formData_Valid.name && (
                            <p style={{ color: "red" }}>Enter user name</p>
                          )}
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
                            onBlur={handleEmailBlur}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                email: e.target.value,
                              })
                            }
                          />
                          {emailError && (
                            <p style={{ color: "red" }}>{emailError}</p>
                          )}
                          {/* <p style={{color:'red'}} >Enter correct mail id</p> */}
                        </div>
                      </div>
                    </div>

                    {/* <div className="form-row">
                      <div className="col-md-6">
                        <div className="position-relative form-group">
                          <label htmlFor="phone_number">Phone Number</label>
                          <input
                            name="phone_number"
                            id="phone_number"
                            type="number"
                            className="form-control"
                            value={formData.phone_number}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                phone_number: e.target.value,
                              })
                            }
                          />
                        
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
                            value={formData.mobile_number}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                mobile_number: e.target.value,
                              })
                            }
                          />

                        </div>
                      </div>
                    </div> */}
                    <div className="form-row">
                      <div className="col-md-6">
                        <div className="position-relative form-group">
                          <label htmlFor="rolesearch">Select Roles</label>
                          <select
                            id="rolesearch"
                            className="form-control"
                            value={formData.role}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                role: e.target.value,
                              })
                            }
                          >
                            <option value="">Select Role</option>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                          </select>
                        </div>
                        {formData_Valid.role && (
                          <p style={{ color: "red" }}>Select user role</p>
                        )}
                      </div>
                      {/* <div className="col-md-6">
                        <div className="position-relative form-group">
                          <label htmlFor="rolesearch">Status</label>
                          <div className="d-flex">
                            <span>
                              <input
                                type="radio"
                                id="user_status_active"
                                name="user_status"
                                value="true"
                                checked={formData.status === "active"}
                                onChange={handleStatusChange}
                              />
                              <label
                                htmlFor="user_status_active"
                                className="text-success mx-2"
                              >
                                Active
                              </label>
                            </span>
                            <span>
                              <input
                                type="radio"
                                id="user_status_deactive"
                                name="user_status"
                                value="false"
                                checked={formData.status === "deactive"}
                                onChange={handleStatusChange}
                              />
                              <label
                                htmlFor="user_status_deactive"
                                className="text-danger mx-2"
                              >
                                Deactive
                              </label>
                            </span>
                          </div>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
                <div className="divider"></div>
                <div>
                  <button
                    type="submit"
                    className="btn btn-success px-5"
                    onClick={handleFormSubmit}
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditUserForm;

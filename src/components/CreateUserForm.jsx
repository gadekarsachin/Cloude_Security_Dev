import React, { useState, useEffect } from "react";
// import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createNewUser, updateUser } from "../helperFunctions/apiFunction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function CreateUserForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    mobile_number: "",
    newPassword: "",
    confirmPassword: "",
    role: "",
    status: "",
  });

  const [formData_Valid, setFormData_Valid] = useState({
    name: false,
    email: false,
    phone_number: false,
    mobile_number: false,
    newPassword: false,
    confirmPassword: false,
    role: false,
    status: false,
  });

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');



  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleStatusChange = (e) => {
    const { value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      status: value === "true" ? "active" : "deactive",
    }));


  };

  const handleEmailBlur = () => {
    setEmailError(''); 
  };

  const handlePasswordBlur=()=>{
    setPasswordError('');  
  }
  

  const isValidEmail = (email) => {
    // Regular expression to check email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password) => {
    // Regular expression to check password format (minimum 8 characters with numbers and letters)
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleFormSubmit = (e) => {
       e.preventDefault();


       let formValidity = true;


    if(!formData.name)
    {
      setFormData_Valid((prevFormData) => ({
        ...prevFormData,
        name: true,
      }));
    }
    else
    {
      setFormData_Valid((prevFormData) => ({
        ...prevFormData,
        name: false,
      }));
    }
 
    if (formData.email.trim() === '') {
      setEmailError('Enter email id');
      formValidity = false; 
    } else if (!isValidEmail(formData.email)) {
      formValidity = false; 
      setEmailError('Enter valid email id');
    } else {
      // console.log('Valid email:', formData.email);
    }

    if (formData.newPassword.trim() === '') {
      setPasswordError('Enter password');
      formValidity = false; 
    } else if (!isValidPassword(formData.newPassword)) {
      setPasswordError('Password must contain at least 8 characters with numbers and letters');
      formValidity = false; 
    } else {
      // console.log('Valid password:', formData.newPassword);
    }

    if(!formData.role)
    {
      setFormData_Valid((prevFormData) => ({
        ...prevFormData,
        role: true,
      }));
    }
    else{

      setFormData_Valid((prevFormData) => ({
        ...prevFormData,
        role: false,
      }));

    }



    if (formData.name === '' || formData.email === '' || formData.newPassword === '' || formData.role === '') {
      return; 
    }

    if (!formValidity) {
      // If formValidity is false, return without executing the remaining code
      return;
    }

    let obj={      
    role: formData.role,
    name: formData.name,
    email: formData.email,
    password:formData.newPassword
    }

    console.log("obj",obj)


        fetch('http://localhost:8000/v1/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    })
      .then((response) => response.json())
      .then((responseData) => {
 console.log("responseData",responseData)
 toast.success("New user created successfully", {
  position: "bottom-right",
  autoClose: 3000, // Auto close the toast after 3 seconds
});
        // Handle the response data here
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle errors here
      });

  };

  return (
    <div className="app-main__inner">

      <div className="card-header d-flex justify-content-between">
        <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
          Create New User
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
                        { formData_Valid.name && <p style={{color:'red'}} >Enter user name</p>}
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
    {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
                          {/* <p style={{color:'red'}} >Enter correct mail id</p> */}
                        </div>
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="col-md-6">
                        <div className="position-relative form-group">
                          <label htmlFor="newPassword">Password</label>
                          <input
                          placeholder="Enter Password "
                            name="newPassword"
                            id="newPassword"
                            type="password"
                            className="form-control"
                            value={formData.newPassword}
                            onBlur={handlePasswordBlur}
                            onChange={handlePasswordChange}
                          />
                        {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
                          {/* <p style={{color:'red'}} >Enter correct mail id</p> */}
                        </div>
                      </div>

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
                       {formData_Valid.role && <p style={{color:'red'}} >Select user role</p>}
                      </div>

                      {/* <div className="col-md-6">
                        <div className="position-relative form-group">
                          <label htmlFor="confirmPassword">Confirm Password</label>
                          <input
                            name="confirmPassword"
                            id="confirmPassword"
                            type="password"
                            className="form-control"
                            value={formData.confirmPassword}
                            onChange={handlePasswordChange}
                          />
                        
                        </div>
                      </div> */}
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
                      {/* <div className="form-row">
            
                      <div className="col-md-6">
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
                              <label htmlFor="user_status_active" className="text-success mx-2">
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
                              <label htmlFor="user_status_deactive" className="text-danger mx-2">
                                Deactive
                              </label>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
                <div className="divider"></div>
                <div>
                  <button type="submit" className="btn btn-success px-5" onClick={handleFormSubmit}>
                    Create
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

export default CreateUserForm;

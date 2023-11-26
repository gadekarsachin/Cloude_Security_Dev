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

function EditUserProfile() {


  return (
    <div className="app-main__inner">
      <div className="card-header d-flex justify-content-between">
        <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
        Edit User Profile
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 col-lg-12">
          <div className="main-card mb-3 card">
            <div className="card-body">
              <form
             
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
                           
                          />
                          <p className="text-danger" id="email_error"></p>
                        </div>
                      </div>
                    
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
                             
                              />
                              <p className="" id="confirm_pass_error"></p>
                            </div>
                          </div>
                       
                  
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
                          {/* <SelectMp setRole={(item) => setActiveRole(item)} /> */}
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
              
                    {/* <div className="btn btn-warning text-dark px-5">
                      <span
                        className="spinner-border text-dark mx-2"
                        style={{
                          height: "16px",
                          width: "16px",
                        }}
                      ></span>
                     Updating
                    </div> */}
                
                    <button type="submit" className="btn btn-success px-5">
                      Update                   </button>
                 
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditUserProfile;



// export default EditUserProfile;
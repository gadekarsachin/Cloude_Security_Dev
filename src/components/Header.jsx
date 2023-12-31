import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../helperFunctions/apiFunction";
import { setLoginStatus, setUserInfo } from "../redux/dataSlice";
import { MdNotifications, MdLanguage } from "react-icons/md";
import { RiRadioButtonLine } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@mui/material";


function Header() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.clientData);
  const dispatch = useDispatch();
  const {
    role,
    email,
    name,
    id,
    refresh: { token },
  } = user;

  const handleNotification = () => {
    // Navigate to a specific route
    navigate('/notification');
    // console.log("handleNotification")
  };

  async function handleLogout() {
    const res = await logout(token);
    // console.log(res,token);
    dispatch(setLoginStatus({ status: false }));
    dispatch(setUserInfo({ info: {} }));
  }

  useEffect(() => {
    const lgbtn = document.getElementById("lgbtn");
    lgbtn.addEventListener("click", () => {
      handleLogout();
    });

    const edituser = document.getElementById("edituser");
    edituser.addEventListener("click", () => {
      EditUser();
    });
  }, []);


  async function EditUser() {
    navigate('/edit-user');
    console.log("Shubham Sale")
  }


  return (
    <div className="app-header header-shadow">
      <div className="app-header__logo">
        <div className="app-sidebar__heading font-size-lg">TrustSpike   Panel</div>
        <div className="header__pane ml-auto">
          <div>
            <button
              type="button"
              className="hamburger close-sidebar-btn hamburger--elastic"
              data-class="closed-sidebar"
            >
              <span className="hamburger-box">
                <span className="hamburger-inner"></span>
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="app-header__mobile-menu">
        <div>
          <button
            type="button"
            className="hamburger hamburger--elastic mobile-toggle-nav"
          >
            <span className="hamburger-box">
              <span className="hamburger-inner"></span>
            </span>
          </button>
        </div>
      </div>

      <div className="app-header__menu">

        <i class="fa-solid fa-bell mr-2 header-user-info font-size-lg"></i>

      {/* <i class="fa-solid fa-bell mr-2 header-user-info font-size-lg"></i>  */}
        <span>
          <button
            type="button"
            className="btn-icon btn-icon-only btn btn-primary btn-sm mobile-toggle-header-nav"
          >
            <span className="btn-icon-wrapper">
              <i className="fa fa-ellipsis-v fa-w-6"></i>
            </span>
          </button>
        </span>

      </div>

      <div className="app-header__content">
        {/* <div className="app-header-left">
          <div className="search-wrapper">
            <div className="input-holder">
              <input
                type="text"
                className="search-input"
                placeholder="Type to search"
              />
              <button className="search-icon">
                <span></span>
              </button>
            </div>
            <button className="close"></button>
          </div>
          <ul className="header-megamenu nav">
            <li className="nav-item">
              <a
                href="#"
                data-p
                lacement="bottom"
                rel="popover-focus"
                data-offset="300"
                data-toggle="popover-custom"
                className="nav-link"
              >
                <i className="nav-link-icon pe-7s-gift"> </i> Mega Menu
                <i className="fa fa-angle-down ml-2 opacity-5"></i>
              </a>
              <div className="rm-max-width">
                <div className="d-none popover-custom-content">
                  <div className="dropdown-mega-menu">
                    <div className="grid-menu grid-menu-3col">
                      <div className="no-gutters row">
                        <div className="col-sm-6 col-xl-4">
                          <ul className="nav flex-column">
                            <li className="nav-item-header nav-item">
                              {" "}
                              Overview
                            </li>
                            <li className="nav-item">
                              <a href="#" className="nav-link">
                                <i className="nav-link-icon lnr-inbox"></i>
                                <span> Contacts</span>
                              </a>
                            </li>
                            <li className="nav-item">
                              <a href="#" className="nav-link">
                                <i className="nav-link-icon lnr-book"></i>
                                <span> Incidents</span>
                                <div className="ml-auto badge badge-pill badge-danger">
                                  5
                                </div>
                              </a>
                            </li>
                            <li className="nav-item">
                              <a href="#" className="nav-link">
                                <i className="nav-link-icon lnr-picture"></i>
                                <span> Companies</span>
                              </a>
                            </li>
                            <li className="nav-item">
                              <a
                                disabled=""
                                href="#"
                                className="nav-link disabled"
                              >
                                <i className="nav-link-icon lnr-file-empty"></i>
                                <span> Dashboards</span>
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div className="col-sm-6 col-xl-4">
                          <ul className="nav flex-column">
                            <li className="nav-item-header nav-item">
                              {" "}
                              Favourites
                            </li>
                            <li className="nav-item">
                              <a href="#" className="nav-link">
                                {" "}
                                Reports Conversions{" "}
                              </a>
                            </li>
                            <li className="nav-item">
                              <a href="#" className="nav-link">
                                {" "}
                                Quick Start
                                <div className="ml-auto badge badge-success">
                                  New
                                </div>
                              </a>
                            </li>
                            <li className="nav-item">
                              <a href="#" className="nav-link">
                                Users &amp; Groups
                              </a>
                            </li>
                            <li className="nav-item">
                              <a href="#" className="nav-link">
                                Proprieties
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div className="col-sm-6 col-xl-4">
                          <ul className="nav flex-column">
                            <li className="nav-item-header nav-item">
                              Sales &amp; Marketing
                            </li>
                            <li className="nav-item">
                              <a href="#" className="nav-link">
                                Queues{" "}
                              </a>
                            </li>
                            <li className="nav-item">
                              <a href="#" className="nav-link">
                                Resource Groups{" "}
                              </a>
                            </li>
                            <li className="nav-item">
                              <a href="#" className="nav-link">
                                Goal Metrics
                                <div className="ml-auto badge badge-warning">
                                  3
                                </div>
                              </a>
                            </li>
                            <li className="nav-item">
                              <a href="#" className="nav-link">
                                Campaigns
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li className="btn-group nav-item">
              <a
                className="nav-link"
                data-toggle="dropdown"
                aria-expanded="false"
              >
                <span className="badge badge-pill badge-danger ml-0 mr-2">
                  4
                </span>{" "}
                Settings
                <i className="fa fa-angle-down ml-2 opacity-5"></i>
              </a>
              <div
                tabIndex="-1"
                role="menu"
                aria-hidden="true"
                className="rm-pointers dropdown-menu"
              >
                <div className="dropdown-menu-header">
                  <div className="dropdown-menu-header-inner bg-secondary">
                    <div
                      className="menu-header-image opacity-5"
                      style={{
                        backgroundImage:
                          "url('assets/images/dropdown-header/abstract2.jpg')",
                      }}
                    ></div>
                    <div className="menu-header-content">
                      <h5 className="menu-header-title">Overview</h5>
                      <h6 className="menu-header-subtitle">
                        Dropdown menus for everyone
                      </h6>
                    </div>
                  </div>
                </div>
                <div className="scroll-area-xs">
                  <div className="scrollbar-container">
                    <h6 tabIndex="-1" className="dropdown-header">
                      Key Figures
                    </h6>
                    <button
                      type="button"
                      tabIndex="0"
                      className="dropdown-item"
                    >
                      Service Calendar
                    </button>
                    <button
                      type="button"
                      tabIndex="0"
                      className="dropdown-item"
                    >
                      Knowledge Base
                    </button>
                    <button
                      type="button"
                      tabIndex="0"
                      className="dropdown-item"
                    >
                      Accounts
                    </button>
                    <div tabIndex="-1" className="dropdown-divider"></div>
                    <button
                      type="button"
                      tabIndex="0"
                      className="dropdown-item"
                    >
                      Products
                    </button>
                    <button
                      type="button"
                      tabIndex="0"
                      className="dropdown-item"
                    >
                      Rollup Queries
                    </button>
                  </div>
                </div>
                <ul className="nav flex-column">
                  <li className="nav-item-divider nav-item"></li>
                  <li className="nav-item-btn nav-item">
                    <button className="btn-wide btn-shadow btn btn-danger btn-sm">
                      Cancel
                    </button>
                  </li>
                </ul>
              </div>
            </li>
            <li className="dropdown nav-item">
              <a
                aria-haspopup="true"
                data-toggle="dropdown"
                className="nav-link"
                aria-expanded="false"
              >
                <i className="nav-link-icon pe-7s-settings"></i> Projects
                <i className="fa fa-angle-down ml-2 opacity-5"></i>
              </a>
              <div
                tabIndex="-1"
                role="menu"
                aria-hidden="true"
                className="dropdown-menu-rounded dropdown-menu-lg rm-pointers dropdown-menu"
              >
                <div className="dropdown-menu-header">
                  <div className="dropdown-menu-header-inner bg-success">
                    <div
                      className="menu-header-image opacity-1"
                      style={{
                        backgroundImage:
                          "url('assets/images/dropdown-header/abstract3.jpg')",
                      }}
                    ></div>
                    <div className="menu-header-content text-left">
                      <h5 className="menu-header-title">Overview</h5>
                      <h6 className="menu-header-subtitle">
                        Unlimited options
                      </h6>
                      <div className="menu-header-btn-pane">
                        <button className="mr-2 btn btn-dark btn-sm">
                          Settings
                        </button>
                        <button className="btn-icon btn-icon-only btn btn-warning btn-sm">
                          <i className="pe-7s-config btn-icon-wrapper"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <button type="button" tabIndex="0" className="dropdown-item">
                  <i className="dropdown-icon lnr-file-empty"></i>Graphic Design
                </button>
                <button type="button" tabIndex="0" className="dropdown-item">
                  <i className="dropdown-icon lnr-file-empty"> </i>App
                  Development
                </button>
                <button type="button" tabIndex="0" className="dropdown-item">
                  <i className="dropdown-icon lnr-file-empty"> </i>Icon Design
                </button>
                <div tabIndex="-1" className="dropdown-divider"></div>
                <button type="button" tabIndex="0" className="dropdown-item">
                  <i className="dropdown-icon lnr-file-empty"></i>Miscellaneous
                </button>
                <button type="button" tabIndex="0" className="dropdown-item">
                  <i className="dropdown-icon lnr-file-empty"></i>Frontend Dev
                </button>
              </div>
            </li>
          </ul>
        </div> */}


        <div className="app-header-right">
          <div className="header-dots">
            {/* <div className="dropdown">
              <button
                type="button"
                aria-haspopup="true"
                aria-expanded="false"
                data-toggle="dropdown"
                className="p-0 mr-2 btn btn-link"
              >
                <span className="icon-wrapper icon-wrapper-alt rounded-circle">
                  <span className="icon-wrapper-bg bg-primary"></span>
                  <i className="icon text-primary ion-android-apps"></i>
                </span>
              </button>
              <div
                tabIndex="-1"
                role="menu"
                aria-hidden="true"
                className="dropdown-menu-xl rm-pointers dropdown-menu dropdown-menu-right"
              >
                <div className="dropdown-menu-header">
                  <div className="dropdown-menu-header-inner bg-plum-plate">
                    <div
                      className="menu-header-image"
                      style={{
                        backgroundImage:
                          "url('assets/images/dropdown-header/abstract4.jpg')",
                      }}
                    ></div>
                    <div className="menu-header-content text-white">
                      <h5 className="menu-header-title">Grid Dashboard</h5>
                      <h6 className="menu-header-subtitle">
                        Easy grid navigation inside dropdowns
                      </h6>
                    </div>
                  </div>
                </div>
                <div className="grid-menu grid-menu-xl grid-menu-3col">
                  <div className="no-gutters row">
                    <div className="col-sm-6 col-xl-4">
                      <button className="btn-icon-vertical btn-square btn-transition btn btn-outline-link">
                        <i className="pe-7s-world icon-gradient bg-night-fade btn-icon-wrapper btn-icon-lg mb-3"></i>
                        Automation
                      </button>
                    </div>
                    <div className="col-sm-6 col-xl-4">
                      <button className="btn-icon-vertical btn-square btn-transition btn btn-outline-link">
                        <i className="pe-7s-piggy icon-gradient bg-night-fade btn-icon-wrapper btn-icon-lg mb-3"></i>{" "}
                        Reports
                      </button>
                    </div>
                    <div className="col-sm-6 col-xl-4">
                      <button className="btn-icon-vertical btn-square btn-transition btn btn-outline-link">
                        <i className="pe-7s-config icon-gradient bg-night-fade btn-icon-wrapper btn-icon-lg mb-3"></i>{" "}
                        Settings
                      </button>
                    </div>
                    <div className="col-sm-6 col-xl-4">
                      <button className="btn-icon-vertical btn-square btn-transition btn btn-outline-link">
                        <i className="pe-7s-browser icon-gradient bg-night-fade btn-icon-wrapper btn-icon-lg mb-3"></i>{" "}
                        Content
                      </button>
                    </div>
                    <div className="col-sm-6 col-xl-4">
                      <button className="btn-icon-vertical btn-square btn-transition btn btn-outline-link">
                        <i className="pe-7s-hourglass icon-gradient bg-night-fade btn-icon-wrapper btn-icon-lg mb-3"></i>
                        Activity
                      </button>
                    </div>
                    <div className="col-sm-6 col-xl-4">
                      <button className="btn-icon-vertical btn-square btn-transition btn btn-outline-link">
                        <i className="pe-7s-world icon-gradient bg-night-fade btn-icon-wrapper btn-icon-lg mb-3"></i>{" "}
                        Contacts
                      </button>
                    </div>
                  </div>
                </div>
                <ul className="nav flex-column">
                  <li className="nav-item-divider nav-item"></li>
                  <li className="nav-item-btn text-center nav-item">
                    <button className="btn-shadow btn btn-primary btn-sm">
                      Follow-ups
                    </button>
                  </li>
                </ul>
              </div>
            </div> */}
            {/* <div className="dropdown">
              <button
                type="button"
                aria-haspopup="true"
                aria-expanded="false"
                data-toggle="dropdown"
                className="p-0 mr-2 btn btn-link"
              >
                <span className="icon-wrapper icon-wrapper-alt rounded-circle">
                  <span className="icon-wrapper-bg bg-danger"></span>
                  <i className="icon text-danger icon-anim-pulse make-vcenter">
                    <MdNotifications className=" text-danger" size={22} />
                  </i>
                  <span className="badge badge-dot badge-dot-sm badge-danger">
                    Notifications
                  </span>
                </span>
              </button>
              <div
                tabIndex="-1"
                role="menu"
                aria-hidden="true"
                className="dropdown-menu-xl rm-pointers dropdown-menu dropdown-menu-right"
              >
                <div className="dropdown-menu-header mb-0">
                  <div className="dropdown-menu-header-inner bg-deep-blue">
                    <div
                      className="menu-header-image opacity-1"
                      style={{
                        backgroundImage:
                          "url('assets/images/dropdown-header/city3.jpg')",
                      }}
                    ></div>
                    <div className="menu-header-content text-dark">
                      <h5 className="menu-header-title">Notifications</h5>
                      <h6 className="menu-header-subtitle">
                        You have <b>21</b> unread messages
                      </h6>
                    </div>
                  </div>
                </div>
                <ul className="tabs-animated-shadow tabs-animated nav nav-justified tabs-shadow-bordered p-3">
                  <li className="nav-item">
                    <a
                      role="tab"
                      className="nav-link active"
                      data-toggle="tab"
                      href="#tab-messages-header"
                    >
                      <span>Messages</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      role="tab"
                      className="nav-link"
                      data-toggle="tab"
                      href="#tab-events-header"
                    >
                      <span>Events</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      role="tab"
                      className="nav-link"
                      data-toggle="tab"
                      href="#tab-errors-header"
                    >
                      <span>System Errors</span>
                    </a>
                  </li>
                </ul>
                <div className="tab-content">
                  <div
                    className="tab-pane active"
                    id="tab-messages-header"
                    role="tabpanel"
                  >
                    <div className="scroll-area-sm">
                      <div className="scrollbar-container">
                        <div className="p-3">
                          <div className="notifications-box">
                            <div className="vertical-time-simple vertical-without-time vertical-timeline vertical-timeline--one-column">
                              <div className="vertical-timeline-item dot-danger vertical-timeline-element">
                                <div>
                                  <span className="vertical-timeline-element-icon bounce-in"></span>
                                  <div className="vertical-timeline-element-content bounce-in">
                                    <h4 className="timeline-title">
                                      All Hands Meeting
                                    </h4>
                                    <span className="vertical-timeline-element-date"></span>
                                  </div>
                                </div>
                              </div>
                              <div className="vertical-timeline-item dot-warning vertical-timeline-element">
                                <div>
                                  <span className="vertical-timeline-element-icon bounce-in"></span>
                                  <div className="vertical-timeline-element-content bounce-in">
                                    <p>
                                      Yet another one, at{" "}
                                      <span className="text-success">
                                        15:00 PM
                                      </span>
                                    </p>
                                    <span className="vertical-timeline-element-date"></span>
                                  </div>
                                </div>
                              </div>
                              <div className="vertical-timeline-item dot-success vertical-timeline-element">
                                <div>
                                  <span className="vertical-timeline-element-icon bounce-in"></span>
                                  <div className="vertical-timeline-element-content bounce-in">
                                    <h4 className="timeline-title">
                                      Build the production release
                                      <span className="badge badge-danger ml-2">
                                        NEW
                                      </span>
                                    </h4>
                                    <span className="vertical-timeline-element-date"></span>
                                  </div>
                                </div>
                              </div>
                              <div className="vertical-timeline-item dot-primary vertical-timeline-element">
                                <div>
                                  <span className="vertical-timeline-element-icon bounce-in"></span>
                                  <div className="vertical-timeline-element-content bounce-in">
                                    <h4 className="timeline-title">
                                      Something not important
                                      <div className="avatar-wrapper mt-2 avatar-wrapper-overlap">
                                        <div className="avatar-icon-wrapper avatar-icon-sm">
                                          <div className="avatar-icon">
                                            <img
                                              src="assets/images/avatars/1.jpg"
                                              alt=""
                                            />
                                          </div>
                                        </div>
                                        <div className="avatar-icon-wrapper avatar-icon-sm">
                                          <div className="avatar-icon">
                                            <img
                                              src="assets/images/avatars/2.jpg"
                                              alt=""
                                            />
                                          </div>
                                        </div>
                                        <div className="avatar-icon-wrapper avatar-icon-sm">
                                          <div className="avatar-icon">
                                            <img
                                              src="assets/images/avatars/3.jpg"
                                              alt=""
                                            />
                                          </div>
                                        </div>
                                        <div className="avatar-icon-wrapper avatar-icon-sm">
                                          <div className="avatar-icon">
                                            <img
                                              src="assets/images/avatars/4.jpg"
                                              alt=""
                                            />
                                          </div>
                                        </div>
                                        <div className="avatar-icon-wrapper avatar-icon-sm">
                                          <div className="avatar-icon">
                                            <img
                                              src="assets/images/avatars/5.jpg"
                                              alt=""
                                            />
                                          </div>
                                        </div>
                                        <div className="avatar-icon-wrapper avatar-icon-sm">
                                          <div className="avatar-icon">
                                            <img
                                              src="assets/images/avatars/9.jpg"
                                              alt=""
                                            />
                                          </div>
                                        </div>
                                        <div className="avatar-icon-wrapper avatar-icon-sm">
                                          <div className="avatar-icon">
                                            <img
                                              src="assets/images/avatars/7.jpg"
                                              alt=""
                                            />
                                          </div>
                                        </div>
                                        <div className="avatar-icon-wrapper avatar-icon-sm">
                                          <div className="avatar-icon">
                                            <img
                                              src="assets/images/avatars/8.jpg"
                                              alt=""
                                            />
                                          </div>
                                        </div>
                                        <div className="avatar-icon-wrapper avatar-icon-sm avatar-icon-add">
                                          <div className="avatar-icon">
                                            <i>+</i>
                                          </div>
                                        </div>
                                      </div>
                                    </h4>
                                    <span className="vertical-timeline-element-date"></span>
                                  </div>
                                </div>
                              </div>
                              <div className="vertical-timeline-item dot-info vertical-timeline-element">
                                <div>
                                  <span className="vertical-timeline-element-icon bounce-in"></span>
                                  <div className="vertical-timeline-element-content bounce-in">
                                    <h4 className="timeline-title">
                                      This dot has an info state
                                    </h4>
                                    <span className="vertical-timeline-element-date"></span>
                                  </div>
                                </div>
                              </div>
                              <div className="vertical-timeline-item dot-danger vertical-timeline-element">
                                <div>
                                  <span className="vertical-timeline-element-icon bounce-in"></span>
                                  <div className="vertical-timeline-element-content bounce-in">
                                    <h4 className="timeline-title">
                                      All Hands Meeting
                                    </h4>
                                    <span className="vertical-timeline-element-date"></span>
                                  </div>
                                </div>
                              </div>
                              <div className="vertical-timeline-item dot-warning vertical-timeline-element">
                                <div>
                                  <span className="vertical-timeline-element-icon bounce-in"></span>
                                  <div className="vertical-timeline-element-content bounce-in">
                                    <p>
                                      Yet another one, at{" "}
                                      <span className="text-success">
                                        15:00 PM
                                      </span>
                                    </p>
                                    <span className="vertical-timeline-element-date"></span>
                                  </div>
                                </div>
                              </div>
                              <div className="vertical-timeline-item dot-success vertical-timeline-element">
                                <div>
                                  <span className="vertical-timeline-element-icon bounce-in"></span>
                                  <div className="vertical-timeline-element-content bounce-in">
                                    <h4 className="timeline-title">
                                      Build the production release
                                      <span className="badge badge-danger ml-2">
                                        NEW
                                      </span>
                                    </h4>
                                    <span className="vertical-timeline-element-date"></span>
                                  </div>
                                </div>
                              </div>
                              <div className="vertical-timeline-item dot-dark vertical-timeline-element">
                                <div>
                                  <span className="vertical-timeline-element-icon bounce-in"></span>
                                  <div className="vertical-timeline-element-content bounce-in">
                                    <h4 className="timeline-title">
                                      This dot has a dark state
                                    </h4>
                                    <span className="vertical-timeline-element-date"></span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane"
                    id="tab-events-header"
                    role="tabpanel"
                  >
                    <div className="scroll-area-sm">
                      <div className="scrollbar-container">
                        <div className="p-3">
                          <div className="vertical-without-time vertical-timeline vertical-timeline--animate vertical-timeline--one-column">
                            <div className="vertical-timeline-item vertical-timeline-element">
                              <div>
                                <span className="vertical-timeline-element-icon bounce-in">
                                  <i className="badge badge-dot badge-dot-xl badge-success"></i>
                                </span>
                                <div className="vertical-timeline-element-content bounce-in">
                                  <h4 className="timeline-title">
                                    All Hands Meeting
                                  </h4>
                                  <p>
                                    Lorem ipsum dolor sic amet, today at
                                    <a href="#">12:00 PM</a>
                                  </p>
                                  <span className="vertical-timeline-element-date"></span>
                                </div>
                              </div>
                            </div>
                            <div className="vertical-timeline-item vertical-timeline-element">
                              <div>
                                <span className="vertical-timeline-element-icon bounce-in">
                                  <i className="badge badge-dot badge-dot-xl badge-warning"></i>
                                </span>
                                <div className="vertical-timeline-element-content bounce-in">
                                  <p>
                                    Another meeting today, at{" "}
                                    <b className="text-danger">12:00 PM</b>
                                  </p>
                                  <p>
                                    Yet another one, at{" "}
                                    <span className="text-success">
                                      15:00 PM
                                    </span>
                                  </p>
                                  <span className="vertical-timeline-element-date"></span>
                                </div>
                              </div>
                            </div>
                            <div className="vertical-timeline-item vertical-timeline-element">
                              <div>
                                <span className="vertical-timeline-element-icon bounce-in">
                                  <i className="badge badge-dot badge-dot-xl badge-danger"></i>
                                </span>
                                <div className="vertical-timeline-element-content bounce-in">
                                  <h4 className="timeline-title">
                                    Build the production release
                                  </h4>
                                  <p>
                                    Lorem ipsum dolor sit amit,consectetur
                                    eiusmdd tempor incididunt ut labore et
                                    dolore magna elit enim at minim veniam quis
                                    nostrud
                                  </p>
                                  <span className="vertical-timeline-element-date"></span>
                                </div>
                              </div>
                            </div>
                            <div className="vertical-timeline-item vertical-timeline-element">
                              <div>
                                <span className="vertical-timeline-element-icon bounce-in">
                                  <i className="badge badge-dot badge-dot-xl badge-primary"></i>
                                </span>
                                <div className="vertical-timeline-element-content bounce-in">
                                  <h4 className="timeline-title text-success">
                                    Something not important
                                  </h4>
                                  <p>
                                    Lorem ipsum dolor sit amit,consectetur elit
                                    enim at minim veniam quis nostrud
                                  </p>
                                  <span className="vertical-timeline-element-date"></span>
                                </div>
                              </div>
                            </div>
                            <div className="vertical-timeline-item vertical-timeline-element">
                              <div>
                                <span className="vertical-timeline-element-icon bounce-in">
                                  <i className="badge badge-dot badge-dot-xl badge-success"></i>
                                </span>
                                <div className="vertical-timeline-element-content bounce-in">
                                  <h4 className="timeline-title">
                                    All Hands Meeting
                                  </h4>
                                  <p>
                                    Lorem ipsum dolor sic amet, today at
                                    <a href="#">12:00 PM</a>
                                  </p>
                                  <span className="vertical-timeline-element-date"></span>
                                </div>
                              </div>
                            </div>
                            <div className="vertical-timeline-item vertical-timeline-element">
                              <div>
                                <span className="vertical-timeline-element-icon bounce-in">
                                  <i className="badge badge-dot badge-dot-xl badge-warning"></i>
                                </span>
                                <div className="vertical-timeline-element-content bounce-in">
                                  <p>
                                    Another meeting today, at{" "}
                                    <b className="text-danger">12:00 PM</b>
                                  </p>
                                  <p>
                                    Yet another one, at{" "}
                                    <span className="text-success">
                                      15:00 PM
                                    </span>
                                  </p>
                                  <span className="vertical-timeline-element-date"></span>
                                </div>
                              </div>
                            </div>
                            <div className="vertical-timeline-item vertical-timeline-element">
                              <div>
                                <span className="vertical-timeline-element-icon bounce-in">
                                  <i className="badge badge-dot badge-dot-xl badge-danger"></i>
                                </span>
                                <div className="vertical-timeline-element-content bounce-in">
                                  <h4 className="timeline-title">
                                    Build the production release
                                  </h4>
                                  <p>
                                    Lorem ipsum dolor sit amit,consectetur
                                    eiusmdd tempor incididunt ut labore et
                                    dolore magna elit enim at minim veniam quis
                                    nostrud
                                  </p>
                                  <span className="vertical-timeline-element-date"></span>
                                </div>
                              </div>
                            </div>
                            <div className="vertical-timeline-item vertical-timeline-element">
                              <div>
                                <span className="vertical-timeline-element-icon bounce-in">
                                  <i className="badge badge-dot badge-dot-xl badge-primary"></i>
                                </span>
                                <div className="vertical-timeline-element-content bounce-in">
                                  <h4 className="timeline-title text-success">
                                    Something not important
                                  </h4>
                                  <p>
                                    Lorem ipsum dolor sit amit,consectetur elit
                                    enim at minim veniam quis nostrud
                                  </p>
                                  <span className="vertical-timeline-element-date"></span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane"
                    id="tab-errors-header"
                    role="tabpanel"
                  >
                    <div className="scroll-area-sm">
                      <div className="scrollbar-container">
                        <div className="no-results pt-3 pb-0">
                          <div className="swal2-icon swal2-success swal2-animate-success-icon">
                            <div
                              className="swal2-success-circular-line-left"
                              style={{ backgroundColor: "rgb(255, 255, 255)" }}
                            ></div>
                            <span className="swal2-success-line-tip"></span>
                            <span className="swal2-success-line-long"></span>
                            <div className="swal2-success-ring"></div>
                            <div
                              className="swal2-success-fix"
                              style={{ backgroundColor: "rgb(255, 255, 255)" }}
                            ></div>
                            <div
                              className="swal2-success-circular-line-right"
                              style={{ backgroundColor: "rgb(255, 255, 255)" }}
                            ></div>
                          </div>
                          <div className="results-subtitle">All caught up!</div>
                          <div className="results-title">
                            There are no system errors!
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <ul className="nav flex-column">
                  <li className="nav-item-divider nav-item"></li>
                  <li className="nav-item-btn text-center nav-item">
                    <button className="btn-shadow btn-wide btn-pill btn btn-focus btn-sm">
                      View Latest Changes
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div className="dropdown">
              <button
                type="button"
                data-toggle="dropdown"
                className="p-0 mr-2 btn btn-link"
              >
                <span className="icon-wrapper icon-wrapper-alt rounded-circle">
                  <span className="icon-wrapper-bg bg-info"></span>
                  <span className="language-icon opacity-8 flag large DE make-vcenter icon-anim-pulse">
                    <MdLanguage className=" text-info" size={24} />
                  </span>
                </span>
              </button>
              <div
                tabIndex="-1"
                role="menu"
                aria-hidden="true"
                className="rm-pointers dropdown-menu dropdown-menu-right"
              >
                <div className="dropdown-menu-header">
                  <div className="dropdown-menu-header-inner pt-4 pb-4 bg-focus">
                    <div
                      className="menu-header-image opacity-05"
                      style={{
                        backgroundImage:
                          "url('assets/images/dropdown-header/city2.jpg')",
                      }}
                    ></div>
                    <div className="menu-header-content text-center text-white">
                      <h6 className="menu-header-subtitle mt-0">
                        {" "}
                        Choose Language
                      </h6>
                    </div>
                  </div>
                </div>
                <h6 tabIndex="-1" className="dropdown-header">
                  {" "}
                  Popular Languages
                </h6>
                <button type="button" tabIndex="0" className="dropdown-item">
                  <span className="mr-3 opacity-8 flag large US"></span> USA
                </button>
                <button type="button" tabIndex="0" className="dropdown-item">
                  <span className="mr-3 opacity-8 flag large CH"></span>{" "}
                  Switzerland
                </button>
                <button type="button" tabIndex="0" className="dropdown-item">
                  <span className="mr-3 opacity-8 flag large FR"></span> France
                </button>
                <button type="button" tabIndex="0" className="dropdown-item">
                  <span className="mr-3 opacity-8 flag large ES"></span>Spain
                </button>
                <div tabIndex="-1" className="dropdown-divider"></div>
                <h6 tabIndex="-1" className="dropdown-header">
                  Others
                </h6>
                <button
                  type="button"
                  tabIndex="0"
                  className="dropdown-item active"
                >
                  <span className="mr-3 opacity-8 flag large DE"></span> Germany
                </button>
                <button type="button" tabIndex="0" className="dropdown-item">
                  <span className="mr-3 opacity-8 flag large IT"></span> Italy
                </button>
              </div>
            </div>
            <div className="dropdown">
              <button
                type="button"
                aria-haspopup="true"
                data-toggle="dropdown"
                aria-expanded="false"
                className="p-0 btn btn-link dd-chart-btn"
              >
                <span className="icon-wrapper icon-wrapper-alt rounded-circle">
                  <span className="icon-wrapper-bg bg-success"></span>
                  <i className="icon text-success make-vcenter icon-anim-pulse">
                    <RiRadioButtonLine className="text-success" size={24} />
                  </i>
                </span>
              </button>
              <div
                tabIndex="-1"
                role="menu"
                aria-hidden="true"
                className="dropdown-menu-xl rm-pointers dropdown-menu dropdown-menu-right"
              >
                <div className="dropdown-menu-header">
                  <div className="dropdown-menu-header-inner bg-premium-dark">
                    <div
                      className="menu-header-image"
                      style={{
                        backgroundImage:
                          "url('assets/images/dropdown-header/abstract4.jpg')",
                      }}
                    ></div>
                    <div className="menu-header-content text-white">
                      <h5 className="menu-header-title">Users Online</h5>
                      <h6 className="menu-header-subtitle">
                        Recent Account Activity Overview
                      </h6>
                    </div>
                  </div>
                </div>
                <div className="widget-chart">
                  <div className="widget-chart-content">
                    <div className="icon-wrapper rounded-circle">
                      <div className="icon-wrapper-bg opacity-9 bg-focus"></div>
                      <i className="lnr-users text-white"></i>
                    </div>
                    <div className="widget-numbers">
                      <span>344k</span>
                    </div>
                    <div className="widget-subheading pt-2">
                      Profile views since last login
                    </div>
                    <div className="widget-description text-danger">
                      <span className="pr-1">
                        <span>176%</span>
                      </span>
                      <i className="fa fa-arrow-left"></i>
                    </div>
                  </div>
                  <div className="widget-chart-wrapper">
                    <div id="dashboard-sparkline-carousel-3-pop"></div>
                  </div>
                </div>
                <ul className="nav flex-column">
                  <li className="nav-item-divider mt-0 nav-item"></li>
                  <li className="nav-item-btn text-center nav-item">
                    <button className="btn-shine btn-wide btn-pill btn btn-warning btn-sm">
                      <i className="fa fa-cog fa-spin mr-2"></i>View Details
                    </button>
                  </li>
                </ul>
              </div>
            </div> */}

            <i onClick={handleNotification} class="fa-solid fa-bell ml-2 header-user-info font-size-lg"></i>

          </div>
          <div className="header-btn-lg pr-0">
            <div className="widget-content p-0">


              <div className="widget-content-wrapper">
                {/* <Link to="/createtemplate">
                <button>hello</button>
                </Link> */}

                <Link
                  to="/createtemplate"
                  className="btn btn-outline-primary d-flex justify-content-center align-items-sm-center mx-3"
              
                >
                 Create New Template
                  
                </Link>

                <div className="widget-content-left">
                  <div className="btn-group">
                    <a
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      className="p-0 btn"
                    >
                      <img
                        width="42"
                        className="rounded-circle"
                        src={require("../assets/images/user.png")}
                        alt=""
                      />
                      <i className="fa fa-angle-down ml-2 opacity-8"></i>

                    </a>

                    <div
                      tabIndex="-1"
                      role="menu"
                      aria-hidden="true"
                      className="rm-pointers dropdown-menu-lg dropdown-menu dropdown-menu-right"
                    >
                      <div className="dropdown-menu-header">
                        <div className="dropdown-menu-header-inner bg-info">
                          <div
                            className="menu-header-image opacity-08"
                            style={{
                              backgroundImage:
                                "url('assets/images/dropdown-header/city3.jpg')",
                            }}
                          ></div>
                          <div className="menu-header-content text-left">
                            <div className="widget-content p-0">
                              <div className="widget-content-wrapper">
                                <div className="widget-content-left mr-3">
                                  <img
                                    width="42"
                                    className="rounded-circle"
                                    src={require("../assets/images/user.png")}
                                    alt="user logo"
                                  />
                                </div>
                                <div className="widget-content-left">
                                  <div className="widget-heading text-dark">
                                    {name ? name.toUpperCase() : "abc"}
                                  </div>
                                  {/* <div className="widget-subheading opacity-8">
                                    {email?email.toLowerCase():'abc@gmail.com'}
                                  </div> */}
                                </div>
                                <i id="edituser" class="fa-solid fa-pen-to-square widget-content-right "></i>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="scroll-area-xs"
                        style={{ height: "125px" }}
                      >
                        <div className="scrollbar-container ps">
                          <ul className="nav flex-column">
                            <li className="nav-item-header nav-item">
                              UserId: {id ? id : "User Id"}
                            </li>

                            <li className="nav-item-header nav-item">

                              Email: {email ? email : ""}

                            </li>

                            <li
                              className="nav-item"
                              style={{
                                padding: "10px 3px",
                                display: "flex",
                              }}
                            >
                              <div className="widget-content-right mr-2">
                                <button
                                  id="lgbtn"
                                  type="button"
                                  className="btn-pill btn-shadow btn-shine btn btn-focus"
                                >
                                  Logout
                                </button>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="widget-content-left  ml-3 header-user-info">
                  <div className="widget-heading"> {name ? name : ""} </div>
                  {/* <div className="widget-subheading">ID: {id ? id : ""} </div> */}
                </div>

              </div>
            </div>
          </div>
          {/* <div className="header-btn-lg">
            <button
              type="button"
              className="hamburger hamburger--elastic open-right-drawer"
            >
              <span className="hamburger-box">
                <span className="hamburger-inner"></span>
              </span>
            </button>
          </div> */}
        </div>

      </div>
    </div>
  );
}

export default Header;

import React from "react";

function Footer() {
  return (
    <div className="app-wrapper-footer">
      <div className="app-footer">
        <div className="app-footer__inner">
          <div className=" mx-auto">
            <p>
              Allrights reserved 2022<sup>@</sup>.
            </p>
          </div>
          {/* <div className="app-footer-left">
            <div className="footer-dots">
              <div className="dropdown">
                <a
                  aria-haspopup="true"
                  aria-expanded="false"
                  data-toggle="dropdown"
                  className="dot-btn-wrapper"
                >
                  <i className="dot-btn-icon lnr-bullhorn icon-gradient bg-mean-fruit"></i>
                  <div className="badge badge-dot badge-abs badge-dot-sm badge-danger">
                    Notifications
                  </div>
                </a>
                <div
                  tabIndex="-1"
                  role="menu"
                  aria-hidden="true"
                  className="dropdown-menu-xl rm-pointers dropdown-menu"
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
                        href="#tab-messages-header1"
                      >
                        <span>Messages</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        role="tab"
                        className="nav-link"
                        data-toggle="tab"
                        href="#tab-events-header1"
                      >
                        <span>Events</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        role="tab"
                        className="nav-link"
                        data-toggle="tab"
                        href="#tab-errors-header1"
                      >
                        <span>System Errors</span>
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content">
                    <div
                      className="tab-pane active"
                      id="tab-messages-header1"
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
                                        Yet another one, at
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
                                        Yet another one, at
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
                      id="tab-events-header1"
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
                                      Another meeting today, at
                                      <b className="text-danger">12:00 PM</b>
                                    </p>
                                    <p>
                                      Yet another one, at{" "}
                                      <span className="text-success">15:00 PM</span>
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
                                      dolore magna elit enim at minim veniam
                                      quis nostrud
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
                                      Lorem ipsum dolor sit amit,consectetur
                                      elit enim at minim veniam quis nostrud
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
                                      Another meeting today, at
                                      <b className="text-danger">12:00 PM</b>
                                    </p>
                                    <p>
                                      Yet another one, at{" "}
                                      <span className="text-success">15:00 PM</span>
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
                                      dolore magna elit enim at minim veniam
                                      quis nostrud
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
                                      Lorem ipsum dolor sit amit,consectetur
                                      elit enim at minim veniam quis nostrud
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
                      id="tab-errors-header1"
                      role="tabpanel"
                    >
                      <div className="scroll-area-sm">
                        <div className="scrollbar-container">
                          <div className="no-results pt-3 pb-0">
                            <div className="swal2-icon swal2-success swal2-animate-success-icon">
                              <div
                                className="swal2-success-circular-line-left"
                                style={{
                                  backgroundColor: "rgb(255, 255, 255)",
                                }}
                              ></div>
                              <span className="swal2-success-line-tip"></span>
                              <span className="swal2-success-line-long"></span>
                              <div className="swal2-success-ring"></div>
                              <div
                                className="swal2-success-fix"
                                style={{
                                  backgroundColor: "rgb(255, 255, 255)",
                                }}
                              ></div>
                              <div
                                className="swal2-success-circular-line-right"
                                style={{
                                  backgroundColor: "rgb(255, 255, 255)",
                                }}
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
              <div className="dots-separator"></div>
              <div className="dropdown">
                <a
                  className="dot-btn-wrapper"
                  aria-haspopup="true"
                  data-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="dot-btn-icon lnr-earth icon-gradient bg-happy-itmeo"></i>
                </a>
                <div
                  tabIndex="-1"
                  role="menu"
                  aria-hidden="true"
                  className="rm-pointers dropdown-menu"
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
                    <span className="mr-3 opacity-8 flag large FR"></span>France
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
                    <span className="mr-3 opacity-8 flag large DE"></span>Germany
                  </button>
                  <button type="button" tabIndex="0" className="dropdown-item">
                    <span className="mr-3 opacity-8 flag large IT"></span> Italy
                  </button>
                </div>
              </div>
              <div className="dots-separator"></div>
              <div className="dropdown">
                <a
                  className="dot-btn-wrapper dd-chart-btn-2"
                  aria-haspopup="true"
                  data-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="dot-btn-icon lnr-pie-chart icon-gradient bg-love-kiss"></i>
                  <div className="badge badge-dot badge-abs badge-dot-sm badge-warning">
                    Notifications
                  </div>
                </a>
                <div
                  tabIndex="-1"
                  role="menu"
                  aria-hidden="true"
                  className="dropdown-menu-xl rm-pointers dropdown-menu"
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
                        {" "}
                        Profile views since last login
                      </div>
                      <div className="widget-description text-danger">
                        <span className="pr-1">
                          {" "}
                          <span>176%</span>
                        </span>
                        <i className="fa fa-arrow-left"></i>
                      </div>
                    </div>
                    <div className="widget-chart-wrapper">
                      <div id="dashboard-sparkline-carousel-4-pop"></div>
                    </div>
                  </div>
                  <ul className="nav flex-column">
                    <li className="nav-item-divider mt-0 nav-item"></li>
                    <li className="nav-item-btn text-center nav-item">
                      <button className="btn-shine btn-wide btn-pill btn btn-warning btn-sm">
                        <i className="fa fa-cog fa-spin mr-2"></i> View Details
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div> */}
          {/* <div className="app-footer-right">
            <ul className="header-megamenu nav">
              <li className="nav-item">
                <a
                  data-placement="top"
                  rel="popover-focus"
                  data-offset="300"
                  data-toggle="popover-custom"
                  className="nav-link"
                >
                  Footer Menu
                  <i className="fa fa-angle-up ml-2 opacity-8"></i>
                </a>
                <div className="rm-max-width rm-pointers">
                  <div className="d-none popover-custom-content">
                    <div className="dropdown-mega-menu dropdown-mega-menu-sm">
                      <div className="grid-menu grid-menu-2col">
                        <div className="no-gutters row">
                          <div className="col-sm-6 col-xl-6">
                            <ul className="nav flex-column">
                              <li className="nav-item-header nav-item">Overview</li>
                              <li className="nav-item">
                                <a className="nav-link">
                                  <i className="nav-link-icon lnr-inbox"></i>
                                  <span>Contacts</span>
                                </a>
                              </li>
                              <li className="nav-item">
                                <a className="nav-link">
                                  <i className="nav-link-icon lnr-book"></i>
                                  <span>Incidents</span>
                                  <div className="ml-auto badge badge-pill badge-danger">
                                    5
                                  </div>
                                </a>
                              </li>
                              <li className="nav-item">
                                <a className="nav-link">
                                  <i className="nav-link-icon lnr-picture"></i>
                                  <span>Companies</span>
                                </a>
                              </li>
                              <li className="nav-item">
                                <a disabled="" className="nav-link disabled">
                                  <i className="nav-link-icon lnr-file-empty"></i>
                                  <span>Dashboards</span>
                                </a>
                              </li>
                            </ul>
                          </div>
                          <div className="col-sm-6 col-xl-6">
                            <ul className="nav flex-column">
                              <li className="nav-item-header nav-item">
                                Sales &amp; Marketing
                              </li>
                              <li className="nav-item">
                                <a className="nav-link">Queues</a>
                              </li>
                              <li className="nav-item">
                                <a className="nav-link">Resource Groups</a>
                              </li>
                              <li className="nav-item">
                                <a className="nav-link">
                                  Goal Metrics
                                  <div className="ml-auto badge badge-warning">
                                    3
                                  </div>
                                </a>
                              </li>
                              <li className="nav-item">
                                <a className="nav-link">Campaigns</a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="nav-item">
                <a
                  data-placement="top"
                  rel="popover-focus"
                  data-offset="300"
                  data-toggle="popover-custom"
                  className="nav-link"
                >
                  Grid Menu
                  <div className="badge badge-dark ml-0 ml-1">
                    <small>NEW</small>
                  </div>
                  <i className="fa fa-angle-up ml-2 opacity-8"></i>
                </a>
                <div className="rm-max-width rm-pointers">
                  <div className="d-none popover-custom-content">
                    <div className="dropdown-menu-header">
                      <div className="dropdown-menu-header-inner bg-tempting-azure">
                        <div
                          className="menu-header-image opacity-1"
                          style={{
                            backgroundImage:
                              "url('assets/images/dropdown-header/city5.jpg')",
                          }}
                        ></div>
                        <div className="menu-header-content text-dark">
                          <h5 className="menu-header-title">Two Column Grid</h5>
                          <h6 className="menu-header-subtitle">
                            Easy grid navigation inside popovers
                          </h6>
                        </div>
                      </div>
                    </div>
                    <div className="grid-menu grid-menu-2col">
                      <div className="no-gutters row">
                        <div className="col-sm-6">
                          <button className="btn-icon-vertical btn-transition-text btn-transition btn-transition-alt pt-2 pb-2 btn btn-outline-dark">
                            <i className="lnr-lighter text-dark opacity-7 btn-icon-wrapper mb-2"></i>
                            Automation
                          </button>
                        </div>
                        <div className="col-sm-6">
                          <button className="btn-icon-vertical btn-transition-text btn-transition btn-transition-alt pt-2 pb-2 btn btn-outline-danger">
                            <i className="lnr-construction text-danger opacity-7 btn-icon-wrapper mb-2"></i>
                            Reports
                          </button>
                        </div>
                        <div className="col-sm-6">
                          <button className="btn-icon-vertical btn-transition-text btn-transition btn-transition-alt pt-2 pb-2 btn btn-outline-success">
                            <i className="lnr-bus text-success opacity-7 btn-icon-wrapper mb-2"></i>
                            Activity
                          </button>
                        </div>
                        <div className="col-sm-6">
                          <button className="btn-icon-vertical btn-transition-text btn-transition btn-transition-alt pt-2 pb-2 btn btn-outline-focus">
                            <i className="lnr-gift text-focus opacity-7 btn-icon-wrapper mb-2"></i>
                            Settings
                          </button>
                        </div>
                      </div>
                    </div>
                    <ul className="nav flex-column">
                      <li className="nav-item-divider nav-item"></li>
                      <li className="nav-item-btn clearfix nav-item">
                        <div className="float-left">
                          <button className="btn btn-link btn-sm">
                            Link Button
                          </button>
                        </div>
                        <div className="float-right">
                          <button className="btn-shadow btn btn-info btn-sm">
                            Info Button
                          </button>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Footer;

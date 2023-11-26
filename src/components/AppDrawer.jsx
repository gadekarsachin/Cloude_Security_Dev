import React from "react";

function AppDrawer() {
  return (
    <div className="app-drawer-wrapper">
      <div className="drawer-nav-btn">
        <button type="button" className="hamburger hamburger--elastic is-active">
          <span className="hamburger-box">
            <span className="hamburger-inner"></span>
          </span>
        </button>
      </div>
      <div className="drawer-content-wrapper">
        <div className="scrollbar-container">
          <h3 className="drawer-heading">Servers Status</h3>
          <div className="drawer-section">
            <div className="row">
              <div className="col">
                <div className="progress-box">
                  <h4>Server Load 1</h4>
                  <div className="circle-progress circle-progress-gradient-xl mx-auto">
                    <small></small>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="progress-box">
                  <h4>Server Load 2</h4>
                  <div className="circle-progress circle-progress-success-xl mx-auto">
                    <small></small>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="progress-box">
                  <h4>Server Load 3</h4>
                  <div className="circle-progress circle-progress-danger-xl mx-auto">
                    <small></small>
                  </div>
                </div>
              </div>
            </div>
            <div className="divider"></div>
            <div className="mt-3">
              <h5 className="text-center card-title">Live Statistics</h5>
              <div id="sparkline-carousel-3"></div>
              <div className="row">
                <div className="col">
                  <div className="widget-chart p-0">
                    <div className="widget-chart-content">
                      <div className="widget-numbers text-warning fsize-3">43</div>
                      <div className="widget-subheading pt-1">Packages</div>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="widget-chart p-0">
                    <div className="widget-chart-content">
                      <div className="widget-numbers text-danger fsize-3">65</div>
                      <div className="widget-subheading pt-1">Dropped</div>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="widget-chart p-0">
                    <div className="widget-chart-content">
                      <div className="widget-numbers text-success fsize-3">18</div>
                      <div className="widget-subheading pt-1">Invalid</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="divider"></div>
              <div className="text-center mt-2 d-block">
                <button className="mr-2 border-0 btn-transition btn btn-outline-danger">
                  Escalate Issue
                </button>
                <button className="border-0 btn-transition btn btn-outline-success">
                  Support Center
                </button>
              </div>
            </div>
          </div>
          <h3 className="drawer-heading">File Transfers</h3>
          <div className="drawer-section p-0">
            <div className="files-box">
              <ul className="list-group list-group-flush">
                <li className="pt-2 pb-2 pr-2 list-group-item">
                  <div className="widget-content p-0">
                    <div className="widget-content-wrapper">
                      <div className="widget-content-left opacity-6 fsize-2 mr-3 text-primary center-elem">
                        <i className="fa fa-file-alt"></i>
                      </div>
                      <div className="widget-content-left">
                        <div className="widget-heading font-weight-normal">
                          TPSReport.docx
                        </div>
                      </div>
                      <div className="widget-content-right widget-content-actions">
                        <button className="btn-icon btn-icon-only btn btn-link btn-sm">
                          <i className="fa fa-cloud-download-alt"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="pt-2 pb-2 pr-2 list-group-item">
                  <div className="widget-content p-0">
                    <div className="widget-content-wrapper">
                      <div className="widget-content-left opacity-6 fsize-2 mr-3 text-warning center-elem">
                        <i className="fa fa-file-archive"></i>
                      </div>
                      <div className="widget-content-left">
                        <div className="widget-heading font-weight-normal">
                          Latest_photos.zip
                        </div>
                      </div>
                      <div className="widget-content-right widget-content-actions">
                        <button className="btn-icon btn-icon-only btn btn-link btn-sm">
                          <i className="fa fa-cloud-download-alt"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="pt-2 pb-2 pr-2 list-group-item">
                  <div className="widget-content p-0">
                    <div className="widget-content-wrapper">
                      <div className="widget-content-left opacity-6 fsize-2 mr-3 text-danger center-elem">
                        <i className="fa fa-file-pdf"></i>
                      </div>
                      <div className="widget-content-left">
                        <div className="widget-heading font-weight-normal">
                          Annual Revenue.pdf
                        </div>
                      </div>
                      <div className="widget-content-right widget-content-actions">
                        <button className="btn-icon btn-icon-only btn btn-link btn-sm">
                          <i className="fa fa-cloud-download-alt"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="pt-2 pb-2 pr-2 list-group-item">
                  <div className="widget-content p-0">
                    <div className="widget-content-wrapper">
                      <div className="widget-content-left opacity-6 fsize-2 mr-3 text-success center-elem">
                        <i className="fa fa-file-excel"></i>
                      </div>
                      <div className="widget-content-left">
                        <div className="widget-heading font-weight-normal">
                          Analytics_GrowthReport.xls
                        </div>
                      </div>
                      <div className="widget-content-right widget-content-actions">
                        <button className="btn-icon btn-icon-only btn btn-link btn-sm">
                          <i className="fa fa-cloud-download-alt"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <h3 className="drawer-heading">Tasks in Progress</h3>
          <div className="drawer-section p-0">
            <div className="todo-box">
              <ul className="todo-list-wrapper list-group list-group-flush">
                <li className="list-group-item">
                  <div className="todo-indicator bg-warning"></div>
                  <div className="widget-content p-0">
                    <div className="widget-content-wrapper">
                      <div className="widget-content-left mr-2">
                        <div className="custom-checkbox custom-control">
                          <input
                            type="checkbox"
                            id="exampleCustomCheckbox1266"
                            className="custom-control-input"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="exampleCustomCheckbox1266"
                          >
                            &nbsp;
                          </label>
                        </div>
                      </div>
                      <div className="widget-content-left">
                        <div className="widget-heading">
                          Wash the car
                          <div className="badge badge-danger ml-2">Rejected</div>
                        </div>
                        <div className="widget-subheading">
                          <i>Written by Bob</i>
                        </div>
                      </div>
                      <div className="widget-content-right widget-content-actions">
                        <button className="border-0 btn-transition btn btn-outline-success">
                          <i className="fa fa-check"></i>
                        </button>
                        <button className="border-0 btn-transition btn btn-outline-danger">
                          <i className="fa fa-trash-alt"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="todo-indicator bg-focus"></div>
                  <div className="widget-content p-0">
                    <div className="widget-content-wrapper">
                      <div className="widget-content-left mr-2">
                        <div className="custom-checkbox custom-control">
                          <input
                            type="checkbox"
                            id="exampleCustomCheckbox1666"
                            className="custom-control-input"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="exampleCustomCheckbox1666"
                          >
                            &nbsp;
                          </label>
                        </div>
                      </div>
                      <div className="widget-content-left">
                        <div className="widget-heading">
                          Task with hover dropdown menu
                        </div>
                        <div className="widget-subheading">
                          <div>
                            By Johnny
                            <div className="badge badge-pill badge-info ml-2">
                              NEW
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="widget-content-right widget-content-actions">
                        <div className="d-inline-block dropdown">
                          <button
                            type="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                            className="border-0 btn-transition btn btn-link"
                          >
                            <i className="fa fa-ellipsis-h"></i>
                          </button>
                          <div
                            tabIndex="-1"
                            role="menu"
                            aria-hidden="true"
                            className="dropdown-menu dropdown-menu-right"
                          >
                            <h6 tabIndex="-1" className="dropdown-header">
                              Header
                            </h6>
                            <button
                              type="button"
                              disabled=""
                              tabIndex="-1"
                              className="disabled dropdown-item"
                            >
                              Action
                            </button>
                            <button
                              type="button"
                              tabIndex="0"
                              className="dropdown-item"
                            >
                              Another Action
                            </button>
                            <div tabIndex="-1" className="dropdown-divider"></div>
                            <button
                              type="button"
                              tabIndex="0"
                              className="dropdown-item"
                            >
                              Another Action
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="todo-indicator bg-primary"></div>
                  <div className="widget-content p-0">
                    <div className="widget-content-wrapper">
                      <div className="widget-content-left mr-2">
                        <div className="custom-checkbox custom-control">
                          <input
                            type="checkbox"
                            id="exampleCustomCheckbox4777"
                            className="custom-control-input"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="exampleCustomCheckbox4777"
                          >
                            &nbsp;
                          </label>
                        </div>
                      </div>
                      <div className="widget-content-left flex2">
                        <div className="widget-heading">
                          Badge on the right task
                        </div>
                        <div className="widget-subheading">
                          This task has show on hover actions!
                        </div>
                      </div>
                      <div className="widget-content-right widget-content-actions">
                        <button className="border-0 btn-transition btn btn-outline-success">
                          <i className="fa fa-check"></i>
                        </button>
                      </div>
                      <div className="widget-content-right ml-3">
                        <div className="badge badge-pill badge-success">
                          Latest Task
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="todo-indicator bg-info"></div>
                  <div className="widget-content p-0">
                    <div className="widget-content-wrapper">
                      <div className="widget-content-left mr-2">
                        <div className="custom-checkbox custom-control">
                          <input
                            type="checkbox"
                            id="exampleCustomCheckbox2444"
                            className="custom-control-input"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="exampleCustomCheckbox2444"
                          >
                            &nbsp;
                          </label>
                        </div>
                      </div>
                      <div className="widget-content-left mr-3">
                        <div className="widget-content-left">
                          <img
                            width="42"
                            className="rounded"
                            src="assets/images/avatars/1.jpg"
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="widget-content-left">
                        <div className="widget-heading">Go grocery shopping</div>
                        <div className="widget-subheading">
                          A short description ...
                        </div>
                      </div>
                      <div className="widget-content-right widget-content-actions">
                        <button className="border-0 btn-transition btn btn-sm btn-outline-success">
                          <i className="fa fa-check"></i>
                        </button>
                        <button className="border-0 btn-transition btn btn-sm btn-outline-danger">
                          <i className="fa fa-trash-alt"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="todo-indicator bg-success"></div>
                  <div className="widget-content p-0">
                    <div className="widget-content-wrapper">
                      <div className="widget-content-left mr-2">
                        <div className="custom-checkbox custom-control">
                          <input
                            type="checkbox"
                            id="exampleCustomCheckbox3222"
                            className="custom-control-input"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="exampleCustomCheckbox3222"
                          >
                            &nbsp;
                          </label>
                        </div>
                      </div>
                      <div className="widget-content-left flex2">
                        <div className="widget-heading">Development Task</div>
                        <div className="widget-subheading">
                          Finish React ToDo List App
                        </div>
                      </div>
                      <div className="widget-content-right">
                        <div className="badge badge-warning mr-2">69</div>
                      </div>
                      <div className="widget-content-right">
                        <button className="border-0 btn-transition btn btn-outline-success">
                          <i className="fa fa-check"></i>
                        </button>
                        <button className="border-0 btn-transition btn btn-outline-danger">
                          <i className="fa fa-trash-alt"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <h3 className="drawer-heading">Urgent Notifications</h3>
          <div className="drawer-section">
            <div className="notifications-box">
              <div className="vertical-time-simple vertical-without-time vertical-timeline vertical-timeline--one-column">
                <div className="vertical-timeline-item dot-danger vertical-timeline-element">
                  <div>
                    <span className="vertical-timeline-element-icon bounce-in"></span>
                    <div className="vertical-timeline-element-content bounce-in">
                      <h4 className="timeline-title">All Hands Meeting</h4>
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
                        <span className="text-success">15:00 PM</span>
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
                        <div className="badge badge-danger ml-2">NEW</div>
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
                              <img src="assets/images/avatars/1.jpg" alt="" />
                            </div>
                          </div>
                          <div className="avatar-icon-wrapper avatar-icon-sm">
                            <div className="avatar-icon">
                              <img src="assets/images/avatars/2.jpg" alt="" />
                            </div>
                          </div>
                          <div className="avatar-icon-wrapper avatar-icon-sm">
                            <div className="avatar-icon">
                              <img src="assets/images/avatars/3.jpg" alt="" />
                            </div>
                          </div>
                          <div className="avatar-icon-wrapper avatar-icon-sm">
                            <div className="avatar-icon">
                              <img src="assets/images/avatars/4.jpg" alt="" />
                            </div>
                          </div>
                          <div className="avatar-icon-wrapper avatar-icon-sm">
                            <div className="avatar-icon">
                              <img src="assets/images/avatars/5.jpg" alt="" />
                            </div>
                          </div>
                          <div className="avatar-icon-wrapper avatar-icon-sm">
                            <div className="avatar-icon">
                              <img src="assets/images/avatars/6.jpg" alt="" />
                            </div>
                          </div>
                          <div className="avatar-icon-wrapper avatar-icon-sm">
                            <div className="avatar-icon">
                              <img src="assets/images/avatars/7.jpg" alt="" />
                            </div>
                          </div>
                          <div className="avatar-icon-wrapper avatar-icon-sm">
                            <div className="avatar-icon">
                              <img src="assets/images/avatars/8.jpg" alt="" />
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
                      <h4 className="timeline-title">This dot has an info state</h4>
                      <span className="vertical-timeline-element-date"></span>
                    </div>
                  </div>
                </div>
                <div className="vertical-timeline-item dot-dark vertical-timeline-element">
                  <div>
                    <span className="vertical-timeline-element-icon is-hidden"></span>
                    <div className="vertical-timeline-element-content is-hidden">
                      <h4 className="timeline-title">This dot has a dark state</h4>
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
  );
}

export default AppDrawer;

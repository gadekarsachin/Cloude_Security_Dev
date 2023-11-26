import React from "react";

function CreateScanForm() {
  return (
    <div className="app-main__inner">
      <div className="card-header d-flex justify-content-between">
        <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
          Create Scan
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 col-lg-12">
          <div className="main-card mb-3 card">
            <div className="card-body">
              <form>
                <div className="form-wizard-content">
                  <div>
                    <div className="form-row">
                      <div className="col-md-6">
                        <div className="position-relative form-group">
                          <label htmlFor="name">Name</label>
                          <input
                            name="name"
                            id="name"
                            placeholder="Enter Scan Name"
                            type="text"
                            className="form-control"
                          />
                          <p className="text-danger" id="name_error"></p>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="position-relative form-group">
                          <label htmlFor="category">Category</label>
                          <input
                            name="category"
                            id="category"
                            placeholder="Enter Category"
                            type="category"
                            className="form-control"
                          />
                          <p className="text-danger" id="category_error"></p>
                        </div>
                      </div>
                    </div>
                    <div className="form-row">
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
                  <button type="submit" className="btn btn-success px-5">
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

export default CreateScanForm;

import React from "react";

function Register() {
  return (
    <div className="app-container app-theme-white body-tabs-shadow">
      <div className="app-container">
        <div className="h-100">
          <div className="h-100 no-gutters row">
            <div className="h-100 d-md-flex d-sm-block bg-white justify-content-center align-items-center col-md-12 col-lg-7">
              <div className="mx-auto app-login-box col-sm-12 col-md-10 col-lg-9">
                <div className="app-logo"></div>
                <h4>
                  <div>Welcome,</div>
                  <span>
                    It only takes a{" "}
                    <span className="text-success">few seconds</span> to create your
                    account
                  </span>
                </h4>
                <div>
                  <form className="">
                    <div className="form-row">
                      <div className="col-md-6">
                        <div className="position-relative form-group">
                          <label htmlFor="exampleEmail" className="">
                            <span className="text-danger">*</span> Email
                          </label>
                          <input
                            name="email"
                            id="exampleEmail"
                            placeholder="Email here..."
                            type="email"
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="position-relative form-group">
                          <label htmlFor="exampleName" className="">
                            Name
                          </label>
                          <input
                            name="text"
                            id="exampleName"
                            placeholder="Name here..."
                            type="text"
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="position-relative form-group">
                          <label htmlFor="examplePassword" className="">
                            <span className="text-danger">*</span> Password
                          </label>
                          <input
                            name="password"
                            id="examplePassword"
                            placeholder="Password here..."
                            type="password"
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="position-relative form-group">
                          <label htmlFor="examplePasswordRep" className="">
                            <span className="text-danger">*</span> Repeat Password
                          </label>
                          <input
                            name="passwordrep"
                            id="examplePasswordRep"
                            placeholder="Repeat Password here..."
                            type="password"
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 position-relative form-check">
                      <input
                        name="check"
                        id="exampleCheck"
                        type="checkbox"
                        className="form-check-input"
                      />
                      <label htmlFor="exampleCheck" className="form-check-label">
                        Accept our{" "}
                        <a href="#">Terms and Conditions</a>.
                      </label>
                    </div>
                    <div className="mt-4 d-flex align-items-center">
                      <h5 className="mb-0">
                        Already have an account?{" "}
                        <a href="#" className="text-primary">
                          Sign in
                        </a>
                      </h5>
                      <div className="ml-auto">
                        <button className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary btn-lg">
                          Create Account{" "}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="d-lg-flex d-xs-none col-lg-5">
              <div className="slider-light">
                <div className="slick-slider slick-initialized">
                  <div>
                    <div
                      className="position-relative h-100 d-flex justify-content-center align-items-center bg-premium-dark"
                      tabindex="-1"
                    >
                      <div
                        className="slide-img-bg"
                        style={{
                          backgroundImage:
                            "url('assets/images/originals/citynights.jpg')",
                        }}
                      ></div>
                      <div className="slider-content">
                        <h3>Scalable, Modular, Consistent</h3>
                        <p>
                          Easily exclude the components you don't require.
                          Lightweight, consistent Bootstrap based styles across
                          all elements and components
                        </p>
                      </div>
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

export default Register;

import React from "react";

function NoPageFound() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <img
        src="assets/images/user.jpg"
        alt=""
      />
      <div><h3 className="text-primary font-weight-bolder" style={{
        fontFamily: "revert"
      }}>Oops! This Page is Not Found.</h3>
      </div>
      <div><h5 className="text-body" style={{
        fontFamily: "revert"
      }}>The Requested Page does not exist.</h5></div>
      <a href="/" className="btn btn-outline-primary mt-4">
        Go to Homepage
      </a>
    </div >
  );
}

export default NoPageFound;

import React, { useState, useEffect } from "react";

import aws from "../assets/images/AWS-logo.jpg";

export default function OrganizationInfo() {
  const [loading, setLoading] = useState(false);
  const [getData, setGetData] = useState();
  const dataToSend =
    { id: "64f6c7edd7cc545de49a9647", menuname: "clientdata" } || {};

  const [refreshToken, setRefreshToken] = useState("");

  useEffect(() => {
    const Ldata = localStorage.getItem("user_info");
    console.log("userInfo", Ldata);

    if (Ldata) {
      const parsedData = JSON.parse(Ldata);
      if (parsedData.refresh && parsedData.refresh.token) {
        const token = parsedData.refresh.token;
        setRefreshToken(token);
      } else {
        console.log("Refresh token not found in the data.");
      }
    } else {
      console.log("Data not found in localStorage.");
    }
  }, []);

  //
  useEffect(() => {
    if (refreshToken) {
      fetchData(refreshToken);
    }
  }, [refreshToken]);

  function fetchData(token) {
    setLoading(true); // Set loading to true before fetching data

    const headers = new Headers();
    headers.append("Authorization", `Bearer ${refreshToken}`);

    const requestOptions1 = {
      method: "GET",
      headers: headers,
      redirect: "follow",
    };

    fetch(
      `http://localhost:8000/v1/collection/${dataToSend.menuname}?page=1&limit=100`,
      requestOptions1
    )
      .then((response1) => response1.text())
      .then((result1) => {
        const parsedResult1 = JSON.parse(result1);
        console.log(parsedResult1);
        setGetData(parsedResult1.data);
        setLoading(false);
      })
      .catch((error) => console.log("error", error));
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="app-main__inner">
      <div className="main-card mb-3 card">
        <div className="card-header">
          <div className="card-header-title font-size-lg text-none font-weight-normal">
            {/* {dataToSend.menuname ? dataToSend.menuname : "Evidence Task"} */}
            Organization Information
          </div>
          <div className="btn-actions-pane-right"></div>
        </div>

        <div
          className="table-responsive"
          style={{
            height: "430px",
            fontFamily: "poppins",
          }}
        >
          {loading ? (
            <div className="d-flex justify-content-center align-items-center">
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <div className="ml-2">Loading...</div>
            </div>
          ) : (
            <div>
              {getData
                ?.filter((item) => item.clientId === "3")
                .map((item, index) => (
                  <div
                    key={index}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2, 1fr)",
                      gridGap: "10px",
                      padding: "20px",
                      textAlign: "center",
                      alignItems: "center",
                      transition: "transform 0.2s",
                    }}
                  >
                    <div
                      style={{
                        textAlign: "left",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "18px",
                          marginBottom: "5px",
                        }}
                      >
                        Name:
                      </div>
                      <input
                        type="text"
                        style={{
                          width: "80%",
                          padding: "5px",
                          fontSize: "16px",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                          marginBottom: "20px",
                        }}
                        name="accname"
                        placeholder="Account Name"
                        value={item.clientShortName}
                        disabled
                        onChange={() => {}}
                      />
                    </div>
                    <img
                      src={aws}
                      // src={item.clientLogo}
                      alt="Logo"
                      style={{
                        width: "100px",
                        height: "100px",
                        marginBottom: "10px",
                      }}
                    />

                    <div
                      style={{
                        textAlign: "left",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "18px",
                          marginBottom: "5px",
                        }}
                      >
                        Legal Name:
                      </div>
                      <input
                        type="text"
                        style={{
                          width: "80%",
                          padding: "5px",
                          fontSize: "16px",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                          marginBottom: "20px",
                        }}
                        name="accname"
                        placeholder="Account Name"
                        value={item.clientShortName}
                        disabled
                        onChange={() => {}}
                      />
                    </div>

                    <div
                      style={{
                        textAlign: "left",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "18px",
                          marginBottom: "5px",
                        }}
                      >
                        Security Officer:
                      </div>
                      <input
                        type="text"
                        style={{
                          width: "80%",
                          padding: "5px",
                          fontSize: "16px",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                          marginBottom: "20px",
                        }}
                        name="accname"
                        placeholder="Account Name"
                        value={item.securityOfficer}
                        disabled
                        onChange={() => {}}
                      />
                    </div>
                    <div
                      style={{
                        textAlign: "left",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "18px",
                          marginBottom: "5px",
                        }}
                      >
                        URL:
                      </div>
                      <input
                        type="text"
                        style={{
                          width: "80%",
                          padding: "5px",
                          fontSize: "16px",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                          marginBottom: "20px",
                        }}
                        name="accname"
                        placeholder="Account Name"
                        value={item.clientDomain}
                        disabled
                        onChange={() => {}}
                      />
                    </div>
                    <div
                      style={{
                        textAlign: "left",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "18px",
                          marginBottom: "5px",
                        }}
                      >
                        Address:
                      </div>
                      <input
                        type="text"
                        style={{
                          width: "80%",
                          padding: "5px",
                          fontSize: "16px",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                          marginBottom: "20px",
                        }}
                        name="accname"
                        placeholder="Account Name"
                        value={item.clientRegisteredAddress}
                        disabled
                        onChange={() => {}}
                      />
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

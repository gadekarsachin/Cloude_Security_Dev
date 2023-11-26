// const authurl = "http://54.164.193.38:8000/v1/client/auth";
const authurl = "http://localhost:8000/v1/client/auth";
// const userurl = "http://3.109.135.91:8000/v1/client";
// const userurl = "http://54.164.193.38:8000/v1/client";
const userurl = "http://localhost:8000/v1/client";
const signal = new AbortController().signal;

const userurl1 = "http://localhost:8000/v1/";

export function login(data, token) {
  return fetch(authurl + "/login", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: token,
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((e) => console.log(e));
}

export function logout(token) {
  return fetch(authurl + "/logout", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({ refreshToken: "Bearer " + token }),
  })
    .then((res) => res.json())
    .catch((e) => console.log(e));
}

export function getDashboardData(token) {
  return fetch(userurl + "/dashboard", {
    method: "GET",
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer " + token,
    },
  })
    .then((res) => res.json())
    .catch((e) => console.log(e));
}

export function createNewUser(data, token) {
  return fetch(userurl + "/users", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((e) => console.log("Error in creatUser Api:: ", e));
}

export function getUsers(params, token) {
  return fetch(userurl + params, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer " + token,
    },
    signal: signal,
  })
    .then((res) => res.json())
    .catch((e) => {
      console.log(e);
    });
}

// Shubham start
export function getUsers1(params) {
  return fetch(userurl1 + params, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    signal: signal,
  })
    .then((res) => res.json())
    .catch((e) => {
      console.log(e);
    });
}

export function deleteUser1(params) {
  // return fetch(userurl1 + params, {
  //   method: "DELETE",
  //   headers: {
  //     "content-type": "application/json",
  //     "Access-Control-Allow-Origin": "*",
  //     // Authorization: "Bearer " + token,
  //   },
  // })
  //   .then((res) => res.json())
  //   .catch((e) => console.log("Error in deleteUser Api:: ", e));

  var requestOptions = {
    method: "DELETE",
    redirect: "follow",
  };

  return fetch(userurl1 + params, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}

// Shubham end

export function updateUser(params, data, token) {
  return fetch(userurl1 + params, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((e) => console.log("Error in updateUser Api:: ", e));
}

export function deleteUser(params, token) {
  return fetch(userurl + params, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer " + token,
    },
  })
    .then((res) => res.json())
    .catch((e) => console.log("Error in deleteUser Api:: ", e));
}

export function addRole(data, token) {
  return fetch(userurl + "/role", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((e) => console.log("Error in addRole Api:: ", e));
}

export function getallRoles(params, token) {
  return fetch(userurl + params, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer " + token,
    },
  })
    .then((res) => res.json())
    .catch((e) => console.log("Error in getRoles Api:: ", e));
}
export function getallRoles1(params) {
  return fetch(userurl + params, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((res) => res.json())
    .catch((e) => console.log("Error in getRoles Api:: ", e));
}

export function updateRole(params, data, token) {
  return fetch(userurl + params, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((e) => console.log("Error in addRole Api:: ", e));
}

export function getallIntegration(params, token) {
  // console.log(params, token);
  return fetch(userurl + params, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer " + token,
    },
  })
    .then((res) => res.json())
    .catch((e) => console.log("Error in getallIntegration Api:: ", e));
}

export function createNewIntegration(data, token) {
  return fetch(userurl + "/integration", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((e) => console.log("Error in addIntegration Api:: ", e));
}

export function createPerformScan(data, token) {
  return fetch(userurl + "/scan/performScan", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((e) => console.log("Error in addIntegration Api:: ", e));
}

export function updateIntegration(params, data, token) {
  return fetch(userurl + params, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((e) => console.log("Error in addIntegration Api:: ", e));
}

export function alterIntegrationStatus(params, data, token) {
  return fetch(userurl + params, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((e) => console.log("Error in alterIntegrationStatus Api:: ", e));
}

export function deleteIntegration(params, token) {
  return fetch(userurl + params, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer " + token,
    },
  })
    .then((res) => res.json())
    .catch((e) => console.log("Error in deleteIntegration Api:: ", e));
}

export function addScan(data, token) {
  return fetch(userurl + "/scan", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((e) => console.log("Error in addScan Api:: ", e));
}

export function getScans(params, token) {
  return fetch(userurl + params, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzgxMDgyNTQyYTM4NWE4MWYyMDY1ZDEiLCJpYXQiOjE2OTY0ODc0MjgsImV4cCI6MTY5OTA3OTQyOCwidHlwZSI6InJlZnJlc2gifQ.PUx7UBTSDgEz4fLIwDxNSYz1W8tq5BBTNfsGhGzFTog",
    },
  })
    .then((res) => res.json())
    .catch((e) => console.log("Error in getScans Api:: ", e));
}

export function updateScan(params, data, token) {
  return fetch(userurl + params, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((e) => console.log("Error in updateScan Api:: ", e));
}

export function deleteScan(params, token) {
  return fetch(userurl + params, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer " + token,
    },
  })
    .then((res) => res.json())
    .catch((e) => console.log("Error in deleteScan Api:: ", e));
}

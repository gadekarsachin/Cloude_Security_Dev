export function validateFormUpdate(formData) {
  const d = Object.keys(formData);
  if (!isName(formData.name, d[0])) {
    return false;
  }
  if (!isEmail(formData.email, d[1])) {
    return false;
  }
  if (!isMobile(formData.phone_number, d[2])) {
    return false;
  }
  if (!isMobile(formData.mobile_number, d[3])) {
    return false;
  }
  return true;
}

export function validateFormCreate(formData) {
  const d = Object.keys(formData);
  console.log(d);
  if (!isName(formData.name, d[0])) {
    return false;
  }
  if (!isEmail(formData.email, d[1])) {
    return false;
  }
  if (!isMobile(formData.phone_number, d[4])) {
    return false;
  }
  if (!isMobile(formData.mobile_number, d[5])) {
    return false;
  }
  return true;
}

export function isName(name, id) {
  const nid = id + "_error";
  const res = name.match(/^[a-zA-Z\s]+$/) ? true : false;
  const el = document.getElementById(nid);
  el.innerHTML = !res ? "Please enter valid name" : "";
  return res;
}

export function isEmail(email, id) {
  const nid = id + "_error";
  const res = String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
    ? true
    : false;
  const el = document.getElementById(nid);
  el.innerHTML = !res ? "Please enter valid email" : "";
  return res;
}

export function isMobile(name, id) {
  const nid = id + "_error";
  const res = name.match(
    /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/
  )
    ? true
    : false;
  const el = document.getElementById(nid);
  el.innerHTML = !res ? "Not a valid mobile number" : "";
  return res;
}

export function isPassword(pass) {
  const res = pass.match(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
  )
    ? true
    : false;
  return res;
}



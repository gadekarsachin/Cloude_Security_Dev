import React, { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addRole, updateRole } from "../helperFunctions/apiFunction";
import { editRole } from "../redux/dataSlice";

function CreateRoleForm() {
  const { user, editrole, isRoleEdit } = useSelector(
    (state) => state.clientData
  );
  const [formsdata, setFormsData] = useState({
    clientId: "",
    roleDescription: "",
    roleName: "",
    rolePermission: [
      {
        dash: 0,
        userAdd: 0,
        userEdit: 0,
        userList: 0,
        userDel: 0,
        roleAdd: 0,
        roleEdit: 0,
        roleList: 0,
        roleDel: 0,
        projectAdd: 0,
        projectEdit: 0,
        projectList: 0,
        projectDel: 0,
        programAdd: 0,
        programEdit: 0,
        programList: 0,
        programDel: 0,
        programReqAdd: 0,
        programReqEdit: 0,
        programReqList: 0,
        programReqDel: 0,
        controlAdd: 0,
        controlEdit: 0,
        controlList: 0,
        controlDel: 0,
        evidenceAdd: 0,
        evidenceEdit: 0,
        evidenceList: 0,
        evidenceDel: 0,
        scanAdd: 0,
        scanEdit: 0,
        scanList: 0,
        scanDel: 0,
        scanPluginAdd: 0,
        scanPluginEdit: 0,
        scanPluginList: 0,
        scanPluginDel: 0,
        templateAdd: 0,
        templateEdit: 0,
        templateList: 0,
        templateDel: 0,
        policyAdd: 0,
        policyEdit: 0,
        policyList: 0,
        policyDel: 0,
        vendorAdd: 0,
        vendorEdit: 0,
        vendorList: 0,
        vendorDel: 0,
        vendorQuestionnaireAdd: 0,
        vendorQuestionnaireEdit: 0,
        vendorQuestionnaireList: 0,
        vendorQuestionnaireDel: 0,
        peopleAdd: 0,
        peopleEdit: 0,
        peopleList: 0,
        peopleDel: 0,
        trainingAdd: 0,
        trainingEdit: 0,
        trainingList: 0,
        trainingDel: 0,
        auditAdd: 0,
        auditEdit: 0,
        auditList: 0,
        auditDel: 0,
        integrationDel: 0,
        integrationAdd: 0,
        integrationEdit: 0,
        integrationList: 0,
        serviceAdd: 0,
        serviceEdit: 0,
        serviceList: 0,
        serviceDel: 0,
        workflowAdd: 0,
        workflowEdit: 0,
        workflowList: 0,
        workflowDel: 0,
        monitorAdd: 0,
        monitorEdit: 0,
        monitorList: 0,
        monitorDel: 0,
      },
    ],
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({
    active: true,
    deactive: false,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    refresh: { token },
  } = user;

  function submit(e) {
    e.preventDefault();
    const obj = { ...formsdata };
    obj["clientId"] = user.id;
    obj["status"] = status.active ? 1 : 0;

    if (formsdata.roleName && formsdata.roleDescription) {
      setLoading(true);
      if (isRoleEdit) {
        delete obj.id;
        delete obj.isDelete;
        delete obj.roleType;
        // delete obj.rolePermission[0]._id
        // console.log(obj);

        update(obj);
      } else {
        create(obj);
      }
    }
  }

  function update(obj) {
    const param = "/role/" + editrole.id;
    updateRole(param, obj, token).then((res) => {
      setLoading(false);
      if (res.code === 200) {
        dispatch(editRole({ data: {}, isEdit: false }));
        toast.success(res.message);
        navigate("/user-management/roles");
      } else {
        toast.error(res.message);
      }
    });
  }

  function create(obj) {
    addRole(obj, token)
      .then((res) => {
        setLoading(false);
        if (res.code === 200) {
          toast.success(res.message);
          navigate("/user-management/roles");
        } else {
          toast.error(res.message);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function handleChange(value, dp, inp) {
    const obj = { ...formsdata };
    const obj1 = { ...formsdata.rolePermission[0] };
    if (inp) {
      obj1[dp] = value ? 1 : 0;
      obj["rolePermission"] = [{ ...obj1 }];
    } else {
      obj[dp] = value;
    }
    setFormsData(obj);
  }

  useEffect(() => {
    if (isRoleEdit) {
      setFormsData(editrole);
      const obj = { active: false, deactive: false };
      obj["active"] = editrole.status === 1 ? true : false;
      obj["deactive"] = editrole.status === 0 ? true : false;
      setStatus(obj);
    }
  }, [isRoleEdit]);

  return (
    <div className="app-main__inner">
      <div className="card-header d-flex justify-content-between">
        <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
          {isRoleEdit ? "Update" : "Create New"} Role
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 col-lg-12">
          <div className="main-card mb-3 card">
            <div className="card-body">
              <form
                onSubmit={(e) => {
                  submit(e);
                }}
              >
                <div className="form-wizard-content">
                  <div>
                    
                    <div className="form-row">
                      <div className="col-md-6">
                        <div className="position-relative form-group">
                          <label htmlFor="first_name">Role Name</label>
                          <input
                            name="role_name"
                            id="role_name"
                            placeholder="Role Name"
                            type="text"
                            className="form-control"
                            value={formsdata.roleName}
                            onChange={(e) => {
                              handleChange(e.target.value, "roleName");
                            }}
                          />
                          <p className="text-danger" id="role_name_error"></p>
                        </div>
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="col-md-6">
                        <div
                          className="position-relative form-group"
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <div
                            className=" d-flex"
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <label
                              htmlFor="rolesearch"
                              style={{ fontWeight: "bold", fontSize: "16px" }}
                              className="m-0"
                            >
                              User
                            </label>
                          </div>
                          <div
                            style={{ display: "flex", flexDirection: "row" }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <input
                                type="checkbox"
                                className="mx-3"
                                id="user_list"
                                name="user_list"
                                checked={formsdata.rolePermission[0].userList}
                                onChange={(e) => {
                                  handleChange(
                                    e.target.checked,
                                    "userList",
                                    "rolePermission"
                                  );
                                }}
                              />
                              <label
                                htmlFor="user_list"
                                style={{ fontWeight: "bold" }}
                                className="m-0"
                              >
                                list
                              </label>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <input
                                type="checkbox"
                                className="mx-3"
                                id="user_add"
                                name="user_add"
                                checked={formsdata.rolePermission[0].userAdd}
                                onChange={(e) => {
                                  handleChange(
                                    e.target.checked,
                                    "userAdd",
                                    "rolePermission"
                                  );
                                }}
                              />
                              <label
                                htmlFor="user_add"
                                style={{ fontWeight: "bold" }}
                                className="m-0"
                              >
                                add
                              </label>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <input
                                type="checkbox"
                                className="mx-3"
                                id="user_delete"
                                name="user_delete"
                                checked={formsdata.rolePermission[0].userDel}
                                onChange={(e) => {
                                  handleChange(
                                    e.target.checked,
                                    "userDel",
                                    "rolePermission"
                                  );
                                }}
                              />
                              <label
                                htmlFor="user_delete"
                                style={{ fontWeight: "bold" }}
                                className="m-0"
                              >
                                delete
                              </label>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <input
                                type="checkbox"
                                className="mx-3"
                                id="user_edit"
                                name="user_edit"
                                checked={formsdata.rolePermission[0].userEdit}
                                onChange={(e) => {
                                  handleChange(
                                    e.target.checked,
                                    "userEdit",
                                    "rolePermission"
                                  );
                                }}
                              />
                              <label
                                htmlFor="user_edit"
                                style={{ fontWeight: "bold" }}
                                className="m-0"
                              >
                                edit
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="col-md-6">
                        <div
                          className="position-relative form-group"
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <div
                            className=" d-flex"
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <label
                              htmlFor="rolesearch"
                              style={{ fontWeight: "bold", fontSize: "16px" }}
                              className="m-0"
                            >
                              Role
                            </label>
                          </div>
                          <div
                            style={{ display: "flex", flexDirection: "row" }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <input
                                type="checkbox"
                                className="mx-3"
                                id="role_list"
                                name="role_list"
                                checked={formsdata.rolePermission[0].roleList}
                                onChange={(e) => {
                                  handleChange(
                                    e.target.checked,
                                    "roleList",
                                    "rolePermission"
                                  );
                                }}
                              />
                              <label
                                htmlFor="role_list"
                                style={{ fontWeight: "bold" }}
                                className="m-0"
                              >
                                list
                              </label>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <input
                                type="checkbox"
                                className="mx-3"
                                id="role_add"
                                name="role_add"
                                checked={formsdata.rolePermission[0].roleAdd}
                                onChange={(e) => {
                                  handleChange(
                                    e.target.checked,
                                    "roleAdd",
                                    "rolePermission"
                                  );
                                }}
                              />
                              <label
                                htmlFor="role_add"
                                style={{ fontWeight: "bold" }}
                                className="m-0"
                              >
                                add
                              </label>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <input
                                type="checkbox"
                                className="mx-3"
                                id="role_delete"
                                name="role_delete"
                                checked={formsdata.rolePermission[0].roleDel}
                                onChange={(e) => {
                                  handleChange(
                                    e.target.checked,
                                    "roleDel",
                                    "rolePermission"
                                  );
                                }}
                              />
                              <label
                                htmlFor="role_delete"
                                style={{ fontWeight: "bold" }}
                                className="m-0"
                              >
                                delete
                              </label>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <input
                                type="checkbox"
                                className="mx-3"
                                id="role_edit"
                                name="role_edit"
                                checked={formsdata.rolePermission[0].roleEdit}
                                onChange={(e) => {
                                  handleChange(
                                    e.target.checked,
                                    "roleEdit",
                                    "rolePermission"
                                  );
                                }}
                              />
                              <label
                                htmlFor="role_edit"
                                style={{ fontWeight: "bold" }}
                                className="m-0"
                              >
                                edit
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="col-md-6">
                        <div
                          className="position-relative form-group"
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <div
                            className=" d-flex"
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <label
                              htmlFor="projectsearch"
                              style={{ fontWeight: "bold", fontSize: "16px" }}
                              className="m-0"
                            >
                              Project
                            </label>
                          </div>
                          <div
                            style={{ display: "flex", flexDirection: "row" }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <input
                                type="checkbox"
                                className="mx-3"
                                id="project_list"
                                name="project_list"
                                checked={
                                  formsdata.rolePermission[0].projectList
                                }
                                onChange={(e) => {
                                  handleChange(
                                    e.target.checked,
                                    "projectList",
                                    "rolePermission"
                                  );
                                }}
                              />
                              <label
                                htmlFor="project_list"
                                style={{ fontWeight: "bold" }}
                                className="m-0"
                              >
                                list
                              </label>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <input
                                type="checkbox"
                                className="mx-3"
                                id="project_add"
                                name="project_add"
                                checked={formsdata.rolePermission[0].projectAdd}
                                onChange={(e) => {
                                  handleChange(
                                    e.target.checked,
                                    "projectAdd",
                                    "rolePermission"
                                  );
                                }}
                              />
                              <label
                                htmlFor="project_add"
                                style={{ fontWeight: "bold" }}
                                className="m-0"
                              >
                                add
                              </label>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <input
                                type="checkbox"
                                className="mx-3"
                                id="project_delete"
                                name="project_delete"
                                checked={formsdata.rolePermission[0].projectDel}
                                onChange={(e) => {
                                  handleChange(
                                    e.target.checked,
                                    "projectDel",
                                    "rolePermission"
                                  );
                                }}
                              />
                              <label
                                htmlFor="project_delete"
                                style={{ fontWeight: "bold" }}
                                className="m-0"
                              >
                                delete
                              </label>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <input
                                type="checkbox"
                                className="mx-3"
                                id="project_edit"
                                name="project_edit"
                                checked={
                                  formsdata.rolePermission[0].projectEdit
                                }
                                onChange={(e) => {
                                  handleChange(
                                    e.target.checked,
                                    "projectEdit",
                                    "rolePermission"
                                  );
                                }}
                              />
                              <label
                                htmlFor="project_edit"
                                style={{ fontWeight: "bold" }}
                                className="m-0"
                              >
                                edit
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="col-md-6">
                        <div
                          className="position-relative form-group"
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <div
                            className=" d-flex"
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <label
                              htmlFor="programsearch"
                              style={{ fontWeight: "bold", fontSize: "16px" }}
                              className="m-0"
                            >
                              Program
                            </label>
                          </div>
                          <div
                            style={{ display: "flex", flexDirection: "row" }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <input
                                type="checkbox"
                                className="mx-3"
                                id="program_list"
                                name="program_list"
                                checked={
                                  formsdata.rolePermission[0].programList
                                }
                                onChange={(e) => {
                                  handleChange(
                                    e.target.checked,
                                    "programList",
                                    "rolePermission"
                                  );
                                }}
                              />
                              <label
                                htmlFor="program_list"
                                style={{ fontWeight: "bold" }}
                                className="m-0"
                              >
                                list
                              </label>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <input
                                type="checkbox"
                                className="mx-3"
                                id="program_add"
                                name="program_add"
                                checked={formsdata.rolePermission[0].programAdd}
                                onChange={(e) => {
                                  handleChange(
                                    e.target.checked,
                                    "programAdd",
                                    "rolePermission"
                                  );
                                }}
                              />
                              <label
                                htmlFor="program_add"
                                style={{ fontWeight: "bold" }}
                                className="m-0"
                              >
                                add
                              </label>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <input
                                type="checkbox"
                                className="mx-3"
                                id="program_delete"
                                name="program_delete"
                                checked={formsdata.rolePermission[0].programDel}
                                onChange={(e) => {
                                  handleChange(
                                    e.target.checked,
                                    "programDel",
                                    "rolePermission"
                                  );
                                }}
                              />
                              <label
                                htmlFor="program_delete"
                                style={{ fontWeight: "bold" }}
                                className="m-0"
                              >
                                delete
                              </label>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <input
                                type="checkbox"
                                className="mx-3"
                                id="program_edit"
                                name="program_edit"
                                checked={
                                  formsdata.rolePermission[0].programEdit
                                }
                                onChange={(e) => {
                                  handleChange(
                                    e.target.checked,
                                    "programEdit",
                                    "rolePermission"
                                  );
                                }}
                              />
                              <label
                                htmlFor="program_edit"
                                style={{ fontWeight: "bold" }}
                                className="m-0"
                              >
                                edit
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="col-md-6">
                        <div
                          className="position-relative form-group"
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <div
                            className=" d-flex"
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <label
                              htmlFor="programreqsearch"
                              style={{ fontWeight: "bold", fontSize: "16px" }}
                              className="m-0"
                            >
                              Program Request
                            </label>
                          </div>
                          <div
                            style={{ display: "flex", flexDirection: "row" }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <input
                                type="checkbox"
                                className="mx-3"
                                id="program_request_list"
                                name="program_request_list"
                                checked={
                                  formsdata.rolePermission[0].programReqList
                                }
                                onChange={(e) => {
                                  handleChange(
                                    e.target.checked,
                                    "programReqList",
                                    "rolePermission"
                                  );
                                }}
                              />
                              <label
                                htmlFor="program_request_list"
                                style={{ fontWeight: "bold" }}
                                className="m-0"
                              >
                                list
                              </label>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <input
                                type="checkbox"
                                className="mx-3"
                                id="program_request_add"
                                name="program_request_add"
                                checked={
                                  formsdata.rolePermission[0].programReqAdd
                                }
                                onChange={(e) => {
                                  handleChange(
                                    e.target.checked,
                                    "programReqAdd",
                                    "rolePermission"
                                  );
                                }}
                              />
                              <label
                                htmlFor="program_request_add"
                                style={{ fontWeight: "bold" }}
                                className="m-0"
                              >
                                add
                              </label>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <input
                                type="checkbox"
                                className="mx-3"
                                id="program_request_delete"
                                name="program_request_delete"
                                checked={
                                  formsdata.rolePermission[0].programReqDel
                                }
                                onChange={(e) => {
                                  handleChange(
                                    e.target.checked,
                                    "programReqDel",
                                    "rolePermission"
                                  );
                                }}
                              />
                              <label
                                htmlFor="program_request_delete"
                                style={{ fontWeight: "bold" }}
                                className="m-0"
                              >
                                delete
                              </label>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <input
                                type="checkbox"
                                className="mx-3"
                                id="program_request_edit"
                                name="program_request_edit"
                                checked={
                                  formsdata.rolePermission[0].programReqEdit
                                }
                                onChange={(e) => {
                                  handleChange(
                                    e.target.checked,
                                    "programReqEdit",
                                    "rolePermission"
                                  );
                                }}
                              />
                              <label
                                htmlFor="program_request_edit"
                                style={{ fontWeight: "bold" }}
                                className="m-0"
                              >
                                edit
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="col-md-6">
                        <div
                          className="position-relative form-group"
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <div
                            className=" d-flex"
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <label
                              htmlFor="controlsearch"
                              style={{ fontWeight: "bold", fontSize: "16px" }}
                              className="m-0"
                            >
                              Control
                            </label>
                          </div>
                          <div
                            style={{ display: "flex", flexDirection: "row" }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <input
                                type="checkbox"
                                className="mx-3"
                                id="control_list"
                                name="control_list"
                                checked={
                                  formsdata.rolePermission[0].controlList
                                }
                                onChange={(e) => {
                                  handleChange(
                                    e.target.checked,
                                    "controlList",
                                    "rolePermission"
                                  );
                                }}
                              />
                              <label
                                htmlFor="control_list"
                                style={{ fontWeight: "bold" }}
                                className="m-0"
                              >
                                list
                              </label>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <input
                                type="checkbox"
                                className="mx-3"
                                id="control_add"
                                name="control_add"
                                checked={formsdata.rolePermission[0].controlAdd}
                                onChange={(e) => {
                                  handleChange(
                                    e.target.checked,
                                    "controlAdd",
                                    "rolePermission"
                                  );
                                }}
                              />
                              <label
                                htmlFor="control_add"
                                style={{ fontWeight: "bold" }}
                                className="m-0"
                              >
                                add
                              </label>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <input
                                type="checkbox"
                                className="mx-3"
                                id="control_delete"
                                name="control_delete"
                                checked={formsdata.rolePermission[0].controlDel}
                                onChange={(e) => {
                                  handleChange(
                                    e.target.checked,
                                    "controlDel",
                                    "rolePermission"
                                  );
                                }}
                              />
                              <label
                                htmlFor="control_delete"
                                style={{ fontWeight: "bold" }}
                                className="m-0"
                              >
                                delete
                              </label>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <input
                                type="checkbox"
                                className="mx-3"
                                id="control_edit"
                                name="control_edit"
                                checked={
                                  formsdata.rolePermission[0].controlEdit
                                }
                                onChange={(e) => {
                                  handleChange(
                                    e.target.checked,
                                    "controlEdit",
                                    "rolePermission"
                                  );
                                }}
                              />
                              <label
                                htmlFor="control_edit"
                                style={{ fontWeight: "bold" }}
                                className="m-0"
                              >
                                edit
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="col-md-6">
                        <div
                          className="position-relative form-group"
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <div
                            className=" d-flex"
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <label
                              htmlFor="evidencesearch"
                              style={{ fontWeight: "bold", fontSize: "16px" }}
                              className="m-0"
                            >
                              Evidence
                            </label>
                          </div>
                          <div
                            style={{ display: "flex", flexDirection: "row" }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <input
                                type="checkbox"
                                className="mx-3"
                                id="evidence_list"
                                name="evidence_list"
                                checked={
                                  formsdata.rolePermission[0].evidenceList
                                }
                                onChange={(e) => {
                                  handleChange(
                                    e.target.checked,
                                    "evidenceList",
                                    "rolePermission"
                                  );
                                }}
                              />
                              <label
                                htmlFor="evidence_list"
                                style={{ fontWeight: "bold" }}
                                className="m-0"
                              >
                                list
                              </label>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <input
                                type="checkbox"
                                className="mx-3"
                                id="evidence_add"
                                name="evidence_add"
                                checked={
                                  formsdata.rolePermission[0].evidenceAdd
                                }
                                onChange={(e) => {
                                  handleChange(
                                    e.target.checked,
                                    "evidenceAdd",
                                    "rolePermission"
                                  );
                                }}
                              />
                              <label
                                htmlFor="evidence_add"
                                style={{ fontWeight: "bold" }}
                                className="m-0"
                              >
                                add
                              </label>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <input
                                type="checkbox"
                                className="mx-3"
                                id="evidence_delete"
                                name="evidence_delete"
                                checked={
                                  formsdata.rolePermission[0].evidenceDel
                                }
                                onChange={(e) => {
                                  handleChange(
                                    e.target.checked,
                                    "evidenceDel",
                                    "rolePermission"
                                  );
                                }}
                              />
                              <label
                                htmlFor="evidence_delete"
                                style={{ fontWeight: "bold" }}
                                className="m-0"
                              >
                                delete
                              </label>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <input
                                type="checkbox"
                                className="mx-3"
                                id="evidence_edit"
                                name="evidence_edit"
                                checked={
                                  formsdata.rolePermission[0].evidenceEdit
                                }
                                onChange={(e) => {
                                  handleChange(
                                    e.target.checked,
                                    "evidenceEdit",
                                    "rolePermission"
                                  );
                                }}
                              />
                              <label
                                htmlFor="evidence_edit"
                                style={{ fontWeight: "bold" }}
                                className="m-0"
                              >
                                edit
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="col-md-6">
                        <div
                          className="position-relative form-group"
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <div
                            className=" d-flex"
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <label
                              htmlFor="rolesearch"
                              style={{ fontWeight: "bold", fontSize: "16px" }}
                              className="m-0"
                            >
                              Scan
                            </label>
                          </div>
                          <div
                            style={{ display: "flex", flexDirection: "row" }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <input
                                type="checkbox"
                                className="mx-3"
                                id="scan_list"
                                name="scan_list"
                                checked={formsdata.rolePermission[0].scanList}
                                onChange={(e) => {
                                  handleChange(
                                    e.target.checked,
                                    "scanList",
                                    "rolePermission"
                                  );
                                }}
                              />
                              <label
                                htmlFor="scan_list"
                                style={{ fontWeight: "bold" }}
                                className="m-0"
                              >
                                list
                              </label>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <input
                                type="checkbox"
                                className="mx-3"
                                id="scan_add"
                                name="scan_add"
                                checked={formsdata.rolePermission[0].scanAdd}
                                onChange={(e) => {
                                  handleChange(
                                    e.target.checked,
                                    "scanAdd",
                                    "rolePermission"
                                  );
                                }}
                              />
                              <label
                                htmlFor="scan_add"
                                style={{ fontWeight: "bold" }}
                                className="m-0"
                              >
                                add
                              </label>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <input
                                type="checkbox"
                                className="mx-3"
                                id="scan_delete"
                                name="scan_delete"
                                checked={formsdata.rolePermission[0].scanDel}
                                onChange={(e) => {
                                  handleChange(
                                    e.target.checked,
                                    "scanDel",
                                    "rolePermission"
                                  );
                                }}
                              />
                              <label
                                htmlFor="scan_delete"
                                style={{ fontWeight: "bold" }}
                                className="m-0"
                              >
                                delete
                              </label>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <input
                                type="checkbox"
                                className="mx-3"
                                id="scan_edit"
                                name="scan_edit"
                                checked={formsdata.rolePermission[0].scanEdit}
                                onChange={(e) => {
                                  handleChange(
                                    e.target.checked,
                                    "scanEdit",
                                    "rolePermission"
                                  );
                                }}
                              />
                              <label
                                htmlFor="scan_edit"
                                style={{ fontWeight: "bold" }}
                                className="m-0"
                              >
                                edit
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="col-md-6">
                        <div
                          className="position-relative form-group"
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <div
                            className=" d-flex"
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <label
                              htmlFor="scanpluginsearch"
                              style={{ fontWeight: "bold", fontSize: "16px" }}
                              className="m-0"
                            >
                              Scan Plugin
                            </label>
                          </div>
                          <div
                            style={{ display: "flex", flexDirection: "row" }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <input
                                type="checkbox"
                                className="mx-3"
                                id="scan_plugin_list"
                                name="scan_plugin_list"
                                checked={formsdata.rolePermission[0].scanList}
                                onChange={(e) => {
                                  handleChange(
                                    e.target.checked,
                                    "scanList",
                                    "rolePermission"
                                  );
                                }}
                              />
                              <label
                                htmlFor="scan_plugin_list"
                                style={{ fontWeight: "bold" }}
                                className="m-0"
                              >
                                list
                              </label>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <input
                                type="checkbox"
                                className="mx-3"
                                id="scan_plugin_add"
                                name="scan_plugin_add"
                                checked={
                                  formsdata.rolePermission[0].scanPluginAdd
                                }
                                onChange={(e) => {
                                  handleChange(
                                    e.target.checked,
                                    "scanPluginAdd",
                                    "rolePermission"
                                  );
                                }}
                              />
                              <label
                                htmlFor="scan_plugin_add"
                                style={{ fontWeight: "bold" }}
                                className="m-0"
                              >
                                add
                              </label>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <input
                                type="checkbox"
                                className="mx-3"
                                id="scan_plugin_delete"
                                name="scan_plugin_delete"
                                checked={
                                  formsdata.rolePermission[0].scanPluginDel
                                }
                                onChange={(e) => {
                                  handleChange(
                                    e.target.checked,
                                    "scanPluginDel",
                                    "rolePermission"
                                  );
                                }}
                              />
                              <label
                                htmlFor="scan_plugin_delete"
                                style={{ fontWeight: "bold" }}
                                className="m-0"
                              >
                                delete
                              </label>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <input
                                type="checkbox"
                                className="mx-3"
                                id="scan_plugin_edit"
                                name="scan_plugin_edit"
                                checked={
                                  formsdata.rolePermission[0].scanPluginEdit
                                }
                                onChange={(e) => {
                                  handleChange(
                                    e.target.checked,
                                    "scanPluginEdit",
                                    "rolePermission"
                                  );
                                }}
                              />
                              <label
                                htmlFor="scan_plugin_edit"
                                style={{ fontWeight: "bold" }}
                                className="m-0"
                              >
                                edit
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="col-md-6">
                        <div
                          className="position-relative form-group"
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <div
                            className=" d-flex"
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <label
                              htmlFor="templatesearch"
                              style={{ fontWeight: "bold", fontSize: "16px" }}
                              className="m-0"
                            >
                              Template
                            </label>
                          </div>
                          <div
                            style={{ display: "flex", flexDirection: "row" }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <input
                                type="checkbox"
                                className="mx-3"
                                id="template_list"
                                name="template_list"
                                checked={
                                  formsdata.rolePermission[0].templateList
                                }
                                onChange={(e) => {
                                  handleChange(
                                    e.target.checked,
                                    "templateList",
                                    "rolePermission"
                                  );
                                }}
                              />
                              <label
                                htmlFor="template_list"
                                style={{ fontWeight: "bold" }}
                                className="m-0"
                              >
                                list
                              </label>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <input
                                type="checkbox"
                                className="mx-3"
                                id="template_add"
                                name="template_add"
                                checked={
                                  formsdata.rolePermission[0].templateAdd
                                }
                                onChange={(e) => {
                                  handleChange(
                                    e.target.checked,
                                    "templateAdd",
                                    "rolePermission"
                                  );
                                }}
                              />
                              <label
                                htmlFor="template_add"
                                style={{ fontWeight: "bold" }}
                                className="m-0"
                              >
                                add
                              </label>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <input
                                type="checkbox"
                                className="mx-3"
                                id="template_delete"
                                name="template_delete"
                                checked={
                                  formsdata.rolePermission[0].templateDel
                                }
                                onChange={(e) => {
                                  handleChange(
                                    e.target.checked,
                                    "templateDel",
                                    "rolePermission"
                                  );
                                }}
                              />
                              <label
                                htmlFor="template_delete"
                                style={{ fontWeight: "bold" }}
                                className="m-0"
                              >
                                delete
                              </label>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <input
                                type="checkbox"
                                className="mx-3"
                                id="template_edit"
                                name="template_edit"
                                checked={
                                  formsdata.rolePermission[0].templateEdit
                                }
                                onChange={(e) => {
                                  handleChange(
                                    e.target.checked,
                                    "templateEdit",
                                    "rolePermission"
                                  );
                                }}
                              />
                              <label
                                htmlFor="template_edit"
                                style={{ fontWeight: "bold" }}
                                className="m-0"
                              >
                                edit
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="col-md-6">
                        <div
                          className="position-relative form-group"
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <div
                            className=" d-flex"
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <label
                              htmlFor="policysearch"
                              style={{ fontWeight: "bold", fontSize: "16px" }}
                              className="m-0"
                            >
                              Policy
                            </label>
                          </div>
                          <div
                            style={{ display: "flex", flexDirection: "row" }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <input
                                type="checkbox"
                                className="mx-3"
                                id="policy_list"
                                name="policy_list"
                                checked={formsdata.rolePermission[0].policyList}
                                onChange={(e) => {
                                  handleChange(
                                    e.target.checked,
                                    "policyList",
                                    "rolePermission"
                                  );
                                }}
                              />
                              <label
                                htmlFor="policy_list"
                                style={{ fontWeight: "bold" }}
                                className="m-0"
                              >
                                list
                              </label>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <input
                                type="checkbox"
                                className="mx-3"
                                id="policy_add"
                                name="policy_add"
                                checked={formsdata.rolePermission[0].policyAdd}
                                onChange={(e) => {
                                  handleChange(
                                    e.target.checked,
                                    "policyAdd",
                                    "rolePermission"
                                  );
                                }}
                              />
                              <label
                                htmlFor="policy_add"
                                style={{ fontWeight: "bold" }}
                                className="m-0"
                              >
                                add
                              </label>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <input
                                type="checkbox"
                                className="mx-3"
                                id="policy_delete"
                                name="policy_delete"
                                checked={formsdata.rolePermission[0].policyDel}
                                onChange={(e) => {
                                  handleChange(
                                    e.target.checked,
                                    "policyDel",
                                    "rolePermission"
                                  );
                                }}
                              />
                              <label
                                htmlFor="policy_delete"
                                style={{ fontWeight: "bold" }}
                                className="m-0"
                              >
                                delete
                              </label>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <input
                                type="checkbox"
                                className="mx-3"
                                id="policy_edit"
                                name="policy_edit"
                                checked={formsdata.rolePermission[0].policyEdit}
                                onChange={(e) => {
                                  handleChange(
                                    e.target.checked,
                                    "policyEdit",
                                    "rolePermission"
                                  );
                                }}
                              />
                              <label
                                htmlFor="policy_edit"
                                style={{ fontWeight: "bold" }}
                                className="m-0"
                              >
                                edit
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="col-md-6">
                        <div
                          className="position-relative form-group"
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <div
                            className=" d-flex"
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <label
                              htmlFor="vendorsearch"
                              style={{ fontWeight: "bold", fontSize: "16px" }}
                              className="m-0"
                            >
                              Vendor
                            </label>
                          </div>
                          <div
                            style={{ display: "flex", flexDirection: "row" }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <input
                                type="checkbox"
                                className="mx-3"
                                id="vendor_list"
                                name="vendor_list"
                                checked={formsdata.rolePermission[0].vendorList}
                                onChange={(e) => {
                                  handleChange(
                                    e.target.checked,
                                    "vendorList",
                                    "rolePermission"
                                  );
                                }}
                              />
                              <label
                                htmlFor="vendor_list"
                                style={{ fontWeight: "bold" }}
                                className="m-0"
                              >
                                list
                              </label>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <input
                                type="checkbox"
                                className="mx-3"
                                id="vendor_add"
                                name="vendor_add"
                                checked={formsdata.rolePermission[0].vendorAdd}
                                onChange={(e) => {
                                  handleChange(
                                    e.target.checked,
                                    "vendorAdd",
                                    "rolePermission"
                                  );
                                }}
                              />
                              <label
                                htmlFor="vendor_add"
                                style={{ fontWeight: "bold" }}
                                className="m-0"
                              >
                                add
                              </label>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <input
                                type="checkbox"
                                className="mx-3"
                                id="vendor_delete"
                                name="vendor_delete"
                                checked={formsdata.rolePermission[0].vendorDel}
                                onChange={(e) => {
                                  handleChange(
                                    e.target.checked,
                                    "vendorDel",
                                    "rolePermission"
                                  );
                                }}
                              />
                              <label
                                htmlFor="vendor_delete"
                                style={{ fontWeight: "bold" }}
                                className="m-0"
                              >
                                delete
                              </label>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <input
                                type="checkbox"
                                className="mx-3"
                                id="vendor_edit"
                                name="vendor_edit"
                                checked={formsdata.rolePermission[0].vendorEdit}
                                onChange={(e) => {
                                  handleChange(
                                    e.target.checked,
                                    "vendorEdit",
                                    "rolePermission"
                                  );
                                }}
                              />
                              <label
                                htmlFor="vendor_edit"
                                style={{ fontWeight: "bold" }}
                                className="m-0"
                              >
                                edit
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="col-md-6">
                        <div
                          className="position-relative form-group"
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <div
                            className=" d-flex"
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <label
                              htmlFor="vendorquestionnairesearch"
                              style={{ fontWeight: "bold", fontSize: "16px" }}
                              className="m-0"
                            >
                              Vendor Questionnaire
                            </label>
                          </div>
                          <div
                            style={{ display: "flex", flexDirection: "row" }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <input
                                type="checkbox"
                                className="mx-3"
                                id="vendor_questionnaire_list"
                                name="vendor_questionnaire_list"
                                checked={
                                  formsdata.rolePermission[0]
                                    .vendorQuestionnaireList
                                }
                                onChange={(e) => {
                                  handleChange(
                                    e.target.checked,
                                    "vendorQuestionnaireList",
                                    "rolePermission"
                                  );
                                }}
                              />
                              <label
                                htmlFor="vendor_questionnaire_list"
                                style={{ fontWeight: "bold" }}
                                className="m-0"
                              >
                                list
                              </label>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <input
                                type="checkbox"
                                className="mx-3"
                                id="vendor_questionnaire_add"
                                name="vendor_questionnaire_add"
                                checked={
                                  formsdata.rolePermission[0]
                                    .vendorQuestionnaireAdd
                                }
                                onChange={(e) => {
                                  handleChange(
                                    e.target.checked,
                                    "vendorQuestionnaireAdd",
                                    "rolePermission"
                                  );
                                }}
                              />
                              <label
                                htmlFor="vendor_questionnaire_add"
                                style={{ fontWeight: "bold" }}
                                className="m-0"
                              >
                                add
                              </label>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <input
                                type="checkbox"
                                className="mx-3"
                                id="vendor_questionnaire_delete"
                                name="vendor_questionnaire_delete"
                                checked={
                                  formsdata.rolePermission[0]
                                    .vendorQuestionnaireDel
                                }
                                onChange={(e) => {
                                  handleChange(
                                    e.target.checked,
                                    "vendorQuestionnaireDel",
                                    "rolePermission"
                                  );
                                }}
                              />
                              <label
                                htmlFor="vendor_questionnaire_delete"
                                style={{ fontWeight: "bold" }}
                                className="m-0"
                              >
                                delete
                              </label>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <input
                                type="checkbox"
                                className="mx-3"
                                id="vendor_questionnaire_edit"
                                name="vendor_questionnaire_edit"
                                checked={
                                  formsdata.rolePermission[0]
                                    .vendorQuestionnaireEdit
                                }
                                onChange={(e) => {
                                  handleChange(
                                    e.target.checked,
                                    "vendorQuestionnaireEdit",
                                    "rolePermission"
                                  );
                                }}
                              />
                              <label
                                htmlFor="vendor_questionnaire_edit"
                                style={{ fontWeight: "bold" }}
                                className="m-0"
                              >
                                edit
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="col-md-6">
                        <div
                          className="position-relative form-group"
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <div
                            className=" d-flex"
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <label
                              htmlFor="peoplesearch"
                              style={{ fontWeight: "bold", fontSize: "16px" }}
                              className="m-0"
                            >
                              People
                            </label>
                          </div>
                          <div
                            style={{ display: "flex", flexDirection: "row" }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <input
                                type="checkbox"
                                className="mx-3"
                                id="people_list"
                                name="people_list"
                                checked={formsdata.rolePermission[0].peopleList}
                                onChange={(e) => {
                                  handleChange(
                                    e.target.checked,
                                    "peopleList",
                                    "rolePermission"
                                  );
                                }}
                              />
                              <label
                                htmlFor="people_list"
                                style={{ fontWeight: "bold" }}
                                className="m-0"
                              >
                                list
                              </label>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <input
                                type="checkbox"
                                className="mx-3"
                                id="people_add"
                                name="people_add"
                                checked={formsdata.rolePermission[0].peopleAdd}
                                onChange={(e) => {
                                  handleChange(
                                    e.target.checked,
                                    "peopleAdd",
                                    "rolePermission"
                                  );
                                }}
                              />
                              <label
                                htmlFor="people_add"
                                style={{ fontWeight: "bold" }}
                                className="m-0"
                              >
                                add
                              </label>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <input
                                type="checkbox"
                                className="mx-3"
                                id="people_delete"
                                name="people_delete"
                                checked={formsdata.rolePermission[0].peopleDel}
                                onChange={(e) => {
                                  handleChange(
                                    e.target.checked,
                                    "peopleDel",
                                    "rolePermission"
                                  );
                                }}
                              />
                              <label
                                htmlFor="people_delete"
                                style={{ fontWeight: "bold" }}
                                className="m-0"
                              >
                                delete
                              </label>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <input
                                type="checkbox"
                                className="mx-3"
                                id="people_edit"
                                name="people_edit"
                                checked={formsdata.rolePermission[0].peopleEdit}
                                onChange={(e) => {
                                  handleChange(
                                    e.target.checked,
                                    "peopleEdit",
                                    "rolePermission"
                                  );
                                }}
                              />
                              <label
                                htmlFor="people_edit"
                                style={{ fontWeight: "bold" }}
                                className="m-0"
                              >
                                edit
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="col-md-6">
                        <div
                          className="position-relative form-group"
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <div
                            className=" d-flex"
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <label
                              htmlFor="trainingsearch"
                              style={{ fontWeight: "bold", fontSize: "16px" }}
                              className="m-0"
                            >
                              Training
                            </label>
                          </div>
                          <div
                            style={{ display: "flex", flexDirection: "row" }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <input
                                type="checkbox"
                                className="mx-3"
                                id="training_list"
                                name="training_list"
                                checked={
                                  formsdata.rolePermission[0].trainingList
                                }
                                onChange={(e) => {
                                  handleChange(
                                    e.target.checked,
                                    "trainingList",
                                    "rolePermission"
                                  );
                                }}
                              />
                              <label
                                htmlFor="training_list"
                                style={{ fontWeight: "bold" }}
                                className="m-0"
                              >
                                list
                              </label>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <input
                                type="checkbox"
                                className="mx-3"
                                id="training_add"
                                name="training_add"
                                checked={
                                  formsdata.rolePermission[0].trainingAdd
                                }
                                onChange={(e) => {
                                  handleChange(
                                    e.target.checked,
                                    "trainingAdd",
                                    "rolePermission"
                                  );
                                }}
                              />
                              <label
                                htmlFor="training_add"
                                style={{ fontWeight: "bold" }}
                                className="m-0"
                              >
                                add
                              </label>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <input
                                type="checkbox"
                                className="mx-3"
                                id="training_delete"
                                name="training_delete"
                                checked={
                                  formsdata.rolePermission[0].trainingDel
                                }
                                onChange={(e) => {
                                  handleChange(
                                    e.target.checked,
                                    "trainingDel",
                                    "rolePermission"
                                  );
                                }}
                              />
                              <label
                                htmlFor="training_delete"
                                style={{ fontWeight: "bold" }}
                                className="m-0"
                              >
                                delete
                              </label>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <input
                                type="checkbox"
                                className="mx-3"
                                id="training_edit"
                                name="training_edit"
                                checked={
                                  formsdata.rolePermission[0].trainingEdit
                                }
                                onChange={(e) => {
                                  handleChange(
                                    e.target.checked,
                                    "trainingEdit",
                                    "rolePermission"
                                  );
                                }}
                              />
                              <label
                                htmlFor="training_edit"
                                style={{ fontWeight: "bold" }}
                                className="m-0"
                              >
                                edit
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="col-md-6">
                        <div
                          className="position-relative form-group"
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <div
                            className=" d-flex"
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <label
                              htmlFor="auditsearch"
                              style={{ fontWeight: "bold", fontSize: "16px" }}
                              className="m-0"
                            >
                              Audit
                            </label>
                          </div>
                          <div
                            style={{ display: "flex", flexDirection: "row" }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <input
                                type="checkbox"
                                className="mx-3"
                                id="audit_list"
                                name="audit_list"
                                checked={formsdata.rolePermission[0].auditList}
                                onChange={(e) => {
                                  handleChange(
                                    e.target.checked,
                                    "auditList",
                                    "rolePermission"
                                  );
                                }}
                              />
                              <label
                                htmlFor="audit_list"
                                style={{ fontWeight: "bold" }}
                                className="m-0"
                              >
                                list
                              </label>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <input
                                type="checkbox"
                                className="mx-3"
                                id="audit_add"
                                name="audit_add"
                                checked={formsdata.rolePermission[0].auditAdd}
                                onChange={(e) => {
                                  handleChange(
                                    e.target.checked,
                                    "auditAdd",
                                    "rolePermission"
                                  );
                                }}
                              />
                              <label
                                htmlFor="audit_add"
                                style={{ fontWeight: "bold" }}
                                className="m-0"
                              >
                                add
                              </label>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <input
                                type="checkbox"
                                className="mx-3"
                                id="audit_delete"
                                name="audit_delete"
                                checked={formsdata.rolePermission[0].auditDel}
                                onChange={(e) => {
                                  handleChange(
                                    e.target.checked,
                                    "auditDel",
                                    "rolePermission"
                                  );
                                }}
                              />
                              <label
                                htmlFor="audit_delete"
                                style={{ fontWeight: "bold" }}
                                className="m-0"
                              >
                                delete
                              </label>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <input
                                type="checkbox"
                                className="mx-3"
                                id="audit_edit"
                                name="audit_edit"
                                checked={formsdata.rolePermission[0].auditEdit}
                                onChange={(e) => {
                                  handleChange(
                                    e.target.checked,
                                    "auditEdit",
                                    "rolePermission"
                                  );
                                }}
                              />
                              <label
                                htmlFor="audit_edit"
                                style={{ fontWeight: "bold" }}
                                className="m-0"
                              >
                                edit
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="col-md-6">
                        <div
                          className="position-relative form-group"
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <div
                            className=" d-flex"
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <label
                              htmlFor="rolesearch"
                              style={{ fontWeight: "bold", fontSize: "16px" }}
                              className="m-0"
                            >
                              Integration
                            </label>
                          </div>
                          <div
                            style={{ display: "flex", flexDirection: "row" }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <input
                                type="checkbox"
                                className="mx-3"
                                id="integration_list"
                                name="integration_list"
                                checked={
                                  formsdata.rolePermission[0].integrationList
                                }
                                onChange={(e) => {
                                  handleChange(
                                    e.target.checked,
                                    "integrationList",
                                    "rolePermission"
                                  );
                                }}
                              />
                              <label
                                htmlFor="integration_list"
                                style={{ fontWeight: "bold" }}
                                className="m-0"
                              >
                                list
                              </label>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <input
                                type="checkbox"
                                className="mx-3"
                                id="integration_add"
                                name="integration_add"
                                checked={
                                  formsdata.rolePermission[0].integrationAdd
                                }
                                onChange={(e) => {
                                  handleChange(
                                    e.target.checked,
                                    "integrationAdd",
                                    "rolePermission"
                                  );
                                }}
                              />
                              <label
                                htmlFor="integration_add"
                                style={{ fontWeight: "bold" }}
                                className="m-0"
                              >
                                add
                              </label>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <input
                                type="checkbox"
                                className="mx-3"
                                id="integration_delete"
                                name="integration_delete"
                                checked={
                                  formsdata.rolePermission[0].integrationDel
                                }
                                onChange={(e) => {
                                  handleChange(
                                    e.target.checked,
                                    "integrationDel",
                                    "rolePermission"
                                  );
                                }}
                              />
                              <label
                                htmlFor="integration_delete"
                                style={{ fontWeight: "bold" }}
                                className="m-0"
                              >
                                delete
                              </label>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <input
                                type="checkbox"
                                className="mx-3"
                                id="integration_edit"
                                name="integration_edit"
                                checked={
                                  formsdata.rolePermission[0].integrationEdit
                                }
                                onChange={(e) => {
                                  handleChange(
                                    e.target.checked,
                                    "integrationEdit",
                                    "rolePermission"
                                  );
                                }}
                              />
                              <label
                                htmlFor="integration_edit"
                                style={{ fontWeight: "bold" }}
                                className="m-0"
                              >
                                edit
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="col-md-6">
                        <div
                          className="position-relative form-group"
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <div
                            className=" d-flex"
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <label
                              htmlFor="servicesearch"
                              style={{ fontWeight: "bold", fontSize: "16px" }}
                              className="m-0"
                            >
                              Service
                            </label>
                          </div>
                          <div
                            style={{ display: "flex", flexDirection: "row" }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <input
                                type="checkbox"
                                className="mx-3"
                                id="service_list"
                                name="service_list"
                                checked={
                                  formsdata.rolePermission[0].serviceList
                                }
                                onChange={(e) => {
                                  handleChange(
                                    e.target.checked,
                                    "serviceList",
                                    "rolePermission"
                                  );
                                }}
                              />
                              <label
                                htmlFor="service_list"
                                style={{ fontWeight: "bold" }}
                                className="m-0"
                              >
                                list
                              </label>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <input
                                type="checkbox"
                                className="mx-3"
                                id="service_add"
                                name="service_add"
                                checked={formsdata.rolePermission[0].serviceAdd}
                                onChange={(e) => {
                                  handleChange(
                                    e.target.checked,
                                    "serviceAdd",
                                    "rolePermission"
                                  );
                                }}
                              />
                              <label
                                htmlFor="service_add"
                                style={{ fontWeight: "bold" }}
                                className="m-0"
                              >
                                add
                              </label>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <input
                                type="checkbox"
                                className="mx-3"
                                id="service_delete"
                                name="service_delete"
                                checked={formsdata.rolePermission[0].serviceDel}
                                onChange={(e) => {
                                  handleChange(
                                    e.target.checked,
                                    "serviceDel",
                                    "rolePermission"
                                  );
                                }}
                              />
                              <label
                                htmlFor="service_delete"
                                style={{ fontWeight: "bold" }}
                                className="m-0"
                              >
                                delete
                              </label>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <input
                                type="checkbox"
                                className="mx-3"
                                id="service_edit"
                                name="service_edit"
                                checked={
                                  formsdata.rolePermission[0].serviceEdit
                                }
                                onChange={(e) => {
                                  handleChange(
                                    e.target.checked,
                                    "serviceEdit",
                                    "rolePermission"
                                  );
                                }}
                              />
                              <label
                                htmlFor="service_edit"
                                style={{ fontWeight: "bold" }}
                                className="m-0"
                              >
                                edit
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="col-md-6">
                        <div
                          className="position-relative form-group"
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <div
                            className=" d-flex"
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <label
                              htmlFor="workflowsearch"
                              style={{ fontWeight: "bold", fontSize: "16px" }}
                              className="m-0"
                            >
                              Workflow
                            </label>
                          </div>
                          <div
                            style={{ display: "flex", flexDirection: "row" }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <input
                                type="checkbox"
                                className="mx-3"
                                id="workflow_list"
                                name="workflow_list"
                                checked={
                                  formsdata.rolePermission[0].workflowList
                                }
                                onChange={(e) => {
                                  handleChange(
                                    e.target.checked,
                                    "workflowList",
                                    "rolePermission"
                                  );
                                }}
                              />
                              <label
                                htmlFor="workflow_list"
                                style={{ fontWeight: "bold" }}
                                className="m-0"
                              >
                                list
                              </label>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <input
                                type="checkbox"
                                className="mx-3"
                                id="workflow_add"
                                name="workflow_add"
                                checked={
                                  formsdata.rolePermission[0].workflowAdd
                                }
                                onChange={(e) => {
                                  handleChange(
                                    e.target.checked,
                                    "workflowAdd",
                                    "rolePermission"
                                  );
                                }}
                              />
                              <label
                                htmlFor="workflow_add"
                                style={{ fontWeight: "bold" }}
                                className="m-0"
                              >
                                add
                              </label>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <input
                                type="checkbox"
                                className="mx-3"
                                id="workflow_delete"
                                name="workflow_delete"
                                checked={
                                  formsdata.rolePermission[0].workflowDel
                                }
                                onChange={(e) => {
                                  handleChange(
                                    e.target.checked,
                                    "workflowDel",
                                    "rolePermission"
                                  );
                                }}
                              />
                              <label
                                htmlFor="workflow_delete"
                                style={{ fontWeight: "bold" }}
                                className="m-0"
                              >
                                delete
                              </label>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <input
                                type="checkbox"
                                className="mx-3"
                                id="workflow_edit"
                                name="workflow_edit"
                                checked={
                                  formsdata.rolePermission[0].workflowEdit
                                }
                                onChange={(e) => {
                                  handleChange(
                                    e.target.checked,
                                    "workflowEdit",
                                    "rolePermission"
                                  );
                                }}
                              />
                              <label
                                htmlFor="workflow_edit"
                                style={{ fontWeight: "bold" }}
                                className="m-0"
                              >
                                edit
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="col-md-6">
                        <div
                          className="position-relative form-group"
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <div
                            className=" d-flex"
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <label
                              htmlFor="monitorsearch"
                              style={{ fontWeight: "bold", fontSize: "16px" }}
                              className="m-0"
                            >
                              Monitor
                            </label>
                          </div>
                          <div
                            style={{ display: "flex", flexDirection: "row" }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <input
                                type="checkbox"
                                className="mx-3"
                                id="monitor_list"
                                name="monitor_list"
                                checked={
                                  formsdata.rolePermission[0].monitorList
                                }
                                onChange={(e) => {
                                  handleChange(
                                    e.target.checked,
                                    "monitorList",
                                    "rolePermission"
                                  );
                                }}
                              />
                              <label
                                htmlFor="monitor_list"
                                style={{ fontWeight: "bold" }}
                                className="m-0"
                              >
                                list
                              </label>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <input
                                type="checkbox"
                                className="mx-3"
                                id="monitor_add"
                                name="monitor_add"
                                checked={formsdata.rolePermission[0].monitorAdd}
                                onChange={(e) => {
                                  handleChange(
                                    e.target.checked,
                                    "monitorAdd",
                                    "rolePermission"
                                  );
                                }}
                              />
                              <label
                                htmlFor="monitor_add"
                                style={{ fontWeight: "bold" }}
                                className="m-0"
                              >
                                add
                              </label>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <input
                                type="checkbox"
                                className="mx-3"
                                id="monitor_delete"
                                name="monitor_delete"
                                checked={formsdata.rolePermission[0].monitorDel}
                                onChange={(e) => {
                                  handleChange(
                                    e.target.checked,
                                    "monitorDel",
                                    "rolePermission"
                                  );
                                }}
                              />
                              <label
                                htmlFor="monitor_delete"
                                style={{ fontWeight: "bold" }}
                                className="m-0"
                              >
                                delete
                              </label>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <input
                                type="checkbox"
                                className="mx-3"
                                id="monitor_edit"
                                name="monitor_edit"
                                checked={
                                  formsdata.rolePermission[0].monitorEdit
                                }
                                onChange={(e) => {
                                  handleChange(
                                    e.target.checked,
                                    "monitorEdit",
                                    "rolePermission"
                                  );
                                }}
                              />
                              <label
                                htmlFor="monitor_edit"
                                style={{ fontWeight: "bold" }}
                                className="m-0"
                              >
                                edit
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="col-md-6">
                        <div
                          className="position-relative form-group"
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <div
                            className=" d-flex"
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <label
                              htmlFor="rolesearch"
                              style={{ fontWeight: "bold", fontSize: "16px" }}
                              className="m-0"
                            >
                              Status
                            </label>
                          </div>
                          <div
                            style={{ display: "flex", flexDirection: "row" }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <input
                                type="radio"
                                id="status_active"
                                name="status_active"
                                className="mx-3"
                                checked={status.active}
                                onChange={() => {
                                  setStatus({
                                    active: true,
                                    deactive: false,
                                  });
                                }}
                              />
                              <label
                                htmlFor="status_active"
                                style={{ fontWeight: "bold" }}
                                className="m-0"
                              >
                                Active
                              </label>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <input
                                type="radio"
                                id="status_active"
                                name="status_active"
                                className="mx-3"
                                checked={status.deactive}
                                onChange={() => {
                                  setStatus({
                                    active: false,
                                    deactive: true,
                                  });
                                }}
                              />
                              <label
                                htmlFor="rolesearch"
                                style={{ fontWeight: "bold" }}
                                className="m-0"
                              >
                                DeActive
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="col-md-6">
                        <div className="position-relative form-group">
                          <label htmlFor="role_desc">Role Description</label>
                          <textarea
                            name="role_desc"
                            id="role_desc"
                            placeholder="Role Description"
                            type="text"
                            className="form-control"
                            value={formsdata.roleDescription}
                            onChange={(e) => {
                              handleChange(e.target.value, "roleDescription");
                            }}
                          ></textarea>
                          <p className="text-danger" id="desc_error"></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="divider"></div>
                <div>
                  {loading ? (
                    <div className="btn btn-warning text-dark px-5">
                      <span
                        className="spinner-border text-dark mx-2"
                        style={{
                          height: "16px",
                          width: "16px",
                        }}
                      ></span>
                      {isRoleEdit ? "Updating..." : "Creating..."}
                    </div>
                  ) : (
                    <button type="submit" className="btn btn-success px-5">
                      {isRoleEdit ? "Update" : "Create"}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateRoleForm;

import React, { useEffect } from "react";
import AppDrawer from "./components/AppDrawer";
import Footer from "./components/Footer";
import Header from "./components/Header";
import SettingsUI from "./components/SettingsUI";
import SideBar from "./components/SideBar";
import AnalyticsPage from "./Pages/AnalyticsPage";
import { Routes, Route, Navigate } from "react-router-dom";
import UserManagementPage from "./Pages/UserManagementPage";
import RolesPage from "./Pages/RolesPage";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import NoPageFound from "./Pages/NoPageFound";
// import CreateNewUser from "./Pages/CreateNewUser";
import { useDispatch, useSelector } from "react-redux";
import Helmet from "react-helmet";
import { setToken } from "./redux/dataSlice";
import CreateUserForm from "./components/CreateUserForm";
import CreateRoleForm from "./components/CreateRoleForm";
import CreateScanForm from "./components/CreateScanForm";
import CreateIntegrationForm from "./components/CreateIntegrationForm";
import ScanPage from "./Pages/ScanPage";
import IntegrationPage from "./Pages/IntegrationPage";
import Evidencetask from "./Pages/Evidencetask";
import CreateEvidencetask from "./components/CreateEvidencetask";
import Notification from "./components/Notification";
import EditUserProfile from "./components/EditUserProfile";
import EditTemplate from "./Pages/EditTemplate";

import CreateTemplate from "./Pages/CreateTemplate";
import Test from "./Pages/Test";
import Template from "./Pages/Template";
import RiskManagement from "./Pages/RiskManagement";
import { Policy } from "@mui/icons-material";
import Vault from "./Pages/Vault";
import People from "./Pages/People";

// Menu Components

//
import EditUserForm from "./components/EditUserForm";
import CreateNew from "./components/CreateNew";
import Inventory from "./MenuPages/Inventory.jsx";
import ClientManagement from "./MenuPages/ClientManagement";
import ComplianceProgram from "./MenuPages/ComplianceProgram.jsx";
import UserManagement from "./MenuPages/UserManagement";
import RoleManagement from "./MenuPages/RoleManagement";
import TrainingManagement from "./MenuPages/TrainingManagement";
import TemplateManagement from "./MenuPages/TemplateManagement";
import PolicyManagement from "./MenuPages/PolicyManagement.jsx";
import VendorManagement from "./MenuPages/VendorManagement";
import PeopleManagement from "./MenuPages/PeopleManagement.jsx";
import VaultManagement from "./MenuPages/VaultManagement.jsx";
import Workflows from "./MenuPages/Workflows.jsx";
import OrganizationInfo from "./MenuPages/OrganizationInfo.jsx";
import Assets from "./MenuPages/Assets";
import ScanPolicy from "./MenuPages/ScanPolicy.jsx";
import Scan from "./MenuPages/Scan.jsx";
import CreateNewScan from "./MenuPages/createNewScan.jsx";
import Alert from "./MenuPages/Alert.jsx";
import Audit from "./MenuPages/Audit.jsx";
import Evidence from "./MenuPages/Evidence.jsx";
import Vendor from "./MenuPages/Vendor.jsx";
import ServiceRequests from "./MenuPages/ServiceRequests.jsx";
import SubmenuCreate from "./MenuPages/SubmenuCreate.jsx";
import AuditPage from "./Pages/AuditPage";
import ScopingPage from "./Pages/ScopingPage";
import AuditEvidencePage from "./Pages/AuditEvidencePage";
import CreateNewIntegration from "./components/CreateNewIntegration";
import ScanReport from "./MenuPages/ScanReport";
import ScanReportPage from "./MenuPages/ScanReportPage";

function RouteContainer() {
  const { isLoggedIn } = useSelector((state) => state.clientData);
  const dispatch = useDispatch();
  const token = "Basic bG9jYWx2b2NhbDpsb2NhbHZvY2FsQDEyMzQ1";

  useEffect(() => {
    dispatch(setToken({ token: token }));
  }, []);

  return (
    <>
      <div
        className={
          isLoggedIn
            ? "app-container app-theme-white body-tabs-shadow fixed-header fixed-sidebar"
            : ""
        }
      >
        <Helmet>
          <script
            type="text/javascript"
            src="/assets/scripts/main.d810cf0ae7f39f28f336.js"
          ></script>
        </Helmet>
        {isLoggedIn ? <Header /> : null}
        {/* {isLoggedIn ? <SettingsUI /> : null} */}
        <div className={isLoggedIn ? "app-main" : ""}>
          {isLoggedIn ? <SideBar /> : null}
          <div className={isLoggedIn ? "app-main__outer" : ""}>
            <Routes>
              <Route path="/" element={<Login />}>
                <Route path="/login" element={<Login />} />
              </Route>

              <Route path="/register" element={<Register />} />

              <Route
                path="/dashboard"
                element={
                  isLoggedIn ? <AnalyticsPage /> : <Navigate to="/login" />
                }
              />

              <Route path="user-management">
                <Route
                  index
                  element={
                    isLoggedIn ? (
                      <UserManagementPage />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />

                <Route
                  path="users"
                  element={
                    isLoggedIn ? (
                      <UserManagementPage />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />

                <Route
                  path="roles"
                  element={
                    isLoggedIn ? <RolesPage /> : <Navigate to="/login" />
                  }
                />

                <Route
                  path="create-user"
                  element={
                    isLoggedIn ? <CreateUserForm /> : <Navigate to="/login" />
                  }
                />

                <Route
                  path="edit-user"
                  element={
                    isLoggedIn ? <EditUserForm /> : <Navigate to="/login" />
                  }
                />
                <Route
                  path="create-role"
                  element={
                    isLoggedIn ? <CreateRoleForm /> : <Navigate to="/login" />
                  }
                />
                <Route path="*" element={<NoPageFound />} />
              </Route>

              <Route
                path="/integrations"
                element={
                  isLoggedIn ? <IntegrationPage /> : <Navigate to="/login" />
                }
              />

              <Route
                path="/create-integration"
                element={
                  isLoggedIn ? (
                    <CreateIntegrationForm />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />

              <Route path="scan-management">
                <Route
                  index
                  element={isLoggedIn ? <ScanPage /> : <Navigate to="/login" />}
                />

                <Route
                  path="scans"
                  element={isLoggedIn ? <ScanPage /> : <Navigate to="/login" />}
                />
                <Route
                  path="create-scan"
                  element={
                    isLoggedIn ? <CreateScanForm /> : <Navigate to="/login" />
                  }
                />
                <Route path="*" element={<NoPageFound />} />
              </Route>

              <Route path="/evidencetask" element={<Evidencetask />} />

              <Route path="/riskmanagement" element={<RiskManagement />} />
              <Route path="/template" element={<Template />} />

              <Route path="/vault" element={<Vault />} />
              <Route path="/people" element={<People />} />
              <Route path="/policy" element={<Policy />} />
              <Route path="/test" element={<Test />} />

              <Route
                path="create-user"
                element={
                  isLoggedIn ? <CreateEvidencetask /> : <Navigate to="/login" />
                }
              />
              <Route
                path="create-new"
                element={isLoggedIn ? <CreateNew /> : <Navigate to="/login" />}
              />
              <Route
                path="submenuCreate"
                element={
                  isLoggedIn ? <SubmenuCreate /> : <Navigate to="/login" />
                }
              />

              <Route path="*" element={<NoPageFound />} />

              <Route
                path="/notification"
                element={
                  isLoggedIn ? <Notification /> : <Navigate to="/login" />
                }
              />

              <Route path="/createtemplate" element={<CreateTemplate />} />

              <Route
                path="/edit-user"
                element={
                  isLoggedIn ? <EditUserProfile /> : <Navigate to="/login" />
                }
              />

              <Route
                path="/edit-template"
                element={
                  isLoggedIn ? <EditTemplate /> : <Navigate to="/login" />
                }
              />
              {/*  */}

              <Route
                path="/clientManagement"
                element={
                  isLoggedIn ? <ClientManagement /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/complianceProgram"
                element={
                  isLoggedIn ? <ComplianceProgram /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/organizationInfo"
                element={
                  isLoggedIn ? <OrganizationInfo /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/userManagement"
                element={
                  isLoggedIn ? <UserManagement /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/roleManagement"
                element={
                  isLoggedIn ? <RoleManagement /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/trainingManagement"
                element={
                  isLoggedIn ? <TrainingManagement /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/templateManagement"
                element={
                  isLoggedIn ? <TemplateManagement /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/policyManagement"
                element={
                  isLoggedIn ? <PolicyManagement /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/vendorManagement"
                element={
                  isLoggedIn ? <VendorManagement /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/peopleManagement"
                element={
                  isLoggedIn ? <PeopleManagement /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/vaultManagement"
                element={
                  isLoggedIn ? <VaultManagement /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/workflows"
                element={isLoggedIn ? <Workflows /> : <Navigate to="/login" />}
              />
              <Route
                path="/inventory"
                element={isLoggedIn ? <Inventory /> : <Navigate to="/login" />}
              />
              <Route
                path="/newIntegration"
                element={
                  isLoggedIn ? (
                    <CreateNewIntegration />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/assets"
                element={isLoggedIn ? <Assets /> : <Navigate to="/login" />}
              />
              <Route
                path="/scanPolicy"
                element={isLoggedIn ? <ScanPolicy /> : <Navigate to="/login" />}
              />
              <Route
                path="/scanReport"
                element={isLoggedIn ? <ScanReport /> : <Navigate to="/login" />}
              />
              <Route
                path="/scanReportPage"
                element={
                  isLoggedIn ? <ScanReportPage /> : <Navigate to="/login" />
                }
              />

              <Route
                path="/scan"
                element={isLoggedIn ? <Scan /> : <Navigate to="/login" />}
              />
              <Route
                path="/createNewScan"
                element={
                  isLoggedIn ? <CreateNewScan /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/alert"
                element={isLoggedIn ? <Alert /> : <Navigate to="/login" />}
              />
              <Route
                path="/audit"
                element={isLoggedIn ? <Audit /> : <Navigate to="/login" />}
              />
              <Route
                path="/evidence"
                element={isLoggedIn ? <Evidence /> : <Navigate to="/login" />}
              />
              <Route
                path="/vendor"
                element={isLoggedIn ? <Vendor /> : <Navigate to="/login" />}
              />
              <Route
                path="/serviceRequests"
                element={
                  isLoggedIn ? <ServiceRequests /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/audit-new"
                element={isLoggedIn ? <AuditPage /> : <Navigate to="/login" />}
              />
              <Route
                path="/scoping-new"
                element={
                  isLoggedIn ? <ScopingPage /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/audit-evidence"
                element={
                  isLoggedIn ? <AuditEvidencePage /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/SettingsUI"
                element={isLoggedIn ? <SettingsUI /> : <Navigate to="/login" />}
              />
            </Routes>
            {isLoggedIn ? <Footer /> : null}
          </div>
        </div>
      </div>
      {isLoggedIn ? <AppDrawer /> : null}
      {isLoggedIn ? (
        <div className="app-drawer-overlay d-none animated fadeIn"></div>
      ) : null}
    </>
  );
}

export default RouteContainer;

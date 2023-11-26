import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import SafetyCheckOutlinedIcon from '@mui/icons-material/SafetyCheckOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import ManageHistoryOutlinedIcon from '@mui/icons-material/ManageHistoryOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import PersonIcon from '@mui/icons-material/Person';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import AcUnitOutlinedIcon from '@mui/icons-material/AcUnitOutlined';
import PolicyOutlinedIcon from '@mui/icons-material/PolicyOutlined';
export const analyticsCardData = [
  {
    title: "Total Cloud Accounts",
    value: 874,
    borderColor: "border-success",
  },
  {
    title: "Total Assets",
    value: 1874,
    borderColor: "border-danger",
  },
  {
    title: "Total Alerts",
    value: 1000,
    borderColor: "border-warning",
  },
  {
    title: "Critical Alerts",
    value: 1174,
    borderColor: "border-info",
  },
  {
    title: "High Alerts",
    value: 474,
    borderColor: "border-secondary",
  },
  {
    title: "Medium Alerts",
    value: 74,
    borderColor: "border-primary",
  },
  {
    title: "Low Alerts",
    value: 184,
    borderColor: "border-dark",
  },
  {
    title: "Compliant",
    value: 174,
    borderColor: "border-light",
  },
];

export const clientMenues = [
  {
    icon: "",
    menuname: "Dashboard",
    iconNames: "pe-7s-box1",
    submenunames: [],
    path: "/dashboard",
  },
  {
    icon: "",
    menuname: "User Management",
    iconNames: "pe-7s-users",
    submenunames: [
      {
        icon: "",
        name: "Users",
        path: "/user-management/users",
      },
      {
        icon: "",
        name: "Roles",
        path: "/user-management/roles",
      },
    ],
    path: "/user-management",
  },
  // {
  //   icon: "",
  //   menuname: "Settings",
  //   submenunames: [
  //     // {
  //     //   icon: "",
  //     //   name: "Organization Info",
  //     //   path: "/settings/organization-info",
  //     // },
  //     // {
  //     //   icon: "",
  //     //   name: "Compliance Program",
  //     //   path: "/settings/compliance-program",
  //     // },
  //     // {
  //     //   icon: "",
  //     //   name: "Workflows",
  //     //   path: "/settings/workflows",
  //     // },
  //     // {
  //     //   icon: "",
  //     //   name: "Scan Plugins",
  //     //   path: "/settings/scan-plugins",
  //     // },
  //     // {
  //     //   icon: "",
  //     //   name: "Policies",
  //     //   path: "/settings/policies",
  //     // },
  //     // {
  //     //   icon: "",
  //     //   name: "Questionnaires",
  //     //   path: "/settings/questionnaires",
  //     // },
  //     // {
  //     //   icon: "",
  //     //   name: "Tranings",
  //     //   path: "/settings/tranings",
  //     // },
  //     {
  //       icon: "",
  //       name: "Integrations",
  //       path: "/settings/integrations",
  //     },
  //   ],
  //   path: "none",
  // },
  {
    icon: "",
    menuname: "Integration",
    submenunames: [],
    iconNames: "pe-7s-door-lock",
    path: "/integrations",
  },
  {
    icon: "",
    menuname: "Scan",
    submenunames: [],
    iconNames : "pe-7s-cloud-upload",
    path: "/scan-management",
  },
  {
    icon: <PolicyOutlinedIcon />,
    menuname: "Policy",
    submenunames: [],
    iconNames: "@mui/icons-material/PolicyOutlined",
    path: "/Policy",
  },
  {
    icon: <AcUnitOutlinedIcon />,
    menuname: "Template",
    submenunames: [],
    iconNames: "@mui/icons-material/AcUnitOutlined",
    path: "/template",
  },
  {
    icon: <PersonIcon />,
    menuname: "Client-Management",
    iconNames: "@mui/icons-material/Person",
    submenunames: [
      {
        icon: "",
        name: "Add New Client",
        path: "/user-management/users",
      },
      {
        icon: "",
        name: "View All",
        path: "/user-management/roles",
      },
    ],
    path: "/user-management",
  },
  {
    icon: <PersonIcon />,
    menuname: "Compliance Program",
    iconNames: "@mui/icons-material/Person",
    submenunames: [
      {
        icon: "",
        name: "Add New Program",
        path: "/user-management/users",
      },
      {
        icon: "",
        name: "View All",
        path: "/user-management/roles",
      },
    ],
    path: "/user-management",
  },
  {
    icon: <InfoOutlinedIcon style={{ color: "gray" }} />,
    menuname: "Service Request",
    submenunames: [],
    iconNames: "@mui/icons-material/InfoOutlined",
    path: "/scan-management",
  },
  {
    icon: <NotificationsActiveOutlinedIcon style={{ color: "gray" }} />,
    menuname: "Notication",
    submenunames: [],
    iconNames: "@mui/icons-material/NotificationsActiveOutlined",
    path: "/scan-management",
  },
  {
    icon: <PeopleAltOutlinedIcon style={{ color: "gray" }} />,
    menuname: "People",
    submenunames: [],
    iconNames: "@mui/icons-material/PeopleAltOutlined",
    path: "/people",
  },

  {
    icon: <SafetyCheckOutlinedIcon />,
    menuname: "Vault",
    submenunames: [],
    iconNames: "@mui/icons-material/SafetyCheckOutlined",
    path: "/vault",
  },
  {
    icon: <AssignmentTurnedInOutlinedIcon />,
    menuname: "Evidence Task",
    submenunames: [],
    iconNames: "@mui/icons-material/AssignmentTurnedInOutlined",
    path: "/evidencetask",
  },
  {
    icon: <QuizOutlinedIcon />,
    menuname: "Test",
    submenunames: [],
    iconNames: "@mui/icons-material/QuizOutlined",
    path: "/test",
  },
  {
    icon: <ManageHistoryOutlinedIcon />,
    menuname: "Risk Management",
    submenunames: [],
    iconNames: "@mui/icons-material/ManageHistoryOutlined",
    path: "/",
  },
  {
    icon: <SettingsOutlinedIcon />,
    menuname: "Settings",
    iconNames: "@mui/icons-material/SettingsOutlined",
    submenunames: [
      {
        icon: "",
        name: "User-Management",
        path: "/user-management/users",
      },
      {
        icon: "",
        name: "Learning Management",
        path: "/user-management/roles",
      },
    ],

    path: "/scan-management",
  },

  // {
  //   icon: "",
  //   menuname: "Posture Management",
  //   submenunames: [
  //     {
  //       icon: "",
  //       name: "Scans",
  //       path: "/posture-management/scans",
  //     },
  //     {
  //       icon: "",
  //       name: "Compliance",
  //       path: "/posture-management/compliance",
  //     },
  //     {
  //       icon: "",
  //       name: "Audit",
  //       path: "/posture-management/audit",
  //     },
  //     {
  //       icon: "",
  //       name: "Audit Task",
  //       path: "/posture-management/audit-task",
  //     },
  //     {
  //       icon: "",
  //       name: "Evidence",
  //       path: "/posture-management/evidence",
  //     },
  //     {
  //       icon: "",
  //       name: "Alerts",
  //       path: "/posture-management/alerts",
  //     },
  //   ],
  //   path: "none",
  // },
  // {
  //   icon: "",
  //   menuname: "Service Requests",
  //   submenunames: [],
  //   path: "/service-requests",
  // },
  // {
  //   icon: "",
  //   menuname: "Manage Approvals",
  //   submenunames: [],
  //   path: "/manage-approvals",
  // },
  // {
  //   icon: "",
  //   menuname: "Monitoring",
  //   submenunames: [
  //     {
  //       icon: "",
  //       name: "Activity Logs",
  //       path: "/monitoring/activity-logs",
  //     },
  //   ],
  //   path: "none",
  // },
];

export const newUserForm = [
  { label: "First name", type: "text", id: "first_name" },
  { label: "Middle name", type: "text", id: "middle_name" },
  { label: "Last name", type: "text", id: "last_name" },
  { label: "Contact email", type: "text", id: "contact_email" },
  { label: "Phone number", type: "text", id: "phone_number" },
  { label: "Mobile number", type: "text", id: "mobile_number" },
  { label: "Role", type: "checkbox", id: "role" },
  { label: "Status", type: "checkbox", id: "status" },
];

export const roleform = [
  { label: "Name", type: "text", id: "role_name" },
  { label: "Permissoin", type: "checkbox", id: "permission" },
  { label: "Status", type: "checkbox", id: "status" },
];

export const IntegrationForm = {
  aws: [
    { idname: "accessKeyId", lebel: "Access KeyId", type: "text" },
    { idname: "secretAccessKey", lebel: "Secret Access Key", type: "text" },
  ],
  azure: [
    { idname: "applicationId", lebel: "Application Id", type: "text" },
    { idname: "keyValue", lebel: "Key Value", type: "text" },
    { idname: "directoryId", lebel: "Directory Id", type: "text" },
    { idname: "subscriptionId", lebel: "Subscription Id", type: "text" },
  ],
  gcp: [
    { idname: "accountType", lebel: "Account Type", type: "text" },
    { idname: "project", lebel: "Project", type: "text" },
    { idname: "clientEmail", lebel: "Client Email", type: "text" },
    { idname: "privateKey", lebel: "Private Key", type: "text" },
    { idname: "organisationId", lebel: "Organisation Id", type: "text" },
  ],
};

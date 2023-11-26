import React, { memo, useState, useEffect } from "react";
import { clientMenues } from "../helperFunctions/wedata";
import { Link } from "react-router-dom";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import SafetyCheckOutlinedIcon from "@mui/icons-material/SafetyCheckOutlined";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import ManageHistoryOutlinedIcon from "@mui/icons-material/ManageHistoryOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import PersonIcon from "@mui/icons-material/Person";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import AcUnitOutlinedIcon from "@mui/icons-material/AcUnitOutlined";
import PolicyOutlinedIcon from "@mui/icons-material/PolicyOutlined";
import { useSelector } from "react-redux";

function SideBar() {
  const res = useSelector((state) => state.clientData.res);
  const [getTemplate, setGetTemplate] = useState([]);
  const [roleByMenu, setRoleByMenu] = useState([]);

  // console.log(`res: ${JSON.stringify(res)}`);
  const userRole = res.data.user.role;
  // console.log(`userRole: ${userRole}`);

  useEffect(() => {
    const fetchApiData = async () => {
      const response = await fetch(
        "http://localhost:8000/v1/template/getTemplate?page=1&limit=100&keyword="
      );
      const data = await response.json();
      // console.log("data",data)
      setGetTemplate(data["results"]); // Set the fetched data to the "getTemplate" state
    };

    fetchApiData();
  }, []);

  useEffect(() => {
    // Define the API URL
    const apiUrl =
      "http://localhost:8000/v1/template/getTemplateByRole?role=client";

    // Make a GET request to the API
    fetch(apiUrl)
      .then((response) => response.json()) // Parse the JSON response
      .then((data) => {
        // Save the entire API response data in the 'roleByMenu' state
        setRoleByMenu(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); // Empty dependency array to run once on component mount

  // console.log(`roleByMenu: ${JSON.stringify(roleByMenu)}`);

  //
  const menus = res.data.menudata;

  // console.log("Menus:", menus);

  menus.forEach((menu) => {
    // console.log("Menu:", menu.menu);
    // console.log("Submenus:", menu.submenu);
  });

  // Map menus and submenus to the desired format
  const menuItems = roleByMenu.map((menu) => {
    const subMenuItems = menu.submenu.map((submenuItem) => {
      return {
        name: submenuItem.name,
        path: submenuItem.path || "/clientManagement", // Use submenuItem.path if it exists, otherwise use the default path
        icon: submenuItem.icon || "", // Set an icon for the submenu item
      };
    });

    return {
      id: menu.id,
      icon: "", // You can set an icon here
      menuname: menu.temp.name,
      submenunames: subMenuItems,
      iconNames: "", // Set icon names if needed
      path: "/dashboard", // Set path for the menu
    };
  });

  //   const subMenuItems = role.submenu.map((submenuItem) => {
  //     return {
  //       name: submenuItem.name,
  //       path: submenuItem.path || "/dashboard", // Set a default path if path is undefined
  //       icon: submenuItem.icon || "", // Set an icon for the submenu item
  //     };
  //   });
  //   console.log(`subMenuItems: ${subMenuItems.map((item) => item.name)}`);

  //   return {
  //     id: role.id, // You can use a unique identifier from your data if available
  //     icon: "", // You can set an icon here
  //     menuname: role.temp.name, // Display temp.name as menuname
  //     submenunames: subMenuItems.map((item) => item.name), // Display submenu names
  //     iconNames: "", // Set icon names if needed
  //     path: "/dashboard", // Set a default path for the menu
  //   };
  // });

  // console.log("Formatted Menu Items:", menuItems);

  // console.log("Formatted Menu Items:", menuItems);
  //
  // Create an array to hold the mapped objects
  // console.log(",..ssa...:",getTemplate)
  // const menunames = getTemplate.map((row, index) => {
  //   const menuname = row && row.temp && row.temp.name;
  //   return { menuname };
  // });

  // console.log("Output:", menunames);

  // clientMenues array (static menu items)
  const clientMenues = [
    {
      icon: "",
      menuname: "Dashboard",
      iconNames: "pe-7s-box1",
      submenunames: [],
      path: "/dashboard",
    },
    // {
    //   icon: <PersonIcon />,
    //   menuname: "Client-Management",
    //   iconNames: "@mui/icons-material/Person",
    //   submenunames: [
    //     {
    //       icon: "",
    //       name: "Add New Client",
    //       path: "/user-management/users",
    //     },
    //     {
    //       icon: "",
    //       name: "View All",
    //       path: "/user-management/roles",
    //     },
    //   ],
    //   path: "/user-management",
    // },
    // {
    //   icon: <PersonIcon />,
    //   menuname: "Compliance Program",
    //   iconNames: "@mui/icons-material/Person",
    //   submenunames: [
    //     {
    //       icon: "",
    //       name: "Add New Program",
    //       path: "/user-management/users",
    //     },
    //     {
    //       icon: "",
    //       name: "View All",
    //       path: "/user-management/roles",
    //     },
    //   ],
    //   path: "/user-management",
    // },
    // {
    //   icon: <InfoOutlinedIcon style={{ color: "gray" }} />,
    //   menuname: "Service Request",
    //   submenunames: [
    //     {
    //       icon: "",
    //       name: "Add New Program",
    //       path: "/scan-management",
    //     },
    //     {
    //       icon: "",
    //       name: "View All",
    //       path: "",
    //     },
    //   ],
    //   iconNames: "@mui/icons-material/InfoOutlined",
    //   path: "/user-management",
    // },

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
    //   icon: <InfoOutlinedIcon style={{ color: "gray" }} />,
    //   menuname: "Role Management",
    //   submenunames: [
    //     {
    //       icon: "",
    //       name: "Add New System Role",
    //       path: "",
    //     },
    //     {
    //       icon: "",
    //       name: "Add New Client Role",
    //       path: "",
    //     },
    //     {
    //       icon: "",
    //       name: "View All",
    //       path: "",
    //     },
    //   ],
    //   iconNames: "@mui/icons-material/InfoOutlined",
    //   path: "/user-management",
    // },

    // {
    //   icon: "",
    //   menuname: "Training Management",
    //   iconNames: "",
    //   submenunames: [
    //     {
    //       icon: "",
    //       name: "Add New Training",
    //       path: "",
    //     },
    //     {
    //       icon: "",
    //       name: "View All",
    //       path: "",
    //     },
    //   ],
    //   path: "/user-management",
    // },
    // {
    //   icon: "",
    //   menuname: "Policy Management",
    //   iconNames: "",
    //   submenunames: [
    //     {
    //       icon: "",
    //       name: "Add New Policy",
    //       path: "",
    //     },
    //     {
    //       icon: "",
    //       name: "View All",
    //       path: "",
    //     },
    //   ],
    //   path: "/user-management",
    // },
    // {
    //   icon: "",
    //   menuname: "Vendor Management",
    //   iconNames: "",
    //   submenunames: [
    //     {
    //       icon: "",
    //       name: "Add New Questionnaire",
    //       path: "",
    //     },
    //     {
    //       icon: "",
    //       name: "View All",
    //       path: "",
    //     },
    //   ],
    //   path: "/user-management",
    // },
    // {
    //   icon: <NotificationsActiveOutlinedIcon style={{ color: "gray" }} />,
    //   menuname: "Notication",
    //   submenunames: [],
    //   iconNames: "@mui/icons-material/NotificationsActiveOutlined",
    //   path: "/scan-management",
    // },

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
    // {
    //   icon: "",
    //   menuname: "Integration",
    //   submenunames: [],
    //   iconNames: "pe-7s-door-lock",
    //   path: "/integrations",
    // },
    // {
    //   icon: "",
    //   menuname: "Scan",
    //   submenunames: [],
    //   iconNames: "pe-7s-cloud-upload",
    //   path: "/scan-management",
    // },
    // {
    //   icon: <PolicyOutlinedIcon />,
    //   menuname: "Policy",
    //   submenunames: [],
    //   iconNames: "@mui/icons-material/PolicyOutlined",
    //   path: "/Policy",
    // },
    // {
    //   icon: <AcUnitOutlinedIcon />,
    //   menuname: "Template",
    //   submenunames: [],
    //   iconNames: "@mui/icons-material/AcUnitOutlined",
    //   path: "/template",
    // },
    // {
    //   icon: <NotificationsActiveOutlinedIcon style={{ color: "gray" }} />,
    //   menuname: "Notication",
    //   submenunames: [],
    //   iconNames: "@mui/icons-material/NotificationsActiveOutlined",
    //   path: "/scan-management",
    // },
    // {
    //   icon: <PeopleAltOutlinedIcon style={{ color: "gray" }} />,
    //   menuname: "People",
    //   submenunames: [],
    //   iconNames: "@mui/icons-material/PeopleAltOutlined",
    //   path: "/people",
    // },

    // {
    //   icon: <SafetyCheckOutlinedIcon />,
    //   menuname: "Vaults",
    //   submenunames: [],
    //   iconNames: "@mui/icons-material/SafetyCheckOutlined",
    //   path: "/vault",
    // },
    {
      icon: <AssignmentTurnedInOutlinedIcon />,
      menuname: "Evidence Task",
      submenunames: [],
      iconNames: "@mui/icons-material/AssignmentTurnedInOutlined",
      path: "/evidencetask",
    },
    // {
    //   icon: <QuizOutlinedIcon />,
    //   menuname: "Test",
    //   submenunames: [],
    //   iconNames: "@mui/icons-material/QuizOutlined",
    //   path: "/test",
    // },
    // {
    //   icon: <ManageHistoryOutlinedIcon />,
    //   menuname: "Risk Management",
    //   submenunames: [],
    //   iconNames: "@mui/icons-material/ManageHistoryOutlined",
    //   path: "/riskmanagement",
    // },
    // {
    //   icon: <SettingsOutlinedIcon />,
    //   menuname: "Settings",
    //   iconNames: "@mui/icons-material/SettingsOutlined",
    //   submenunames: [
    //     {
    //       icon: "",
    //       name: "User-Management",
    //       path: "/user-management/users",
    //     },
    //     {
    //       icon: "",
    //       name: "Learning Management",
    //       path: "/user-management/roles",
    //     },
    //   ],

    //   path: "/scan-management",
    // },

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

  const templateMenu = {
    icon: <AcUnitOutlinedIcon />,
    menuname: "Template",
    submenunames: [],
    iconNames: "@mui/icons-material/AcUnitOutlined",
    path: "/template",
  };
  // Combine the static menu items with the dynamic menu items from the API

  const updatedClientMenues = getTemplate.map((data) => ({
    id: data.id,
    icon: "",
    menuname: data.temp.name,
    submenunames: [],
    iconNames: "",
    path: "/evidencetask",
  }));

  const allMenuItems = [
    ...clientMenues,
    ...menuItems,
    templateMenu,
    // ...updatedClientMenues,
  ];
  // console.log("allMenuItems",allMenuItems);

  return (
    <div className="app-sidebar sidebar-shadow">
      <div className="app-header__logo">
        <div className="logo-src"></div>
        <div className="header__pane ml-auto">
          <div>
            <button
              type="button"
              className="hamburger close-sidebar-btn hamburger--elastic"
              data-class="closed-sidebar"
            >
              <span className="hamburger-box">
                <span className="hamburger-inner"></span>
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="app-header__mobile-menu">
        <div>
          <button
            type="button"
            className="hamburger hamburger--elastic mobile-toggle-nav"
          >
            <span className="hamburger-box">
              <span className="hamburger-inner"></span>
            </span>
          </button>
        </div>
      </div>

      <div className="app-header__menu">
        <span>
          <button
            type="button"
            className="btn-icon btn-icon-only btn btn-primary btn-sm mobile-toggle-header-nav"
          >
            <span className="btn-icon-wrapper">
              <i className="fa fa-ellipsis-v fa-w-6"></i>
            </span>
          </button>
        </span>
      </div>

      <div className="scrollbar-sidebar">
        <div className="app-sidebar__inner">
          <ul className="vertical-nav-menu">
            <li className="app-sidebar__heading">Client Administrator</li>

            {allMenuItems.map((item, i) => {
              const dataToSend = {
                id: item.id, // Assuming "id" is available in the "item" object
                menuname: item.menuname,
                // Add other required properties from item here
              };
              return (
                <Menu
                  menuname={item.menuname}
                  submenu={item.submenunames}
                  iconNames={item.iconNames}
                  icon={item.icon}
                  path={item.path}
                  dataToSend={dataToSend}
                  key={i}
                  i={i}
                />
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SideBar;

const Menu = memo((props) => {
  return (
    <li className={props.i === 0 ? "mm-active" : ""}>
      {props.submenu && props.submenu.length === 0 ? (
        <Link
          to={props.path}
          state={{ dataToSend: JSON.parse(JSON.stringify(props.dataToSend)) }}
        >
          <i className={"metismenu-icon " + props.iconNames}>{props.icon}</i>
          {props.menuname}
          {props.submenu && props.submenu.length > 0 ? (
            <i className="metismenu-state-icon pe-7s-angle-down caret-left"></i>
          ) : null}
        </Link>
      ) : (
        <a href="#">
          <i className={"metismenu-icon " + props.iconNames}></i>
          {props.menuname}
          {props.submenu && props.submenu.length > 0 ? (
            <i className="metismenu-state-icon pe-7s-angle-down caret-left"></i>
          ) : null}
        </a>
      )}
      {props.submenu && props.submenu.length > 0 ? (
        <ul>
          {props.submenu.map((item, i) => {
            const path = item.path || ""; // Set a default path if item.path is undefined
            return (
              <li className={props.i === 0 ? "mm-active" : ""} key={i}>
                <Link to={path}>
                  <i className="metismenu-icon"></i>
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      ) : null}
    </li>
  );
});

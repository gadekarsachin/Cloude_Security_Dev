import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteUser,
  getUsers,
  getUsers1,
  deleteUser1,
} from "../helperFunctions/apiFunction";
import { CiEdit } from "react-icons/ci";
import {
  RiDeleteBin6Line,
  RiAddBoxFill,
  RiArrowDownSLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
} from "react-icons/ri";
import { editUser } from "../redux/dataSlice";
import toast from "react-hot-toast";

function UserManagementPage() {
  const { user } = useSelector((state) => state.clientData);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState({
    limit: 2,
    page: 1,
    totalPages: 1,
    totalResults: 4,
    sortby: "asc",
    searchBy: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10; // Items per page

  const {
    refresh: { token },
  } = user;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function fetchUsers(obj) {
    const param = `/users?page=${obj.page}&sortBy=${obj.sortby}&limit=${obj.limit}&searchBy=${obj.searchBy}`;
    setLoading(true);
    getUsers(param, token)
      .then((res) => {
        setLoading(false);
        if (res.code === 200) {
          const { limit, page, totalPages, totalResults, results } = res.data;
          console.log(
            "🚀 ~ file: UserManagementPage.jsx:43 ~ .then ~ results",
            results
          );
          setPage({
            limit: limit,
            page: page,
            totalPages: totalPages,
            totalResults: totalResults,
          });
          setUsers(results);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function getAllUser() {
    const param = `user?page=${currentPage}&limit=${limit}`;
    setLoading(true);
    getUsers1(param).then((res) => {
      setLoading(false);

      const { limit, page, totalPages, totalResults, results } = res;
      setUsers(results);
      setTotalPages(totalPages);
    });
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Generate an array of page numbers for rendering (show 3 numbers if more than 4, else show all)
  const renderPageNumbers = () => {
    const pageNumbers = [];
    if (totalPages <= 4) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <li
            key={i}
            onClick={() => handlePageClick(i)}
            className={currentPage === i ? "active" : ""}
          >
            {i}
          </li>
        );
      }
    } else {
      const midPoint = Math.ceil(totalPages / 2);
      let startPage, endPage;
      if (currentPage <= midPoint) {
        startPage = 1;
        endPage = 3;
      } else if (currentPage >= totalPages - midPoint + 1) {
        startPage = totalPages - 2;
        endPage = totalPages;
      } else {
        startPage = currentPage - 1;
        endPage = currentPage + 1;
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
          <li
            key={i}
            onClick={() => handlePageClick(i)}
            className={currentPage === i ? "active" : ""}
          >
            {i}
          </li>
        );
      }
    }
    return pageNumbers;
  };

  function setEdit(data) {
    console.log(data);
    // dispatch(editUser({ data: { ...data }, isEdit: true }));
    navigate("/user-management/edit-user", {
      state: { data: data },
    });
  }

  function deleteRecord(id) {
    console.log(id);
    const param = "user/" + id;
    deleteUser1(param)
      .then((res) => {
        console.log(res); // Check the response received from the API
        toast.success("User Deleted");
        getAllUser();
      })
      .catch((error) => {
        console.error("Error in deleteUser API:", error);
        toast.error("An error occurred while deleting the user");
      });
  }

  function checkforLimitClick() {
    const plimit = document.querySelector(".plimits");
    for (let i = 0; i < plimit?.childNodes?.length; i++) {
      plimit.childNodes[i].addEventListener("click", (e) => {
        const obj = { ...page };
        obj["limit"] = e.target.innerText;
        setPage({ ...obj });
      });
    }
  }

  function goForPreAndNext(type) {
    const obj = { ...page };
    if (type === "pre") {
      if (Number(page.page) - 1 > 0) {
        obj["page"] = page.page - 1;
        setPage({ ...obj });
        fetchUsers({ ...obj });
      }
    }
    if (type === "next") {
      if (users.length > 0) {
        obj["page"] = page.page + 1;
        setPage({ ...obj });
        fetchUsers({ ...obj });
      }
    }
  }

  var t = 1;
  useEffect(() => {
    if (t === 1) {
      dispatch(editUser({ data: {}, isEdit: false }));
      // fetchUsers(page);
      checkforLimitClick();
      t = 0;
    }
  }, []);

  useEffect(() => {
    getAllUser();
  }, [currentPage]);
  return (
    <>
      <div className="app-main__inner">
        <div className="main-card mb-3 card">
          <div className="card-header">
            <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
              All Users
            </div>
            <div className="btn-actions-pane-right">
              <Link
                to="/user-management/create-user"
                className="btn btn-outline-primary d-flex justify-content-center align-items-sm-center"
                data-toggle="modal"
                data-target="#exampleModalLong"
              >
                <RiAddBoxFill size={25} className="mx-2" />
                Create New User
              </Link>
            </div>
          </div>
          <div className="card-header d-flex justify-content-between">
            <div className="">
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search By"
              />
            </div>
            <div className="limitcont border px-2 py-1 rounded">
              <span style={{ textTransform: "capitalize" }}>
                Limit{" " + page.limit}
                <RiArrowDownSLine size={15} id="ldarr" />
              </span>
              <div className="plimits">
                <div>10</div>
                <div>25</div>
                <div>50</div>
                <div>100</div>
              </div>
            </div>
          </div>
          <div className="mb-3 mt-3 text-center">
            {/* <div className="paginatet"> */}
            {/* <span
                  onClick={handlePreviousPage} disabled={currentPage === 1}
                  style={{
                    cursor: "pointer",
                  }}
                
                  className="pagination"
                >
                  <RiArrowLeftSLine size={15} />
                </span>

                <ul className="page-numbers inline-list">
          {renderPageNumbers()}
        </ul>

                <span
                    onClick={handleNextPage} disabled={currentPage === totalPages}
                  style={{
  
                    cursor: "pointer",
                  }}
         
              
                  className="paginationt"
                >
                  <RiArrowRightSLine size={15} />
                </span> */}
            {/* </div> */}

            <div className="pagination">
              <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                <RiArrowLeftSLine size={15} />
              </button>
              <ul className="page-numbers inline-list">
                {renderPageNumbers()}
              </ul>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                <RiArrowRightSLine size={15} />
              </button>
            </div>
            <style>
              {`
          .pagination {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 20px;
          }

          .pagination button,
          .pagination li {
            margin: 0 5px;
            padding: 0px 5px;
            border: 1px solid #3f6ad7;
            background-color: #fff;
            color: #3f6ad7;
            cursor: pointer;
            border-radius: 50%;
            font-size:15px;
          }

          .pagination button:hover,
          .pagination li.active {
            background-color: #3f6ad7;
            color: #fff;
          }

          .inline-list {
            display: flex;
            list-style: none;
            padding: 0;
            margin-top: auto;
            margin-bottom: auto;
          }

          .inline-list li {
            margin-right: 5px;
          }

          /* YourComponent.css */
          .table-container {
            max-height: 430px;
            overflow-y: auto;
          }
      
          table {
            width: 100%;
            border-collapse: collapse;
          }
      
          table th {
            background-color: #3f6ad7;
            color: #ffffff;
            position: sticky;
            top: 0;
            z-index: 1;
          }
      
          table th, table td {
            padding: 8px;
            text-align: center;
          }          
        `}
            </style>
          </div>

          <div
            className="table-responsive"
            style={{
              height: "430px",
            }}
          >
            <table>
              <thead>
                <tr
                  style={{
                    color: "#ffffff",
                    backgroundColor: "#3f6ad7",
                    position: "sticky",
                    top: "0px",
                    zIndex: "1",
                  }}
                >
                  <th className="text-center">Name</th>
                  <th className="text-center">Contact Email</th>
                  <th className="text-center">Phone Number</th>
                  <th className="text-center">Mobile Number</th>
                  <th className="text-center">Role</th>
                  <th className="text-center">Status</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {!loading ? (
                  users.length > 0 ? (
                    users.map((item, i) => (
                      <tr key={i * 5} className="mytrs">
                        <td className="text-center">{item.name}</td>
                        <td className="text-center">{item?.email}</td>
                        <td className="text-center">{item?.phoneNumber}</td>
                        <td className="text-center">{item?.mobileNumber}</td>
                        <td className="text-center">{item?.role?.roleName}</td>
                        <td className="status" style={{ textAlign: "center" }}>
                          <div
                            className={`badge badge-pill ${
                              item?.status === 1
                                ? "badge-success"
                                : "badge-danger"
                            }`}
                          >
                            {item?.status === 1 ? " Active" : " Deactive"}
                          </div>
                        </td>

                        <td className="text-center">
                          <div className=" d-flex">
                            <span
                              title="Edit Record"
                              style={{ cursor: "pointer" }}
                              onClick={() => setEdit(item)}
                            >
                              <CiEdit className="text-danger mx-3" size={22} />
                            </span>
                            <span
                              title="Delete Record"
                              style={{ cursor: "pointer" }}
                              onClick={() => deleteRecord(item.id)}
                            >
                              <RiDeleteBin6Line className="text-danger1" />
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr style={{ height: "392px" }}>
                      <td colSpan={9} className="text-center">
                        No Records Found!
                      </td>
                    </tr>
                  )
                ) : (
                  <tr style={{ height: "392px" }}>
                    <td colSpan={10} className="text-center">
                      <span
                        className=" spinner-border fsize-1 text-primary mx-2"
                        style={{ height: "25px", width: "25px" }}
                      ></span>
                      <div className="text-monospace p-3 ">Loading...</div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        {/* <div className="mb-3 text-center">
          <div className="paginate-cont">
            <span
              style={{ opacity: Number(page.page) - 1 > 0 ? 1 : 0.4 }}
              onClick={() => goForPreAndNext("pre")}
            >
              <RiArrowLeftSLine size={15} />
            </span>
            <span>{Number(page.page) - 1}</span>
            <span>{page.page}</span>
            <span>{Number(page.page) + 1}</span>
            <span
              style={{ opacity: users.length > 0 ? 1 : 0.4 }}
              onClick={() => goForPreAndNext("next")}
            >
              <RiArrowRightSLine size={15} />
            </span>
          </div>
        </div> */}
      </div>
    </>
  );
}

export default UserManagementPage;

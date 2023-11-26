import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getallRoles, getallRoles1 } from "../helperFunctions/apiFunction";
import { CiEdit } from "react-icons/ci";
import {
  RiAddBoxFill,
  RiArrowDownSLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
} from "react-icons/ri";
import { editRole } from "../redux/dataSlice";

function RolesPage() {
  const { user } = useSelector((state) => state.clientData);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState({
    limit: 10,
    page: 1,
    totalPages: 1,
    totalResults: 4,
    sortby: "asc",
    searchBy: "",
  });

  //
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10; // Items per page
  //
  const {
    refresh: { token },
  } = user;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function fetchRoles(obj) {
    const params = `/role?page=${obj.page}&sortBy=${obj.sortby}&limit=${obj.limit}&searchBy=${obj.searchBy}`;
    setLoading(true);
    getallRoles(params, token)
      .then((res) => {
        setLoading(false);
        if (res && res.code === 200) {
          const { limit, page, results, totalPages, totalResults } = res.data;
          setTotalPages(totalPages); // Update totalPages
          setRoles(results);
        }
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }
  //
  //

  function allRoles() {
    const param = `user?page=${currentPage}&limit=${limit}`;
    setLoading(true);
    getallRoles1(param).then((res) => {
      setLoading(false);

      const { limit, page, totalPages, totalResults, results } = res;
      setRoles(results);
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

  //
  //

  function checkforLimitClick() {
    const plimit = document.querySelector(".plimits");
    // console.log(plimit.childNodes);
    for (let i = 0; i < plimit?.childNodes?.length; i++) {
      plimit.childNodes[i].addEventListener("click", (e) => {
        const obj = { ...page };
        // console.log("limit clicked", e.target.innerText);
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
        fetchRoles({ ...obj });
        // setPage({ ...obj });
      }
    }
    if (type === "next") {
      if (roles.length > 0) {
        obj["page"] = page.page + 1;
        // setPage({ ...obj });
        fetchRoles({ ...obj });
      }
    }
  }

  useEffect(() => {
    // This effect will run only once when the component mounts
    dispatch(editRole({ data: {}, isRoleEdit: false }));
    fetchRoles({ page: currentPage }); // Fetch roles when component mounts
    checkforLimitClick();
  }, []);

  useEffect(() => {
    // This effect will run whenever currentPage changes
    fetchRoles({ ...page, page: currentPage }); // Fetch roles based on currentPage
  }, [currentPage]);

  function setEdit(data) {
    dispatch(editRole({ data: { ...data }, isRoleEdit: true }));
    navigate("/user-management/create-role");
  }
  useEffect(() => {
    fetchRoles({ page: currentPage, sortby: page.sortby });
  }, [currentPage, page.sortby]);

  return (
    <>
      <div className="app-main__inner">
        <div className="main-card mb-3 card">
          <div className="card-header">
            <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
              Roles List
            </div>
            <div className="btn-actions-pane-right">
              <Link
                to="/user-management/create-role"
                className="btn btn-outline-primary d-flex justify-content-center align-items-sm-center"
                // className="btn-icon btn-wide btn-outline-1x btn btn-outline-focus btn-sm d-flex make-vcenter px-1"
                data-toggle="modal"
                data-target="#exampleRoleModalLong"
              >
                <RiAddBoxFill size={25} className="mx-2" />
                Create New Role
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
            <div className="limitcont  border px-2 py-1 rounded">
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
          <div className="table-responsive">
            <table className="align-middle text-truncate mb-0 table table-borderless table-hover">
              <thead>
                <tr>
                  <th className="text-center">S.N.</th>
                  <th className="text-center">Role Name</th>
                  <th className="text-center">Status</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {!loading ? (
                  roles.length > 0 ? (
                    roles.map((item, i) => {
                      return (
                        <tr key={i * 2.15} className="mytrs">
                          <td className="text-center text-muted">{i + 1}</td>
                          <td className="text-center">{item.roleName}</td>
                          <td className="text-center">
                            <div
                              className={`badge badge-pill ${
                                item.status === 1
                                  ? "badge-success"
                                  : "badge-danger"
                              }`}
                            >
                              {item.status === 1 ? " Active" : " Deactive"}
                            </div>
                          </td>
                          <td className="text-center">
                            <span
                              title="Edit Record"
                              style={{ cursor: "pointer" }}
                              onClick={() => setEdit(item)}
                            >
                              <CiEdit className="text-danger mx-3" size={22} />
                            </span>
                          </td>
                        </tr>
                      );
                    })
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
        <div className="mb-3 mt-3 text-center">
          <div className="pagination">
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
              <RiArrowLeftSLine size={15} />
            </button>
            <ul className="page-numbers inline-list">{renderPageNumbers()}</ul>
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
        `}
          </style>
        </div>
      </div>
    </>
  );
}

export default RolesPage;

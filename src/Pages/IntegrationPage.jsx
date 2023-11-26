import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  RiAddBoxFill,
  RiArrowDownSLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
} from "react-icons/ri";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import {
  getallIntegration,
  createPerformScan,
} from "../helperFunctions/apiFunction";
import { TbDotsVertical } from "react-icons/tb";
import { editUser } from "../redux/dataSlice";

function IntegrationPage() {
  const { user } = useSelector((state) => state.clientData);
  const [integration, setIntegration] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState({
    limit: 10,
    page: 1,
    totalPages: 1,
    totalResults: 4,
    sortby: "asc",
    searchBy: "",
  });
  const {
    refresh: { token },
  } = user;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function getIntegrationData(obj) {
    const params = `/integration?page=${obj.page}&sortBy=${obj.sortby}&limit=${obj.limit}&searchBy=${obj.searchBy}`;
    getallIntegration(params, token)
      .then((res) => {
        if (res) {
          if (res.code === 200) {
            const { limit, page, results, totalPages, totalResults } = res.data;
            setPage({
              limit: limit,
              page: page,
              totalPages: totalPages,
              totalResults: totalResults,
            });
            setIntegration(results);
          }
        }
      })
      .catch((e) => {
        toast.error("Some error occurred!");
        console.log(e);
      });
  }

  function setEdit(data) {
    dispatch(editUser({ data: { ...data }, isEdit: true }));
    navigate("/create-integration");
  }

  function showECCard(i) {
    const elm = document.getElementsByClassName("editcard");
    // console.log(elm[i].classList, i);
    if (elm[i].classList.contains("showec")) {
      elm[i].classList.remove("showec");
    } else {
      for (let k = 0; k < elm.length; k++) {
        if (i != k) {
          elm[k].classList.remove("showec");
        }
      }
      elm[i].classList.add("showec");
    }
  }

  const CustomBtn = (props) => {
    const { item, index } = props;
    console.log(
      "🚀 ~ file: IntegrationPage.jsx:67 ~ CustomBtn ~ item",
      item,
      index
    );
    const [waitText, setWaitText] = useState("Scan");
    const data = {
      AWS_ACCESS_KEY_ID: item.accessKeyId,
      AWS_SECRET_ACCESS_KEY: item.secretAccessKey,
      cloud: index,
      scanid: Math.floor(Math.random() * 100000),
    };
    const waitThreeSeconds = () => {
      setWaitText("Scanning...");
      setLoading(true);
      createPerformScan(data, token)
        .then((res) => {
          if (res) {
            if (res.code === 200) toast.success("Scan Successful!");
          } else {
            toast.error("Some error occurred!");
          }
          setWaitText("Scan");
        })
        .catch((e) => {
          console.log(e);
          toast.error("Some error occurred!");
        });
    };
    return (
      <div>
        <button
          className="btn btn-outline-info rounded-pill"
          onClick={waitThreeSeconds}
        >
          {waitText}
        </button>
        <br />
        <br />
      </div>
    );
  };

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
        // setPage({ ...obj });
        getIntegrationData({ ...obj });
      }
    }
    if (type === "next") {
      if (integration.length > 0) {
        obj["page"] = page.page + 1;
        // setPage({ ...obj });
        getIntegrationData({ ...obj });
      }
    }
  }

  var isFetched = 0;
  useEffect(() => {
    dispatch(editUser({ data: {}, isEdit: false }));
    if (isFetched === 0) {
      // console.log(integration);
      getIntegrationData(page);
      checkforLimitClick();
      isFetched = 1;
    }
  }, []);

  return (
    <>
      <div className="app-main__inner">
        <div className="main-card mb-3 card">
          <div className="card-header">
            <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
              Integration List
            </div>
            <div className="btn-actions-pane-right">
              <Link
                to="/create-integration"
                className="btn btn-outline-primary d-flex justify-content-center align-items-sm-center"
                data-toggle="modal"
                data-target="#exampleIoleModalLong"
              >
                <RiAddBoxFill size={20} className="mr-1" />
                Create
              </Link>
            </div>
          </div>
          <div className="card-header d-flex justify-content-between">
            <div className="">
              <input type="text" className="form-control form-control-sm" placeholder="Search By" />
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
          <div className="table-responsive">
            <table className="align-middle text-truncate mb-0 table table-borderless table-hover">
              <thead>
                <tr>
                  <th className="text-center">S.N.</th>
                  <th className="text-center">Integration Name</th>
                  <th className="text-center">Status</th>
                  <th className="text-right">Action</th>
                  <th className="text-center">Scan Now</th>
                </tr>
              </thead>
              <tbody>
                {!loading ? (
                  integration.length > 0 ? (
                    integration?.map((item, i) => {
                      return (
                        <tr key={i * 2.15} className="mytrs">
                          <td className="text-center text-muted">{i + 1}</td>
                          <td className="text-center">
                            {item.integrationName}
                          </td>
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
                          <td className="text-right">
                            <div className="ecp">
                              <span
                                title="Edit Record"
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  showECCard(i);
                                }}
                              >
                                {/* <CiEdit className="text-danger mx-3" size={22} /> */}
                                <TbDotsVertical
                                  className="text-secondary mx-3"
                                  size={22}
                                />
                              </span>
                              <div
                                className="editcard"
                                style={
                                  integration.length - 1 === i
                                    ? {
                                        margin: "-50px 37px",
                                      }
                                    : {}
                                }
                              >
                                <span
                                  onClick={() => {
                                    setEdit(item);
                                  }}
                                >
                                  Edit
                                </span>
                                <span>Delete</span>
                                <span>Active</span>
                              </div>
                            </div>
                          </td>
                          <td className="text-center">
                            <CustomBtn
                              item={item.integrationConfig[0]}
                              key={item.id}
                              index={item.integrationName}
                            />
                          </td>
                          {/*<td className="text-center">
                                      <CustomButton isLoading={isLoading} onClick={onClick} />
                                       <button style={{ cursor: "pointer" }} onClick={() => {
                                        performScan(item.integrationConfig[0], item.integrationName);
                                      }} className="btn btn-outline-info rounded-pill">
                                        {loading ? (
                                          <span
                                            className=" spinner-border fsize-1 mx-2"
                                            style={{ height: "20px", width: "20px" }}
                                          ></span>
                                        ) : null}
                                        {loading ? "Scanning..." : "Scan"}
                                      </button> 
                                    </td>*/}
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
                  <tr className="">
                    <td colspan="5" className="text-md-center py-5">
                      {" "}
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
        <div className="mb-3 text-center">
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
              style={{ opacity: integration.length > 0 ? 1 : 0.4 }}
              onClick={() => goForPreAndNext("next")}
            >
              <RiArrowRightSLine size={15} />
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default IntegrationPage;

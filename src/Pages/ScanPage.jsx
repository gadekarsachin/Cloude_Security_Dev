import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getScans } from "../helperFunctions/apiFunction";
import {
  RiArrowDownSLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
} from "react-icons/ri";

function ScanPage() {
  const { user } = useSelector((state) => state.clientData);
  const [scans, setScans] = useState([]);
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

  function fetchScans(obj) {
    const param = `/scan/performScan?page=${obj.page}&sortBy=${obj.sortby}&limit=${obj.limit}&searchBy=${obj.searchBy}`;
    setLoading(true);
    getScans(param, token)
      .then((res) => {
        setLoading(false);
        if (res.code === 200) {
          const { limit, page, totalPages, totalResults, results } = res.data;
          setPage({
            limit: limit,
            page: page,
            totalPages: totalPages,
            totalResults: totalResults,
          });
          setScans(results);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

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
        fetchScans({ ...obj });
        // setPage({ ...obj });
      }
    }
    if (type === "next") {
      if (scans.length > 0) {
        obj["page"] = page.page + 1;
        // setPage({ ...obj });
        fetchScans({ ...obj });
      }
    }
  }

  var t = 1;
  useEffect(() => {
    if (t === 1) {
      fetchScans(page);
      checkforLimitClick();
      t = 0;
    }
  }, []);
  return (
    <div className="app-main__inner">
      <div className="main-card mb-3 card">
        <div className="card-header">
          <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
            All Scans
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
        <div
          className="table-responsive"
          style={{
            height: "430px",
          }}
        >
          <table className="align-middle text-truncate mb-0 table table-borderless table-hover">
            <thead>
              <tr>
                {/* <th className="text-center">Test Status</th> */}
                <th className="text-center">Scan Id</th>
                <th className="text-center">Scan TimeStamp</th>
                <th className="text-center">Cloud Account Id</th>
                {/* <th className="text-center">Cloud Asset Id</th>
                <th className="text-center">Cloud Asset Region</th> */}
                {/* <th className="text-center">Cloud Provider</th>
                <th className="text-center">Cloud Asset Category</th> */}
                {/* <th className="text-center">Test Title</th> */}
                <th className="text-center">Test Output</th>
              </tr>
            </thead>
            <tbody>
              {!loading ? (
                scans.length > 0 ? (
                  scans.map((item, i) => (
                    <tr key={i * 5}>
                      <td className="text-center">
                        <div
                          className={`badge badge-pill ${item.testStatus == "OK"
                              ? "badge-success"
                              : "badge-danger"
                            }`}
                        >
                          {item.testStatus}
                        </div>
                      </td>
                      <td className="text-center">{item.scanId}</td>
                      <td className="text-center">{item.scanTimestamp}</td>
                      <td className="text-center">{item.cloudAccountId}</td>
                      {/* <td className="text-center">{item.cloudAssetId}</td>
                      <td className="text-center">{item.cloudAssetRegion}</td>
                      <td className="text-center">{item.cloudProvider}</td>
                      <td className="text-center">{item.cloudAssetCategory}</td>
                      <td className="text-center">{item.testTitle}</td> */}
                      <td className="text-center">{item.testOutput}</td>

                      {/*<td className="text-center">
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
                          <RiDeleteBin6Line className="text-danger" />
                        </span>
                      </div>
                    </td> */}
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
            style={{ opacity: scans.length > 0 ? 1 : 0.4 }}
            onClick={() => goForPreAndNext("next")}
          >
            <RiArrowRightSLine size={15} />
          </span>
        </div>
      </div>
    </div>
  );
}

export default ScanPage;

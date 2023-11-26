import React, { useState } from "react";
import { RiAddBoxFill, RiCheckboxFill } from "react-icons/ri";
import { Button, Modal } from "react-bootstrap";
export default function Scoping() {
  return (
    <>
      <div>
        <div className="app-main__inner scoping_page_wrapper">
          <div className="main-card mb-3 card">
            <div className="card-body">
              <div className="table-responsive scoping_table_wrapper">
                <table className="align-middle text-truncate mb-0 table table-borderless table-hover">
                  <thead>
                    <tr>
                      <th>Requirement Title</th>
                      <th className="th-escription">Requirement Description</th>
                      <th>Control Title</th>
                      <th className="th-escription">Control Description</th>
                      <th>in Scope?</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="mytrs">
                      <td>Requirement 1</td>
                      <td className="td-escription">
                        10 Month Lorem Ipsum is simply dummy text of the
                        printing and typesetting industry. Lorem Ipsum has been
                        the industry's standard dummy text ever since the 1500s
                      </td>
                      <td>Control - 1</td>
                      <td className="td-escription">
                        10 Month Lorem Ipsum is simply dummy text of the
                        printing and typesetting industry. Lorem Ipsum has been
                        the industry's standard dummy text ever since the 1500s
                      </td>
                      <td>
                        {" "}
                        <input type="checkbox" />
                        &nbsp;
                        <label check>Check-box</label>
                      </td>
                    </tr>
                    <tr className="mytrs">
                      <td>Requirement 1</td>
                      <td className="td-escription">
                        10 Month Lorem Ipsum is simply dummy text of the
                        printing and typesetting industry. Lorem Ipsum has been
                        the industry's standard dummy text ever since the 1500s
                      </td>
                      <td>Control - 1</td>
                      <td className="td-escription">
                        10 Month Lorem Ipsum is simply dummy text of the
                        printing and typesetting industry. Lorem Ipsum has been
                        the industry's standard dummy text ever since the 1500s
                      </td>
                      <td>
                        {" "}
                        <input type="checkbox" />
                        &nbsp;
                        <label check>Check-box</label>
                      </td>
                    </tr>
                  </tbody>
                  <tfoot className="mt-3">
                    <tr>
                      <td colSpan={5}>
                        <button className="btn btn-outline-primary d-flex align-items-center justify-content-center m-auto">
                          <RiCheckboxFill size={25} className="mr-2 ml-0" />
                          Submit
                        </button>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

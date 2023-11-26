import React, { useState } from "react";
import { RiAddBoxFill, RiSave2Fill } from "react-icons/ri";
import { Button, Modal } from "react-bootstrap";
export default function AuditPage() {
  const [showModal, setShowModal] = useState(false);
  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };
  return (
    <>
      <div>
        <div className="app-main__inner audit_page_wrapper">
          <div className="main-card mb-3 card">
            <div className="card-header">
              <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
                Audit
              </div>
              <div className="btn-actions-pane-right">
                <button
                  onClick={handleModalOpen}
                  className="btn btn-outline-primary d-flex align-items-center"
                >
                  <RiAddBoxFill size={25} className="mr-2 ml-0" /> Create New
                </button>
              </div>
            </div>
            <div className="card-body">
              <div className="table-responsive audit_table_wrapper">
                <table className="align-middle text-truncate mb-0 table table-borderless table-hover">
                  <thead>
                    <tr>
                      <th>Audit Name</th>
                      <th>Audit Duration</th>
                      <th className="text-center">Audit Standard</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="mytrs">
                      <td>Audit 1</td>
                      <td>10 Month</td>
                      <td>
                        <div class="badge badge-pill badge-info badge-complete">
                          {" "}
                          Completed
                        </div>
                      </td>
                    </tr>
                    <tr className="mytrs">
                      <td>Audit 1</td>
                      <td>10 Month</td>
                      <td>
                        <div class="badge badge-pill badge-warning badge-progress">
                          In Progress
                        </div>
                      </td>
                    </tr>
                    <tr className="mytrs">
                      <td>Audit 1</td>
                      <td>10 Month</td>
                      <td>
                        <div class="badge badge-pill badge-danger badge-progress">
                          Scheduled
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        className="create_modal_wrapper"
        show={showModal}
        onHide={handleModalClose}
      >
        <Modal.Header>
          <Modal.Title className="text-danger">Create New Audit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div>
              <div className="form-group">
                <label>Audit Name</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Enter Audit Name"
                />
              </div>
              <div className="form-group">
                <label>Audit Duration</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Enter Audit Duration"
                />
              </div>
              <div className="form-group">
                <label>Audit Standard</label>
                <select className="form-control">
                  <option selected disabled>Select Audit Standard</option>
                  <option value="Completed">Completed</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Scheduled">Scheduled</option>
                </select>
              </div>
              <div className="form-group">
                <button  className="btn btn-outline-primary d-flex align-items-center justify-content-center m-auto">
                <RiSave2Fill size={25} className="mr-2 ml-0" /> Audit Saved
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

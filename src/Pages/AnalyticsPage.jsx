import React, { memo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getDashboardData } from "../helperFunctions/apiFunction";
import { analyticsCardData } from "../helperFunctions/wedata";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Select from "react-select";

const options = [
  { value: "Account 1", label: "Account 1" },
  { value: "Account 2", label: "Account 2" },
  { value: "Account 3", label: "Account 3" },
  { value: "All Account", label: "All Account" },
];

const options1 = [
  { value: "Account A", label: "Account A" },
  { value: "Account B", label: "Account B" },
  { value: "Account C", label: "Account C" },
  { value: "All Account", label: "All Account" },
];
function AnalyticsPage() {
  const { user } = useSelector((state) => state.clientData);
  const {
    refresh: { token },
  } = user;
  const [dashData, setDashData] = useState({
    "No of Non Compliant": 0,
    "No of Compliant": 0,
    "Total Scans": 0,
    "Total Accounts": 0,
  });
  var t = 1;
  useEffect(() => {
    if (t === 1) {
      getDashboardData(token)
        .then((res) => {
          if (res.code === 200) {
            setDashData({
              "No of Non Compliant": res.data.noOfNonCompliant,
              "No of Compliant": res.data.noOfCompliant,
              "Total Scans": res.data.totalScans,
              "Total Accounts": res.data.totalAccounts,
            });
          }
        })
        .catch((e) => console.log("Error in dash data pai::", e));
      t = 0;
    }
  }, []);

  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      if (percentage < 80) {
        setPercentage(percentage + 1);
      }
    }, 50);
  }, [percentage]);

  const data1 = [
    { name: "January", value: 10 },
    { name: "February", value: 20 },
    { name: "March", value: 30 },
    { name: "April", value: 40 },
    { name: "May", value: 50 },
    { name: "June", value: 60 },
  ];

  const data2 = [
    { name: "January", value: 50 },
    { name: "February", value: 40 },
    { name: "March", value: 30 },
    { name: "April", value: 20 },
    { name: "May", value: 10 },
    { name: "June", value: 0 },
  ];

  const handleChange = (selectedOption) => {
    console.log(`Selected option:`, selectedOption);
  };

  const handleChange1 = (selectedOption1) => {
    console.log(`Selected option:`, selectedOption1);
  };

  return (
    <div className="app-main__inner">
      <div className="app-page-title">
        <div className="page-title-wrapper">
          <div className="page-title-heading">
            <div className="page-title-icon">
              <i className="pe-7s-car icon-gradient bg-mean-fruit"></i>
            </div>
            <div>Analytics Dashboard</div>
          </div>
        </div>
      </div>

      <div className="tabs-animation">
        <div className="row">
          {Object.keys(dashData).map((item, i) => {
            return (
              <DetailsCard
                title={item}
                value={Object.values(dashData)[i]}
                borderColor={analyticsCardData[i].borderColor}
                key={i * 3}
              />
            );
          })}
        </div>

        {/* <div className="card mb-3">
          <div className="card-header-tab card-header">
            <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
              <i className="header-icon lnr-laptop-phone mr-3 text-muted opacity-6">
                {" "}
              </i>
              Easy Dynamic Tables
            </div>
            <div className="btn-actions-pane-right actions-icon-btn">
              <div className="btn-group dropdown">
                <button
                  type="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  className="btn-icon btn-icon-only btn btn-link"
                >
                  <i className="pe-7s-menu btn-icon-wrapper"></i>
                </button>
                <div
                  tabIndex="-1"
                  role="menu"
                  aria-hidden="true"
                  className="dropdown-menu-right rm-pointers dropdown-menu-shadow dropdown-menu-hover-link dropdown-menu"
                >
                  <h6 tabIndex="-1" className="dropdown-header">
                    Header
                  </h6>
                  <button type="button" tabIndex="0" className="dropdown-item">
                    <i className="dropdown-icon lnr-inbox"> </i>
                    <span>Menus</span>
                  </button>
                  <button type="button" tabIndex="0" className="dropdown-item">
                    <i className="dropdown-icon lnr-file-empty"> </i>
                    <span>Settings</span>
                  </button>
                  <button type="button" tabIndex="0" className="dropdown-item">
                    <i className="dropdown-icon lnr-book"> </i>
                    <span>Actions</span>
                  </button>
                  <div tabIndex="-1" className="dropdown-divider"></div>
                  <div className="p-3 text-right">
                    <button className="mr-2 btn-shadow btn-sm btn btn-link">
                      View Details
                    </button>
                    <button className="mr-2 btn-shadow btn-sm btn btn-primary">
                      Action
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card-body">
            <table
              style={{width: "100%"}}
              id="example"
              className="table table-hover table-striped table-bordered"
            >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Position</th>
                  <th>Office</th>
                  <th>Age</th>
                  <th>Start date</th>
                  <th>Salary</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Tiger Nixon</td>
                  <td>System Architect</td>
                  <td>Edinburgh</td>
                  <td>61</td>
                  <td>2011/04/25</td>
                  <td>$320,800</td>
                </tr>
                <tr>
                  <td>Garrett Winters</td>
                  <td>Accountant</td>
                  <td>Tokyo</td>
                  <td>63</td>
                  <td>2011/07/25</td>
                  <td>$170,750</td>
                </tr>
                <tr>
                  <td>Ashton Cox</td>
                  <td>Junior Technical Author</td>
                  <td>San Francisco</td>
                  <td>66</td>
                  <td>2009/01/12</td>
                  <td>$86,000</td>
                </tr>
                <tr>
                  <td>Cedric Kelly</td>
                  <td>Senior Javascript Developer</td>
                  <td>Edinburgh</td>
                  <td>22</td>
                  <td>2012/03/29</td>
                  <td>$433,060</td>
                </tr>
                <tr>
                  <td>Airi Satou</td>
                  <td>Accountant</td>
                  <td>Tokyo</td>
                  <td>33</td>
                  <td>2008/11/28</td>
                  <td>$162,700</td>
                </tr>
                <tr>
                  <td>Brielle Williamson</td>
                  <td>Integration Specialist</td>
                  <td>New York</td>
                  <td>61</td>
                  <td>2012/12/02</td>
                  <td>$372,000</td>
                </tr>
                <tr>
                  <td>Herrod Chandler</td>
                  <td>Sales Assistant</td>
                  <td>San Francisco</td>
                  <td>59</td>
                  <td>2012/08/06</td>
                  <td>$137,500</td>
                </tr>
                <tr>
                  <td>Rhona Davidson</td>
                  <td>Integration Specialist</td>
                  <td>Tokyo</td>
                  <td>55</td>
                  <td>2010/10/14</td>
                  <td>$327,900</td>
                </tr>
                <tr>
                  <td>Colleen Hurst</td>
                  <td>Javascript Developer</td>
                  <td>San Francisco</td>
                  <td>39</td>
                  <td>2009/09/15</td>
                  <td>$205,500</td>
                </tr>
                <tr>
                  <td>Sonya Frost</td>
                  <td>Software Engineer</td>
                  <td>Edinburgh</td>
                  <td>23</td>
                  <td>2008/12/13</td>
                  <td>$103,600</td>
                </tr>
                <tr>
                  <td>Jena Gaines</td>
                  <td>Office Manager</td>
                  <td>London</td>
                  <td>30</td>
                  <td>2008/12/19</td>
                  <td>$90,560</td>
                </tr>
                <tr>
                  <td>Quinn Flynn</td>
                  <td>Support Lead</td>
                  <td>Edinburgh</td>
                  <td>22</td>
                  <td>2013/03/03</td>
                  <td>$342,000</td>
                </tr>
                <tr>
                  <td>Charde Marshall</td>
                  <td>Regional Director</td>
                  <td>San Francisco</td>
                  <td>36</td>
                  <td>2008/10/16</td>
                  <td>$470,600</td>
                </tr>
                <tr>
                  <td>Haley Kennedy</td>
                  <td>Senior Marketing Designer</td>
                  <td>London</td>
                  <td>43</td>
                  <td>2012/12/18</td>
                  <td>$313,500</td>
                </tr>
                <tr>
                  <td>Tatyana Fitzpatrick</td>
                  <td>Regional Director</td>
                  <td>London</td>
                  <td>19</td>
                  <td>2010/03/17</td>
                  <td>$385,750</td>
                </tr>
                <tr>
                  <td>Michael Silva</td>
                  <td>Marketing Designer</td>
                  <td>London</td>
                  <td>66</td>
                  <td>2012/11/27</td>
                  <td>$198,500</td>
                </tr>
                <tr>
                  <td>Paul Byrd</td>
                  <td>Chief Financial Officer (CFO)</td>
                  <td>New York</td>
                  <td>64</td>
                  <td>2010/06/09</td>
                  <td>$725,000</td>
                </tr>
                <tr>
                  <td>Gloria Little</td>
                  <td>Systems Administrator</td>
                  <td>New York</td>
                  <td>59</td>
                  <td>2009/04/10</td>
                  <td>$237,500</td>
                </tr>
                <tr>
                  <td>Bradley Greer</td>
                  <td>Software Engineer</td>
                  <td>London</td>
                  <td>41</td>
                  <td>2012/10/13</td>
                  <td>$132,000</td>
                </tr>
                <tr>
                  <td>Dai Rios</td>
                  <td>Personnel Lead</td>
                  <td>Edinburgh</td>
                  <td>35</td>
                  <td>2012/09/26</td>
                  <td>$217,500</td>
                </tr>
                <tr>
                  <td>Jenette Caldwell</td>
                  <td>Development Lead</td>
                  <td>New York</td>
                  <td>30</td>
                  <td>2011/09/03</td>
                  <td>$345,000</td>
                </tr>
                <tr>
                  <td>Yuri Berry</td>
                  <td>Chief Marketing Officer (CMO)</td>
                  <td>New York</td>
                  <td>40</td>
                  <td>2009/06/25</td>
                  <td>$675,000</td>
                </tr>
                <tr>
                  <td>Caesar Vance</td>
                  <td>Pre-Sales Support</td>
                  <td>New York</td>
                  <td>21</td>
                  <td>2011/12/12</td>
                  <td>$106,450</td>
                </tr>
                <tr>
                  <td>Doris Wilder</td>
                  <td>Sales Assistant</td>
                  <td>Sidney</td>
                  <td>23</td>
                  <td>2010/09/20</td>
                  <td>$85,600</td>
                </tr>
                <tr>
                  <td>Angelica Ramos</td>
                  <td>Chief Executive Officer (CEO)</td>
                  <td>London</td>
                  <td>47</td>
                  <td>2009/10/09</td>
                  <td>$1,200,000</td>
                </tr>
                <tr>
                  <td>Gavin Joyce</td>
                  <td>Developer</td>
                  <td>Edinburgh</td>
                  <td>42</td>
                  <td>2010/12/22</td>
                  <td>$92,575</td>
                </tr>
                <tr>
                  <td>Jennifer Chang</td>
                  <td>Regional Director</td>
                  <td>Singapore</td>
                  <td>28</td>
                  <td>2010/11/14</td>
                  <td>$357,650</td>
                </tr>
                <tr>
                  <td>Brenden Wagner</td>
                  <td>Software Engineer</td>
                  <td>San Francisco</td>
                  <td>28</td>
                  <td>2011/06/07</td>
                  <td>$206,850</td>
                </tr>
                <tr>
                  <td>Fiona Green</td>
                  <td>Chief Operating Officer (COO)</td>
                  <td>San Francisco</td>
                  <td>48</td>
                  <td>2010/03/11</td>
                  <td>$850,000</td>
                </tr>
                <tr>
                  <td>Shou Itou</td>
                  <td>Regional Marketing</td>
                  <td>Tokyo</td>
                  <td>20</td>
                  <td>2011/08/14</td>
                  <td>$163,000</td>
                </tr>
                <tr>
                  <td>Michelle House</td>
                  <td>Integration Specialist</td>
                  <td>Sidney</td>
                  <td>37</td>
                  <td>2011/06/02</td>
                  <td>$95,400</td>
                </tr>
                <tr>
                  <td>Suki Burks</td>
                  <td>Developer</td>
                  <td>London</td>
                  <td>53</td>
                  <td>2009/10/22</td>
                  <td>$114,500</td>
                </tr>
                <tr>
                  <td>Prescott Bartlett</td>
                  <td>Technical Author</td>
                  <td>London</td>
                  <td>27</td>
                  <td>2011/05/07</td>
                  <td>$145,000</td>
                </tr>
                <tr>
                  <td>Gavin Cortez</td>
                  <td>Team Leader</td>
                  <td>San Francisco</td>
                  <td>22</td>
                  <td>2008/10/26</td>
                  <td>$235,500</td>
                </tr>
                <tr>
                  <td>Martena Mccray</td>
                  <td>Post-Sales support</td>
                  <td>Edinburgh</td>
                  <td>46</td>
                  <td>2011/03/09</td>
                  <td>$324,050</td>
                </tr>
                <tr>
                  <td>Unity Butler</td>
                  <td>Marketing Designer</td>
                  <td>San Francisco</td>
                  <td>47</td>
                  <td>2009/12/09</td>
                  <td>$85,675</td>
                </tr>
                <tr>
                  <td>Howard Hatfield</td>
                  <td>Office Manager</td>
                  <td>San Francisco</td>
                  <td>51</td>
                  <td>2008/12/16</td>
                  <td>$164,500</td>
                </tr>
                <tr>
                  <td>Hope Fuentes</td>
                  <td>Secretary</td>
                  <td>San Francisco</td>
                  <td>41</td>
                  <td>2010/02/12</td>
                  <td>$109,850</td>
                </tr>
                <tr>
                  <td>Vivian Harrell</td>
                  <td>Financial Controller</td>
                  <td>San Francisco</td>
                  <td>62</td>
                  <td>2009/02/14</td>
                  <td>$452,500</td>
                </tr>
                <tr>
                  <td>Timothy Mooney</td>
                  <td>Office Manager</td>
                  <td>London</td>
                  <td>37</td>
                  <td>2008/12/11</td>
                  <td>$136,200</td>
                </tr>
                <tr>
                  <td>Jackson Bradshaw</td>
                  <td>Director</td>
                  <td>New York</td>
                  <td>65</td>
                  <td>2008/09/26</td>
                  <td>$645,750</td>
                </tr>
                <tr>
                  <td>Olivia Liang</td>
                  <td>Support Engineer</td>
                  <td>Singapore</td>
                  <td>64</td>
                  <td>2011/02/03</td>
                  <td>$234,500</td>
                </tr>
                <tr>
                  <td>Bruno Nash</td>
                  <td>Software Engineer</td>
                  <td>London</td>
                  <td>38</td>
                  <td>2011/05/03</td>
                  <td>$163,500</td>
                </tr>
                <tr>
                  <td>Sakura Yamamoto</td>
                  <td>Support Engineer</td>
                  <td>Tokyo</td>
                  <td>37</td>
                  <td>2009/08/19</td>
                  <td>$139,575</td>
                </tr>
                <tr>
                  <td>Thor Walton</td>
                  <td>Developer</td>
                  <td>New York</td>
                  <td>61</td>
                  <td>2013/08/11</td>
                  <td>$98,540</td>
                </tr>
                <tr>
                  <td>Finn Camacho</td>
                  <td>Support Engineer</td>
                  <td>San Francisco</td>
                  <td>47</td>
                  <td>2009/07/07</td>
                  <td>$87,500</td>
                </tr>
                <tr>
                  <td>Serge Baldwin</td>
                  <td>Data Coordinator</td>
                  <td>Singapore</td>
                  <td>64</td>
                  <td>2012/04/09</td>
                  <td>$138,575</td>
                </tr>
                <tr>
                  <td>Zenaida Frank</td>
                  <td>Software Engineer</td>
                  <td>New York</td>
                  <td>63</td>
                  <td>2010/01/04</td>
                  <td>$125,250</td>
                </tr>
                <tr>
                  <td>Zorita Serrano</td>
                  <td>Software Engineer</td>
                  <td>San Francisco</td>
                  <td>56</td>
                  <td>2012/06/01</td>
                  <td>$115,000</td>
                </tr>
                <tr>
                  <td>Jennifer Acosta</td>
                  <td>Junior Javascript Developer</td>
                  <td>Edinburgh</td>
                  <td>43</td>
                  <td>2013/02/01</td>
                  <td>$75,650</td>
                </tr>
                <tr>
                  <td>Cara Stevens</td>
                  <td>Sales Assistant</td>
                  <td>New York</td>
                  <td>46</td>
                  <td>2011/12/06</td>
                  <td>$145,600</td>
                </tr>
                <tr>
                  <td>Hermione Butler</td>
                  <td>Regional Director</td>
                  <td>London</td>
                  <td>47</td>
                  <td>2011/03/21</td>
                  <td>$356,250</td>
                </tr>
                <tr>
                  <td>Lael Greer</td>
                  <td>Systems Administrator</td>
                  <td>London</td>
                  <td>21</td>
                  <td>2009/02/27</td>
                  <td>$103,500</td>
                </tr>
                <tr>
                  <td>Jonas Alexander</td>
                  <td>Developer</td>
                  <td>San Francisco</td>
                  <td>30</td>
                  <td>2010/07/14</td>
                  <td>$86,500</td>
                </tr>
                <tr>
                  <td>Shad Decker</td>
                  <td>Regional Director</td>
                  <td>Edinburgh</td>
                  <td>51</td>
                  <td>2008/11/13</td>
                  <td>$183,000</td>
                </tr>
                <tr>
                  <td>Michael Bruce</td>
                  <td>Javascript Developer</td>
                  <td>Singapore</td>
                  <td>29</td>
                  <td>2011/06/27</td>
                  <td>$183,000</td>
                </tr>
                <tr>
                  <td>Donna Snider</td>
                  <td>Customer Support</td>
                  <td>New York</td>
                  <td>27</td>
                  <td>2011/01/25</td>
                  <td>$112,000</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <th>Name</th>
                  <th>Position</th>
                  <th>Office</th>
                  <th>Age</th>
                  <th>Start date</th>
                  <th>Salary</th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        
        <div className="card no-shadow bg-transparent no-border rm-borders mb-3">
          <div className="card">
            <div className="no-gutters row">
              <div className="col-md-12 col-lg-4">
                <ul className="list-group list-group-flush">
                  <li className="bg-transparent list-group-item">
                    <div className="widget-content p-0">
                      <div className="widget-content-outer">
                        <div className="widget-content-wrapper">
                          <div className="widget-content-left">
                            <div className="widget-heading">Total Orders</div>
                            <div className="widget-subheading">
                              Last year expenses
                            </div>
                          </div>
                          <div className="widget-content-right">
                            <div className="widget-numbers text-success">1896</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="bg-transparent list-group-item">
                    <div className="widget-content p-0">
                      <div className="widget-content-outer">
                        <div className="widget-content-wrapper">
                          <div className="widget-content-left">
                            <div className="widget-heading">Clients</div>
                            <div className="widget-subheading">
                              Total Clients Profit
                            </div>
                          </div>
                          <div className="widget-content-right">
                            <div className="widget-numbers text-primary">
                              $12.6k
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="col-md-12 col-lg-4">
                <ul className="list-group list-group-flush">
                  <li className="bg-transparent list-group-item">
                    <div className="widget-content p-0">
                      <div className="widget-content-outer">
                        <div className="widget-content-wrapper">
                          <div className="widget-content-left">
                            <div className="widget-heading">Followers</div>
                            <div className="widget-subheading">
                              People Interested
                            </div>
                          </div>
                          <div className="widget-content-right">
                            <div className="widget-numbers text-danger">45,9%</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="bg-transparent list-group-item">
                    <div className="widget-content p-0">
                      <div className="widget-content-outer">
                        <div className="widget-content-wrapper">
                          <div className="widget-content-left">
                            <div className="widget-heading">Products Sold</div>
                            <div className="widget-subheading">
                              Total revenue streams
                            </div>
                          </div>
                          <div className="widget-content-right">
                            <div className="widget-numbers text-warning">$3M</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="col-md-12 col-lg-4">
                <ul className="list-group list-group-flush">
                  <li className="bg-transparent list-group-item">
                    <div className="widget-content p-0">
                      <div className="widget-content-outer">
                        <div className="widget-content-wrapper">
                          <div className="widget-content-left">
                            <div className="widget-heading">Total Orders</div>
                            <div className="widget-subheading">
                              Last year expenses
                            </div>
                          </div>
                          <div className="widget-content-right">
                            <div className="widget-numbers text-success">1896</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="bg-transparent list-group-item">
                    <div className="widget-content p-0">
                      <div className="widget-content-outer">
                        <div className="widget-content-wrapper">
                          <div className="widget-content-left">
                            <div className="widget-heading">Clients</div>
                            <div className="widget-subheading">
                              Total Clients Profit
                            </div>
                          </div>
                          <div className="widget-content-right">
                            <div className="widget-numbers text-primary">
                              $12.6k
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div> */}
        <div className="mt-5">
          <div
            className="row justify-content-center  py-5 "
            style={{ backgroundColor: "#fafbfc" }}
          >
            <div className="col-lg-6 col-md-8 d-flex align-items-center  justify-content-center">
              <div className="w-100">
                <h3 className="text-center mb-4">Top Vulnerabilities</h3>

                <div>
                  <div
                    className="mb-4"
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "right",
                    }}
                  >
                    <Select
                      options={options}
                      onChange={handleChange}
                      placeholder="Select an option"
                    />
                  </div>
                  <div className="d-flex justify-content-center">
                    <LineChart width={340} height={340} data={data1}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="value" stroke="blue" />
                    </LineChart>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-8 mt-4 mt-md-0 d-flex align-items-center">
              <div className="w-100">
                <h3 className="text-center mb-4">Completion Status</h3>

                <div>
                  <div
                    className="mb-4"
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "right",
                    }}
                  >
                    <Select
                      options={options1}
                      onChange={handleChange1}
                      placeholder="Select an option"
                    />
                  </div>
                  <div className="d-flex justify-content-center">
                    <div style={{ width: 280, height: 340 }}>
                      <div className="row d-flex justify-content-center">
                        <div className="col-6">
                          <CircularProgressbar
                            value={percentage}
                            text={`${percentage}%`}
                            strokeWidth={8}
                            styles={{
                              path: {
                                stroke: "#0c84ff",
                                strokeLinecap: "butt",
                                transition: "stroke-dashoffset 0.5s ease 0s",
                              },
                              text: {
                                fill: "#0c84ff",
                                fontSize: "20px",
                                fontWeight: "bold",
                              },
                            }}
                          />
                          <div className="ios-text font-weight-bold">HIPAA</div>
                        </div>
                        <div className="col-6">
                          <CircularProgressbar
                            value={percentage}
                            text={`${percentage}%`}
                            strokeWidth={8}
                            styles={{
                              path: {
                                stroke: "#0c84ff",
                                strokeLinecap: "butt",
                                transition: "stroke-dashoffset 0.5s ease 0s",
                              },
                              text: {
                                fill: "#0c84ff",
                                fontSize: "20px",
                                fontWeight: "bold",
                              },
                            }}
                          />
                          <div className="ios-text font-weight-bold">
                            IOS 9001
                          </div>
                        </div>
                        <div className="col-6 mt-3">
                          <CircularProgressbar
                            value={percentage}
                            text={`${percentage}%`}
                            strokeWidth={8}
                            styles={{
                              path: {
                                stroke: "#0c84ff",
                                strokeLinecap: "butt",
                                transition: "stroke-dashoffset 0.5s ease 0s",
                              },
                              text: {
                                fill: "#0c84ff",
                                fontSize: "20px",
                                fontWeight: "bold",
                              },
                            }}
                          />
                          <div className="ios-text font-weight-bold">PCI</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsPage;

const DetailsCard = memo((props) => {
  return (
    <div className="col-md-6 col-xl-3">
      <div
        className={`card mb-3 widget-chart widget-chart2
         text-left card-btm-border card-shadow-success ${props.borderColor}`}
      >
        <div className="widget-chat-wrapper-outer">
          <div className="widget-chart-content pt-3 pl-3 pb-1">
            <div className="widget-chart-flex">
              <div className="widget-numbers">
                <div className="widget-chart-flex">
                  <div className="fsize-4">
                    <div className="d-flex ">
                      {/* <small className="opacity-5">$</small> */}
                      <div>
                        <span>{props.value}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <h6
              className="widget-subheading mb-0 font-weight-bolder pt-2"
              style={{ textTransform: "capitalize" }}
            >
              {props.title}
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
});

import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../../styles/dashboard.module.css";
import axios from "axios";
import { url } from "../../api";
import SideBar from "../../components/Sidebar";
import NotAuthorized from "../../components/NotAuthorized";

function Leads({ checkAuth, authUser }) {
  const [data, setData] = useState([]);
  const [leads, setLeads] = useState([]);
  const [leadsForYou, setLeadsForYou] = useState([]);
  const [leadsByYou, setLeadsByYou] = useState([]);
  const [leadFilter, setLeadFilter] = useState(1);
  const userInfo = authUser("SL_USER__AUTH");

  //  get data for dashboard
  useEffect(() => {
    axios
      .get(
        `${url}/user-dashboard.php?type_id=${userInfo?.user_type}&user_id=${userInfo?.user_id}`
      )
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //  get all leads
  useEffect(() => {
    axios
      .get(`${url}/get_lead.php`, {
        headers: {
          Authorization: "Bearer " + userInfo?.token,
        },
      })
      .then((res) => {
        setLeads(res.data.leads);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //  get all leads for you
  useEffect(() => {
    axios
      .get(`${url}/get_for_user_posted_leads.php`, {
        headers: {
          Authorization: "Bearer " + userInfo?.token,
        },
      })
      .then((res) => {
        // console.log(res.data);
        setLeadsForYou(res.data.leads);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //  get all leads posted by you
  useEffect(() => {
    axios
      .get(`${url}/get_user_posted_leads.php`, {
        headers: {
          Authorization: "Bearer " + userInfo?.token,
        },
      })
      .then((res) => {
        // console.log(res.data);
        setLeadsByYou(res.data.leads);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //   function to render list of leads by filter
  const renderLeads = () => {
    if (leadFilter == 1) {
      return leads?.map((lead, index) => {
        return (
          <tr key={index}>
            <td>{lead.title}</td>
            <td>{lead.service_name}</td>
            <td>{lead.city_name}</td>
            <td>RS {lead.bugdet}</td>
            <td>{lead.posted_time}</td>
            <td>{lead.status == 2 ? "Closed" : "Open"}</td>
            <td>
              <Link href={`/leads/${lead.lead_id}`}>
                <a style={{ color: "blue" }}>View lead</a>
              </Link>
            </td>
          </tr>
        );
      });
    } else if (leadFilter == 2) {
      return leadsForYou?.map((lead, index) => {
        return (
          <tr key={index}>
            <td>{lead.title}</td>
            <td>{lead.service_name}</td>
            <td>{lead.city_name}</td>
            <td>RS {lead.bugdet}</td>
            <td>{lead.posted_time}</td>
            <td>{lead.status == 2 ? "Closed" : "Open"}</td>
            <td>
              <Link href={`/leads/${lead.lead_id}`}>
                <a style={{ color: "blue" }}>View lead</a>
              </Link>
            </td>
          </tr>
        );
      });
    } else {
      return leadsByYou?.map((lead, index) => {
        return (
          <tr key={index}>
            <td>{lead.title}</td>
            <td>{lead.service_name}</td>
            <td>{lead.city_name}</td>
            <td>{lead.bugdet ? lead.bugdet + " INR" : "not disclosed"}</td>
            <td>{lead.posted_time}</td>
            <td>{lead.status == 2 ? "Closed" : "Open"}</td>
            <td>
              <Link href={`/leads/my-leads/${lead.lead_id}`}>
                <a style={{ color: "blue" }}>View lead</a>
              </Link>
            </td>
          </tr>
        );
      });
    }
  };

  return (
    <div style={{ display: "flex" }}>
      {checkAuth("SL_USER__AUTH") == "LOGGED_IN" ? (
        <>
          <SideBar />
          <div className={styles.dashboard}>
            <div className={styles.email}>
              <p>
                SL Money Left - 0 :{" "}
                {data.is_gold_member == 0 ? "Bronze Member" : "Gold Member"}
              </p>
            </div>
            <div
              className={styles.intro}
              style={{ marginTop: "20px", marginBottom: "20px" }}
            >
              <h1>Leads</h1>
              <div className={styles.filterComponents}>
                <div className={styles.radioBtnContainer}>
                  <div
                    className={styles.radioBtn}
                    style={{
                      borderColor: leadFilter == 1 ? "#065451" : "#e6e6e6",
                    }}
                    onClick={() => {
                      setLeadFilter(1);
                    }}
                  >
                    <input
                      type="radio"
                      value={leadFilter}
                      name="leadFilter"
                      checked={leadFilter == 1}
                      style={{ display: "none" }}
                    />
                    All Leads
                  </div>
                  <div
                    className={styles.radioBtn}
                    style={{
                      borderColor: leadFilter == 2 ? "#065451" : "#e6e6e6",
                    }}
                    onClick={() => {
                      setLeadFilter(2);
                    }}
                  >
                    <input
                      type="radio"
                      value={leadFilter}
                      name="leadFilter"
                      checked={leadFilter == 2}
                      style={{ display: "none" }}
                    />
                    Leads for You
                  </div>
                  <div
                    className={styles.radioBtn}
                    style={{
                      borderColor: leadFilter == 3 ? "#065451" : "#e6e6e6",
                    }}
                    onClick={() => {
                      setLeadFilter(3);
                    }}
                  >
                    <input
                      type="radio"
                      value={leadFilter}
                      name="leadFilter"
                      checked={leadFilter == 3}
                      style={{ display: "none" }}
                    />
                    Posted by You
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.leads}>
              <div style={{ position: "relative" }}>
                <img src="/search.svg" />
                <input type="text" placeholder="search for a lead" />
              </div>
              <div className="table-responsive" style={{ marginTop: "20px" }}>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Industry</th>
                      <th>Location</th>
                      <th>Budget</th>
                      <th>Post date</th>
                      <th>Status</th>
                      <th>View contact</th>
                    </tr>
                  </thead>
                  <tbody>{renderLeads()}</tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      ) : (
        <NotAuthorized />
      )}
    </div>
  );
}

export default Leads;

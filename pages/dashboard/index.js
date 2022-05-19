import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../../styles/dashboard.module.css";
import DashboardCard from "../../components/DashboardCard";
import axios from "axios";
import { url } from "../../api";
import SideBar from "../../components/Sidebar";
import NotAuthorized from "../../components/NotAuthorized";

function Dashboard({ checkAuth, authUser }) {
  const [data, setData] = useState([]);
  const [leads, setLeads] = useState([]);

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

  //  get all leads style={{ display: "flex" }}
  useEffect(() => {
    axios
      .get(`${url}/get_lead.php`, {
        headers: {
          Authorization: "Bearer " + userInfo?.token,
        },
      })
      .then((res) => {
        console.log(res.data);
        setLeads(res.data.leads);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
            <div className={styles.intro}>
              <h1>Dashboard</h1>
              <section>
                <div>
                  <h1>Hi, {data.first_name}</h1>
                  <p>Ready to start your day with StartupLanes ?</p>
                  {userInfo.user_type == 1 && (
                    <Link href="/startup-profile">
                      <a>create your startup profile</a>
                    </Link>
                  )}
                </div>
                <div>
                  <img src="/dashboard.png" />
                </div>
              </section>

              <h1>Overview</h1>
              <div className={styles.overview}>
                <Link href="/dashboard/">
                  <a>
                    <DashboardCard
                      img="/msg.png"
                      title="Messages"
                      number={data.message}
                    />
                  </a>
                </Link>
                <Link href="/dashboard/connections">
                  <a>
                    <DashboardCard
                      img="/contact.png"
                      title="Contacts"
                      number={data.connections}
                    />
                  </a>
                </Link>
                <Link href="/leads">
                  <a>
                    <DashboardCard
                      img="/lead.png"
                      title="Leads"
                      number={data.number_of_lead}
                    />
                  </a>
                </Link>
                <Link href="/events/">
                  <a>
                    <DashboardCard
                      img="/event.png"
                      title="Events"
                      number={data.upcoming_events}
                    />
                  </a>
                </Link>
                {userInfo.user_type == 1 && (
                  <Link href="/startup-profile/">
                    <a>
                      <DashboardCard
                        img="/startup.png"
                        title="your"
                        number="Startup"
                      />
                    </a>
                  </Link>
                )}
              </div>
            </div>
            {/* <div className={styles.leads}>
              <div style={{ position: "relative" }}>
                <img src="/search.svg" />
                <input type="text" placeholder="search for a lead" />
              </div>
              <div class="table-responsive" style={{ marginTop: "20px" }}>
                <table class="table">
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
                  <tbody>
                    {leads?.map((lead) => {
                      return (
                        <tr>
                          <td>{lead.title}</td>
                          <td>{lead.service_name}</td>
                          <td>{lead.city_name}</td>
                          <td>RS {lead.bugdet}</td>
                          <td>{lead.posted_time}</td>
                          <td>{lead.status == 2 ? "Closed" : "Open"}</td>
                          <td>
                            <Link href={`/dashboard/${lead.lead_id}`}>
                              <a style={{ color: "blue" }}>View lead</a>
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div> */}
          </div>
        </>
      ) : (
        <NotAuthorized />
      )}
    </div>
  );
}

export default Dashboard;

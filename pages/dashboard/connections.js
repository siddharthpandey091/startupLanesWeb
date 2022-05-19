import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../../styles/dashboard.module.css";
import axios from "axios";
import { url } from "../../api";
import SideBar from "../../components/Sidebar";
import NotAuthorized from "../../components/NotAuthorized";
import { ToastContainer } from "react-toastify";

function Connections({ checkAuth, authUser }) {
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [connections, setconnections] = useState([]);
  const [connectionReqs, setConnectionReqs] = useState([]);
  const [connectionFilter, setconnectionFilter] = useState(1);
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

  //  get all connections
  useEffect(() => {
    axios
      .post(
        `${url}/get_connections_of_a_user.php`,
        {
          my_id: userInfo.user_id,
        },
        {
          headers: {
            Authorization: "Bearer " + userInfo?.token,
          },
        }
      )
      .then((res) => {
        setconnections(res.data.connection);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [refresh]);

  //  get all pending connection requests
  useEffect(() => {
    axios
      .post(
        `${url}/get_pending_connection_req.php`,
        {
          my_id: userInfo.user_id,
        },
        {
          headers: {
            Authorization: "Bearer " + userInfo?.token,
          },
        }
      )
      .then((res) => {
        setConnectionReqs(res.data.requestes);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [refresh]);

  // function to accept connection req
  const acceptReq = (id) => {
    axios
      .post(
        `${url}/accept_connection_req.php`,
        {
          my_id: userInfo.user_id,
          friend_id: id,
        },
        {
          headers: {
            Authorization: "Bearer " + userInfo.token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.data.status == 1) {
          toast.success("Request Accepted.", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
        if (res.data.status == 0) {
          toast.error("failed to accept request", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
        setRefresh(!refresh);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // function to accept connection req
  const rejectReq = (id) => {
    axios
      .post(
        `${url}/reject_connection_req.php`,
        {
          my_id: userInfo.user_id,
          friend_id: id,
        },
        {
          headers: {
            Authorization: "Bearer " + userInfo.token,
          },
        }
      )
      .then((res) => {
        if (res.data.status == 1) {
          toast.success("Request deleted.", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
        if (res.data.status == 0) {
          toast.error("failed to delete request", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
        setRefresh(!refresh);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //   function to render list of connection by filter
  const renderConnection = () => {
    if (connectionFilter == 1) {
      if (connections.length > 0) {
        return connections?.map((val) => {
          return (
            <div className={styles.profileCard} key={val.id}>
              <section>
                {val.profile ? (
                  <img src={val.profile} />
                ) : (
                  <img src="https://pickaface.net/gallery/avatar/unr_random_160817_0304_2mvqp69.png" />
                )}
                <h1>
                  {val.first_name} {val.last_name}
                </h1>
              </section>
              <div className={styles.btns}>
                {/* <button className="btn btn-success">View Profile</button> */}
                <button className="btn btn-outline-success">
                  Send Message
                </button>
              </div>
            </div>
          );
        });
      } else {
        return <p>No Data Found</p>;
      }
    } else {
      if (connectionReqs.length > 0) {
        return connectionReqs?.map((val) => {
          return (
            <div className={styles.profileCard} key={val.id}>
              <section>
                <img
                  src={
                    val.profile
                      ? val.profile
                      : "https://pickaface.net/gallery/avatar/unr_random_160817_0304_2mvqp69.png"
                  }
                />
                <h1>
                  {val.first_name} {val.last_name}
                </h1>
              </section>
              <div className={styles.btns}>
                <button
                  className="btn btn-success"
                  onClick={() => acceptReq(val.sender)}
                >
                  Accept
                </button>
                <button
                  className="btn btn-outline-success"
                  onClick={() => rejectReq(val.sender)}
                >
                  Reject
                </button>
              </div>
            </div>
          );
        });
      } else {
        return <p>No Data Found</p>;
      }
    }
  };

  useEffect(() => {
    renderConnection();
  }, [refresh]);

  return (
    <div style={{ display: "flex" }}>
      <ToastContainer />
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
              <h1>Connections</h1>
              <div className={styles.filterComponents}>
                <div className={styles.radioBtnContainer}>
                  <div
                    className={styles.radioBtn}
                    style={{
                      borderColor:
                        connectionFilter == 1 ? "#065451" : "#e6e6e6",
                    }}
                    onClick={() => {
                      setconnectionFilter(1);
                    }}
                  >
                    <input
                      type="radio"
                      value={connectionFilter}
                      name="connectionFilter"
                      checked={connectionFilter == 1}
                      style={{ display: "none" }}
                    />
                    Connections
                  </div>
                  <div
                    className={styles.radioBtn}
                    style={{
                      borderColor:
                        connectionFilter == 2 ? "#065451" : "#e6e6e6",
                    }}
                    onClick={() => {
                      setconnectionFilter(2);
                    }}
                  >
                    <input
                      type="radio"
                      value={connectionFilter}
                      name="connectionFilter"
                      checked={connectionFilter == 2}
                      style={{ display: "none" }}
                    />
                    Pending requests
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.connection}>{renderConnection()}</div>
          </div>
        </>
      ) : (
        <NotAuthorized />
      )}
    </div>
  );
}

export default Connections;

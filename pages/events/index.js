import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../../styles/dashboard.module.css";
import axios from "axios";
import { url } from "../../api";
import SideBar from "../../components/Sidebar";
import NotAuthorized from "../../components/NotAuthorized";
import { ToastContainer } from "react-toastify";
import VendorCard from "../../components/VendorCard";
import EventCard from "../../components/EventCard";

function Events({ checkAuth, authUser }) {
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  console.log(upcomingEvents);
  const [conductedEvents, setConductedEvents] = useState([]);
  const [eventFilter, seteventFilter] = useState(1);
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

  //  get all upcoming Events
  useEffect(() => {
    axios
      .get(`${url}/get_event.php`)
      .then((res) => {
        setUpcomingEvents(res.data.events);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [refresh]);

  //  get all conducted events
  useEffect(() => {
    axios
      .get(`${url}/get_event.php?conducted=true`)
      .then((res) => {
        setConductedEvents(res.data.events);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [refresh]);

  //   function to render list of connection by filter
  const renderConnection = () => {
    if (eventFilter == 1) {
      if (upcomingEvents.length > 0) {
        return upcomingEvents?.map((val) => {
          return (
            <Link key={val.id} href={`/events/${val.id}`}>
              <a>
                <EventCard
                  image={val.image}
                  title={val.title}
                  description={val.description}
                  date={val.date}
                />
              </a>
            </Link>
          );
        });
      } else {
        return <p>No Data Found</p>;
      }
    } else {
      if (conductedEvents.length > 0) {
        return conductedEvents?.map((val) => {
          return (
            <Link key={val.id} href={`/events/${val.id}`}>
              <a>
                <EventCard
                  image={val.image}
                  title={val.title}
                  description={val.description}
                  date={val.date}
                />
              </a>
            </Link>
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
              <h1>Events</h1>
              <div className={styles.filterComponents}>
                <div className={styles.radioBtnContainer}>
                  <div
                    className={styles.radioBtn}
                    style={{
                      borderColor: eventFilter == 1 ? "#065451" : "#e6e6e6",
                    }}
                    onClick={() => {
                      seteventFilter(1);
                    }}
                  >
                    <input
                      type="radio"
                      value={eventFilter}
                      name="eventFilter"
                      checked={eventFilter == 1}
                      style={{ display: "none" }}
                    />
                    upcoming events
                  </div>
                  <div
                    className={styles.radioBtn}
                    style={{
                      borderColor: eventFilter == 2 ? "#065451" : "#e6e6e6",
                    }}
                    onClick={() => {
                      seteventFilter(2);
                    }}
                  >
                    <input
                      type="radio"
                      value={eventFilter}
                      name="eventFilter"
                      checked={eventFilter == 2}
                      style={{ display: "none" }}
                    />
                    conducted events
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

export default Events;

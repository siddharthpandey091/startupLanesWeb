import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Sidebar from "../../components/Sidebar";
import styles from "../../styles/dashboard.module.css";
import axios from "axios";
import { url } from "../../api";
import { MdCalendarToday } from "react-icons/md";
import ConfirmAlert from "../../components/ConfirmAlert";
import { ToastContainer, toast } from "react-toastify";

function isInTheFuture(date) {
  const today = new Date();
  return date > today;
}

function Event({ authUser }) {
  const router = useRouter();
  const [event, setEvent] = useState([]);
  console.log(event);
  const [data, setData] = useState([]);

  const userInfo = authUser("SL_USER__AUTH");

  //  get single event
  useEffect(() => {
    if (!router.isReady) return;
    axios
      .get(`${url}/get_event.php?event_id=${router.query.id}`)
      .then((res) => {
        // console.log(res);
        setEvent(res.data.event);
        // setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [router.isReady]);

  //  get data for dashboard
  useEffect(() => {
    axios
      .get(
        `${url}/user-dashboard.php?type_id=${userInfo.user_type}&user_id=${userInfo.user_id}`
      )
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <ToastContainer />
      <Sidebar />
      <div className={styles.dashboard}>
        <div className={styles.email}>
          <p>
            SL Money Left - 0 :{" "}
            {data.is_gold_member == 0 ? "Bronze Member" : "Gold Member"}
          </p>
        </div>
        <div className={styles.event}>
          <div className={styles.imgContainer}>
            <img src={event.image} />
          </div>
          <div className={styles.textWrapper}>
            <div className={styles.center}>
              <h1>{event.title}</h1>
              <span>
                <MdCalendarToday /> {event.date}
              </span>
            </div>
            <h2>{event.heading}</h2>
            <p>{event.description}</p>
            {/* {isInTheFuture(event.date) == true && (
              <button className="btn btn-primary mt-2">Book Your Seat</button>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Event;

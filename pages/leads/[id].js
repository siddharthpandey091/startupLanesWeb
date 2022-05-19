import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Sidebar from "../../components/Sidebar";
import styles from "../../styles/dashboard.module.css";
import axios from "axios";
import { url } from "../../api";
import ConfirmAlert from "../../components/ConfirmAlert";
import { ToastContainer, toast } from "react-toastify";

function Lead({ authUser }) {
  const router = useRouter();
  const [lead, setLead] = useState([]);
  const [data, setData] = useState([]);

  const userInfo = authUser("SL_USER__AUTH");

  //  get single lead for dashboard
  useEffect(() => {
    if (!router.isReady) return;
    axios
      .get(`${url}/get_lead.php?lead_id=${router.query.id}`, {
        headers: {
          Authorization: "Bearer " + userInfo.token,
        },
      })
      .then((res) => {
        // console.log(res);
        setLead(res.data.lead);
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

  // function to take a lead
  const takeLead = () => {
    axios
      .put(
        `${url}/take_lead.php`,
        {
          lead_id: router.query.id,
          taken_by: userInfo.user_id,
        },
        {
          headers: {
            Authorization: "Bearer " + userInfo.token,
          },
        }
      )
      .then((res) => {
        // console.log(res.data);
        document
          .getElementById("exampleModal")
          .classList.remove("show", "d-block");
        document
          .querySelectorAll(".modal-backdrop")
          .forEach((el) => el.classList.remove("modal-backdrop"));

        if (res.data.status == 0) {
          toast.error(res.data.message, {
            position: toast.POSITION.TOP_CENTER,
          });
        }
        if (res.data.status == 1) {
          toast.success(res.data.message, {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div style={{ display: "flex" }}>
      <ToastContainer />
      <ConfirmAlert
        heading="Take This Lead"
        content="Are you want to take this lead ?"
        confirm={takeLead}
      />
      <Sidebar />
      <div className={styles.dashboard}>
        <div className={styles.email}>
          <p>
            SL Money Left - 0 :{" "}
            {data.is_gold_member == 0 ? "Bronze Member" : "Gold Member"}
          </p>
        </div>
        <div className={styles.intro}>
          <h1 style={{ marginTop: "20px" }}>Lead Details</h1>
          <div className={styles.lead}>
            <h6>Lead code</h6>
            <p>{lead.lead_id}</p>
          </div>
          <div className={styles.lead}>
            <h6>Title</h6>
            <p>{lead.title}</p>
          </div>
          <div className={styles.lead}>
            <h6>Budget</h6>
            <p>{lead.bugdet}</p>
          </div>
          <div className={styles.lead}>
            <h6>City</h6>
            <p>{lead.city_name}</p>
          </div>
          <div className={styles.lead}>
            <h6>Industry</h6>
            <p>{lead.service_name}</p>
          </div>
          <div className={styles.lead}>
            <h6>Description</h6>
            <p>{lead.description}</p>
          </div>
        </div>
        <button
          className={styles.btn}
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Take This Lead
        </button>
      </div>
    </div>
  );
}

export default Lead;

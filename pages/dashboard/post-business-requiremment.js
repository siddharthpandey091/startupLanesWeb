import React, { useState, useEffect, useReducer } from "react";
import { useRouter } from "next/router";
import Sidebar from "../../components/Sidebar";
import styles from "../../styles/dashboard.module.css";
import axios from "axios";
import { url } from "../../api";
import { ToastContainer, toast } from "react-toastify";
import NotAuthorized from "../../components/NotAuthorized";

function PostBusinessReq({ checkAuth, authUser }) {
  const userInfo = authUser("SL_USER__AUTH");
  const [data, setData] = useState([]);
  const [services, setServices] = useState([]);
  const [cities, setCities] = useState([]);

  const initialState = {
    title: "",
    budget: "",
    city: "",
    service: "",
    desc: "",
  };

  const formReducer = (state, { type, payload }) => {
    switch (type) {
      case "title":
        return { ...state, title: payload };
      case "budget":
        return { ...state, budget: payload };
      case "city":
        return { ...state, city: payload };
      case "service":
        return { ...state, service: payload };
      case "desc":
        return { ...state, desc: payload };
      default:
        throw new Error();
    }
  };

  const [requirement, dispatch] = useReducer(formReducer, initialState);

  const handleReqSubmit = () => {
    if (
      requirement.title !== "" &&
      requirement.budget !== "" &&
      requirement.city !== "" &&
      requirement.service !== "" &&
      requirement.desc !== ""
    ) {
      console.log(requirement);
    } else {
      toast.error("Please fill all field.", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

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

  //  get list of services
  useEffect(() => {
    axios
      .get(`${url}/get_all_service_subcategory.php`)
      .then((p_services) => {
        const data = p_services.data;
        setServices(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //  get list of cities
  useEffect(() => {
    console.log(data.country_id);
    if (typeof data.country_id != undefined) {
      axios
        .post(`${url}/get_cities_by_country_id.php`, {
          country_id: 101,
        })
        .then((p_services) => {
          const data = p_services.data;
          setCities(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return (
    <div style={{ display: "flex" }}>
      {checkAuth("SL_USER__AUTH") == "LOGGED_IN" ? (
        <>
          <Sidebar />
          <div className={styles.dashboard}>
            <ToastContainer />
            <div className={styles.email}>
              <p>
                SL Money Left - 0 :{" "}
                {data.is_gold_member == 0 ? "Bronze Member" : "Gold Member"}
              </p>
            </div>
            <div className={styles.intro}>
              <h1 style={{ marginTop: "20px" }}>Post Business Requirement</h1>
              <div className={styles.form}>
                <div className="row mb-3">
                  <label
                    forHtml="inputEmail"
                    className="col-sm-2 col-form-label"
                  >
                    Lead Title
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. UI/UX"
                      value={requirement.title}
                      onChange={(event) =>
                        dispatch({ type: "title", payload: event.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    forHtml="inputPassword"
                    className="col-sm-2 col-form-label"
                  >
                    Budget
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="e.g. RS-10000"
                      value={requirement.budget}
                      onChange={(event) =>
                        dispatch({
                          type: "budget",
                          payload: event.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    forHtml="inputPassword"
                    className="col-sm-2 col-form-label"
                  >
                    City
                  </label>
                  <div className="col-sm-10">
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      value={requirement.city}
                      onChange={(event) =>
                        dispatch({ type: "city", payload: event.target.value })
                      }
                    >
                      <option selected>Select a city</option>
                      {cities.map((city) => {
                        return (
                          <option key={city.city_id} value={city.city_id}>
                            {city.city_name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    forHtml="inputPassword"
                    className="col-sm-2 col-form-label"
                  >
                    Service
                  </label>
                  <div className="col-sm-10">
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      value={requirement.service}
                      onChange={(event) =>
                        dispatch({
                          type: "service",
                          payload: event.target.value,
                        })
                      }
                    >
                      <option selected>Select a service</option>
                      {services.map((service) => {
                        return (
                          <option key={service.id} value={service.id}>
                            {service.sub_category}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    forHtml="inputPassword"
                    className="col-sm-2 col-form-label"
                  >
                    Description
                  </label>
                  <div className="col-sm-10">
                    <textarea
                      type="text"
                      className="form-control"
                      placeholder="e.g. I need a UI/UX designer for my project."
                      value={requirement.desc}
                      onChange={(event) =>
                        dispatch({ type: "desc", payload: event.target.value })
                      }
                    ></textarea>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-10 offset-sm-2">
                    <button
                      className="btn btn-success"
                      onClick={handleReqSubmit}
                    >
                      Post Your Requirement
                    </button>
                  </div>
                </div>
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

export default PostBusinessReq;

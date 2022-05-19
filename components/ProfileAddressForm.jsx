import React, { useState } from "react";
import { FaEdit, FaLocationArrow } from "react-icons/fa";
import classes from "./ProfileExpr.module.css";
import { url } from "../api";
import axios from "axios";

const ProfileAddressForm = ({
  city,
  state,
  country,
  zipcode,
  updateAddress,
}) => {
  console.log(city, state, country, zipcode);
  const [userCity, setuserCity] = useState("");
  const [userState, setuserState] = useState("");
  const [userCountry, setuserCountry] = useState("");
  const [userZipcode, setuserZipcode] = useState("");
  const [userLat, setuserLat] = useState("");
  const [userLng, setuserLng] = useState("");
  const [currentLocation, setcurrentLocation] = useState(null);
  const [States, setStates] = useState([]);
  const [Cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [editMode, setEditMode] = useState(false);

  // function to get user current location(lat & lang) + Reverse GEO
  const getLocation = () => {
    if (!navigator.geolocation) {
      setcurrentLocation("Geolocation is not supported by your browser");
    } else {
      setcurrentLocation("Locating...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setuserLat(position.coords.latitude);
          setuserLng(position.coords.longitude);
          // reverse geo coding api
          axios
            .get(
              `${url}/current_location.php?lat=${position.coords.latitude}&lng=${position.coords.longitude}`
            )
            .then((locations) => {
              const data = locations.data.data;
              console.log(data);
              setuserCity(data.city_id);
              setuserState(data.state_id);
              setuserCountry(data.country_id);
              setuserZipcode(data.zipcode);
              setcurrentLocation(data);

              // get list of states
              axios
                .post(`${url}/get_states.php`, {
                  country_id: data.country_id,
                })
                .then((res) => {
                  const data = res.data;
                  const option = data.map((state) => {
                    return { value: state.state_id, label: state.state_name };
                  });
                  setStates(option);
                  setIsLoading(false);
                })
                .catch((error) => {
                  setIsLoading(false);
                  console.log(error);
                });

              // get list of cities
              axios
                .post(`${url}/get_cities.php`, {
                  state_id: data.state_id,
                })
                .then((res) => {
                  const data = res.data;
                  const option = data.map((city) => {
                    return { value: city.city_id, label: city.city_name };
                  });
                  setCities(option);
                  setIsLoading(false);
                })
                .catch((error) => {
                  setIsLoading(false);
                  console.log(error);
                });
            })
            .catch((error) => {
              setIsLoading(false);
              setCurrentCity(133024);
              console.log(error);
            });
        },
        () => {
          setIsLoading(false);
          setcurrentLocation("Unable to retrieve your location");
        }
      );
    }
  };

  const handleCancel = () => {
    setShowBtn(false);
    setEditMode(false);
  };

  const handleEditMode = () => {
    setShowBtn(true);
    setEditMode(true);
  };

  const handelSubmit = () => {
    updateAddress(
      userCity,
      userState,
      userCountry,
      userZipcode,
      userLat,
      userLng
    );
    setEditMode(false);
    setShowBtn(false);
    setIsLoading(true);
  };

  return (
    <div className={classes.ProfileExpr} style={{ marginBottom: "px" }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: "15px" }}>
        <h1>Address</h1>
        <div style={{ cursor: "pointer" }} onClick={handleEditMode}>
          <FaEdit />
        </div>
      </div>
      <div className={classes.inputs}>
        {city == null ||
        state == null ||
        country == null ||
        zipcode == null ||
        editMode ? (
          <>
            <div className="btn btn-primary" onClick={getLocation}>
              <FaLocationArrow /> detect current location
            </div>
            <br />
            <br />
            <div>
              {isLoading && <p>detecting....</p>}
              {currentLocation && (
                <>
                  <p>Country: {currentLocation?.country_name}</p>

                  <label htmlFor="">Select State</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    style={{ width: "250px" }}
                    value={userState}
                    onChange={(e) => setuserState(e.target.value)}
                  >
                    <option selected value="">
                      Select your state
                    </option>
                    {States.map((state) => {
                      return (
                        <option key={state.value} value={state.value}>
                          {state.label}
                        </option>
                      );
                    })}
                  </select>
                  <br />

                  <label htmlFor="">Select City:</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    style={{ width: "250px" }}
                    value={userCity}
                    onChange={(e) => setuserCity(e.target.value)}
                  >
                    <option selected value="">
                      Select your city
                    </option>
                    {Cities.map((city) => {
                      return (
                        <option key={city.value} value={city.value}>
                          {city.label}
                        </option>
                      );
                    })}
                  </select>
                  <br />
                  <label htmlFor="">Zip code:</label>
                  <br />
                  <input
                    type="text"
                    defaultValue={userZipcode}
                    onFocus={() => setShowBtn(true)}
                    autoFocus
                    onChange={(e) => (setuserZipcode = e.target.value)}
                  />
                </>
              )}
            </div>
            {showBtn && (
              <div className="btngroup_profile">
                <button onClick={handelSubmit} className="btn btn-primary">
                  save
                </button>
                <button
                  onClick={handleCancel}
                  className="btn btn-outline-primary"
                >
                  cancel
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            <p>City: {city}</p>
            <p>State: {state}</p>
            <p>Country: {country}</p>
            <p>Zipcode: {zipcode}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileAddressForm;

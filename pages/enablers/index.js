import React, { useEffect, useState } from "react";
import { url } from "../../api";
import axios from "axios";
import styles from "../../styles/Home.module.css";
import SearchStyle from "../../components/CustomSearch.module.css";
import UserProfileCard from "../../components/UserProfileCard";
import NotAuthorized from "../../components/NotAuthorized";

function Enablers({ checkAuth, authUser }) {
  const [enablers, setenablers] = useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const userInfo = authUser("SL_USER__AUTH");

  // get all enablers
  useEffect(() => {
    axios
      .get(`${url}/user_listing.php?type_id=3`, {
        headers: {
          Authorization: "Bearer " + userInfo?.token,
        },
      })
      .then((res) => {
        // console.log(res.data);
        setenablers(res.data.users);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchRes, setSearchRes] = useState([]);

  function searchHandler(e) {
    setSearchTerm(e.target.value);
    if (searchTerm !== "") {
      const newList = enablers.filter((val) => {
        return val.first_name.toLowerCase().includes(searchTerm.toLowerCase());
      });
      setSearchRes(newList);
    } else {
      setSearchRes(enablers);
    }
  }

  return (
    <div className="pageWrapper">
      {isLoading ? (
        <p>loading....</p>
      ) : checkAuth("SL_USER__AUTH") == "LOGGED_IN" ? (
        <>
          <h2>Search enablers</h2>
          <p></p>
          <div className={styles.filterComponents}>
            <div className={SearchStyle.CustomSearchbar}>
              <img src="/search.svg" />
              <input
                type="text"
                placeholder="Search a startup by name"
                value={searchTerm}
                onChange={searchHandler}
              />
            </div>
          </div>
          {searchTerm.length < 1
            ? enablers.map((enabler, index) => {
                return (
                  <UserProfileCard
                    key={index}
                    path="enablers"
                    id={enabler.user_id}
                    profile={enabler.profile}
                    name={`${enabler.first_name} ${enabler.last_name}`}
                    location={`${enabler.city_name}, ${enabler.state_name}, ${enabler.country_name}`}
                    type={enabler.user_subtype}
                    desc={enabler.about}
                  />
                );
              })
            : searchRes.map((enabler, index) => {
                return (
                  <UserProfileCard
                    key={index}
                    path="enablers"
                    id={enabler.user_id}
                    profile={enabler.profile}
                    name={`${enabler.first_name} ${enabler.last_name}`}
                    location={`${enabler.city_name}, ${enabler.state_name}, ${enabler.country_name}`}
                    type={enabler.user_subtype}
                    desc={enabler.about}
                  />
                );
              })}
        </>
      ) : (
        <NotAuthorized />
      )}
    </div>
  );
}

export default Enablers;

import React, { useState } from "react";
import SearchStyle from "../../components/CustomSearch.module.css";
import { url } from "../../api";
import axios from "axios";
import styles from "../../styles/Home.module.css";
import UserProfileCard from "../../components/UserProfileCard";
import NotAuthorized from "../../components/NotAuthorized";

function Startups({ checkAuth, startups }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchRes, setSearchRes] = useState([]);

  function searchHandler(e) {
    setSearchTerm(e.target.value);
    if (searchTerm !== "") {
      const newStartupList = startups.filter((startup) => {
        return startup.company_name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchRes(newStartupList);
    } else {
      setSearchRes(startups);
    }
  }

  return (
    <div className="pageWrapper">
      {checkAuth("SL_USER__AUTH") == "LOGGED_IN" ? (
        <>
          <h2>Search Startups</h2>
          <p></p>
          <div
            className={styles.filterComponents}
            style={{ marginBottom: "50px" }}
          >
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
            ? startups.map((startup, index) => {
                return (
                  <UserProfileCard
                    key={index}
                    path="startups"
                    id={startup.startup_id}
                    profile={startup.profile}
                    name={startup.company_name}
                    location={`${startup.city_name}, ${startup.state_name}, ${startup.country_name}`}
                    type={startup.projection}
                    desc={startup.description}
                  />
                );
              })
            : searchRes.map((startup, index) => {
                return (
                  <UserProfileCard
                    key={index}
                    path="startups"
                    id={startup.startup_id}
                    profile={startup.profile}
                    name={startup.company_name}
                    location={`${startup.city_name}, ${startup.state_name}, ${startup.country_name}`}
                    type={startup.projection}
                    desc={startup.description}
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

export default Startups;

export async function getStaticProps(context) {
  const res = await axios.post(`${url}/vendor_listing.php`, {
    freelancers: "FALSE",
  });
  const startups = res.data.vendors;

  return {
    props: {
      startups,
    }, // will be passed to the page component as props
  };
}

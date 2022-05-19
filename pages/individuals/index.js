import React, { useEffect, useState } from "react";
import { url } from "../../api";
import axios from "axios";
import styles from "../../styles/Home.module.css";
import SearchStyle from "../../components/CustomSearch.module.css";
import UserProfileCard from "../../components/UserProfileCard";
import NotAuthorized from "../../components/NotAuthorized";

function Individuals({ checkAuth, authUser }) {
  const [individuals, setindividuals] = useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const userInfo = authUser("SL_USER__AUTH");

  // get all individuals
  useEffect(() => {
    axios
      .get(`${url}/user_listing.php?type_id=4`, {
        headers: {
          Authorization: "Bearer " + userInfo?.token,
        },
      })
      .then((res) => {
        // console.log(res.data);
        setindividuals(res.data.users);
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
      const newList = individuals.filter((val) => {
        return val.first_name.toLowerCase().includes(searchTerm.toLowerCase());
      });
      setSearchRes(newList);
    } else {
      setSearchRes(individuals);
    }
  }

  return (
    <div className="pageWrapper">
      {isLoading ? (
        <p>loading....</p>
      ) : checkAuth("SL_USER__AUTH") == "LOGGED_IN" ? (
        <>
          <h2>Search individuals</h2>
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
            ? individuals.map((individual, index) => {
                return (
                  <UserProfileCard
                    key={index}
                    path="individuals"
                    id={individual.user_id}
                    profile={individual.profile}
                    name={`${individual.first_name} ${individual.last_name}`}
                    location={`${individual.city_name}, ${individual.state_name}, ${individual.country_name}`}
                    type={individual.user_subtype}
                    desc={individual.about}
                  />
                );
              })
            : searchRes.map((individual, index) => {
                return (
                  <UserProfileCard
                    key={index}
                    path="individuals"
                    id={individual.user_id}
                    profile={individual.profile}
                    name={`${individual.first_name} ${individual.last_name}`}
                    location={`${individual.city_name}, ${individual.state_name}, ${individual.country_name}`}
                    type={individual.user_subtype}
                    desc={individual.about}
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

export default Individuals;

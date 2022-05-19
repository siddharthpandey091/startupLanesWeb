import React, { useEffect, useState } from "react";
import { url } from "../../api";
import axios from "axios";
import styles from "../../styles/Home.module.css";
import SearchStyle from "../../components/CustomSearch.module.css";
import UserProfileCard from "../../components/UserProfileCard";
import NotAuthorized from "../../components/NotAuthorized";

function Investors({ checkAuth, authUser }) {
  const [investors, setInvestors] = useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const userInfo = authUser("SL_USER__AUTH");

  // get all investors
  useEffect(() => {
    axios
      .get(`${url}/user_listing.php?type_id=2`, {
        headers: {
          Authorization: "Bearer " + userInfo?.token,
        },
      })
      .then((res) => {
        // console.log(res.data);
        setInvestors(res.data.users);
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
      const newList = investors.filter((val) => {
        return val.first_name.toLowerCase().includes(searchTerm.toLowerCase());
      });
      setSearchRes(newList);
    } else {
      setSearchRes(investors);
    }
  }

  return (
    <div className="pageWrapper">
      {isLoading ? (
        <p>loading....</p>
      ) : checkAuth("SL_USER__AUTH") == "LOGGED_IN" ? (
        <>
          <h2>Search Investors</h2>
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
            ? investors.map((investor, index) => {
                return (
                  <UserProfileCard
                    key={index}
                    path="investors"
                    id={investor.user_id}
                    profile={investor.profile}
                    name={`${investor.first_name} ${investor.last_name}`}
                    location={`${investor.city_name}, ${investor.state_name}, ${investor.country_name}`}
                    type={investor.user_subtype}
                    desc={investor.about}
                  />
                );
              })
            : searchRes.map((investor, index) => {
                return (
                  <UserProfileCard
                    key={index}
                    path="investors"
                    id={investor.user_id}
                    profile={investor.profile}
                    name={`${investor.first_name} ${investor.last_name}`}
                    location={`${investor.city_name}, ${investor.state_name}, ${investor.country_name}`}
                    type={investor.user_subtype}
                    desc={investor.about}
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

export default Investors;

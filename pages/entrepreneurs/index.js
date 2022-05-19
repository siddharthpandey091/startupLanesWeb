import React, { useEffect, useState } from "react";
import { url } from "../../api";
import axios from "axios";
import Error from "next/error";
import styles from "../../styles/Home.module.css";
import SearchStyle from "../../components/CustomSearch.module.css";
import UserProfileCard from "../../components/UserProfileCard";
import NotAuthorized from "../../components/NotAuthorized";

function Entrepreneurs({ checkAuth, authUser }) {
  const [entrepreneurs, setentrepreneurs] = useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const userInfo = authUser("SL_USER__AUTH");

  // get all entrepreneurs
  useEffect(() => {
    axios
      .get(`${url}/user_listing.php?type_id=1`, {
        headers: {
          Authorization: "Bearer " + userInfo?.token,
        },
      })
      .then((res) => {
        // console.log(res.data);
        setentrepreneurs(res.data.users);
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
      const newList = entrepreneurs.filter((val) => {
        return val.first_name.toLowerCase().includes(searchTerm.toLowerCase());
      });
      setSearchRes(newList);
    } else {
      setSearchRes(entrepreneurs);
    }
  }

  return (
    <div className="pageWrapper">
      {isLoading ? (
        <p>loading....</p>
      ) : checkAuth("SL_USER__AUTH") == "LOGGED_IN" ? (
        <>
          <h2>Search entrepreneurs</h2>
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
            ? entrepreneurs.map((entrepreneur, index) => {
                return (
                  <UserProfileCard
                    key={index}
                    path="entrepreneurs"
                    id={entrepreneur.user_id}
                    profile={entrepreneur.profile}
                    name={`${entrepreneur.first_name} ${entrepreneur.last_name}`}
                    location={`${entrepreneur.city_name}, ${entrepreneur.state_name}, ${entrepreneur.country_name}`}
                    type={entrepreneur.user_subtype}
                    desc={entrepreneur.about}
                  />
                );
              })
            : searchRes.map((entrepreneur, index) => {
                return (
                  <UserProfileCard
                    key={index}
                    path="entrepreneurs"
                    id={entrepreneur.user_id}
                    profile={entrepreneur.profile}
                    name={`${entrepreneur.first_name} ${entrepreneur.last_name}`}
                    location={`${entrepreneur.city_name}, ${entrepreneur.state_name}, ${entrepreneur.country_name}`}
                    type={entrepreneur.user_subtype}
                    desc={entrepreneur.about}
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

export default Entrepreneurs;

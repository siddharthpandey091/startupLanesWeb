import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { url } from "../../api";
import { toast } from "react-toastify";
import ProfileHeader from "../../components/ProfileHeader";
import ProfileMsg from "../../components/ProfileMsg";
import ProfileEduc from "../../components/ProfileEduc";
import ProfileExpr from "../../components/ProfileExpr";
import ProfileContact from "../../components/ProfileContact";
import ProfileWeb from "../../components/ProfileWeb";
import NotAuthorized from "../../components/NotAuthorized";

function Individual({ checkAuth, authUser }) {
  const router = useRouter();
  const [individual, setindividual] = useState([]);
  console.log(individual);
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const userInfo = authUser("SL_USER__AUTH");

  //  get single individual profile
  useEffect(() => {
    if (!router.isReady) return;
    axios
      .get(`${url}/get_single_user.php?type=4&user_id=${router.query.id}`, {
        headers: {
          Authorization: "Bearer " + userInfo.token,
        },
      })
      .then((res) => {
        console.log(res);
        setindividual(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  }, [router.isReady, refresh]);

  //  send connection request
  const sendConnectionReq = () => {
    axios
      .post(
        `${url}/send_connection_req.php`,
        {
          my_id: userInfo.user_id,
          friend_id: router.query.id,
        },
        {
          headers: {
            Authorization: "Bearer " + userInfo.token,
          },
        }
      )
      .then((res) => {
        if (res.data.status == 1) {
          toast.success("Request sent.", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
        if (res.data.status == 0) {
          toast.error("failed to send request", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
        setRefresh(!refresh);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="pageWrapper">
      {isLoading ? (
        <p>Loading...</p>
      ) : checkAuth("SL_USER__AUTH") == "LOGGED_IN" ? (
        <>
          <ProfileHeader
            cover={individual?.personalDetails?.cover}
            profile={individual?.personalDetails?.profile}
            name={`${individual?.personalDetails?.first_name} ${individual?.personalDetails?.last_name}`}
            type={individual?.personalDetails?.user_subtype}
            city={individual?.personalDetails?.city_name}
            state={individual?.personalDetails?.state_name}
            country={individual?.personalDetails?.country_name}
            zipcode={individual?.personalDetails?.zip_code}
            linkedin={individual?.personalDetails?.linkedin_url}
            twitter={individual?.personalDetails?.twitter_url}
            facebook={individual?.personalDetails?.facebook_url}
          />
          <div className="pageWrapper1">
            <ProfileMsg msg={individual?.personalDetails?.about} />
            <div className="button__connection">
              {individual?.is_connected == 0 ? (
                <button
                  className=" btn btn-success"
                  onClick={sendConnectionReq}
                >
                  <i className="fas fa-user-plus"></i> Connect
                </button>
              ) : individual?.is_connected == 1 ? (
                <button className=" btn btn-secondary " disabled>
                  <i className="fas fa-user-plus"></i> Requested
                </button>
              ) : null}
              <button className=" btn btn-outline-success">Message</button>
            </div>
            <ProfileExpr expr={individual?.experiences} />
            <ProfileEduc educ={individual?.last_education} />
            <ProfileContact
              email={individual?.personalDetails?.email}
              mobile={individual?.personalDetails?.mobile}
            />
            <ProfileWeb website={individual?.personalDetails?.website_url} />
          </div>
        </>
      ) : (
        <NotAuthorized />
      )}
    </div>
  );
}

export default Individual;

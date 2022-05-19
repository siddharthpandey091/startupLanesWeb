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

function Enabler({ checkAuth, authUser }) {
  const router = useRouter();
  const [enabler, setenabler] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const userInfo = authUser("SL_USER__AUTH");

  //  get single enabler profile
  useEffect(() => {
    if (!router.isReady) return;
    axios
      .get(`${url}/get_single_user.php?type=3&user_id=${router.query.id}`, {
        headers: {
          Authorization: "Bearer " + userInfo.token,
        },
      })
      .then((res) => {
        console.log(res);
        setenabler(res.data);
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
        <p>Loading....</p>
      ) : checkAuth("SL_USER__AUTH") == "LOGGED_IN" ? (
        <>
          <ProfileHeader
            cover={enabler?.personalDetails?.cover}
            profile={enabler?.personalDetails?.profile}
            name={`${enabler?.personalDetails?.first_name} ${enabler?.personalDetails?.last_name}`}
            type={enabler?.personalDetails?.user_subtype}
            city={enabler?.personalDetails?.city_name}
            state={enabler?.personalDetails?.state_name}
            country={enabler?.personalDetails?.country_name}
            zipcode={enabler?.personalDetails?.zip_code}
            linkedin={enabler?.personalDetails?.linkedin_url}
            twitter={enabler?.personalDetails?.twitter_url}
            facebook={enabler?.personalDetails?.facebook_url}
          />
          <div className="pageWrapper1">
            <ProfileMsg msg={enabler?.personalDetails?.about} />
            <div className="button__connection">
              {enabler?.is_connected == 0 ? (
                <button
                  className=" btn btn-success"
                  onClick={sendConnectionReq}
                >
                  <i className="fas fa-user-plus"></i> Connect
                </button>
              ) : enabler?.is_connected == 1 ? (
                <button className=" btn btn-secondary " disabled>
                  <i className="fas fa-user-plus"></i> Requested
                </button>
              ) : null}
              <button className=" btn btn-outline-success">Message</button>
            </div>
            <ProfileExpr expr={enabler?.experiences} />
            <ProfileEduc educ={enabler?.last_education} />
            <ProfileContact
              email={enabler?.personalDetails?.email}
              mobile={enabler?.personalDetails?.mobile}
            />
            <ProfileWeb website={enabler?.personalDetails?.website_url} />
          </div>
        </>
      ) : (
        <NotAuthorized />
      )}
    </div>
  );
}

export default Enabler;

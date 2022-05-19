import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { url } from "../../api";
import ProfileHeader from "../../components/ProfileHeader";
import ProfileMsg from "../../components/ProfileMsg";
import ProfileEduc from "../../components/ProfileEduc";
import ProfileExpr from "../../components/ProfileExpr";
import ProfileContact from "../../components/ProfileContact";
import ProfileWeb from "../../components/ProfileWeb";
import NotAuthorized from "../../components/NotAuthorized";

function Entrepreneur({ checkAuth, authUser }) {
  const router = useRouter();
  const [entrepreneur, setentrepreneur] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const userInfo = authUser("SL_USER__AUTH");

  //  get single entrepreneur profile
  useEffect(() => {
    if (!router.isReady) return;
    axios
      .get(`${url}/get_single_user.php?type=1&user_id=${router.query.id}`, {
        headers: {
          Authorization: "Bearer " + userInfo.token,
        },
      })
      .then((res) => {
        setentrepreneur(res.data);
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
        <p>loading....</p>
      ) : checkAuth("SL_USER__AUTH") == "LOGGED_IN" ? (
        <>
          <ProfileHeader
            cover={entrepreneur?.personalDetails?.cover}
            profile={entrepreneur?.personalDetails?.profile}
            name={`${entrepreneur?.personalDetails?.first_name} ${entrepreneur?.personalDetails?.last_name}`}
            type={entrepreneur?.personalDetails?.user_subtype}
            city={entrepreneur?.personalDetails?.city_name}
            state={entrepreneur?.personalDetails?.state_name}
            country={entrepreneur?.personalDetails?.country_name}
            zipcode={entrepreneur?.personalDetails?.zip_code}
            linkedin={entrepreneur?.personalDetails?.linkedin_url}
            twitter={entrepreneur?.personalDetails?.twitter_url}
            facebook={entrepreneur?.personalDetails?.facebook_url}
          />
          <div className="pageWrapper1">
            <ProfileMsg msg={entrepreneur?.personalDetails?.about} />
            <div className="button__connection">
              {entrepreneur?.is_connected == 0 ? (
                <button
                  className=" btn btn-success"
                  onClick={sendConnectionReq}
                >
                  <i className="fas fa-user-plus"></i> Connect
                </button>
              ) : entrepreneur?.is_connected == 1 ? (
                <button className=" btn btn-secondary " disabled>
                  <i className="fas fa-user-plus"></i> Requested
                </button>
              ) : null}
              <button className=" btn btn-outline-success">Message</button>
            </div>
            <ProfileExpr expr={entrepreneur?.experiences} />
            <ProfileEduc educ={entrepreneur?.last_education} />
            <ProfileContact
              email={entrepreneur?.personalDetails?.email}
              mobile={entrepreneur?.personalDetails?.mobile}
            />
            <ProfileWeb website={entrepreneur?.personalDetails?.website_url} />
          </div>
        </>
      ) : (
        <NotAuthorized />
      )}
    </div>
  );
}

export default Entrepreneur;

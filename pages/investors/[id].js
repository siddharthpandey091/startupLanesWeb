import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { url } from "../../api";
import { toast } from "react-toastify";
import ProfileHeader from "../../components/ProfileHeader";
import ProfileMsg from "../../components/ProfileMsg";
// import ProfileInvestment from "../../components/ProfileInvestment";
import ProfileEduc from "../../components/ProfileEduc";
import ProfileExpr from "../../components/ProfileExpr";
import ProfileContact from "../../components/ProfileContact";
import ProfileWeb from "../../components/ProfileWeb";
import ProfileInvestment from "../../components/ProfileInvestment";
import NotAuthorized from "../../components/NotAuthorized";

function Investor({ checkAuth, authUser }) {
  const router = useRouter();
  const [investor, setInvestor] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const userInfo = authUser("SL_USER__AUTH");

  //  get single investor profile
  useEffect(() => {
    if (!router.isReady) return;
    axios
      .get(`${url}/get_single_user.php?type=2&user_id=${router.query.id}`, {
        headers: {
          Authorization: "Bearer " + userInfo.token,
        },
      })
      .then((res) => {
        console.log(res);
        setInvestor(res.data);
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
        <p>loading...</p>
      ) : checkAuth("SL_USER__AUTH") == "LOGGED_IN" ? (
        <>
          <ProfileHeader
            cover={investor?.personalDetails?.cover}
            profile={investor?.personalDetails?.profile}
            name={`${investor?.personalDetails?.first_name} ${investor?.personalDetails?.last_name}`}
            type={investor?.personalDetails?.user_subtype}
            city={investor?.personalDetails?.city_name}
            state={investor?.personalDetails?.state_name}
            country={investor?.personalDetails?.country_name}
            zipcode={investor?.personalDetails?.zip_code}
            linkedin={investor?.personalDetails?.linkedin_url}
            twitter={investor?.personalDetails?.twitter_url}
            facebook={investor?.personalDetails?.facebook_url}
          />
          <div className="pageWrapper1">
            <ProfileMsg msg={investor?.personalDetails?.about} />
            <div className="button__connection">
              {investor?.is_connected == 0 ? (
                <button
                  className=" btn btn-success"
                  onClick={sendConnectionReq}
                >
                  <i className="fas fa-user-plus"></i> Connect
                </button>
              ) : investor?.is_connected == 1 ? (
                <button className=" btn btn-secondary " disabled>
                  <i className="fas fa-user-plus"></i> Requested
                </button>
              ) : null}
              <button className=" btn btn-outline-success">Message</button>
            </div>
            <ProfileInvestment
              ind={investor?.investmentDetails?.interested_industry}
              amnt={investor?.investmentDetails?.interested_amount}
              doc_name={investor?.investmentDetails?.prev_investment}
              doc_url={investor?.investmentDetails?.prev_investment}
            />
            <ProfileExpr expr={investor?.experiences} />
            <ProfileEduc educ={investor?.last_education} />
            <ProfileContact
              email={investor?.personalDetails?.email}
              mobile={investor?.personalDetails?.mobile}
            />
            <ProfileWeb website={investor?.personalDetails?.website_url} />
          </div>
        </>
      ) : (
        <NotAuthorized />
      )}
    </div>
  );
}

export default Investor;

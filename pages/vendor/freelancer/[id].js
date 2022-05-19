import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { url } from "../../../api";
import ProfileHeader from "../../../components/ProfileHeader";
import ProfileMsg from "../../../components/ProfileMsg";
import ProfileExpr from "../../../components/ProfileExpr";
import ProfileEduc from "../../../components/ProfileEduc";
import ProfileServices from "../../../components/ProfileServices";
import ProfileContact from "../../../components/ProfileContact";
import ProfileWeb from "../../../components/ProfileWeb";

function SingleVendor() {
  const [startup, setStartup] = useState([]);
  console.log(startup);
  const [id, setId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  useEffect(() => {
    if (router.isReady) {
      setId(router.query.id);
    }
  }, [router.isReady]);

  // console.log(id);
  useEffect(() => {
    if (router.isReady) {
      axios
        .get(
          `${url}/get_single_vendor.php?user_subtype=27&startupORfreelancer_id=${router.query.id}`
        )
        .then((res) => {
          setStartup(res.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  return (
    <div className="pageWrapper">
      {isLoading ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h1>Loading...</h1>
        </div>
      ) : (
        <>
          <ProfileHeader
            cover={startup?.vendorDetails?.cover}
            profile={startup?.vendorDetails?.profile}
            name={`${startup?.vendorDetails?.first_name} ${startup?.vendorDetails?.last_name}`}
            type={startup?.vendorDetails?.user_subtype}
            city={startup?.vendorDetails?.city_name}
            state={startup?.vendorDetails?.state_name}
            country={startup?.vendorDetails?.country_name}
            zipcode={startup?.vendorDetails?.zip_code}
            linkedin={startup?.vendorDetails?.linkedin_url}
            twitter={startup?.vendorDetails?.twitter_url}
            facebook={startup?.vendorDetails?.facebook_url}
          />
          <div className="pageWrapper1">
            <ProfileMsg msg={startup?.vendorDetails?.about} />
            <ProfileServices services={startup?.vendorServices} />
            <ProfileExpr expr={startup?.experiences} />
            <ProfileEduc educ={startup?.last_education} />
            <ProfileContact
              email={startup?.vendorDetails?.email}
              mobile={startup?.vendorDetails?.mobile}
            />
            <ProfileWeb website={startup?.vendorDetails?.website_url} />
          </div>
        </>
      )}
    </div>
  );
}

export default SingleVendor;

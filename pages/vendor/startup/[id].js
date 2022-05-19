import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { url } from "../../../api";
import styles from "../../../styles/Home.module.css";
import ProfileHeader from "../../../components/ProfileHeader";
import ProfileMsg from "../../../components/ProfileMsg";
import ProfileBusiness from "../../../components/ProfileBusiness";
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

  useEffect(() => {
    if (router.isReady) {
      axios
        .get(
          `${url}/get_single_vendor.php?user_subtype=null&startupORfreelancer_id=${router.query.id}`
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
            name={startup?.vendorDetails?.company_name}
            type={startup?.vendorDetails?.industry_name}
            city={startup?.vendorDetails?.city_name}
            state={startup?.vendorDetails?.state_name}
            country={startup?.vendorDetails?.country_name}
            zipcode={startup?.vendorDetails?.zip_code}
            linkedin={startup?.vendorDetails?.linkedin_url}
            twitter={startup?.vendorDetails?.twitter_url}
            facebook={startup?.vendorDetails?.facebook_url}
          />
          <div className="pageWrapper1">
            {/* <button className="button__connection">
              <i className="fas fa-user-plus"></i> Connect
            </button> */}
            <ProfileMsg msg={startup?.vendorDetails?.description} />
            <ProfileBusiness
              founder={startup?.vendorDetails?.founder_name}
              projection={startup?.vendorDetails?.projection}
              cofounder={startup?.vendorDetails?.num_of_cxos}
              staffs={startup?.vendorDetails?.team_size}
              reg={startup?.vendorDetails?.registration_date}
              doc_name={startup?.vendorDetails?.pitchdeck_url}
              doc_url={startup?.vendorDetails?.pitchdeck_url}
              startupIndia={startup?.vendorDetails?.startupIndia}
              looking_for_funding={startup?.vendorDetails?.looking_for_funding}
            />
            <ProfileServices services={startup?.vendorServices} />
            <ProfileContact
              email={startup?.vendorDetails?.company_email}
              mobile={startup?.vendorDetails?.company_phone}
            />
            <ProfileWeb website={startup?.vendorDetails?.website_url} />
          </div>
        </>
      )}
    </div>
  );
}

export default SingleVendor;

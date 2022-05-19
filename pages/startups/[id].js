import React from "react";
import axios from "axios";
import { url } from "../../api";
import ProfileHeader from "../../components/ProfileHeader";
import ProfileMsg from "../../components/ProfileMsg";
import ProfileBusiness from "../../components/ProfileBusiness";
import ProfileServices from "../../components/ProfileServices";
import ProfileContact from "../../components/ProfileContact";
import ProfileWeb from "../../components/ProfileWeb";

export const getStaticPaths = async () => {
  const res = await axios.post(`${url}/vendor_listing.php`, {
    freelancers: "FALSE",
  });
  const startups = res.data.vendors;

  const paths = startups.map((startup) => {
    return {
      params: { id: startup.startup_id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export async function getStaticProps(context) {
  const id = context.params.id;

  const res = await axios.get(
    `${url}/get_single_vendor.php?user_subtype=null&startupORfreelancer_id=${id}`
  );
  const startup = res.data;

  return {
    props: {
      startup,
    }, // will be passed to the page component as props
  };
}

function Startup({ startup }) {
  return (
    <div className="pageWrapper">
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
    </div>
  );
}

export default Startup;

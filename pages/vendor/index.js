import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { url } from "../../api";
import axios from "axios";
import VendorCard from "../../components/VendorCard";
import ContactVendor from "../../components/ContactVendor";
import { ToastContainer, toast } from "react-toastify";

function Vendors({ checkAuth, authUser }) {
  const [vendors, setVendors] = useState([]);
  const [messages, setmessages] = useState([]);
  const [allServices, setAllServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [toggle, settoggle] = useState("");
  const [target, settarget] = useState("");
  const [reqCity, setReqCity] = useState("");
  const [posted_for, setPosted_for] = useState("");
  // console.log(vendors);
  const router = useRouter();
  // console.log(router.query);
  const userInfo = authUser("SL_USER__AUTH");

  // get list of vendors
  useEffect(() => {
    if (!router.isReady) return;
    axios
      .post(`${url}/vendor_listing.php`, {
        freelancers: router.query.filter,
        city: router.query.city,
        category: router.query.cat_id,
        subCategory: router.query.subcat_id,
      })
      .then((res) => {
        setVendors(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [router.isReady]);

  // get list of messages
  useEffect(() => {
    axios
      .get(`${url}/get_all_messages.php`)
      .then((res) => {
        setmessages(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // get list of services
  useEffect(() => {
    axios
      .get(`${url}/get_all_service_subcategory.php`)
      .then((p_services) => {
        const data = p_services.data;
        setAllServices(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // function for generating a lead
  const contact = (city, posted_for) => {
    if (checkAuth("SL_USER__AUTH") == "!LOGGED_IN") {
      toast.error("login first to access this feature", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      settoggle("modal");
      settarget("#exampleModal");
      setReqCity(city);
      setPosted_for(posted_for);
    }
  };

  // function to post requirements
  const postReq = (service, message, title, budget) => {
    if (service !== "" && message !== "") {
      document
        .getElementById("exampleModal")
        .classList.remove("show", "d-block");
      document
        .querySelectorAll(".modal-backdrop")
        .forEach((el) => el.classList.remove("modal-backdrop"));
      axios
        .post(
          `${url}/post_business_requirement.php`,
          {
            posted_by: userInfo.user_id,
            posted_for: posted_for,
            title: title,
            bugdet: budget != "" ? budget : null,
            service: service,
            description: message,
            city: reqCity,
          },
          {
            headers: {
              Authorization: "Bearer " + userInfo.token,
            },
          }
        )
        .then((res) => {
          setIsLoading(false);
          toast.success(
            "Posted your requirement. For latest update check your Dashbaord",
            {
              position: toast.POSITION.TOP_CENTER,
            }
          );
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      toast.error("Please fill all fields.", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <div className="pageWrapper" style={{ marginTop: "50px" }}>
      <ToastContainer />
      <ContactVendor
        services={allServices}
        messages={messages}
        postReq={postReq}
      />
      <h2>Source Vendors</h2>
      <p>
        Source any vendor of your requirement from lawyer to web-developer and
        much more.
      </p>
      {/* <div className={styles.filterComponents}>
        <CustomSearchbar placeholder="search for a vendor" data="" />
      </div> */}
      {!isLoading ? (
        vendors.length === 0 ? (
          <h1
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            No vendor Found
          </h1>
        ) : vendors.status == 0 ? (
          <h1
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            No vendor Found
          </h1>
        ) : (
          vendors.vendors.map((vendor, index) => {
            return (
              <VendorCard
                key={index}
                vendor={vendor}
                type={vendors.type}
                contact={contact}
                toggle={toggle}
                target={target}
                // checkAuth={checkAuth}
                // authUser={authUser}
              />
            );
          })
        )
      ) : (
        <h1
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Loading....
        </h1>
      )}
    </div>
  );
}

export default Vendors;

// export async function getStaticProps(context) {
//   const res = await axios.post(`${url}/vendor_listing.php`, {
//     freelancers: router.query.filter,
//     subCategory: router.query.cat_id,
//   });
//   const vendors = res.data;

//   return {
//     props: {
//       vendors,
//     }, // will be passed to the page component as props
//   };
// }

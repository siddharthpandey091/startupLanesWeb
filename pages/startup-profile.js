import React, { useEffect, useState } from "react";
import ProfileHeaderForm from "../components/ProfileHeaderForm";
import { url } from "../api";
import axios from "axios";
import ProfileMssgForm from "../components/ProfileMsgForm";
import { ToastContainer, toast } from "react-toastify";
import ProfileStartupForm from "../components/ProfileStartupForm";
import ProfileExprForm from "../components/ProfileExprForm";
import ProfileEducForm from "../components/ProfileEducForm";
import ProfileContactForm from "../components/ProfileContactForm";
import ProfileOtherLinksForm from "../components/ProfileOtherLinksForm";
import ProfileAddressForm from "../components/ProfileAddressForm";
import ProfileInvestmentDetailsForm from "../components/ProfileInvestmentDetailsForm";
import ProfileServiceForm from "../components/ProfileServiceForm";
import ProfileBusinessForm from "../components/ProfileBusinessForm";

function StartupProfile({ authUser }) {
  const [user, setUser] = useState([]);
  const [startups, setStartups] = useState([]);
  const [positions, setPositions] = useState([]);
  const [degrees, setDegrees] = useState([]);
  console.log(user);
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  //   get current user's data
  const userInfo = authUser("SL_USER__AUTH");

  useEffect(() => {
    axios
      .get(`${url}/get_single_startup.php?user_id=${userInfo.user_id}`, {
        headers: {
          Authorization: "Bearer " + userInfo.token,
        },
      })
      .then((res) => {
        setUser(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [refresh]);

  // get all company positions
  useEffect(() => {
    axios
      .get(`${url}/get-positions.php`)
      .then((res) => {
        setPositions(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [refresh]);

  // get all degrees
  useEffect(() => {
    axios
      .get(`${url}/get-degrees.php`)
      .then((res) => {
        setDegrees(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [refresh]);

  // function to upload user profile image
  const uploadProfile = (event) => {
    let data = new FormData();
    data.append("user_id", userInfo.user_id);
    data.append("profile", event.target.files[0]);

    axios
      .post(`${url}/upload-startup-img.php`, data, {
        onUploadProgress: (progressEvent) => {
          toast.info("uploading...", {
            position: toast.POSITION.TOP_CENTER,
          });
          // console.log(
          //   "Upload Progress " +
          //     Math.round((progressEvent.loaded / progressEvent.total) * 100) +
          //     "%"
          // );
        },
      })
      .then((res) => {
        setRefresh(!refresh);
        console.log(res);
        // window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //   function to upload user cover image
  const uploadCover = (event) => {
    let data = new FormData();
    data.append("user_id", userInfo.user_id);
    data.append("cover", event.target.files[0]);

    axios
      .post(`${url}/upload-startup-img.php`, data, {
        onUploadProgress: (progressEvent) => {
          toast.info("uploading...", {
            position: toast.POSITION.TOP_CENTER,
          });
          // console.log(
          //   "Upload Progress " +
          //     Math.round((progressEvent.loaded / progressEvent.total) * 100) +
          //     "%"
          // );
        },
      })
      .then((res) => {
        setRefresh(!refresh);
        console.log(res);
        // window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // update user bio
  const updateBio = (bio) => {
    if (bio != "") {
      axios
        .post(
          `${url}/create_startup_profile.php`,
          {
            user_id: userInfo.user_id,
            description: bio,
          },
          {
            headers: {
              Authorization: "Bearer " + userInfo.token,
            },
          }
        )
        .then((res) => {
          setRefresh(!refresh);
          // console.log(res);
          if (res.data.status == 0) {
            toast.error("failed to update your bio", {
              position: toast.POSITION.TOP_CENTER,
            });
          } else {
            toast.success("successfully updated your bio", {
              position: toast.POSITION.TOP_CENTER,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast.error("This field can't be blank.", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  // update user bio
  const updateContact = (email, mobile) => {
    if (email != "") {
      axios
        .post(
          `${url}/create_startup_profile.php`,
          {
            user_id: userInfo.user_id,
            company_email: email,
          },
          {
            headers: {
              Authorization: "Bearer " + userInfo.token,
            },
          }
        )
        .then((res) => {
          setRefresh(!refresh);
          // console.log(res);
          if (res.data.status == 0) {
            toast.error("failed to update your contact", {
              position: toast.POSITION.TOP_CENTER,
            });
          } else {
            toast.success("successfully updated your contact", {
              position: toast.POSITION.TOP_CENTER,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (mobile != "") {
      axios
        .post(
          `${url}/create_startup_profile.php`,
          {
            user_id: userInfo.user_id,
            company_phone: mobile,
          },
          {
            headers: {
              Authorization: "Bearer " + userInfo.token,
            },
          }
        )
        .then((res) => {
          setRefresh(!refresh);
          // console.log(res);
          if (res.data.status == 0) {
            toast.error("failed to update your contact", {
              position: toast.POSITION.TOP_CENTER,
            });
          } else {
            toast.success("successfully updated your contact", {
              position: toast.POSITION.TOP_CENTER,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast.error("This field can't be blank.", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  // update social media links
  const updateSocial = (userFb, userLinkedIn, userTwitter, userWeb) => {
    if (
      userFb != "" ||
      userLinkedIn != "" ||
      userTwitter != "" ||
      userWeb != ""
    ) {
      axios
        .post(
          `${url}/create_startup_profile.php`,
          {
            user_id: userInfo.user_id,
            facebook_url: userFb == "" ? null : userFb,
            linkedIn_url: userLinkedIn == "" ? null : userLinkedIn,
            twitter_url: userTwitter == "" ? null : userTwitter,
            website_url: userWeb == "" ? null : userWeb,
          },
          {
            headers: {
              Authorization: "Bearer " + userInfo.token,
            },
          }
        )
        .then((res) => {
          setRefresh(!refresh);
          // console.log(res);
          if (res.data.status == 0) {
            toast.error("failed to update your social links", {
              position: toast.POSITION.TOP_CENTER,
            });
          } else {
            toast.success("successfully updated your  social links", {
              position: toast.POSITION.TOP_CENTER,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast.error("This field can't be blank.", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  // update user address
  const updateAddress = (
    userCity,
    userState,
    userCountry,
    userZipcode,
    lat,
    lng
  ) => {
    if (
      userCity != "" ||
      userState != "" ||
      userCountry != "" ||
      userZipcode != "" ||
      lat != "" ||
      lng != ""
    ) {
      axios
        .post(
          `${url}/create_startup_profile.php`,
          {
            user_id: userInfo.user_id,
            city: userCity,
            state: userState,
            country: userCountry,
            zip_code: userZipcode,
            geo_lat: lat,
            geo_lng: lng,
          },
          {
            headers: {
              Authorization: "Bearer " + userInfo.token,
            },
          }
        )
        .then((res) => {
          setRefresh(!refresh);
          // console.log(res);
          if (res.data.status == 0) {
            toast.error("failed to update your address", {
              position: toast.POSITION.TOP_CENTER,
            });
          } else {
            toast.success("successfully updated your address", {
              position: toast.POSITION.TOP_CENTER,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast.error("This field can't be blank.", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  // add service
  const addServices = (cat, subcat) => {
    if (cat != "" || subcat != "") {
      axios
        .post(
          `${url}/add_service.php`,
          {
            user_id: userInfo.user_id,
            service_cat_id: cat,
            service_subcat_id: subcat,
          },
          {
            headers: {
              Authorization: "Bearer " + userInfo.token,
            },
          }
        )
        .then((res) => {
          setRefresh(!refresh);
          // console.log(res);
          if (res.data.status == 0) {
            toast.error("failed to update your service", {
              position: toast.POSITION.TOP_CENTER,
            });
          } else {
            toast.success("successfully updated your service", {
              position: toast.POSITION.TOP_CENTER,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast.error("This field can't be blank.", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  // delete service
  const delteServices = (id) => {
    axios
      .delete(`${url}/delete_service.php?service_id=${id}`, {
        headers: {
          Authorization: "Bearer " + userInfo.token,
        },
      })
      .then((res) => {
        setRefresh(!refresh);
        // console.log(res);
        if (res.data.status == 0) {
          toast.error("failed to delete your service", {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          toast.success("successfully deleted your service", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // add business details
  const addBusinessDetails = (
    founderState,
    projectionState,
    cofounderState,
    staffsState,
    regState,
    docState,
    startupIndState,
    fundingState
  ) => {
    if (
      founderState != "" ||
      projectionState != "" ||
      cofounderState != "" ||
      staffsState != "" ||
      regState != "" ||
      docState != "" ||
      startupIndState != "" ||
      fundingState != ""
    ) {
      axios
        .post(
          `${url}/create_startup_profile.php`,
          {
            user_id: userInfo.user_id,
            founder_name: founderState != "" ? founderState : null,
            registration_date: regState != "" ? regState : null,
            pitchdeck_url: docState != "" ? docState : null,
            team_size: staffsState != "" ? staffsState : null,
            num_of_cxos: cofounderState != "" ? cofounderState : null,
            looking_for_funding: fundingState != "" ? fundingState : null,
            startupIndia: startupIndState != "" ? startupIndState : null,
            projection: projectionState != "" ? projectionState : null,
          },
          {
            headers: {
              Authorization: "Bearer " + userInfo.token,
            },
          }
        )
        .then((res) => {
          setRefresh(!refresh);
          if (res.data.status == 0) {
            console.log(res);
            toast.error("failed to update your business details", {
              position: toast.POSITION.TOP_CENTER,
            });
          } else {
            toast.success("successfully updated your business details", {
              position: toast.POSITION.TOP_CENTER,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast.error("Those field can't be blank.", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <div className="pageWrapper">
      <ToastContainer />
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <ProfileHeaderForm
            profile={user?.startup?.profile}
            cover={user?.startup?.cover}
            name={user?.startup?.company_name}
            type={user?.startup?.industry_name}
            uploadProfile={uploadProfile}
            uploadCover={uploadCover}
          />
          <div className="pageWrapper1">
            <ProfileMssgForm
              msg={user?.startup?.description}
              clickHandler={updateBio}
            />
            <ProfileAddressForm
              city={user?.startup?.city_name}
              state={user?.startup?.state_name}
              country={user?.startup?.country_name}
              zipcode={user?.startup?.zip_code}
              updateAddress={updateAddress}
            />
            <ProfileBusinessForm
              founder={user?.startup?.founder_name}
              projection={user?.startup?.projection}
              cofounder={user?.startup?.num_of_cxos}
              staffs={user?.startup?.team_size}
              reg={user?.startup?.registration_date}
              doc_name={user?.startup?.pitchdeck_url}
              startupIndia={user?.startup?.startupIndia}
              looking_for_funding={user?.startup?.looking_for_funding}
              submitHandler={addBusinessDetails}
            />
            <ProfileServiceForm
              services={user?.services}
              handelSubmit={addServices}
              delteServices={delteServices}
            />
            <ProfileContactForm
              email={user?.startup?.company_email}
              mobile={user?.startup?.company_phone}
              updateContact={updateContact}
            />
            <ProfileOtherLinksForm
              fb={user?.startup?.facebook_url}
              twitter={user?.startup?.twitter_url}
              linkedin={user?.startup?.linkedin_url}
              website={user?.startup?.website_url}
              updateSocial={updateSocial}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default StartupProfile;

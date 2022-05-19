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

function Profile({ authUser }) {
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
      .get(
        `${url}/get_single_user.php?type=${userInfo.user_type}&user_id=${userInfo.user_id}`,
        {
          headers: {
            Authorization: "Bearer " + userInfo.token,
          },
        }
      )
      .then((res) => {
        setUser(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [refresh]);

  // get all startups list
  useEffect(() => {
    axios
      .post(`${url}/vendor_listing.php`, {
        freelancers: "FALSE",
      })
      .then((res) => {
        setStartups(res.data.vendors);
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
    data.append("type_id", userInfo.user_type_id);
    data.append("profile", event.target.files[0]);

    axios
      .post(`${url}/upload-img.php`, data, {
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
    data.append("type_id", userInfo.user_type_id);
    data.append("cover", event.target.files[0]);

    axios
      .post(`${url}/upload-img.php`, data, {
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
          `${url}/create_user_profile.php`,
          {
            user_id: userInfo.user_id,
            type_id: userInfo.user_type_id,
            about: bio,
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

  // link a startup profile to a user
  const linkStartupHandler = (startup_id) => {
    if (startup_id != "") {
      axios
        .post(
          `${url}/create_user_profile.php`,
          {
            user_id: userInfo.user_id,
            type_id: userInfo.user_type_id,
            startup_id: startup_id,
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
            toast.error("failed to update your profile", {
              position: toast.POSITION.TOP_CENTER,
            });
          } else {
            toast.success("successfully updated your profile", {
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

  // function to add expr
  const addExpr = (position, company) => {
    if (position != "" && company != "") {
      axios
        .post(`${url}/add_expr.php`, {
          user_id: userInfo.user_id,
          company_name: company,
          position: position,
        })
        .then((res) => {
          setRefresh(!refresh);
          // console.log(res);
          if (res.data.status == 0) {
            toast.error("failed to add experience", {
              position: toast.POSITION.TOP_CENTER,
            });
          } else {
            toast.success("successfully added experience", {
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

  // function to update expr
  const updateExpr = (id, position, company) => {
    if (position != "" && company != "") {
      axios
        .post(`${url}/update_expr.php`, {
          id: id,
          company_name: company,
          position: position,
        })
        .then((res) => {
          setRefresh(!refresh);
          // console.log(res);
          if (res.data.status == 0) {
            toast.error("failed to update experience", {
              position: toast.POSITION.TOP_CENTER,
            });
          } else {
            toast.success("successfully updated experience", {
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

  // function to add educ
  const addEduc = (degree, university) => {
    if (degree != "" && university != "") {
      axios
        .post(`${url}/add_educ.php`, {
          user_id: userInfo.user_id,
          degree: degree,
          university: university,
        })
        .then((res) => {
          setRefresh(!refresh);
          // console.log(res);
          if (res.data.status == 0) {
            toast.error("failed to update education", {
              position: toast.POSITION.TOP_CENTER,
            });
          } else {
            toast.success("successfully updated education", {
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
          `${url}/create_user_profile.php`,
          {
            user_id: userInfo.user_id,
            email: email,
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
          `${url}/create_user_profile.php`,
          {
            user_id: userInfo.user_id,
            mobile: mobile,
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
          `${url}/create_user_profile.php`,
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
          `${url}/create_user_profile.php`,
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

  // update user bio
  const addInvestmentDetails = (amnt, indtry, prevInv) => {
    if (amnt != "" && indtry !== "" && prevInv != "") {
      axios
        .post(
          `${url}/add_investment_details.php`,
          {
            user_id: userInfo.user_id,
            interested_industry: indtry,
            interested_amount: amnt,
            prev_investment: prevInv,
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
            toast.error("failed to update your investment details", {
              position: toast.POSITION.TOP_CENTER,
            });
          } else {
            toast.success("successfully updated your investment details", {
              position: toast.POSITION.TOP_CENTER,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (amnt != "" && indtry != "") {
      axios
        .post(
          `${url}/add_investment_details.php`,
          {
            user_id: userInfo.user_id,
            interested_industry: indtry,
            interested_amount: amnt,
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
            toast.error("failed to update your investment details", {
              position: toast.POSITION.TOP_CENTER,
            });
          } else {
            toast.success("successfully updated your investment details", {
              position: toast.POSITION.TOP_CENTER,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (amnt != "" && prevInv != "") {
      axios
        .post(
          `${url}/add_investment_details.php`,
          {
            user_id: userInfo.user_id,
            interested_amount: amnt,
            prev_investment: prevInv,
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
            toast.error("failed to update your investment details", {
              position: toast.POSITION.TOP_CENTER,
            });
          } else {
            toast.success("successfully updated your investment details", {
              position: toast.POSITION.TOP_CENTER,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (indtry != "" && prevInv != "") {
      axios
        .post(
          `${url}/add_investment_details.php`,
          {
            user_id: userInfo.user_id,
            interested_industry: indtry,
            prev_investment: prevInv,
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
            toast.error("failed to update your investment details", {
              position: toast.POSITION.TOP_CENTER,
            });
          } else {
            toast.success("successfully updated your investment details", {
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

  return (
    <div className="pageWrapper">
      <ToastContainer />
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <ProfileHeaderForm
            profile={user?.personalDetails?.profile}
            cover={user?.personalDetails?.cover}
            name={`${user?.personalDetails?.first_name} ${user?.personalDetails?.last_name}`}
            type={user?.personalDetails?.user_subtype}
            uploadProfile={uploadProfile}
            uploadCover={uploadCover}
          />
          <div className="pageWrapper1">
            <ProfileMssgForm
              msg={user?.personalDetails?.about}
              clickHandler={updateBio}
            />
            <ProfileAddressForm
              city={user?.personalDetails?.city_name}
              state={user?.personalDetails?.state_name}
              country={user?.personalDetails?.country_name}
              zipcode={user?.personalDetails?.zip_code}
              updateAddress={updateAddress}
            />
            {user?.personalDetails?.user_type_id == 1 && (
              <ProfileStartupForm
                your_startup={user?.your_startup}
                startups={startups}
                linkStartupHandler={linkStartupHandler}
              />
            )}

            {user?.personalDetails?.user_type_id == 2 && (
              <ProfileInvestmentDetailsForm
                interested_amount={user?.investmentDetails?.interested_amount}
                interested_industry={
                  user?.investmentDetails?.interested_industry
                }
                prev_investment={user?.investmentDetails?.prev_investment}
                submitHandler={addInvestmentDetails}
              />
            )}

            {user?.personalDetails?.user_subtype_id == 27 && (
              <ProfileServiceForm
                services={user?.services}
                handelSubmit={addServices}
                delteServices={delteServices}
              />
            )}

            <ProfileExprForm
              expr={user?.experiences}
              positions={positions}
              handelSubmit={addExpr}
              updateExpr={updateExpr}
            />
            <ProfileEducForm
              educ={user?.last_education}
              degrees={degrees}
              handelSubmit={addEduc}
            />
            <ProfileContactForm
              email={user?.personalDetails?.email}
              mobile={user?.personalDetails?.mobile}
              updateContact={updateContact}
            />
            <ProfileOtherLinksForm
              fb={user?.personalDetails?.facebook_url}
              twitter={user?.personalDetails?.twitter_url}
              linkedin={user?.personalDetails?.linkedIn_url}
              website={user?.personalDetails?.website_url}
              updateSocial={updateSocial}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Profile;

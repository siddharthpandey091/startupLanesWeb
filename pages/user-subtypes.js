import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import classes from "../styles/Auth.module.css";
import { useRouter } from "next/router";
import { url } from "../api";
import { ToastContainer, toast } from "react-toastify";

function SubCategory() {
  const router = useRouter();
  const [subcategories, setSubCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .post(`${url}/get-subusertype.php`, { type_id: router.query.type })
      .then((subcategories) => {
        setSubCategories(subcategories.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [router.query.type]);

  const ISSERVER = typeof window === "undefined";
  // if (!ISSERVER) {
  // checking whether user already registered and also complete thier registration
  //   if (localStorage.getItem("user") == undefined) {
  //     router.push("/login");
  //   }
  // }

  const updateUser = (subtype_id) => {
    if (!ISSERVER) {
      const data = JSON.parse(localStorage.getItem("user"));
      axios
        .put(`${url}/update-user.php?user_id=${data.user_id}`, {
          user_type: router.query.type,
          user_subtype: subtype_id,
        })
        .then((res) => {
          if (res.data.status === 1) {
            toast.success("completed your registration successfully", {
              position: toast.POSITION.TOP_CENTER,
            });
            localStorage.removeItem("user");
            if (!ISSERVER) window.location.href = "/login";
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <div className={classes.pageWrapper}>
        <ToastContainer style={{ color: "red" }} />
        <div className={classes.reg_wrapper}>
          <div className={classes.registration}>
            <div className={classes.cat}>
              <div className={classes.head}>
                <h3>ENTREPRENEUR</h3>
                <h2 style={{ marginTop: "-7px", marginBottom: "10px" }}>
                  Welcome to StartupLanes
                </h2>
              </div>
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                subcategories.map((subcategory) => {
                  return (
                    <div
                      className={classes.subcategory}
                      key={subcategory.subtype_id}
                      onClick={() => updateUser(subcategory.subtype_id)}
                    >
                      <div className={classes.subcat_text}>
                        <p>Continue as {subcategory.sub_type}</p>
                      </div>
                      <div className={classes.subcat_image}>
                        <img src="/arrow.png" />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
            <div className={classes.image}></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SubCategory;

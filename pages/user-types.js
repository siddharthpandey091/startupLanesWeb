import React from "react";
import Link from "next/link";
import classes from "../styles/Auth.module.css";
import { useRouter } from "next/router";

function Category() {
  const router = useRouter();
  const ISSERVER = typeof window === "undefined";
  if (!ISSERVER) {
    // checking whether user already registered and also complete thier registration
    // if (localStorage.getItem("user") == undefined) {
    //   router.push("/login");
    // }
  }

  // function to redirect to the user-subtypes page
  const redirect = (type) => {
    router.push(
      {
        pathname: "/user-subtypes",
        query: {
          type: type,
        },
      },
      "/user-subtypes"
    );
  };

  return (
    <>
      <div className={classes.pageWrapper}>
        <div className={classes.reg_wrapper}>
          <div className={classes.registration}>
            <div className={classes.cat}>
              <h2>Welcome to StartupLanes</h2>
              <div className={classes.category}>
                <div className={classes.cat_text} onClick={() => redirect(2)}>
                  <p>Investor</p>
                </div>
                <div className={classes.cat_image}>
                  <img src="/cat1.png" />
                </div>
              </div>
              <div className={classes.category} onClick={() => redirect(1)}>
                <div className={classes.cat_text}>
                  <p>Entrepreneur</p>
                </div>
                <div className={classes.cat_image}>
                  <img src="/cat2.png" />
                </div>
              </div>
              <div className={classes.category} onClick={() => redirect(3)}>
                <div className={classes.cat_text}>
                  <p>Enabler</p>
                </div>
                <div className={classes.cat_image}>
                  <img src="/cat3.png" />
                </div>
              </div>
              <div className={classes.category} onClick={() => redirect(4)}>
                <div className={classes.cat_text}>
                  <p>Indivisual</p>
                </div>
                <div className={classes.cat_image}>
                  <img src="/cat4.png" />
                </div>
              </div>
            </div>
            <div className={classes.image}></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Category;

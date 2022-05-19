import React from "react";
import classes from "./ProfileServices.module.css";

function ProfileServices({ services }) {
  return (
    <div className={classes.ProfileServices}>
      <h4>Services Provided</h4>
      {services && services.length != 0 ? (
        services.map((service, index) => {
          return (
            <div className={classes.service} key={index}>
              <div>
                <h6>{service.service_subcat_name}</h6>
                <p>{service.service_cat_name}</p>
              </div>
            </div>
          );
        })
      ) : (
        <h6>No Details Provided Yet.</h6>
      )}
    </div>
  );
}

export default ProfileServices;

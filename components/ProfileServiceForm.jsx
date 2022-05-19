import React, { useState, useRef, useEffect } from "react";
import styles from "./ProfileExpr.module.css";
import classes from "./ProfileServices.module.css";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { url } from "../api";
import { FaPlusCircle } from "react-icons/fa";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const ProfileServiceForm = ({ services, handelSubmit, delteServices }) => {
  const [cat, setCat] = useState("");
  const [subcat, setSubcat] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [showBtn, setShowBtn] = useState(false);
  const [addAnotherService, setAnotherService] = useState(false);
  const animatedComponents = makeAnimated();

  const handleCancel = () => {
    setShowBtn(false);
    setAnotherService(false);
  };

  const handlAddMore = () => {
    setAnotherService(true);
    setShowBtn(true);
  };

  const onSubcatChange = (e) => {
    setSubcat(Array.isArray(e) ? e.map((x) => x.value) : []);
  };

  const handleAdd = () => {
    handelSubmit(cat, subcat);
    setShowBtn(false);
    setAnotherService(false);
  };

  // get all service categories
  useEffect(() => {
    axios
      .get(`${url}/get_service_categories.php`)
      .then((res) => {
        setCategories(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // get all service subcategories
  useEffect(() => {
    axios
      .post(`${url}/get_service_subcategory.php`, {
        category: cat,
      })
      .then((res) => {
        const data = res.data;
        const option = data.map((val) => {
          return { value: val.id, label: val.sub_category };
        });
        setSubcategories(option);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [cat]);

  return (
    <div className={classes.ProfileServices}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: "15px" }}>
        <h4>Services</h4>
        <div style={{ cursor: "pointer" }} onClick={handlAddMore}>
          <FaPlusCircle />
        </div>
      </div>
      <div className={styles.inputs}>
        {services.length == 0 || addAnotherService ? (
          <>
            <select
              style={{ width: "240px" }}
              className="form-select"
              onChange={(e) => setCat(e.target.value)}
              onFocus={() => setShowBtn(true)}
            >
              <option selected value="">
                Select Service Category
              </option>
              {categories.map((val) => {
                return (
                  <option key={val.id} value={val.id}>
                    {val.name}
                  </option>
                );
              })}
            </select>{" "}
            <br />
            <div style={{ width: "240px" }}>
              <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                //   defaultValue={[colourOptions[4], colourOptions[5]]}
                // value={props.options.filter(
                //   (option) => option.value === props.currentVal
                // )}
                onChange={onSubcatChange}
                isMulti
                onFocus={() => setShowBtn(true)}
                placeholder="select the services"
                options={subcategories}
              />
            </div>
            {showBtn && (
              <div className="btngroup_profile">
                <button onClick={handleAdd} className="btn btn-primary">
                  save
                </button>
                <button
                  onClick={handleCancel}
                  className="btn btn-outline-primary"
                >
                  cancel
                </button>
              </div>
            )}
          </>
        ) : (
          <div>
            {services.map((service, index) => {
              return (
                <div className={classes.service} key={index}>
                  <div>
                    <h6>{service.service_subcat_name}</h6>
                    <p>{service.service_cat_name}</p>
                  </div>
                  <MdDelete
                    style={{ color: "red", cursor: "pointer" }}
                    onClick={() => delteServices(service.service_id)}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileServiceForm;

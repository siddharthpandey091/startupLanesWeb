import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import CustomSearchbar from "../components/CustomSearch";
import styles from "../styles/Home.module.css";
import CustomSelect from "../components/CustomSelect";
import { url } from "../api";
import axios from "axios";

export default function Home() {
  const [cities, setCities] = useState([]);
  console.log(cities);
  const [popularServices, setPopularServices] = useState([]);
  const [allServices, setAllServices] = useState([]);
  const [vendorType, setvendorType] = useState("FALSE");
  const [isLoading, setIsLoading] = useState(false);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [currentCity, setCurrentCity] = useState("");
  const [currentLocation, setcurrentLocation] = useState(null);
  const router = useRouter();

  // function to get user current location(lat & lang) + Reverse GEO
  const getLocation = () => {
    if (!navigator.geolocation) {
      setcurrentLocation("Geolocation is not supported by your browser");
    } else {
      setcurrentLocation("Locating...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
          // reverse geo coding api
          axios
            .get(
              `${url}/current_location.php?lat=${position.coords.latitude}&lng=${position.coords.longitude}`
            )
            .then((locations) => {
              const data = locations.data.data;
              setCurrentCity(data.city_id);
              setcurrentLocation(data);
              // get list of cities
              axios
                .post(`${url}/get_cities_by_country_id.php`, {
                  country_id: data.country_id,
                })
                .then((res) => {
                  const data = res.data;
                  const option = data.map((city) => {
                    return { value: city.city_id, label: city.city_name };
                  });
                  setCities(option);
                  setIsLoading(false);
                })
                .catch((error) => {
                  setIsLoading(false);
                  console.log(error);
                });
            })
            .catch((error) => {
              setIsLoading(false);
              setCurrentCity(133024);
              axios
                .post(`${url}/get_cities_by_country_id.php`, {
                  country_id: 101,
                })
                .then((res) => {
                  const data = res.data;
                  const option = data.map((city) => {
                    return { value: city.city_id, label: city.city_name };
                  });
                  setCities(option);
                  setIsLoading(false);
                })
                .catch((error) => {
                  setIsLoading(false);
                  console.log(error);
                });
              console.log(error);
            });
        },
        () => {
          setIsLoading(false);
          setcurrentLocation("Unable to retrieve your location");
          axios
            .post(`${url}/get_cities_by_country_id.php`, {
              country_id: 101,
            })
            .then((res) => {
              const data = res.data;
              const option = data.map((city) => {
                return { value: city.city_id, label: city.city_name };
              });
              setCities(option);
              setIsLoading(false);
            })
            .catch((error) => {
              setIsLoading(false);
              console.log(error);
            });
          setCurrentCity(133024);
          // setCities({ value: 0, label: "please allow location permision" });
        }
      );
    }
  };
  // calling function to get user current locaton
  useEffect(() => {
    getLocation();
  }, []);

  // get list of popular services
  useEffect(() => {
    axios
      .get(`${url}/get_popular_services.php`)
      .then((p_services) => {
        const data = p_services.data;
        setPopularServices(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // get list of all services
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

  // function to handle user category click
  const onCategoryClick = (cat_id, subcat_id) => {
    router.push(
      {
        pathname: "/vendor",
        query: {
          filter: vendorType,
          city: currentCity,
          cat_id: cat_id,
          subcat_id: subcat_id,
        },
      },
      "/vendor"
    );
  };

  return (
    <div className="pageWrapper">
      <h2>Source Vendors</h2>
      <p>
        Source any vendor of your requirement from lawyer to web-developer and
        much more.
      </p>
      <div className={styles.filterComponents}>
        <CustomSearchbar
          placeholder="Search for service.."
          data={allServices}
          clickHandler={onCategoryClick}
        />
      </div>
      <div className={styles.filterComponents}>
        <CustomSelect
          placeholder="fetching location"
          options={cities}
          icon="fa-map-marker-alt"
          currentVal={currentCity}
          setCurrentVal={setCurrentCity}
        />
      </div>
      <div className={styles.filterComponents}>
        <div className={styles.radioBtnContainer}>
          <div
            className={styles.radioBtn}
            onClick={() => {
              setvendorType("FALSE");
            }}
          >
            <input
              type="radio"
              value={vendorType}
              name="vendorType"
              checked={vendorType == "FALSE"}
            />
            Company
          </div>
          <div
            className={styles.radioBtn}
            onClick={() => {
              setvendorType("TRUE");
            }}
          >
            <input
              type="radio"
              value={vendorType}
              name="vendorType"
              checked={vendorType == "TRUE"}
            />
            Freelancer
          </div>
        </div>
      </div>
      <h1>Popular Categories</h1>
      <div className={styles.popularCats}>
        {isLoading ? (
          <p>loading popular Categories...</p>
        ) : (
          popularServices.map((popularService, index) => {
            return (
              <div
                key={index}
                onClick={() =>
                  onCategoryClick(
                    popularService.category,
                    popularService.subcategory_id
                  )
                }
              >
                <div className={styles.popularCat}>
                  <img src={popularService.image} />
                </div>
                <p>{popularService.sub_category}</p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

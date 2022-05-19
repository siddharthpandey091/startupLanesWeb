import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import classes from "../styles/Auth.module.css";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import ErrorComponent from "../components/ErrorComponent";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../store/actions/authActions";
import { ToastContainer, toast } from "react-toastify";

function Registration() {
  const router = useRouter();
  const ISSERVER = typeof window === "undefined";
  if (!ISSERVER) {
    // checking whether user already registered but not complete yet
    if (localStorage.getItem("user") != undefined) {
      router.push("/user-types");
    }
  }

  const [showPass, setshowPass] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  console.log(auth);

  const togglePass = () => {
    setshowPass((prevState) => !prevState);
  };

  const validationSchema = Yup.object({
    first_name: Yup.string().required("first name is required"),
    last_name: Yup.string().required("first name is required"),
    email_mobile: Yup.string().required("email is required"),
    password: Yup.string()
      .min(8, "Must be atleast 8 character long")
      .required("password could not be blanked"),
    confirm_password: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
  });

  const initialValues = {
    first_name: "",
    last_name: "",
    email_mobile: "",
    password: "",
    confirm_password: "",
    refferal_code: "",
  };

  const handleReg = (user) => {
    // console.log(user);
    dispatch(signUp(user));
  };

  if (auth.data.status == 1) {
    toast.success("proceed to complete registration", {
      position: toast.POSITION.TOP_CENTER,
    });
    localStorage.setItem("user", JSON.stringify(auth.data));
    router.push("/user-types");
  }

  if (auth.data.status == 0) {
    toast.error(auth.data.message, {
      position: toast.POSITION.TOP_CENTER,
    });
  }

  return (
    <>
      <div className={classes.pageWrapper}>
        <ToastContainer style={{ color: "red" }} />
        <div className={classes.reg_wrapper}>
          <div className={classes.registration}>
            <div className={classes.form}>
              <p>Welcome to </p>
              <h1>StartupLanes</h1>
              <Formik
                initialValues={initialValues}
                onSubmit={handleReg}
                validationSchema={validationSchema}
              >
                <Form className={classes.formik}>
                  <div className={classes.dflexbox}>
                    <div>
                      <img src="/person.svg" className={classes.p_icon} />
                      <Field
                        className={classes.field}
                        name="first_name"
                        type="text"
                        placeholder="First name"
                      />
                    </div>
                    <Field
                      className={classes.field1}
                      name="last_name"
                      type="text"
                      placeholder="Last name"
                      style={{ paddingLeft: "7px" }}
                    />
                  </div>
                  <ErrorComponent name="first_name" />
                  <ErrorComponent name="last_name" />
                  <div>
                    <img src="/email.svg" className={classes.p_icon} />
                    <Field
                      className={classes.field}
                      name="email_mobile"
                      type="text"
                      placeholder="Email Address/ Phone No."
                    />
                  </div>
                  <ErrorComponent name="email_mobile" />
                  <div>
                    <img src="password.svg" className={classes.p_icon} />
                    <Field
                      className={classes.field}
                      name="password"
                      type={showPass ? "text" : "password"}
                      placeholder="Password"
                    />
                    <img
                      src="/eye.svg"
                      className={classes.eye}
                      onClick={togglePass}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                  <ErrorComponent name="password" />
                  <div>
                    <img src="/password.svg" className={classes.p_icon} />
                    <Field
                      className={classes.field}
                      name="confirm_password"
                      type={showPass ? "text" : "password"}
                      placeholder="Confirm password"
                    />
                    <img
                      src="/eye.svg"
                      className={classes.eye}
                      onClick={togglePass}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                  <ErrorComponent name="confirm_password" />
                  <div>
                    <img src="/refer.svg" className={classes.p_icon} />
                    <Field
                      className={classes.field}
                      name="refferal_code"
                      type="text"
                      placeholder="refferal code"
                    />
                  </div>
                  <br />
                  <div className={classes.cbx}>
                    <input type="checkbox" required />
                    <span>Agree to terms of services and privacy</span>
                  </div>
                  <button className={classes.reg_btn} type="submit">
                    Register
                  </button>
                </Form>
              </Formik>
              <h6 className={classes.pstyle}>or</h6>
              <h6 className={classes.pstyle}>Register with social accounts</h6>
              <div className={classes.social}>
                <Link href="/">
                  <a>
                    <img src="/Facebook.svg" />
                  </a>
                </Link>
                <Link href="/">
                  <a>
                    <img src="/Google.svg" />
                  </a>
                </Link>
                <Link href="/">
                  <a>
                    <img src="/Twitter.svg" />
                  </a>
                </Link>
              </div>
              <span style={{ color: "var(--grey-color)", marginTop: "20px" }}>
                Already have an account ?{" "}
                <Link href="/login">
                  <a style={{ color: "#0AA6A0", fontWeight: "bold" }}>Log In</a>
                </Link>
              </span>
            </div>
            <div className={classes.image}></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Registration;

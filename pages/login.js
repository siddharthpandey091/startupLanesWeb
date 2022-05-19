import React, { useState } from "react";
import Link from "next/link";
import Cookie from "js-cookie";
import classes from "../styles/Auth.module.css";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import ErrorComponent from "../components/ErrorComponent";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../store/actions/authActions";
import { ToastContainer, toast } from "react-toastify";

function Login() {
  const [showPass, setshowPass] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  console.log(auth);

  const togglePass = () => {
    setshowPass((prevState) => !prevState);
  };

  const validationSchema = Yup.object({
    email_mobile: Yup.string().required("email is required"),
    password: Yup.string().required("password could not be blanked"),
  });

  const initialValues = {
    email_mobile: "",
    password: "",
  };

  const handleLogin = (user) => {
    // console.log(user);
    dispatch(signIn(user));
  };

  if (auth.data.status == 1) {
    Cookie.set("SL_USER__AUTH", JSON.stringify(auth.data), { expires: 7 });
    toast.success("successfully loggedIn.", {
      position: toast.POSITION.TOP_CENTER,
    });
    const ISSERVER = typeof window === "undefined";
    if (!ISSERVER) {
      window.location.href = "/dashboard";
    }
  }
  if (auth.data.status == 0) {
    toast.error(auth.data.message, {
      position: toast.POSITION.TOP_CENTER,
    });
  }

  return (
    <>
      <div className={classes.pageWrapper}>
        <ToastContainer />
        <div className={classes.reg_wrapper}>
          <div className={classes.registration}>
            <div className={classes.form} style={{ marginTop: "20px" }}>
              <p>Welcome to </p>
              <h1>StartupLanes</h1>
              <Formik
                initialValues={initialValues}
                onSubmit={handleLogin}
                validationSchema={validationSchema}
              >
                <Form className={classes.formik}>
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
                    <img src="/password.svg" className={classes.p_icon} />
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
                  <br />
                  <button
                    style={{ marginTop: "17px" }}
                    className={classes.reg_btn}
                    type="submit"
                  >
                    Login
                  </button>
                </Form>
              </Formik>
              <h6 className={classes.pstyle} style={{ marginTop: "34px" }}>
                or
              </h6>
              <h6 className={classes.pstyle}>Login with social accounts</h6>
              <div
                className={classes.social}
                style={{ marginTop: "34px", marginBottom: "20px" }}
              >
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
              <span style={{ color: "var(--grey-color)", marginTop: "30px" }}>
                New member ?{" "}
                <Link href="/register">
                  <a style={{ color: "#0AA6A0", fontWeight: "bold" }}>
                    Register
                  </a>
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

export default Login;

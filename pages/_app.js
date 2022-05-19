import "../styles/globals.css";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import Layout from "../components/Layout";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../store/reducers/rootReducer";
import "react-toastify/dist/ReactToastify.css";

const store = createStore(rootReducer, applyMiddleware(thunk));

function MyApp({ Component, pageProps }) {
  const ISSERVER = typeof window === "undefined";

  function checkAuth(name) {
    if (!ISSERVER) {
      var match = document.cookie.match(
        RegExp("(?:^|;\\s*)" + name + "=([^;]*)")
      );
      return match ? "LOGGED_IN" : "!LOGGED_IN";
    }
  }
  function authUser(cName) {
    if (!ISSERVER) {
      const name = cName + "=";
      const cDecoded = decodeURIComponent(document.cookie); //to be careful
      const cArr = cDecoded.split("; ");
      let res;
      cArr.forEach((val) => {
        if (val.indexOf(name) === 0) res = val.substring(name.length);
      });
      if (typeof res !== "undefined") {
        const user = JSON.parse(res);
        // console.log(res);
        return user;
      }
    }
  }

  return (
    <Provider store={store}>
      <ToastContainer />
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />

        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css"
          integrity="sha512-1PKOgIY59xJ8Co8+NE6FZ+LOAZKjy+KY8iq0G4B3CyeY6wYHN3yt9PW0XpSriVlkMXe40PTKnXrLnZ9+fkDaog=="
          crossOrigin="anonymous"
          referrerpolicy="no-referrer"
        />
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
      </Head>
      <Layout>
        <Component {...pageProps} checkAuth={checkAuth} authUser={authUser} />
      </Layout>
    </Provider>
  );
}

export default MyApp;

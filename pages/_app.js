/** @format */

import "../styles/globals.css";
import { magic } from "../lib/magic-client";
import { useEffect } from "react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = async () => {
      const LoggedIn = await magic.user.isLoggedIn(); // will return true or false

      console.log("IS LOGGED IN", LoggedIn);

      if (LoggedIn) {
        router.push("/");
      } else {
        router.push("/login");
      }
    };

    isLoggedIn();
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;

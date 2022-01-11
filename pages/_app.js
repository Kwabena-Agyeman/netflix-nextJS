/** @format */

import { useState } from "react";
import "../styles/globals.css";
import { magic } from "../lib/magic-client";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Loading from "../componrnts/loading/Loading";

function MyApp({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = async () => {
      const LoggedIn = await magic.user.isLoggedIn(); // will return true or false
      console.log("IS LOGGED IN", LoggedIn);
      if (!LoggedIn) {
        router.push("/login");
      }

      setIsLoading(false);
    };
    isLoggedIn();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const handleComplete = () => {
      setIsLoading(false);
    };
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router.events]);

  return isLoading ? <Loading /> : <Component {...pageProps} />;
}

export default MyApp;

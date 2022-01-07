/** @format */

import Head from "next/head";
import Image from "next/image";
import Banner from "../componrnts/banner/banner";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <h1>Netflix</h1>
      <Banner
        title={"Breaking Bad"}
        subTitle={"Walter White's Journey"}
        imgUrl={"../public/static/The-Best-Breaking-Bad-Quotes.webp"}
      />
      {/* <NavBar/> */}
    </div>
  );
}

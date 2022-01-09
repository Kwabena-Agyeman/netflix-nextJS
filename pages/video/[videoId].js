/** @format */

import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const Video = () => {
  const router = useRouter();
  const videoId = router.query.videoId;
  return <div>Video Page {videoId} </div>;
};

export default Video;

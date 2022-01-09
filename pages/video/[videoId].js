/** @format */

import React from "react";
import Router, { useRouter } from "next/router";

const Video = () => {
  const router = useRouter();
  const videoId = router.query.videoId;
  return <div>Video Page {videoId} </div>;
};

export default Video;

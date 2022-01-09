/** @format */

import React from "react";
import { useRouter } from "next/router";
import Modal from "react-modal";

Modal.setAppElement("#__next");

const Video = () => {
  const router = useRouter();
  const videoId = router.query.videoId;
  return (
    <div>
      Video Page {videoId}
      <Modal isOpen={true} contentLabel='Watch the video'>
        Modal Body
      </Modal>{" "}
    </div>
  );
};

export default Video;

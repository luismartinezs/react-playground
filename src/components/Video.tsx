import React from "react";

const Video = () => {
  return (
    <>
      <video
        controls
        width="900"
        height="auto"
        autoPlay={false}
        playsInline={false}
        loop={false}
        muted={false}
        className="outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
      ></video>
      <span id="video-caption">Webcam live preview</span>
    </>
  );
};

export default Video;

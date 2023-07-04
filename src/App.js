import React, { useRef, useEffect, useState } from "react";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.css";

export default function App() {
  const videoRef = useRef();
  const canvasRef = useRef();
  const [dimensions, setDimensions] = useState({});

  let context;
  if (canvasRef.current) {
    context = canvasRef.current.getContext("2d");
  }

  function getVideoSizeData(videoRef) {
    const ratio = videoRef.current.videoWidth / videoRef.current.videoHeight;
    const w = videoRef.current.videoWidth - 100;
    const h = parseInt(w / ratio, 10);
    return {
      ratio,
      w,
      h
    };
  }

  useEffect(() => {
    // Add listener when the video is actually available for
    // the browser to be able to check the dimensions of the video.
    if (videoRef.current) {
      videoRef.current.addEventListener("loadedmetadata", function () {
        const { w, h } = getVideoSizeData(videoRef);

        canvasRef.current.width = w;
        canvasRef.current.height = h;
        setDimensions({
          w: w,
          h: h
        });
      });
    }
  }, []);

  function snap() {
    if (context && videoRef.current) {
      context.fillRect(0, 0, dimensions.w, dimensions.h);
      context.drawImage(videoRef.current, 0, 0, dimensions.w, dimensions.h);
    }
  }
  return (
    <div>
      <video
        src="https://static.vecteezy.com/system/resources/previews/003/321/328/mp4/happy-birthday-greeting-in-2d-animation-format-free-video.mp4"
        ref={videoRef}
        controls
      />
      <canvas crossOrigin="anonymous" ref={canvasRef} />
      <button onClick={snap}>Take screenshot</button>
    </div>
  );
}

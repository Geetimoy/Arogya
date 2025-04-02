import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";

const CameraTesting = () => {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  };

  const saveImage = () => {
    if (!image) return;
    const link = document.createElement("a");
    link.href = image;
    link.download = "captured_image.png";
    link.click();
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/png"
        className="rounded-lg shadow-lg"
      />
      <Button onClick={capture}>Capture</Button>
      {image && (
        <div className="flex flex-col items-center space-y-2">
          <img src={image} alt="Captured" className="rounded-lg shadow-md" />
          <Button onClick={saveImage}>Save Image</Button>
        </div>
      )}
    </div>
  );
};

export default CameraTesting;

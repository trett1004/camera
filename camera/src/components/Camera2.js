import React, { useRef } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
};

const Camera2 = () => {

    console.log('Camera running');
    const webcamRef = React.useRef(null);
    const [imgSrc, setImgSrc] = React.useState(null);

    // console.log('imgSrc', imgSrc);
    const capture = React.useCallback(() => {
      const imageSrc = webcamRef.current.getScreenshot();
      setImgSrc(imageSrc);
      saveImage(imageSrc);
    }, [webcamRef, setImgSrc]);

      const saveImage = async (imgSrc) => {
        try {
          const response = await fetch("/api/upload", {
            method: "POST",
            body: JSON.stringify({ image: imgSrc }),
            headers: {
              "Content-Type": "application/json",
            },
        });
        console.log('response', response);

          if (response.ok) {
            console.log("Image saved successfully");
          } else {
            console.error("Image could not be saved");
          }
        } catch (error) {
          console.error("Error saving image:", error);
        }
      };

    return (
        <Webcam
            audio={false}
            height={300}
            screenshotFormat="image/jpeg"
            width={400}
            videoConstraints={videoConstraints}
        >
            {({ getScreenshot }) => (
                <button
                    onClick={() => {
                        const imageSrc = getScreenshot()
                    }}
                >
                    Capture photo
                </button>
            )}
        </Webcam>
    );

}

export default Camera2;
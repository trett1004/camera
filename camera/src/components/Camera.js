import React, {useRef} from "react";
import Webcam from "react-webcam";
import axios from 'axios';



const Camera = () => {
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
          const response = await fetch("http://localhost:3020/api/upload", {
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
      <>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
        />
        <button onClick={capture}>Capture photo</button>
        {imgSrc && (
          <img
            src={imgSrc}
          />
        )}
      </>
    );
  };
  


  export default Camera;
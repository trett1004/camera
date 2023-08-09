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
      if (imageSrc.startsWith("data:image/jpeg;base64,")) {
        const imageBase64 = imageSrc.split(",")[1]; // convert the image to base64 (format for transmitting img in network)
        setImgSrc(imageSrc);
        saveImage(imageBase64);
        console.log('worked');
      } else {
        console.log('not worked');
      }
    }, [webcamRef, setImgSrc]);


      // post image to server
      const saveImage = async (imageBase64) => {
        try {
          const response = await fetch("http://localhost:3020/api/upload", {
            method: "POST",
            // body: JSON.stringify({ image: imgSrc }),
            headers: {
              "Content-Type": "text/plain",
              "Content-Length": imageBase64.length.toString(),
            },
            body: imageBase64
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
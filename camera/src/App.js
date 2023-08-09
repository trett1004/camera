
import './App.css';
import React from "react";
import Webcam from "react-webcam";
import WebcamCapture from "./components/AllCameras";
import Camera from "./components/Camera.js";
import Camera2 from "./components/Camera2.js";



function App() {
  return (
    <div>
      <h1>Hello</h1>
      {/* <WebcamCapture /> */}
      <Camera />
    </div>
  );
}

export default App;

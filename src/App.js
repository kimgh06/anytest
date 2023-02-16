import React, { useEffect } from "react";
import './App.scss';

function App() {
  const init = () => {
    const video = document.querySelector('.Elements');
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: true, video: { width: { min: 3840 }, height: { min: 2160 } } })
        .then(function (stream) {
          video.srcObject = stream;
        })
        .catch(function (e) {
          console.log("Something went wrong!");
        });
    }
  }
  useEffect(() => {
    init();
  }, [])
  return <div className="container">
    <video autoPlay='true' className="Elements">

    </video>
    <textarea id="w3review" name="w3review" rows="4" cols="50">

    </textarea>
  </div>;
}

export default App;

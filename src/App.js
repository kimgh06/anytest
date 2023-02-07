import React, { useEffect } from "react";
import './App.scss';

function App() {
  const init = () => {
    const video = document.querySelector('.Elements');
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
          video.srcObject = stream;
        })
        .catch(function (err0r) {
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
  </div>;
}

export default App;

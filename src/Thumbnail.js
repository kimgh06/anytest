import React, { useState, useEffect } from "react";
import './Thumbnail.scss';

function Thumbnail() {
  const [id, setId] = useState([]);
  useEffect(() => {
    setId(['h4afwqrOeaw', "6okHyCLorj4"]);
  }, []);
  return <div className="thumbnail">
    {id.map((id, n) => {
      return <div key={n} className={`box ${n + 1}`}>
        <a href={`http://youtu.be/${id}`} target="_blank">
          <img src={`https://img.youtube.com/vi/${id}/0.jpg`} alt="Thumbnail" />
        </a>
      </div>;
    }
    )}
  </div>;
}

export default Thumbnail;
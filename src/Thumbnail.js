import React, { useState, useEffect } from "react";
import './Thumbnail.scss';

function Thumbnail() {
  const [id, setId] = useState([]);
  useEffect(() => {
    setId(['h4afwqrOeaw', "6okHyCLorj4"]);
  }, []);
  return <div className="thumbnail">
    {id.map((id, n) => {
      return <Boxes key={n} id={id} n={n} />
    }
    )}
  </div>;
}

function Boxes({ id, n }) {
  const [data, setData] = useState([]);
  const parsing = async () => {
    const url = `https://noembed.com/embed?url=https://www.youtube.com/watch?v=${id}`;
    const data = await (await fetch(url)).json();
    setData(data);
    console.log(data);
  }
  useEffect(() => {
    parsing();
  }, [])
  return <div className={`box ${n + 1}`}>
    <a href={`http://youtu.be/${id}`} target="_blank" rel="noreferrer">
      <img src={`https://img.youtube.com/vi/${id}/0.jpg`} alt="Thumbnail" />
      {data.title}
    </a>
  </div>;
}

export default Thumbnail;
import React, { useState, useEffect } from "react";
import './Thumbnail.scss';

function Thumbnail() {
  const [id, setId] = useState([]);
  useEffect(() => {
    setId(['h4afwqrOeaw', "6okHyCLorj4"]);
  }, []);
  return <div className="thumbnail">
    <h1>Thumbnail test</h1>
    {id.map((id, n) => <Boxes key={n} id={id} n={n} />)}
  </div>;
}

function Boxes({ id, n }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    parsing();
  }, []);
  const parsing = async () => {
    const url = `https://noembed.com/embed?url=https://www.youtube.com/watch?v=${id}`;
    const data = await (await fetch(url)).json();
    setData(data);
    console.log(data);
  }
  return <div className={`box ${n + 1}`}>
    <a href={`http://youtu.be/${id}`} target="_blank" rel="noreferrer">
      <img src={`https://img.youtube.com/vi/${id}/0.jpg`} alt="Thumbnail" />
    </a>
    <b>{data.title}</b>
  </div>;
}

export default Thumbnail;
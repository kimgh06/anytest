import React, { useState, useEffect } from "react";
import './Thumbnail.scss';

function Thumbnail() {
  const [id, setId] = useState([]);
  useEffect(() => {
    let data = ['https://www.youtube.com/watch?v=h4afwqrOeaw', "https://www.youtube.com/watch?v=6okHyCLorj4", "https://www.youtube.com/watch?v=aww8FQltBgc"];
    for (let i = 0; i < data.length; i++) {
      data[i] = data[i].slice(-11);
    }
    setId(data);
  }, []);
  return <div className="thumbnail">
    <h1>Thumbnail test</h1>
    <div className="boxes">
      {id.map((id, n) => <Boxes key={n} id={id} n={n} />)}
    </div>
  </div>;
}

function Boxes({ id, n }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    parsing();
    // eslint-disable-next-line
  }, []);
  const parsing = async () => {
    const URL_info = `https://noembed.com/embed?url=https://www.youtube.com/watch?v=${id}`;
    const data = await (await fetch(URL_info)).json();
    setData(data);
  }
  return <div className={`box ${n + 1}`}>
    <a href={`http://youtu.be/${id}`} target="_blank" rel="noreferrer">
      <img src={`https://img.youtube.com/vi/${id}/0.jpg`} alt="Thumbnail" />
    </a>
    <p><b>{data.title}</b></p>
  </div>;
}

export default Thumbnail;
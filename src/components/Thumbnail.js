import React, { useState, useEffect } from "react";
import './Thumbnail.scss';

function Thumbnail() {
  const [id, setId] = useState([]);
  useEffect(() => {
    let data = ['https://www.youtube.com/watch?v=h4afwqrOeaw',
      "https://www.youtube.com/watch?v=6okHyCLorj4",
      "https://www.youtube.com/watch?v=aww8FQltBgc",
      "https://www.youtube.com/watch?v=64wI6gc1Gv0",
      "https://www.youtube.com/watch?v=wwdOu__Uba4"];
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
    const URL_info = `https://noembed.com/embed?url=http://youtu.be/${id}`;
    const data = await (await fetch(URL_info)).json();
    setData(data);
    console.log(data);
  }
  return <div className={`box ${n + 1}`} onClick={() => { window.open(`http://youtu.be/${id}`) }} title={'Go To watch'}>
    <div className="image">
      <img src={data.thumbnail_url} alt="Thumbnail" />
    </div>
    <p>&nbsp;<b>{data.title}</b></p>
  </div>;
}

export default Thumbnail;
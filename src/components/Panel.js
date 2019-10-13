import React from "react";

import "./Panel.css";

const Panel = ({ sound, isPlaying, clickHandler }) => (
  <div className="Panel" onClick={clickHandler}>
    <div className="picture">
      <img src={`${process.env.PUBLIC_URL}/resources/${sound}.png`} alt={sound} />
    </div>
    <figure className={`statusLight ${isPlaying ? "on" : "off"}`}></figure>
  </div>
);

export default Panel;

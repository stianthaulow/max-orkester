import React from "react";

import "./Panel.css";

const Panel = ({ sound, isPlaying, clickHandler }) => (
  <div className="Panel" onClick={clickHandler}>
    <div className="picture">
      <img src={`/resources/${sound}.png`} alt={sound} />
    </div>
    <figure className={`statusLight ${isPlaying ? "on" : "off"}`}></figure>
  </div>
);

export default Panel;

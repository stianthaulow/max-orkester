import React from "react";

import "./PlayPause.css";

const Pause = () => (
  <svg viewBox="0 0 60 60">
    <polygon points="10,0 25,0 25,60 10,60" />
    <polygon points="35,0 50,0 50,60 35,60" />
  </svg>
);

const Play = () => (
  <svg viewBox="0 0 60 60">
    <polygon points="10,0 60,30 10,60" />
  </svg>
);

const PlayPause = ({ isPlaying, clickHandler }) => (
  <div className="PlayPause" onClick={clickHandler}>
    {isPlaying ? <Pause /> : <Play />}
  </div>
);

export default PlayPause;

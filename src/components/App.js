import React, { useState, useEffect } from "react";
import useEventListener from "@use-it/event-listener";
import Panel from "./Panel";
import PlayPause from "./PlayPause";

import "./App.css";

const audioContext = new AudioContext();

const soundsToLoad = ["trommer", "sang", "gitar", "dj", "bass", "ooh"];

const loadSound = async name => {
  const response = await fetch(`${process.env.PUBLIC_URL}/resources/${name}.mp3`);
  const arrayBuffer = await response.arrayBuffer();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  return { name, audioBuffer };
};

const playSound = sound => {
  if (sound.isPlaying) return sound;
  const source = audioContext.createBufferSource();
  source.buffer = sound.audioBuffer;
  source.loop = true;
  source.connect(audioContext.destination);
  source.start();
  return { ...sound, source, isPlaying: true };
};

const stopSound = sound => {
  if (sound.source) {
    sound.source.stop();
  }
  return { ...sound, isPlaying: false, source: undefined };
};

const App = () => {
  const [sounds, setSounds] = useState([]);

  const loadSounds = async () => setSounds(await Promise.all(soundsToLoad.map(name => loadSound(name))));

  useEffect(() => {
    loadSounds();
  }, []);

  const toggleSound = sound => {
    setSounds(
      sounds.map(s => {
        if (sound.name === s.name) {
          return sound.isPlaying ? stopSound(sound) : playSound(sound);
        }
        return s;
      })
    );
  };

  const playAll = () => setSounds(sounds.map(s => playSound(s)));
  const stopAll = () => setSounds(sounds.map(s => stopSound(s)));

  const isPlaying = () => !!sounds.filter(s => s.isPlaying).length;

  const toggleAll = () => (isPlaying() ? stopAll() : playAll());

  useEventListener("keydown", event => {
    switch (event.code) {
      case "Space":
        event.preventDefault();
        toggleAll();
        break;
      case "Escape":
        stopAll();
        break;
      default:
        break;
    }
  });

  return (
    <div className="App">
      <h1>Max orkester</h1>
      <div className="panels">
        {sounds.map(s => (
          <Panel key={s.name} sound={s.name} isPlaying={s.isPlaying} clickHandler={() => toggleSound(s)} />
        ))}
      </div>
      <PlayPause isPlaying={isPlaying()} clickHandler={() => toggleAll()} />
    </div>
  );
};

export default App;

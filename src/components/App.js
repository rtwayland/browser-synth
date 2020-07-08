import React, { useContext } from 'react';
import { store } from '../store';
import { soundTypes } from '../constants';
import Duration from './Duration';
import Octave from './Octave';
import Keyboard from './Keyboard';
import SoundTypes from './SoundTypes';
import useKeyDown from '../hooks/useKeyDown';

const App = () => {
  const { soundType: type, duration } = useContext(store);
  let audio = new AudioContext();
  let osc = null;
  let gain = null;

  const play = (frequency = 440) => {
    osc = audio.createOscillator();
    gain = audio.createGain();

    osc.type = soundTypes[type];
    osc.connect(gain);

    osc.frequency.setValueAtTime(frequency, audio.currentTime);

    gain.connect(audio.destination);
    osc.start(0);

    gain.gain.exponentialRampToValueAtTime(
      0.00001,
      audio.currentTime + duration
    );
  };

  useKeyDown(({ key }) => {
    if (key === 'Escape' && audio) {
      audio.close();
      audio = new AudioContext();
    }
  });

  return (
    <div>
      <Octave />
      <Duration />
      <SoundTypes />
      <Keyboard playNote={play} />
    </div>
  );
};

export default App;

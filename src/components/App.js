import React, { useContext, useRef } from 'react';
import { Button, Container } from 'semantic-ui-react';
import * as Tone from 'tone';
import { store } from '../store';
import Octave from './Octave';
import Keyboard from './Keyboard';
import SoundTypes from './SoundTypes';
import useKeyDown from '../hooks/useKeyDown';
import Patterns from './Patterns';
import { ADD_NOTE_TO_ARP } from '../types';

const App = () => {
  const { arpMode, soundType: instrument, dispatch } = useContext(store);
  const activeSynthsRef = useRef({});

  const init = async () => {
    await Tone.start();
  };

  const removeSynth = (id) => {
    const { current: activeSynths } = activeSynthsRef;
    const synth = activeSynths[id];
    if (synth) {
      synth.dispose();
      delete activeSynthsRef.current[id];
    }
  };

  const addSynth = (id, newSynth) => {
    const { current: activeSynths } = activeSynthsRef;
    const oldSynth = activeSynths[id];
    if (oldSynth) removeSynth(id);
    activeSynths[id] = newSynth;
  };

  const play = (note, playing = true, fromMouse = false) => {
    if (arpMode) {
      if (playing) dispatch({ type: ADD_NOTE_TO_ARP, payload: note });
    } else if (fromMouse) {
      const synth = new Tone[instrument]().toDestination();
      synth.triggerAttackRelease(note, '8n');
    } else {
      const { current: activeSynths } = activeSynthsRef;
      if (playing) {
        const synth = new Tone[instrument]().toDestination();
        synth.triggerAttack(note);
        addSynth(note, synth);
      } else {
        const synth = activeSynths[note];
        if (synth) synth.triggerRelease();
        removeSynth(note);
      }
    }
  };

  const clearSynths = () => {
    const active = activeSynthsRef.current;
    const synths = Object.keys(active);
    synths.forEach((id) => {
      removeSynth(id);
    });
  };

  useKeyDown(({ key }) => {
    if (key === 'Escape') {
      clearSynths();
      // clearPatterns();
    }
  });

  return (
    <Container style={{ paddingTop: 50 }}>
      <Button type="button" onClick={init} content="Init" />
      <Button type="button" onClick={clearSynths} content="Clear Synths" />
      <SoundTypes />
      <Patterns />
      <Keyboard playNote={play} />
      <Octave />
    </Container>
  );
};

export default App;

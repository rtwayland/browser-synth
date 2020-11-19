import React, { useContext, useState } from 'react';
import { Button } from 'semantic-ui-react';
import * as Tone from 'tone';
import { v4 as uuid } from 'uuid';
import { store } from '../store';
import { RESET_ARP_ARRAY, SET_ARP_MODE } from '../types';

const Patterns = () => {
  const { arpMode, arpArray, soundType: instrument, dispatch } = useContext(
    store
  );
  const [activePatterns, setActivePatterns] = useState([]);

  const removePattern = ({ id, pattern }) => {
    if (id) {
      pattern.dispose();
      const patterns = activePatterns.filter(
        (activePattern) => activePattern.id !== id
      );
      setActivePatterns(patterns);
    }
  };

  const addPattern = (newPattern) => {
    const patterns = [newPattern, ...activePatterns];
    setActivePatterns(patterns);
  };

  const handlePlayPause = (patternOb) => {
    const { id, pattern, playing = true } = patternOb;
    if (playing) pattern.stop();
    else pattern.start();
    const updatedPattern = { ...patternOb, playing: !playing };
    const updatedPatterns = activePatterns.map((activePattern) => {
      if (activePattern.id === id) return updatedPattern;
      return activePattern;
    });
    setActivePatterns(updatedPatterns);
  };

  const clearPatterns = () => {
    activePatterns.forEach((pattern) => {
      removePattern(pattern);
    });
  };

  const startArp = () => {
    if (arpArray.length) {
      const notes = [...arpArray];
      const loopStyle = 'upDown';
      dispatch({ type: SET_ARP_MODE, payload: false });
      dispatch({ type: RESET_ARP_ARRAY });
      const synth = new Tone[instrument]().toDestination();
      const id = uuid();
      const pattern = new Tone.Pattern(
        (time, note) => {
          synth.triggerAttackRelease(note, 0.1);
        },
        notes,
        loopStyle
      );
      pattern.start(0);
      Tone.Transport.bpm.value = 200;
      Tone.Transport.start();
      addPattern({ id, pattern, notes, playing: true });
    }
  };

  return (
    <>
      <h2>Patterns</h2>
      <Button onClick={clearPatterns} icon="refresh" />
      <Button
        primary
        onClick={() => dispatch({ type: SET_ARP_MODE, payload: true })}
        icon="plus"
      />
      {arpMode && (
        <>
          <h3>New Arpeggio</h3>
          <div>
            {arpArray.map((note) => {
              const key = uuid();
              return <Button key={key} content={note} />;
            })}
            {arpArray.length ? (
              <Button onClick={startArp} content="Start" />
            ) : (
              <div>Selct notes from the keyboard below</div>
            )}
          </div>
        </>
      )}
      <h3>Active Patterns</h3>
      {activePatterns.map((activePattern, i) => {
        const { id, notes, playing } = activePattern;
        return (
          <div key={id} style={{ margin: '10px 0' }}>
            {notes.map((note) => (
              <Button key={`${id}${note}${i + 1}`} content={note} />
            ))}
            <Button
              onClick={() => handlePlayPause(activePattern)}
              icon={playing ? 'pause' : 'play'}
            />
            <Button onClick={() => removePattern(activePattern)} icon="close" />
          </div>
        );
      })}
    </>
  );
};

export default Patterns;

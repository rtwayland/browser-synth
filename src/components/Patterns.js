import React, { useContext, useState } from 'react';
import * as Tone from 'tone';
import { Button, Checkbox } from 'semantic-ui-react';
import { store } from '../store';
import { RESET_ARP_ARRAY, SET_ARP_MODE, TOGGLE_ARP_MODE } from '../types';

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

  const handleActivePatternNote = (id, note) => {
    const { [id]: patternOb } = activePatterns;
    const updatedPattern = { ...patternOb, activeNote: note };
    const updatedPatterns = { ...activePatterns, [id]: updatedPattern };
    setActivePatterns(updatedPatterns);
  };

  const clearPatterns = () => {
    // const patterns = Object.keys(activePatterns);
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
      const id = arpArray.join(' ');
      const pattern = new Tone.Pattern(
        (time, note) => {
          // handleActivePatternNote(id, _note);
          synth.triggerAttackRelease(note, 0.1);
        },
        notes,
        loopStyle
      );
      pattern.start(0);
      Tone.Transport.bpm.value = 200;
      Tone.Transport.start();
      addPattern({ id, pattern, playing: true });
    }
  };

  return (
    <>
      <h2>Patterns</h2>
      <Button type="button" onClick={clearPatterns} content="Clear Patterns" />
      <Checkbox
        toggle
        checked={arpMode}
        onChange={() => dispatch({ type: TOGGLE_ARP_MODE })}
      />
      {arpMode && (
        <>
          <h3>Array</h3>
          <div>
            {arpArray.map((note) => {
              return <Button key={note} content={note} />;
            })}
            <Button type="button" onClick={startArp} content="Start" />
          </div>
        </>
      )}
      {activePatterns.map((activePattern) => {
        const { id, activeNote, playing } = activePattern;
        const notes = id.split(' ');
        return (
          <div key={id}>
            {notes.map((note) => (
              <Button
                key={`${id}${note}`}
                content={note}
                active={note === activeNote}
              />
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

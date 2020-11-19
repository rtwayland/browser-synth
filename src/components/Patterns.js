import React, { useState } from 'react';
import * as Tone from 'tone';
import { Button, Checkbox } from 'semantic-ui-react';

const Patterns = ({
  arpArray,
  setArpMode,
  setArpArray,
  instrument,
  arpMode,
}) => {
  const [activePatterns, setActivePatterns] = useState({});
  const removePattern = (id) => {
    const pattern = activePatterns[id];
    if (pattern) {
      pattern.pattern.dispose();
      const copy = { ...activePatterns };
      delete copy[id];
      setActivePatterns(copy);
    }
  };

  const addPattern = (id, newPattern) => {
    const oldPattern = activePatterns[id];
    if (oldPattern) removePattern(id);
    const copy = { ...activePatterns };
    copy[id] = { pattern: newPattern, playing: true };
    setActivePatterns(copy);
  };

  const handlePlayPause = (id) => {
    const { [id]: patternOb } = activePatterns;
    const { pattern, playing = true } = patternOb;
    if (playing) pattern.stop();
    else pattern.start();
    const updatedPattern = { ...patternOb, playing: !playing };
    const updatedPatterns = { ...activePatterns, [id]: updatedPattern };
    setActivePatterns(updatedPatterns);
  };

  const handleActivePatternNote = (id, note) => {
    const { [id]: patternOb } = activePatterns;
    const updatedPattern = { ...patternOb, activeNote: note };
    const updatedPatterns = { ...activePatterns, [id]: updatedPattern };
    setActivePatterns(updatedPatterns);
  };
  const clearPatterns = () => {
    const patterns = Object.keys(activePatterns);
    patterns.forEach((id) => {
      removePattern(id);
    });
  };
  const startArp = () => {
    if (arpArray.length) {
      setArpMode(false);
      setArpArray([]);
      const synth = new Tone[instrument]().toDestination();
      const id = arpArray.join(' ');
      const pattern = new Tone.Pattern(
        (time, _note) => {
          // handleActivePatternNote(id, _note);
          synth.triggerAttackRelease(_note, 0.1);
        },
        arpArray,
        'upDown'
      );
      pattern.start(0);
      Tone.Transport.bpm.value = 200;
      Tone.Transport.start();
      // activePatternsRef.current[id] = pattern;
      addPattern(id, pattern);
    }
  };
  return (
    <>
      <Button type="button" onClick={clearPatterns} content="Clear Patterns" />
      <Checkbox
        toggle
        checked={arpMode}
        onChange={() => setArpMode(!arpMode)}
      />
      <Button type="button" onClick={startArp} content="Start Arp" />
      <h2>Active Patterns</h2>
      {Object.keys(activePatterns).map((patternId) => {
        const notes = patternId.split(' ');
        const { activeNote, playing } = activePatterns[patternId];
        return (
          <div key={patternId}>
            {notes.map((note) => (
              <Button
                key={`${patternId}${note}`}
                content={note}
                active={note === activeNote}
              />
            ))}
            <Button
              onClick={() => handlePlayPause(patternId)}
              icon={playing ? 'pause' : 'play'}
            />
            <Button onClick={() => removePattern(patternId)} icon="close" />
          </div>
        );
      })}
    </>
  );
};

export default Patterns;

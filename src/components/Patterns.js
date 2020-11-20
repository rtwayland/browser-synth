import styled from '@emotion/styled';
import React, { useContext, useState } from 'react';
import { Button, Label } from 'semantic-ui-react';
import * as Tone from 'tone';
import { v4 as uuid } from 'uuid';
import { store } from '../store';
import { RESET_ARP_ARRAY, SET_ARP_MODE } from '../types';

const MIN = 10;
const MAX = 500;
const INC = 10;

const Patterns = () => {
  const { arpMode, arpArray, soundType: instrument, dispatch } = useContext(
    store
  );
  const [activePatterns, setActivePatterns] = useState([]);
  const [patternSpeed, setPatternSpeed] = useState(200);

  const handleSpeed = ({ target }) => {
    const speed = parseFloat(target.value);
    setPatternSpeed(speed);
  };

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
    setActivePatterns([]);
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
      Tone.Transport.bpm.value = patternSpeed;
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
      <DurationContainer>
        <Label size="big">
          Arpeggio Speed:
          <Label.Detail>{patternSpeed}</Label.Detail>
        </Label>
        <SliderContainer>
          <input
            type="range"
            value={patternSpeed}
            min={MIN}
            max={MAX}
            step={INC}
            onChange={handleSpeed}
            style={{ width: 450 }}
          />
        </SliderContainer>
      </DurationContainer>
      {arpMode && (
        <>
          <h3>New Arpeggio</h3>
          <div>
            {arpArray.map((note) => (
              <Button key={uuid()} content={note} />
            ))}
            {arpArray.length ? (
              <>
                <Button primary onClick={startArp} content="Start" />
                <Button
                  negative
                  onClick={() => dispatch({ type: RESET_ARP_ARRAY })}
                  icon="close"
                />
              </>
            ) : (
              <div>Selct notes from the keyboard below</div>
            )}
          </div>
        </>
      )}
      {activePatterns.length ? <h3>Active Patterns</h3> : null}
      {activePatterns.map((activePattern) => {
        const { id, notes, playing } = activePattern;
        return (
          <div key={id} style={{ margin: '10px 0' }}>
            {notes.map((note) => (
              <Button key={uuid()} content={note} />
            ))}
            <Button
              primary
              onClick={() => handlePlayPause(activePattern)}
              icon={playing ? 'pause' : 'play'}
            />
            <Button
              negative
              onClick={() => removePattern(activePattern)}
              icon="close"
            />
          </div>
        );
      })}
    </>
  );
};

const DurationContainer = styled.div({
  marginTop: 15,
});

const SliderContainer = styled.div({
  marginTop: 15,
});

export default Patterns;

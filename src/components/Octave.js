import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { Button } from 'semantic-ui-react';
import { store } from '../store';
import { notes } from '../constants';
import { UPDATE_OCTAVE } from '../types';
import useKeyDown from '../hooks/useKeyDown';
import useKeyUp from '../hooks/useKeyUp';

const Octave = () => {
  const { octave, dispatch } = useContext(store);

  const handleDecrement = () => {
    if (octave > 0) dispatch({ type: UPDATE_OCTAVE, payload: octave - 1 });
  };
  const handleIncrement = () => {
    if (octave < 8) dispatch({ type: UPDATE_OCTAVE, payload: octave + 1 });
  };
  const setOctave = (value) => {
    dispatch({ type: UPDATE_OCTAVE, payload: value });
  };

  const handleKeyDown = ({ key }) => {
    switch (key) {
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        setOctave(key - 1);
        break;
      case 'ArrowLeft':
      case 'Alt':
        handleDecrement();
        break;
      case 'ArrowRight':
      case 'Shift':
        handleIncrement();
        break;
      default:
        break;
    }
  };

  const handleKeyUp = ({ key }) => {
    switch (key) {
      case 'Alt':
        handleIncrement();
        break;
      case 'Shift':
        handleDecrement();
        break;
      default:
        break;
    }
  };

  useKeyDown(handleKeyDown);
  useKeyUp(handleKeyUp);

  return (
    <>
      <h2>Octaves</h2>
      <OctaveContainer>
        <Button icon="left arrow" onClick={handleDecrement} />
        {Object.values(notes)[0].map((oct, i) => (
          <Button
            key={oct}
            content={i + 1}
            primary={octave === i}
            onClick={() => setOctave(i)}
          />
        ))}
        <Button icon="right arrow" onClick={handleIncrement} />
      </OctaveContainer>
    </>
  );
};

const OctaveContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
});

export default Octave;

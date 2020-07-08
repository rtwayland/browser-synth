import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { Label } from 'semantic-ui-react';
import { store } from '../store';
import { UPDATE_DURATION } from '../types';
import useKeyDown from '../hooks/useKeyDown';

const Duration = () => {
  const { duration, dispatch } = useContext(store);

  const handleChange = ({ target }) => {
    const newDuration = parseFloat(target.value);
    dispatch({ type: UPDATE_DURATION, payload: newDuration });
  };

  const handleKeyDown = ({ key }) => {
    switch (key) {
      case '+':
      case 'ArrowUp': {
        const val = duration + 0.5;
        if (val < 20) dispatch({ type: UPDATE_DURATION, payload: val });
        break;
      }
      case '-':
      case 'ArrowDown': {
        const val = duration - 0.5;
        if (val > 0) dispatch({ type: UPDATE_DURATION, payload: val });
        break;
      }
      default:
        break;
    }
  };
  useKeyDown(handleKeyDown);

  return (
    <>
      <h2>Note Length</h2>
      <DurationContainer>
        <Label size="big">
          Duration:
          <Label.Detail>{duration}</Label.Detail>
        </Label>
        <input
          type="range"
          value={duration}
          min={0.1}
          max={20}
          step={0.1}
          onChange={handleChange}
        />
      </DurationContainer>
    </>
  );
};

const DurationContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
});

export default Duration;

import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { Label } from 'semantic-ui-react';
import { store } from '../store';
import { UPDATE_DURATION } from '../types';
import useKeyDown from '../hooks/useKeyDown';

const MAX = 40;
const MIN = 0.1;
const INC = 0.5;

const Duration = () => {
  const { duration, dispatch } = useContext(store);

  const setDuration = (value) => {
    dispatch({ type: UPDATE_DURATION, payload: value });
  };

  const handleChange = ({ target }) => {
    const newDuration = parseFloat(target.value);
    setDuration(newDuration);
  };

  const handleKeyDown = ({ key }) => {
    switch (key) {
      case '+':
      case 'ArrowUp': {
        const val = duration + INC;
        if (val < MAX) setDuration(val);
        break;
      }
      case '-':
      case 'ArrowDown': {
        const val = duration - INC;
        if (val > MIN) setDuration(val);
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
        <SliderContainer>
          <input
            type="range"
            value={duration}
            min={MIN}
            max={MAX}
            step={INC}
            onChange={handleChange}
            style={{ width: 450 }}
          />
        </SliderContainer>
      </DurationContainer>
    </>
  );
};

const DurationContainer = styled.div({
  // display: 'flex',
  // alignItems: 'center',
});

const SliderContainer = styled.div({
  marginTop: 15,
});

export default Duration;

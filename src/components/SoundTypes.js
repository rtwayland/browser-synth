import React, { useContext } from 'react';
import { Button } from 'semantic-ui-react';
import { store } from '../store';
import { UPDATE_SOUND_TYPE } from '../types';

const Duration = () => {
  const { soundType, dispatch } = useContext(store);
  const handleTypeChange = (type) => {
    dispatch({ type: UPDATE_SOUND_TYPE, payload: type });
  };
  return (
    <>
      <h2>Sound Types</h2>
      <div>
        <Button
          type="button"
          primary={soundType === 0}
          onClick={() => handleTypeChange(0)}
        >
          Sine
        </Button>
        <Button
          type="button"
          primary={soundType === 1}
          onClick={() => handleTypeChange(1)}
        >
          Triangle
        </Button>
        <Button
          type="button"
          primary={soundType === 2}
          onClick={() => handleTypeChange(2)}
        >
          Square
        </Button>
        <Button
          type="button"
          primary={soundType === 3}
          onClick={() => handleTypeChange(3)}
        >
          Sawtooth
        </Button>
      </div>
    </>
  );
};

export default Duration;

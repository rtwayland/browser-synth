import React, { useContext } from 'react';
import { Button } from 'semantic-ui-react';
import { soundTypes } from '../constants';
import { store } from '../store';
import { UPDATE_SOUND_TYPE } from '../types';

const SoundTypes = () => {
  const { soundType, dispatch } = useContext(store);
  const handleTypeChange = (type) => {
    dispatch({ type: UPDATE_SOUND_TYPE, payload: type });
  };
  return (
    <>
      <h2>Sound Types</h2>
      <div>
        {soundTypes.map((type, i) => (
          <Button
            key={type}
            type="button"
            primary={soundType === soundTypes[i]}
            onClick={() => handleTypeChange(type)}
          >
            {type}
          </Button>
        ))}
      </div>
    </>
  );
};

export default SoundTypes;

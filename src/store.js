import React, { createContext, useReducer } from 'react';
import { UPDATE_DURATION, UPDATE_OCTAVE, UPDATE_SOUND_TYPE } from './types';

const initialState = {
  soundType: 0,
  octave: 4,
  duration: 0.8,
};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [storeState, dispatch] = useReducer((state, action) => {
    const { type, payload } = action;
    switch (type) {
      case UPDATE_DURATION: {
        const fixed = payload.toFixed(2);
        const newDuration = parseFloat(fixed);
        return { ...state, duration: newDuration };
      }
      case UPDATE_OCTAVE:
        return { ...state, octave: payload };
      case UPDATE_SOUND_TYPE:
        return { ...state, soundType: payload };
      default:
        return state;
    }
  }, initialState);

  return <Provider value={{ ...storeState, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };

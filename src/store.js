import React, { createContext, useReducer } from 'react';
import {
  UPDATE_DURATION,
  UPDATE_OCTAVE,
  UPDATE_SOUND_TYPE,
  ADD_PLAYING_KEY,
  REMOVE_PLAYING_KEY,
} from './types';

const initialState = {
  soundType: 0,
  octave: 4,
  duration: 1,
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
      case ADD_PLAYING_KEY: {
        const keys = [...state.playingKeys, payload];
        return { ...state, playingKeys: keys };
      }
      case REMOVE_PLAYING_KEY: {
        const keys = state.playingKeys.filter((key) => key !== payload);
        return { ...state, playingKeys: keys };
      }
      default:
        return state;
    }
  }, initialState);

  return <Provider value={{ ...storeState, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };

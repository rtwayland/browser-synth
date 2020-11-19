import React, { createContext, useReducer } from 'react';
import {
  UPDATE_DURATION,
  UPDATE_OCTAVE,
  UPDATE_SOUND_TYPE,
  SET_ARP_MODE,
  TOGGLE_ARP_MODE,
  ADD_NOTE_TO_ARP,
  RESET_ARP_ARRAY,
} from './types';

const initialState = {
  arpMode: false,
  arpArray: [],
  soundType: 'Synth',
  octave: 4,
  duration: 0.5,
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
      case SET_ARP_MODE:
        return { ...state, arpMode: payload };
      case TOGGLE_ARP_MODE:
        return { ...state, arpMode: !state.arpMode };
      case RESET_ARP_ARRAY:
        return { ...state, arpArray: [] };
      case ADD_NOTE_TO_ARP: {
        const arpArray = [...state.arpArray, payload];
        return { ...state, arpArray };
      }
      default:
        return state;
    }
  }, initialState);

  return <Provider value={{ ...storeState, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };

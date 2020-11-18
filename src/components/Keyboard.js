import React, { useContext, useState } from 'react';
import styled from '@emotion/styled';
import { Button } from 'semantic-ui-react';
import { store } from '../store';
import { notes } from '../constants';
// import { ADD_PLAYING_KEY, REMOVE_PLAYING_KEY } from '../types';
import useKeyDown from '../hooks/useKeyDown';
import useKeyUp from '../hooks/useKeyUp';

const Keyboard = ({ playNote }) => {
  const { octave } = useContext(store);
  // const { octave, playingKeys, dispatch } = useContext(store);
  const [playingKeys, setPlayingKeys] = useState([]);

  const handleNote = (note, event, play) => {
    if (!event.repeat) {
      if (play) playNote(note);

      // const type = play ? ADD_PLAYING_KEY : REMOVE_PLAYING_KEY;
      // dispatch({ type, payload: note });

      const keys = play
        ? [...playingKeys, note]
        : playingKeys.filter((key) => key !== note);

      setPlayingKeys(keys);
    }
  };

  const handleKey = (event, play) => {
    const { key } = event;
    let note;

    switch (key) {
      case 'a':
      case 'A':
      case 'å':
        note = notes.C[octave];
        break;
      case 'w':
      case 'W':
      case '∑':
        note = notes['C#'][octave];
        break;
      case 's':
      case 'S':
      case 'ß':
        note = notes.D[octave];
        break;
      case 'e':
      case 'E':
      case '´':
        note = notes.Eb[octave];
        break;
      case 'd':
      case 'D':
      case '∂':
        note = notes.E[octave];
        break;
      case 'f':
      case 'F':
      case 'ƒ':
        note = notes.F[octave];
        break;
      case 'u':
      case 'U':
      case '¨':
        note = notes['F#'][octave];
        break;
      case 'j':
      case 'J':
      case '∆':
        note = notes.G[octave];
        break;
      case 'i':
      case 'I':
      case 'ˆ':
        note = notes['G#'][octave];
        break;
      case 'k':
      case 'K':
      case '˚':
        note = notes.A[octave];
        break;
      case 'o':
      case 'O':
      case 'ø':
        note = notes.Bb[octave];
        break;
      case 'l':
      case 'L':
      case '¬':
        note = notes.B[octave];
        break;
      case ';':
      case ':':
      case '…':
        if (octave < 8) {
          note = notes.C[octave + 1];
          break;
        } else return;
      default:
        return;
    }
    handleNote(note, event, play);
  };
  useKeyDown((event) => handleKey(event, true));
  useKeyUp((event) => handleKey(event, false));

  const styles = {
    position: 'absolute',
    bottom: 40,
    transform: 'translate(-30px)',
    margin: 0,
    width: 52,
  };

  const keys = Object.entries(notes);
  const upperC = notes.C[octave + 1];

  return (
    <>
      <h2>Keyboard</h2>
      <KeysContainer>
        {keys.map(([note, frequencies]) => {
          const frequency = frequencies[octave];
          return (
            <Button
              key={frequency}
              name={note}
              onClick={() => playNote(frequency)}
              active={playingKeys.includes(frequency)}
              style={note.length > 1 ? styles : null}
            >
              {note.length > 1 ? (
                <>
                  {note[0]}
                  <sup>{note[1]}</sup>
                </>
              ) : (
                note
              )}
            </Button>
          );
        })}
        {octave < 8 && (
          <Button
            name="C+"
            onClick={() => playNote(upperC)}
            active={playingKeys.includes(upperC)}
          >
            C
          </Button>
        )}
      </KeysContainer>
    </>
  );
};

const KeysContainer = styled.div({
  marginTop: 50,
  position: 'relative',
});

export default Keyboard;

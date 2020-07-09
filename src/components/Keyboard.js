import React, { useContext, useState } from 'react';
import styled from '@emotion/styled';
import { Button } from 'semantic-ui-react';
import { store } from '../store';
import { notes } from '../constants';
import useKeyDown from '../hooks/useKeyDown';
import useKeyUp from '../hooks/useKeyUp';

const Keyboard = ({ playNote }) => {
  const { octave } = useContext(store);
  const [playingKeys, setPlayingKeys] = useState([]);

  const handleNote = (note, event, play) => {
    if (!event.repeat) {
      if (play) playNote(note);

      const keys = play
        ? [...playingKeys, note]
        : playingKeys.filter((key) => key !== note);

      setPlayingKeys(keys);
    }
  };

  const handleKey = (event, play) => {
    const { key } = event;
    switch (key) {
      case 'a':
      case 'A':
      case 'å':
        handleNote(notes.C[octave], event, play);
        break;
      case 'w':
      case 'W':
      case '∑':
        handleNote(notes['C#'][octave], event, play);
        break;
      case 's':
      case 'S':
      case 'ß':
        handleNote(notes.D[octave], event, play);
        break;
      case 'e':
      case 'E':
      case '´':
        handleNote(notes.Eb[octave], event, play);
        break;
      case 'd':
      case 'D':
      case '∂':
        handleNote(notes.E[octave], event, play);
        break;
      case 'f':
      case 'F':
      case 'ƒ':
        handleNote(notes.F[octave], event, play);
        break;
      case 'u':
      case 'U':
      case '¨':
        handleNote(notes['F#'][octave], event, play);
        break;
      case 'j':
      case 'J':
      case '∆':
        handleNote(notes.G[octave], event, play);
        break;
      case 'i':
      case 'I':
      case 'ˆ':
        handleNote(notes['G#'][octave], event, play);
        break;
      case 'k':
      case 'K':
      case '˚':
        handleNote(notes.A[octave], event, play);
        break;
      case 'o':
      case 'O':
      case 'ø':
        handleNote(notes.Bb[octave], event, play);
        break;
      case 'l':
      case 'L':
      case '¬':
        handleNote(notes.B[octave], event, play);
        break;
      case ';':
      case ':':
      case '…':
        if (octave < 8) handleNote(notes.C[octave + 1], event, play);
        break;
      default:
        break;
    }
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

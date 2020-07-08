import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { Button } from 'semantic-ui-react';
import { store } from '../store';
import { notes } from '../constants';
import useKeyDown from '../hooks/useKeyDown';

const Keyboard = ({ playNote }) => {
  const { octave } = useContext(store);
  // const play = ({ target }) => {
  //   let note = target.name;
  //   let skip = 0;
  //   if (note.includes('+')) {
  //     note = note.replace('+', '');
  //     skip = 1;
  //   }
  //   playNote(notes[note][octave + skip]);
  // };

  // const handleKeyDown = ({ key }) => {
  const handleNote = (note, event) => {
    if (!event.repeat) playNote(note);
  };
  const handleKeyDown = (event) => {
    const { key } = event;
    switch (key) {
      case 'a':
      case 'A':
      case 'å':
        handleNote(notes.C[octave], event);
        break;
      case 'w':
      case 'W':
      case '∑':
        handleNote(notes['C#'][octave], event);
        break;
      case 's':
      case 'S':
      case 'ß':
        handleNote(notes.D[octave], event);
        break;
      case 'e':
      case 'E':
      case '´':
        handleNote(notes.Eb[octave], event);
        break;
      case 'd':
      case 'D':
      case '∂':
        handleNote(notes.E[octave], event);
        break;
      case 'f':
      case 'F':
      case 'ƒ':
        handleNote(notes.F[octave], event);
        break;
      case 'u':
      case 'U':
      case '¨':
        handleNote(notes['F#'][octave], event);
        break;
      case 'j':
      case 'J':
      case '∆':
        handleNote(notes.G[octave], event);
        break;
      case 'i':
      case 'I':
      case 'ˆ':
        handleNote(notes['G#'][octave], event);
        break;
      case 'k':
      case 'K':
      case '˚':
        handleNote(notes.A[octave], event);
        break;
      case 'o':
      case 'O':
      case 'ø':
        handleNote(notes.Bb[octave], event);
        break;
      case 'l':
      case 'L':
      case '¬':
        handleNote(notes.B[octave], event);
        break;
      case ';':
      case ':':
      case '…':
        if (octave < 8) handleNote(notes.C[octave + 1], event);
        break;
      default:
        break;
    }
  };
  useKeyDown(handleKeyDown);

  const styles = {
    position: 'absolute',
    bottom: 40,
    transform: 'translate(-30px)',
    margin: 0,
    width: 52,
  };

  const keys = Object.entries(notes);

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
          <Button name="C+" onClick={() => playNote(notes.C[octave + 1])}>
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

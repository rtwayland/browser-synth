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
      // if (play) playNote(note);
      playNote(note, play);
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
        // note = notes.C[octave];
        note = `C${octave}`;
        break;
      case 'w':
      case 'W':
      case '∑':
        // note = notes['C#'][octave];
        note = `C#${octave}`;
        break;
      case 's':
      case 'S':
      case 'ß':
        // note = notes.D[octave];
        note = `D${octave}`;
        break;
      case 'e':
      case 'E':
      case '´':
        // note = notes.Eb[octave];
        note = `Eb${octave}`;
        break;
      case 'd':
      case 'D':
      case '∂':
        // note = notes.E[octave];
        note = `E${octave}`;
        break;
      case 'f':
      case 'F':
      case 'ƒ':
        // note = notes.F[octave];
        note = `F${octave}`;
        break;
      case 'u':
      case 'U':
      case '¨':
        // note = notes['F#'][octave];
        note = `F#${octave}`;
        break;
      case 'j':
      case 'J':
      case '∆':
        // note = notes.G[octave];
        note = `G${octave}`;
        break;
      case 'i':
      case 'I':
      case 'ˆ':
        // note = notes['G#'][octave];
        note = `G#${octave}`;
        break;
      case 'k':
      case 'K':
      case '˚':
        // note = notes.A[octave];
        note = `A${octave}`;
        break;
      case 'o':
      case 'O':
      case 'ø':
        // note = notes.Bb[octave];
        note = `Bb${octave}`;
        break;
      case 'l':
      case 'L':
      case '¬':
        // note = notes.B[octave];
        note = `B${octave}`;
        break;
      case ';':
      case ':':
      case '…':
        if (octave < 8) {
          // note = notes.C[octave + 1];
          note = `C${octave + 1}`;
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

  const keys = Object.keys(notes);
  // const upperC = notes.C[octave + 1];
  const upperC = `C${octave + 1}`;

  return (
    <>
      <h2>Keyboard</h2>
      <KeysContainer>
        {keys.map((note) => {
          const noteName = `${note}${octave}`;
          return (
            <Button
              key={noteName}
              name={note}
              onClick={() => playNote(noteName, undefined, true)}
              active={playingKeys.includes(noteName)}
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
            onClick={() => playNote(upperC, undefined, true)}
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

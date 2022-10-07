// Dependencies
import React from 'react';
// Hooks
import { useEffect, useState } from 'react';

function characterRender() {
  const [test, setTest] = useState('rien');
  useEffect(() => {
    setTimeout(() => {
      setTest('un test');
    }, 3000);
  }, []);

  return (
    <>
      <div id="character-creator">
        <h1>Character Creator</h1>
        <p>{test}</p>
      </div>
    </>
  );
}

export { characterRender };

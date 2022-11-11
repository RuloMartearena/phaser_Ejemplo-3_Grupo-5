import Phaser from 'phaser';

import { useState, useEffect } from 'react';

import Escena from './scenes/Escena';
import GameOver from './scenes/GameOver';
import Congratulations from './scenes/Congratulations';
import Preview from './scenes/Preview';

function App() {

  const [listo, setListo] = useState(false);

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      scale: {
        width: 800,
        height: 600
      },
      physics: {
        default: 'arcade',
      },
      scene: [Preview, Escena, GameOver, Congratulations]
    };

    // Arranca el juego 
    // A la variable game se le asigna un nuevo objeto de tipo phaser
    const game = new Phaser.Game(config);

    // Trigger cuando el juego esta completamente listo
    game.events.on("LISTO", setListo);

    // Se usa para que no duplique el lienzo
    return () => {
      setListo(false);
      game.destroy(true);
    }

  }, [listo]);

}

export default App;
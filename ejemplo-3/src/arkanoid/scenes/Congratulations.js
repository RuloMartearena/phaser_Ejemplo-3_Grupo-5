import Phaser from 'phaser';
import RestartButton from '../components/RestartButton';

class Congratulations extends Phaser.Scene {

    // Se usará como palabra clave para usar la escena
    constructor() {

        super({ key: 'congratulations' });
        this.restartButton = new RestartButton(this); // Crea un nuevo RestartButton

    }

    preload() {

        // Carga una imagen. Los parametros son el nombre y la direccion
        this.load.image('win', 'img/arkanoid/win.png');
        // Carga la imagen del boton pero usando la precarga del script restartButton
        this.restartButton.preload();

    }

    create() {

        // Fondo
        this.add.image(400, 300, 'fondo');
        this.restartButton.create(); // Crea el boton con los parametros del script restartButton
        this.winImage = this.add.image(740, 440, 'win');

    }

}

export default Congratulations;
import Phaser from 'phaser';
import PlayButton from '../components/PlayButton';

class Preview extends Phaser.Scene {

    constructor() {

        super({ key: 'preview' });
        this.playButton = new PlayButton(this);

    }

    preload() {

        this.load.image('portada', 'img/arkanoid/portada.png');
        this.playButton.preload();

    }

    create() {

        this.previewImage = this.add.image(400, 300, 'portada');
        this.playButton.create();

    }

}

export default Preview;
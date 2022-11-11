class PlayButton {

    constructor(scene) {

        this.relatedScene = scene;
    }

    preload() {

        // Carga la imagen que se usa como boton de play
        this.relatedScene.load.image('play', 'img/arkanoid/PlayButton.png');

    }

    create() {

        // Asigna su posicion y lo hace interactivo
        this.playButton = this.relatedScene.add.image(400, 300, 'play').setInteractive();

        this.playButton.on('pointerdown', () => {

            // Cuando se presiona cambia la escena a 'game'
            this.relatedScene.scene.start('game');

        });

    }

}

export default PlayButton;
class RestartButton {

    constructor(scene) {

        this.relatedScene = scene;
    }

    preload() {

        // Carga la imagen que se usa como boton de restart
        this.relatedScene.load.image('restart', 'img/arkanoid/restart.png');

    }

    create() {

        // Crea la imagen y la hace interactiva
        this.startButton = this.relatedScene.add.image(400, 440, 'restart').setInteractive();

        this.startButton.on('pointerdown', () => {

            // Cuando se presiona este boton cambia la escena a 'game'
            this.relatedScene.scene.start('game');
        });

    }

}

export default RestartButton;
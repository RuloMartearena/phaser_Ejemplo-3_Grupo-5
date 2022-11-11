import Phaser from 'phaser';
import Levels from '../components/Levels';

class Escena extends Phaser.Scene {

    // Se usará como palabra clave para usar la escena
    constructor() {
        super({ key: 'game' });
    }

    // Se establecen para que no tiren error por las dudas
    score = null;
    cursors = null;
    paleta = null;
    pelota = null;
    ladrillosCero = null;
    ladrillosUno = null;
    ladrillosDos = null;
    ladrillosTres = null;
    ladrillosCuatro = null;
    ladrillosCinco = null;
    currentLevel = null;
    brickImpactSample = null;
    platformImpactSample = null;
    victorySample = null;
    derrotaSample = null;

    // Esta funcion se va a ejecutar cuando la escena se cargue por primera vez y cada vez que se refresque la escena
    init() {
        this.score = 0;
    }

    // Contiene las precargas de los archivos necesarios para la escena actual
    preload() {

        // Carga una imagen. Los parametros son (nombre, direccion)
        this.load.image('fondo', 'img/arkanoid/fondo.png');
        this.load.image('pelota', 'img/arkanoid/ball.png');
        this.load.image('ladrillo0', 'img/arkanoid/brick0.png');
        this.load.image('ladrillo1', 'img/arkanoid/brick1.png');
        this.load.image('ladrillo2', 'img/arkanoid/brick2.png');
        this.load.image('ladrillo3', 'img/arkanoid/brick3.png');
        this.load.image('ladrillo4', 'img/arkanoid/brick4.png');
        this.load.image('ladrillo5', 'img/arkanoid/brick5.png');
        this.load.image('paleta', 'img/arkanoid/paddle.png');

        // Carga sonidos
        this.load.audio('brickImpact', 'sonidos/arkanoid/romper.mp3');
        this.load.audio('platformImpact', 'sonidos/arkanoid/colision.mp3');
        this.load.audio('victory', 'sonidos/arkanoid/victory.mp3');
        this.load.audio('derrota', 'sonidos/arkanoid/derrota.mp3');

    }

    // Contiene el código para ejecutar una escena
    create() {

        // Mundo
        this.physics.world.setBoundsCollision(true, true, true, false); // hace que los bordes gestionen colisiones

        // Niveles
        this.levels = new Levels(this);

        // Fondo
        this.add.image(400, 300, 'fondo');

        // Sonido
        this.brickImpactSample = this.sound.add('brickImpact');
        this.platformImpactSample = this.sound.add('platformImpact');
        this.victorySample = this.sound.add('victory');
        this.derrotaSample = this.sound.add('derrota');

        // Score
        this.scoreText = this.add.text(10, 570, 'Puntos: 0', {
            fontSize: '20px',
            fill: '#ff0',
            fontFamily: 'verdana, arial, sans-sarif'
        });

        // Paleta
        this.paleta = this.physics.add.image(400, 500, 'paleta');
        this.paleta.setBounce(1);
        this.paleta.setCollideWorldBounds(true);
        this.paleta.body.allowGravity = false;
        this.paleta.body.immovable = true; // hace a la paleta inamovible para otros elementos

        // Pelota
        this.pelota = this.physics.add.image(400, 485, 'pelota');
        this.pelota.setCollideWorldBounds(true); // hace que colisione con los bordes
        this.pelota.setBounce(1); // hace que la pelota rebote
        this.pelota.setData('glue', true);

        // Teclado
        this.cursors = this.input.keyboard.createCursorKeys();

        // Ladrillos
        this.ladrillos = this.levels.CreateLevelOne();

        // Nivel
        this.currentLevel = 1;

        // Colisiones
        this.physics.add.collider(this.pelota, this.paleta, this.platformImpact.bind(this), null);
        this.physics.add.collider(this.pelota, this.ladrillos, this.ladrillosImpact, null, this);

    }

    // Se ejectura constantemente. El código escrito estará pendiente a las acciones
    update() {

        // Mueve la paleta
        if (this.cursors.left.isDown) {
            this.paleta.setVelocityX(-500);
            if (this.pelota.getData('glue')) {
                this.pelota.setVelocityX(-500);
            }
        }
        else if (this.cursors.right.isDown) {
            this.paleta.setVelocityX(500);
            if (this.pelota.getData('glue')) {
                this.pelota.setVelocityX(500);
            }
        }
        else {
            this.paleta.setVelocityX(0);
            if (this.pelota.getData('glue')) {
                this.pelota.setVelocityX(0);
            }
        }

        // Comprueba la posicion de la pelota
        if (this.pelota.y > 600) {
            console.log('Ball cayo al vacio');
            this.showGameOver();
        }

        if (this.cursors.space.isDown) {
            if (this.pelota.getData('glue')) {
                this.pelota.setVelocity(-200, -200); // cambia la velocidad en x e y de la ball
                this.pelota.setData('glue', false);
            }
        }

        if (this.ladrillos.countActive() === 0) {
            this.currentLevel++;
            switch (this.currentLevel) {
                case 2:
                    this.ladrillos = this.levels.CreateLevelTwo(); // crea el lvl 2
                    this.physics.add.collider(this.pelota, this.ladrillos, this.ladrillosImpact, null, this);
                    this.resetBallposition(); // reestablece la posicion de la ball
                    break;
                case 3:
                    this.showCongratulations(); // escena de victoria
                    break;
                default: // caso por defecto
                    break;
            }
        }

    }

    // Impacto de la pelota con los ladrillos
    ladrillosImpact(pelota, ladrillo) {
        this.brickImpactSample.play();
        ladrillo.disableBody(true, true);
        this.score++;
        this.scoreText.setText('Puntos: ' + this.score);

    }

    // Impacto del jugador con la pelota
    platformImpact(pelota, paleta) {

        this.platformImpactSample.play();
        let relativeImpact = pelota.x - paleta.x;

        if (relativeImpact < 0.1 && relativeImpact > -0.1) {
            pelota.setVelocityX(Phaser.Math.Between(-10, 10))
        } else {
            pelota.setVelocityX(10 * relativeImpact);
        }

    }

    // Resetea la posicion de la pelota
    resetBallposition() {

        this.pelota.setData('glue', true);
        this.pelota.x = this.paleta.x;
        this.pelota.y = 485;
        this.pelota.setVelocityY(0);

    }

    // Escena de Game Over
    showGameOver() {
        this.derrotaSample.play();
        this.scene.start('gameover');
    }

    // Escena de Congratulations
    showCongratulations() {
        this.victorySample.play();
        this.scene.start('congratulations');
    }

}

export default Escena;
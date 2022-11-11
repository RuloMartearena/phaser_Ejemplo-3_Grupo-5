import Phaser from 'phaser';

class Levels extends Phaser.Scene {

    // Llaves para la creacion de ladrillos
    keys = ['ladrillo0', 'ladrillo1', 'ladrillo2', 'ladrillo3', 'ladrillo4', 'ladrillo5'];

    constructor(scene) {

        super({ key: 'levels' }); // Asigna la clave 'levels' al script
        this.relatedScene = scene;

    }

    CreateLevelOne() {

        var block = this.relatedScene.physics.add.staticGroup({
            key: this.keys,
            frameQuantity: 5, // cantidad de ladrillos
            gridAlign: {
                width: 10, // ancho de la malla
                height: 6, // alto de la malla
                cellWidth: 70, // ancho en px de la malla
                cellHeight: 40, // alto en px de la malla
                x: 100, // posicion en x de la malla
                y: 100 // posicion en y de la malla
            }
        });

        return block
    }

    CreateLevelTwo() {

        var block = this.relatedScene.physics.add.staticGroup({
            key: this.keys,
            frameQuantity: 10, // cantidad de ladrillos
            gridAlign: {
                width: 10, // ancho de la malla
                height: 6, // alto de la malla
                cellWidth: 70, // ancho en px de la malla
                cellHeight: 40, // alto en px de la malla
                x: 100, // posicion en x de la malla
                y: 100 // posicion en y de la malla
            }
        });

        return block

    }
}

export default Levels;
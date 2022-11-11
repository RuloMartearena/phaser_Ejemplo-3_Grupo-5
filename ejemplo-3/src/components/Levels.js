import Phaser from 'phaser';

class Levels extends Phaser.Scene {

    keys = ['ladrillo0', 'ladrillo1', 'ladrillo2', 'ladrillo3', 'ladrillo4', 'ladrillo5'];

    constructor(scene) {
        super({ key: 'levels' });
        this.relatedScene = scene;
    }

    CreateLevelOne() {

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

    CreateLevelTwo() {

        var block = this.relatedScene.physics.add.staticGroup();
        var ind = 1;
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < ind; j++) {
                var bloq = block.create(40 + j * 100, 50 + i * 30, this.keys[Phaser.Math.Between(0, 4)]);
            }
            ind++;
        }

        return block

    }
}

export default Levels;
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: { gravity: { y: 500 }, debug: false }
    },
    scene: { preload, create, update }
};

let player, cursors, platforms;

const game = new Phaser.Game(config);

function preload() {
    this.load.image('sky', 'https://labs.phaser.io/assets/skies/sky1.png');
    this.load.image('ground', 'https://labs.phaser.io/assets/platform.png');
    this.load.image('star', 'https://labs.phaser.io/assets/demoscene/star.png');
    this.load.image('player', 'https://labs.phaser.io/assets/sprites/phaser-dude.png');
}

function create() {
    this.add.image(400, 300, 'sky');

    platforms = this.physics.add.staticGroup();
    platforms.create(400, 580, 'ground').setScale(2).refreshBody();

    player = this.physics.add.sprite(100, 450, 'player');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    this.physics.add.collider(player, platforms);

    cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    if (cursors.left.isDown) {
        player.setVelocityX(-160);
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);
    } else {
        player.setVelocityX(0);
    }

    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-330);
    }
}

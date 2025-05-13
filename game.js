let player, cursors, platforms;
let currentForm = 'human';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 600 },
            debug: false
        }
    },
    scene: { preload, create, update }
};

const game = new Phaser.Game(config);

function preload() {
    this.load.image('sky', 'https://labs.phaser.io/assets/skies/sky1.png');
    this.load.image('ground', 'https://labs.phaser.io/assets/platform.png');
    this.load.image('human', 'https://labs.phaser.io/assets/sprites/phaser-dude.png');
    this.load.image('cube', 'https://labs.phaser.io/assets/sprites/block.png');
    this.load.image('ball', 'https://labs.phaser.io/assets/sprites/shinyball.png');
    this.load.image('bird', 'https://labs.phaser.io/assets/sprites/ufo.png'); // Used as bird
}

function create() {
    this.add.image(400, 300, 'sky');

    platforms = this.physics.add.staticGroup();
    platforms.create(400, 580, 'ground').setScale(2).refreshBody();

    player = this.physics.add.sprite(100, 450, 'human');
    player.setCollideWorldBounds(true);
    player.body.setSize(32, 48);
    this.physics.add.collider(player, platforms);

    cursors = this.input.keyboard.createCursorKeys();

    this.input.keyboard.on('keydown', (event) => {
        if (['1', '2', '3', '4'].includes(event.key)) {
            changeForm(event.key);
        }
    });
}

function changeForm(key) {
    const formMap = {
        '1': 'human',
        '2': 'cube',
        '3': 'ball',
        '4': 'bird'
    };
    currentForm = formMap[key];

    const x = player.x;
    const y = player.y;
    player.destroy();

    player = game.scene.scenes[0].physics.add.sprite(x, y, currentForm);
    player.setCollideWorldBounds(true);
    game.scene.scenes[0].physics.add.collider(player, platforms);

    if (currentForm === 'ball') {
        player.setBounce(1);
    } else {
        player.setBounce(0.2);
    }

    if (currentForm === 'bird') {
        player.setGravityY(200);
    } else {
        player.setGravityY(600);
    }
}

function update() {
    if (!player) return;

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

    if (currentForm === 'bird' && cursors.up.isDown && !player.body.touching.down) {
        player.setVelocityY(-150); // Glide effect
    }
}

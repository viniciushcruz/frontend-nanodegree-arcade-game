// Enemies our player must avoid
var Enemy = function (x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.width = 90;
    this.height = 75;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (this.speed * dt);

    //reset enemies when it out off canvas

    if (this.x > 505) {
        this.x = 0
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (x, y) {
    var verticalMoveSize = 82;
    var horizontalMoveSize = 100;
    var maxSize = 400;
    this.x = x;
    this.y = y;
    this.width = 55;
    this.height = 65;

    this.sprite = 'images/char-boy.png';
    this.moveUp = function () {
        var move = this.y - verticalMoveSize;
        if (move < 0) {
            // the player win the game. send a message e restarting the game
            this.reset();
            alert('You win!!! Congratulation')
        } else {
            this.y = move;
        }
    };
    this.moveLeft = function () {
        var move = this.x - horizontalMoveSize;
        if (move < 0) {
            this.x = 0;
        } else {
            this.x = move;
        }
    };
    this.moveRight = function () {
        var move = this.x + horizontalMoveSize;
        if (move > maxSize) {
            this.x = maxSize;
        } else {
            this.x = move;
        }
    };
    this.moveDown = function () {
        var move = this.y + verticalMoveSize;
        if (move > maxSize) {
            this.y = maxSize;
        } else {
            this.y = move;
        }
    };
};

Player.prototype.reset = function () {
    this.x = 200;
    this.y = 400;
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (key) {
    switch (key) {
        case 'up':
            this.moveUp();
            break;
        case 'left':
            this.moveLeft();
            break;
        case 'right':
            this.moveRight();
            break;
        case 'down':
            this.moveDown();
            break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var lineOne = 60;
var lineTwo = 140;
var lineThree = 225;

var allEnemies = [
    new Enemy(0, lineOne, 100),
    new Enemy(-150, lineTwo, 100),
    new Enemy(-200, lineTwo, 200),
    new Enemy(-250, lineThree, 200)
];
var player = new Player(200, 400);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

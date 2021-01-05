const game = {
  width: 640,
  height: 360,
  rows: 4,
  cols: 8,
  blocks: [],
  ctx: undefined,
  platform: undefined,
  ball: undefined,
  sprites: {
    background: undefined,
    platform: undefined,
    ball: undefined,
    block: undefined
  },
  init: function() {
    const canvas = document.getElementById('mycanvas');
    this.ctx = canvas.getContext('2d');

    window.addEventListener('keydown', function(evt) {
      if (evt.keyCode == 37) {
        game.platform.dx = -game.platform.velocity;
      } else if (evt.keyCode == 39) {
        game.platform.dx = game.platform.velocity;
      } else if (evt.keyCode == 32) {
        game.platform.releaseBall();
      }
    });

    window.addEventListener('keyup', function(evt) {
      if (evt.keyCode == 37 || evt.keyCode == 39) {
        game.platform.stop();
      }
    });
  },
  load: function() {
    for(let key in this.sprites) {
      this.sprites[key] = new Image();
      this.sprites[key].src = `images/${key}.png`;
    }
  },
  create: function() {
    for(let row = 0; row < this.rows; row++) {
      for(let col = 0; col < this.cols; col++) {
        this.blocks.push({
          x: 68 * col + 50,
          y: 38 * row + 35,
          width: 64,
          height: 32,
          isAlive: true
        });
      }
    }
  },
  start: function() {
    this.init();
    this.load();
    this.create();
    this.run();
  },
  render: function() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.drawImage(this.sprites.background, 0, 0);
    this.ctx.drawImage(this.sprites.platform, this.platform.x, this.platform.y);
    this.ctx.drawImage(this.sprites.ball, this.ball.width * this.ball.frame, 0, this.ball.width, this.ball.height, this.ball.x, this.ball.y, this.ball.width, this.ball.height);

    this.blocks.forEach(element => {
      if (element.isAlive) {
        this.ctx.drawImage(this.sprites.block, element.x, element.y);
      }
    });
  },
  update: function() {
    if (this.ball.collide(this.platform)) {
      this.ball.bumpPlatform();
    }

    if (this.platform.dx) {
      this.platform.move();
    }

    if (this.ball.dx || this.ball.dy) {
      this.ball.move();
    }

    this.blocks.forEach(element => {
      if (element.isAlive) {
        if (this.ball.collide(element)) {
          this.ball.bumpBlock(element);
        }
      }
    });

    this.ball.checkBounds();
  },
  run: function() {
    this.update();
    this.render();

    window.requestAnimationFrame(function() {
      game.run();
    });
  },
  over: function() {
    console.log('Game Over');
  }
};

game.ball = {
  width: 22,
  height: 22,
  frame: 0,
  x: 340,
  y: 278,
  dx: 0,
  dy: 0,
  velocity: 3,
  move: function() {
    this.x += this.dx;
    this.y += this.dy;
  },
  jump: function() {
    this.dy = -this.velocity;
    this.dx = -this.velocity;
  },
  collide: function(element) {
    let x = this.x + this.dx;
    let y = this.y + this.dy;

    if(x + this.width > element.x &&
      x < element.x + element.width &&
      y + this.height > element.y &&
      y < element.y + element.height) {
        return true;
    }

    return false;
  },
  bumpBlock: function(block) {
    this.dy *= -1;
    block.isAlive = false;
  },
  bumpPlatform: function() {
    this.dy = -this.velocity;
  },
  checkBounds: function() {
    let x = this.x + this.dx;
    let y = this.y + this.dy;

    if (x < 0) {
      this.x = 0;
      this.dx = this.velocity;

    } else if ((x + this.width) > game.width) {
      this.x = game.width - this.width;
      this.dx = -this.velocity;

    } else if (y < 0) {
      this.y = 0;
      this.dy = this.velocity;

    } else if ((y + this.height) > game.height) {
      game.over();
    }
  }
};

game.platform = {
  x: 300,
  y: 300,
  velocity: 6,
  dx: 0,
  width: 104,
  height: 24,
  ball: game.ball,
  releaseBall: function() {
    if (this.ball) {
      this.ball.jump();
      this.ball = false;
    }
  },
  move: function() {
    this.x += this.dx;

    if (this.ball) {
      this.ball.x += this.dx;
    }
  },
  stop: function() {
    this.dx = 0;

    if (this.ball) {
      this.ball.dx = 0;
    }
  }
};

window.addEventListener('load', function() {
  game.start();
});
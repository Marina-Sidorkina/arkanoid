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
          height: 32
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
      this.ctx.drawImage(this.sprites.block, element.x, element.y);
    });
  },
  update: function() {
    if (this.platform.dx) {
      this.platform.move();
    }
  },
  run: function() {
    this.update();
    this.render();

    window.requestAnimationFrame(function() {
      game.run();
    });
  }
};

game.platform = {
  x: 300,
  y: 300,
  velocity: 6,
  dx: 0,
  move: function() {
    this.x += this.dx;
  },
  stop: function() {
    this.dx = 0;
  }
};

game.ball = {
  width: 22,
  height: 22,
  frame: 0,
  x: 340,
  y: 278
};

window.addEventListener('load', function() {
  game.start();
});
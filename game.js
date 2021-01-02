const game = {
  width: 640,
  height: 360,
  ctx: undefined,
  platform: undefined,
  ball: undefined,
  sprites: {
    background: undefined,
    platform: undefined,
    ball: undefined
  },
  init: function() {
    const canvas = document.getElementById('mycanvas');
    this.ctx = canvas.getContext('2d');
  },
  load: function() {
    for(let key in this.sprites) {
      this.sprites[key] = new Image();
      this.sprites[key].src = `images/${key}.png`;
    }
  },
  start: function() {
    this.init();
    this.load();
    this.run();
  },
  render: function() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.drawImage(this.sprites.background, 0, 0);
    this.ctx.drawImage(this.sprites.platform, this.platform.x, this.platform.y);
    this.ctx.drawImage(this.sprites.ball, this.ball.width * this.ball.frame, 0, this.ball.width, this.ball.height, this.ball.x, this.ball.y, this.ball.width, this.ball.height);
  },
  run: function() {
    this.render();

    window.requestAnimationFrame(function() {
      game.run();
    });
  }
};

game.platform = {
  x: 300,
  y: 300
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
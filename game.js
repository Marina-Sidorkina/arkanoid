const game = {
  sprites: {
    background: undefined
  },
  start: function() {
    const canvas = document.getElementById('mycanvas');
    this.ctx = canvas.getContext('2d');

    this.sprites.background = new Image();
    this.sprites.background.src = 'images/background.png';

    this.run();
  },
  render: function() {
    this.ctx.drawImage(this.sprites.background, 0, 0);
  },
  run: function() {
    this.render();

    window.requestAnimationFrame(function() {
      game.run();
    });
  }
};

window.addEventListener('load', function() {
  game.start();
});
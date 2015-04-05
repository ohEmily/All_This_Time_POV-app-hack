var StackBlurRGBA = require("../../components/util/stack-blur-rgba.js");

module.exports = {

  // defaults
  loadingProgress: 0,
  animationProgress: 0,
  bgStyle: '#69665f',
  fillStyle: '#d2cdbf',


  MAX_BLUR_RADIUS: 3,
  TEXT_OFFSET_RATIO: 0.1,
  BLUR_MAX_OFFSET: 10,
  PRELOAD_BAR_ANGLE: 30 * Math.PI / 180,
  CHARACTER_WIDTH: 49,
  CHARACTER_HEIGHT: 50,
  WIDTH: 722,
  HEIGHT: 56,

  characterBuffers: {},
  blurO: null,
  blurOCtx: null,
  blurOBuffers: [],
  infos : [
    {
        character: 'a',
        offsetX: -339
    },
    {
        character: 'n',
        offsetX: -223
    },
    {
        character: 'o',
        offsetX: -102
    },
    {
        character: 'm',
        offsetX: 21
    },
    {
        character: 'a',
        offsetX: 140
    },
    {
        character: 'l',
        offsetX: 247
    },
    {
        character: 'y',
        offsetX: 343
    }
  ],

  a : function (ctx) {
    ctx.moveTo(33.8,35);
    ctx.lineTo(14.8,35);
    ctx.lineTo(9.4,47.6);
    ctx.lineTo(3.9,47.6);
    ctx.lineTo(24.5,0.7);
    ctx.lineTo(44.5,47.5);
    ctx.lineTo(39,47.5);
    ctx.lineTo(33.8,35);
    ctx.closePath();
    ctx.moveTo(31.9,30.3);
    ctx.lineTo(24.4,12.4);
    ctx.lineTo(16.8,30.3);
    ctx.lineTo(31.9,30.3);
  },

  n : function (ctx) {
    ctx.moveTo(4.2,46.6);
    ctx.lineTo(4.2,0);
    ctx.lineTo(39,36.5);
    ctx.lineTo(39,1.9);
    ctx.lineTo(44,1.9);
    ctx.lineTo(44,48.6);
    ctx.lineTo(9.2,12.1);
    ctx.lineTo(9.2,46.6);
    ctx.lineTo(4.2,46.6);
  },

  o : function (ctx) {
    ctx.moveTo(1.5,24.3);
    ctx.bezierCurveTo(1.5,11,11.9,1.2,24.8,1.2);
    ctx.bezierCurveTo(37.7,1.2,48,10.9,48,24.3);
    ctx.bezierCurveTo(48,37.6,37.7,47.4,24.8,47.4);
    ctx.bezierCurveTo(11.9,47.4,1.5,37.5,1.5,24.3);
    ctx.closePath();
    ctx.moveTo(6.6,24.3);
    ctx.bezierCurveTo(6.6,34.6,14.7,42.7,24.8,42.7);
    ctx.bezierCurveTo(34.9,42.7,43,34.5,43,24.3);
    ctx.bezierCurveTo(43,14,34.9,5.9,24.8,5.9);
    ctx.bezierCurveTo(14.7,5.9,6.6,14,6.6,24.3);
  },

  m : function (ctx) {
    ctx.moveTo(0,47.6);
    ctx.lineTo(7.4,0.4);
    ctx.lineTo(24.6,38.1);
    ctx.lineTo(42.1,0.3);
    ctx.lineTo(49.1,47.5);
    ctx.lineTo(44,47.5);
    ctx.lineTo(39.8,16.4);
    ctx.lineTo(24.6,49.4);
    ctx.lineTo(9.6,16.4);
    ctx.lineTo(5.1,47.6);
    ctx.lineTo(0,47.6);
  },

  l : function (ctx) {
    ctx.moveTo(20.8,1.9);
    ctx.lineTo(20.8,41.9);
    ctx.lineTo(33.1,41.9);
    ctx.lineTo(33.1,46.6);
    ctx.lineTo(15.8,46.6);
    ctx.lineTo(15.8,1.9);
    ctx.lineTo(20.8,1.9);
  },

  y : function (ctx) {
    ctx.moveTo(22.4,27.3);
    ctx.lineTo(7.7,1.9);
    ctx.lineTo(13.5,1.9);
    ctx.lineTo(24.9,21.9);
    ctx.lineTo(36.4,1.986);
    ctx.lineTo(42.2,1.986);
    ctx.lineTo(27.3,27.3);
    ctx.lineTo(27.3,46.5);
    ctx.lineTo(22.3,46.5);
    ctx.lineTo(22.3,27.3);
  },

  createLogoBuffers: function() {

      var infos = this.infos;
      var info;
      for(var i = 0, len = infos.length; i < len; ++i) {
          info = infos[i];
          if(!this.characterBuffers[info.character]) {
              this.characterBuffers[info.character] = this.createCharacterBuffer(info.character);
          }
      }

      // create blur O buffers
      for(i = 1; i <= this.MAX_BLUR_RADIUS; ++i) {
          this.blurO = document.createElement('canvas');
          this.blurOCtx = this.blurO.getContext('2d');
          this.blurO.width = this.CHARACTER_WIDTH + 2 * i;
          this.blurO.height = this.CHARACTER_HEIGHT + 2 * i;
          this.blurOCtx.drawImage(this.characterBuffers.o, i, i);
          StackBlurRGBA(this.blurOCtx, 0, 0, this.blurO.width, this.blurO.height, i);
          this.blurOBuffers.push(this.blurO);
      }
  },

  createCharacterBuffer: function(character) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = this.CHARACTER_WIDTH;
    canvas.height = this.CHARACTER_HEIGHT;
    ctx.fillStyle = '#00ff00';
    switch(character.toLowerCase()) {
      case 'a':
        this.a(ctx);
      break;
      case 'n':
        this.n(ctx);
      break;
      case 'o':
        this.o(ctx);
      break;
      case 'm':
        this.m(ctx);
      break;
      case 'l':
        this.l(ctx);
      break;
      case 'y':
        this.y(ctx);
      break;
    }
    ctx.fill();
    return canvas;
  },

  renderCanvas: function(element) {
    var canvas = element;
    var ctx = canvas.getContext('2d');
    // reset
    ctx.globalCompositeOperation = 'source-over';
    ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT );

    ctx.save();
    ctx.translate(this.WIDTH / 2, this.HEIGHT / 2);

    for(var i = 0, len = this.infos.length; i < len; ++i) {
      ctx.save();
      info = this.infos[i];
      var logoAnimation = this.animationProgress; // used for movement
      ctx.translate(info.offsetX * ((1 - this.TEXT_OFFSET_RATIO) + logoAnimation * this.TEXT_OFFSET_RATIO), 0);
      ctx.translate(-this.CHARACTER_WIDTH / 2, -this.CHARACTER_HEIGHT / 2);

      if(info.character == 'o' && logoAnimation < 1) {
          ctx.save();
          ctx.beginPath();
          ctx.arc(this.CHARACTER_WIDTH / 2, this.CHARACTER_HEIGHT / 2, 22, 0, Math.PI * 2, true);
          ctx.rect(0, 0, this.CHARACTER_WIDTH + this.BLUR_MAX_OFFSET + this.MAX_BLUR_RADIUS, this.CHARACTER_HEIGHT);
          ctx.clip();
          ctx.closePath();
          var blurOIndex = ~~((1 - logoAnimation) * this.MAX_BLUR_RADIUS * 0.9999);
          ctx.globalAlpha = 0.5;
          ctx.drawImage(this.blurOBuffers[blurOIndex], (1 - logoAnimation) * this.BLUR_MAX_OFFSET - blurOIndex - 1, - blurOIndex - 1);
          ctx.restore();
      }

      ctx.drawImage(this.characterBuffers[info.character], 0, 0);
      ctx.restore();
    }

    ctx.restore();

    ctx.globalCompositeOperation = 'source-in';

    ctx.fillStyle = this.bgStyle;
    ctx.fillRect(0, 0, this.WIDTH , this.HEIGHT );

    ctx.globalCompositeOperation = 'source-atop';
    var preloaderBarExtraWidth = this.HEIGHT * Math.sin(this.PRELOAD_BAR_ANGLE);
    var preloadBarWidth = (preloaderBarExtraWidth + this.WIDTH) * this.loadingProgress;
    ctx.beginPath();
    ctx.fillStyle = this.fillStyle;
    ctx.moveTo(-preloaderBarExtraWidth, 0);
    ctx.lineTo(preloadBarWidth, 0);
    ctx.lineTo(preloadBarWidth - preloaderBarExtraWidth, this.HEIGHT);
    ctx.lineTo(- preloaderBarExtraWidth, this.HEIGHT);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  },

  init: function(element) {
    element.width = this.WIDTH;
    element.height = this.HEIGHT;
    this.render(element);
  },

  render: function(element) {
    this.createLogoBuffers();
    this.renderCanvas(element);
  }

}
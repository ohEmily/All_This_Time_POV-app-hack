var React = require("react/addons");

module.exports = React.createClass({
  
  mixins: [React.addons.PureRenderMixin],

  canvasPattern: null,
  canvasWidth: 0,
  canvasHeight: 0,

  componentDidMount: function () {
    window.addEventListener("resize", this.onWindowResize);
    this.canvasWidth = this.getDOMNode().clientWidth;
    this.canvasHeight = this.getDOMNode().clientHeight;
    this.drawCanvas();

    // var video=this.getDOMNode().querySelector("video");
    // video.addEventListener('play', this.drawCanvas.bind(this));
  },

  componentWillUnmount: function () {
    window.removeEventListener("resize", this.onWindowResize);
  },

  onWindowResize: function(e) {
    this.canvasWidth = this.getDOMNode().clientWidth;
    this.canvasHeight = this.getDOMNode().clientHeight;
    this.drawCanvas();
  },

  getCanvasPattern: function() {
    if(this.canvasPattern) return this.canvasPattern;
    this.canvasPattern = document.createElement("canvas");
    this.canvasPattern.width = 3;
    this.canvasPattern.height = 3;

    var contextPattern = this.canvasPattern.getContext("2d");

    contextPattern.fillStyle = "rgba(68,68,76,1)";
    contextPattern.fillRect(0,0,3,3);

    contextPattern.strokeStyle = "rgba(43,43,43,1)";
    contextPattern.lineWidth = 1;
    contextPattern.strokeRect(0,0,3,3);
    return this.canvasPattern;
  },

  drawEllipseWithBezier: function(ctx, x, y, w, h, style) {
    var kappa = .5522848,
        ox = (w / 2) * kappa, // control point offset horizontal
        oy = (h / 2) * kappa, // control point offset vertical
        xe = x + w,           // x-end
        ye = y + h,           // y-end
        xm = x + w / 2,       // x-middle
        ym = y + h / 2;       // y-middle

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x, ym);
    ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
    ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
    ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
    ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
    if(style) ctx.strokeStyle = style;
    ctx.stroke();
    ctx.restore();
  },

  drawCanvas: function() {
    console.log('draw canvas');
    var canvas = this.refs.canvas.getDOMNode();
    canvas.width = this.canvasWidth;
    canvas.height = this.canvasHeight;
    var context = canvas.getContext("2d");
    // context.globalCompositeOperation = 'multiply';

    var video=this.getDOMNode().querySelector("video");
    context.drawImage(video,0,0,canvas.width,canvas.height);

    context.globalAlpha = 0.5;
    var canvasPattern = this.getCanvasPattern();

    var pattern = context.createPattern(canvasPattern,"repeat");
    context.globalAlpha = 0.7;
    context.fillStyle = pattern;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fill();



    // ellipse
    // this.drawEllipseWithBezier(context, 10, 10, this.canvasWidth, this.canvasHeight, 'blue');

    var middleX = this.canvasWidth/2;
    var middleY = this.canvasHeight/2;

    var radgrad4 = context.createRadialGradient(middleX,middleY,0,middleX,middleY,this.canvasWidth*.7);
    radgrad4.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
    radgrad4.addColorStop(0.7, 'rgba(0, 0, 0, 0.1)');
    radgrad4.addColorStop(1, 'rgba(0, 0, 0, 1)');


    context.translate(middleX, middleY); // translate to rectangle center 
    context.rotate((Math.PI/180)*-38); // rotate
    context.scale(1,0.7);
    context.translate(-middleX, -middleY); // translate back

    context.fillStyle = radgrad4;
    context.fill();
    context.fillRect(-canvas.width, -canvas.height, canvas.width*3, canvas.height*3);

    requestAnimationFrame(this.drawCanvas);

  },

  render: function() {

    var canvasPartial = null;
    canvasPartial = <canvas className="block-tv-filter__canvas" ref="canvas" />

    return  (<div className="block-tv-filter">
              <div className="block-tv-filter__source" ref="filterSrc">
                {this.props.children}
              </div>
                {canvasPartial}
              </div>)
  }

})
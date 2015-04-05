/*doc
---
title: Block TV Filter
name: block tv filter
category: WebGL Components
---

Block TV Filter component

```html_example_table
<div id="block-tv-filter-example-1" style="display: block; width: 500px; height: 300px;">
</div>
<script type="text/jsx">
React.render(
  (<Components.Blocks.BlockTVFilter
                          srcWebM="/assets/video/homepage_vid.webm"
                          srcMP4="/assets/video/homepage_vid.mp4">
                        </Components.Blocks.BlockTVFilter>),
  document.getElementById('block-tv-filter-example-1')
);
</script>

```


*/


var React = require("react/addons");
var seriously = require("script!../../vendor/seriously.js");
var tvglitch = require("script!../../vendor/seriously.tvglitch.js");
var vignette = require("script!../../vendor/seriously.vignette.js");

module.exports = React.createClass({


  offscreenCanvas: null,
  canvasPattern: null,
  canvasWidth: 0,
  canvasHeight: 0,
  canvasScale: 1,
  seriously: null,
  video: null,
  poster: null,

  getDefaultProps: function() {
    return {
      autoplay: true,
      srcPoster: null
    }
  },

  componentDidMount: function () {
    window.addEventListener("resize", this.onWindowResize);

    this.canvasWidth = this.getDOMNode().clientWidth*this.canvasScale;
    this.canvasHeight = this.getDOMNode().clientHeight*this.canvasScale;

    if(this.props.srcPoster) {
      this.poster = new Image();
      this.poster.addEventListener("load", this.onPosterLoaded);
      console.log('this.props.srcPoster: '+this.props.srcPoster);
      this.poster.src = this.props.srcPoster;
    }

    if(this.props.srcMP4 || this.props.srcWebM) {
      this.video =  document.createElement('video');

      if (this.video.canPlayType('video/mp4')) {
        this.video.src = this.props.srcMP4;
      }else if (this.video.canPlayType('video/webm')) {
        this.video.src = this.props.srcWebM;
      }

      this.video.autoPlay = this.props.autoplay;
      this.video.loop = true;
      this.video.addEventListener("play", this.onVideoPlay);
      if(this.props.autoplay) this.video.play();
    }

    this.seriously = new Seriously();

    this.reformat = this.seriously.transform('reformat');
    this.reformat.source = (this.poster) ? this.poster : this.video;
    this.reformat.width = this.canvasWidth;
    this.reformat.height = this.canvasHeight;
    this.reformat.mode = 'cover';


    this.tvglitch = this.seriously.effect('tvglitch');
    this.tvglitch.source = this.reformat;
    this.tvglitch.distortion = 0.001;
    this.tvglitch.scanlines = 1.0;
    this.tvglitch.bars = 0.05;
    this.tvglitch.lineSync = 0;
    this.tvglitch.verticalSync = 0;
    this.tvglitch.frameLimit = 0;
    this.tvglitch.frameSharpness = 40;

    this.vignette = this.seriously.effect('vignette');
    this.vignette.source = this.tvglitch;
    this.vignette.amount = 0.5;

    this.target = this.seriously.target(this.refs.canvas.getDOMNode());
    this.target.source = this.vignette;
    this.target.width = this.canvasWidth;
    this.target.height = this.canvasHeight;

    var that = this;
    this.seriously.go(function (now) {
        // callback runs before render
        // console.log('run seriously: '+now)
      }, function () {
        // callback runs after render
        // console.log('run complete');
        that.tvglitch.time += 0.01;
        that.tvglitch.bars =  Math.sin(that.tvglitch.time)*0.1;
        that.tvglitch.distortion =  Math.sin(that.tvglitch.time)*0.005;

      });

  },

  onVideoPlay: function() {
    this.video.removeEventListener("play", this.onVideoPlay);
    this.reformat.source = this.video;
  },

  onPosterLoaded: function() {
    this.poster.removeEventListener("load", this.onPosterLoaded);
    if(this.isMounted()) {
      this.forceUpdate();
    }
  },

  updateSize: function() {
    this.canvasWidth = this.getDOMNode().clientWidth*this.canvasScale;
    this.canvasHeight = this.getDOMNode().clientHeight*this.canvasScale;

    this.reformat.width = this.canvasWidth;
    this.reformat.height = this.canvasHeight;

    this.target.width = this.canvasWidth;
    this.target.height = this.canvasHeight;
  },

  componentWillUnmount: function () {
    if(this.video) this.video.removeEventListener("play", this.onVideoPlay);
    if(this.poster) this.poster.removeEventListener("load", this.onPosterLoaded);
    window.removeEventListener("resize", this.onWindowResize);
    this.pause(true);
  },

  onWindowResize: function(e) {
    this.updateSize();
  },

  pause: function(isUnmounting) {
    isUnmounting = isUnmounting || false;
    if(this.seriously) {
      this.seriously.stop();
    }
    if(this.video) {
      this.video.pause();
    }
    if(!isUnmounting) {
      this.forceUpdate();
    }
  },

  play: function() {
    if(this.video) {
      this.video.play();
    }
    if(this.seriously) {
      this.seriously.go();
    }
    if(this.isMounted()) {
      this.forceUpdate();
    }
  },

  componentWillReceiveProps: function(nextProps) {
    if(this.props.visible!==nextProps.visible) {
      if(nextProps.visible) {
        this.play();
      }else{
        this.pause();
      }
    }
  },
 
  shouldComponentUpdate: function (nextProps, nextState) {
    return false;
  },

  render: function() {

    var canvasReverseScale = 1/this.canvasScale;

    var canvasStyle = {};
    canvasStyle["-webkit-transform"] = canvasStyle.mozTransform = canvasStyle.msTransform = canvasStyle.transform = "scale3d("+canvasReverseScale+","+canvasReverseScale+",1)";

    var canvasPartial = null;
    canvasPartial = <canvas className="block-tv-filter__canvas" ref="canvas" id="canvas" style={canvasStyle} />

    return (<div className="block-tv-filter">
              {canvasPartial}
            </div>)
  }

})
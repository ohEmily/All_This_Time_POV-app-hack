var React = require("react");
var Components = require("../../../components/index.jsx");
var Data = require("json!../../../../../assets/data/watch.json");
var MathInRange = require("mout/math/inRange");
var MathMap = require("mout/math/map");

module.exports = React.createClass({

  mixins: [React.addons.PureRenderMixin],

  narration: null,
  bgSound: null,
  raf: null,
  ended: false,
  currentTime: 0,

  getInitialState: function () {
    return {
      sentenceProgress: 0,
      currentMedias: [],
      currentLabel: ""
    };
  },

  componentWillMount: function () {
    this.narration = new Audio("./assets/audio/angela.m4a");
    this.narration.pause();
    this.narration.addEventListener("ended", this.onNarrationEnd);


    this.bgSound = new Audio("./assets/audio/bg.mp3");
    this.bgSound.pause();
  },

  componentDidMount: function () {
    var that = this;
    this.start();
  },

  // ---------------------------------------------

  start: function() {
    this.ended = false;
    window.requestAnimationFrame(this.onTick);
    this.narration.play();
    this.bgSound.play();
  },

  updateTime: function(value) {
    var currentSentence = this.getCurrentSentence(value);
    if(currentSentence) {
      var currentMedias = currentSentence.media || null;
      var sentenceProgress = this.getSentenceProgress(value, currentSentence);
      this.setState({
        sentenceProgress: sentenceProgress,
        currentMedias: currentMedias
      })
    }
    if(currentSentence && currentSentence.label) {
      this.setState({
        currentLabel: currentSentence.label
      })
    }
  },

  getCurrentSentence: function(value) {
    for(var i = 0; i < Data.sentences.length; i++) {
      var sentence = Data.sentences[i];
      var startTime = parseFloat(sentence.start);
      var endTime = parseFloat(sentence.end);
      if(MathInRange(value, startTime, endTime)) {
        return sentence;
      }
    }
    return null;
  },

  getSentenceProgress: function(value, sentence) {
    if(value>parseFloat(sentence.end)) {
      return 1;
    }
    if(value<parseFloat(sentence.start)) {
      return 0;
    }
    var progress = MathMap(value, parseFloat(sentence.start), parseFloat(sentence.end), 0, 1);
    return progress;
  },

  // ---------------------------------------------
  // EVENTS

  onTick: function(e) {
    this.updateTime(this.narration.currentTime);
    if(!this.ended) {
      this.raf = window.requestAnimationFrame(this.onTick);
    }
  },

  onNarrationEnd: function(e) {
    this.ended = true;
    if(this.raf) window.cancelAnimationFrame(this.raf);
  },

  // ---------------------------------------------

  render: function() {

    var videoPartial = null;
    var playerPartial = null;
    var bodyPartial = null;

    var bodyStyles = null;
    var playerStyles = null;

    return (<div className="watch-page">
              <div className="watch-page__bg">
                <Components.Blocks.BlockWatchBG media={this.state.currentMedias} progress={this.state.sentenceProgress} />
              </div>
              <div className="watch-page__body" style={bodyStyles}>
                <Components.Blocks.BlockAlign align="left bottom">
                  <Components.Blocks.BlockTheaterText label={this.state.currentLabel} reset={this.state.reset} />
                </Components.Blocks.BlockAlign>
              </div>
            </div>);
  }

})
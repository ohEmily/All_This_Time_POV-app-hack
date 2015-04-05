var React = require("react");
var Components = require("../../../components/index.jsx");
var watchBG = require("../../../../../assets/images/watch/watch-bg.jpg");

module.exports = React.createClass({

  mixins: [React.addons.PureRenderMixin],

  getInitialState: function() {
    return {
      playingVideo: false
    };
  },

  onWatchClick: function(e) {
    e.preventDefault();
    this.setState({
      playingVideo: !this.state.playingVideo
    })
  },

  componentWillReceiveProps: function (nextProps) {
    if(nextProps.visible===false) {
      this.setState({
        playingVideo: false
      });
    }
    if(nextProps.enabled && nextProps.enabled!==this.props.enabled) {
      if(this.refs.video && !this.state.playingVideo) {
        this.refs.video.play();
      }
    }else if(!nextProps.enabled && nextProps.enabled!==this.props.enabled) {
      if(this.refs.video) {
        this.refs.video.pause();
      }
    }
  },

  componentDidUpdate: function (prevProps, prevState) {
    if(prevState.playingVideo!==this.state.playingVideo && this.state.playingVideo) {
      if(this.refs.video) this.refs.video.pause();
    }
  },

  componentDidMount: function () {
    if(this.props.visible) {
      if(this.refs.video) this.refs.video.play();
    }
  },

  render: function() {

    var bodyStyles = {
      zIndex: 1
    };
    var playerStyles = {
      zIndex: 0
    };

    var bodyPartial = <Components.Blocks.BlockWatchCTA onClick={this.onWatchClick} />;
    var playerPartial = null;
    if(this.state.playingVideo && this.props.visible) {
      playerPartial = <iframe src="//player.vimeo.com/video/115329271?title=0&amp;byline=0&amp;portrait=0&amp;color=ffffff&amp;autoplay=1&amp;api=1" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
      bodyPartial = null;
      bodyStyles.zIndex = 0;
      playerStyles.zIndex = 1;
    }

    var videoPartial = (<Components.Blocks.BlockTVFilter
                          ref="video"
                          visible={this.props.visible}
                          srcPoster={watchBG}
                          srcWebM="./assets/video/watchthemovie_vid.webm"
                          srcMP4="./assets/video/watchthemovie_vid.mp4">
                        </Components.Blocks.BlockTVFilter>);

    return (<div className="watch-page">
              <div className="watch-page__bg">
                {videoPartial}
              </div>
              <div className="watch-page__body" style={bodyStyles}>
                {bodyPartial}
              </div>
              <div className="watch-page__player" style={playerStyles}>
                {playerPartial}
              </div>
              <div className="watch-page__hud">
                <div className="watch-page__hud__logo">
                  <span className="label label-logo label-logo--extra-small"></span>
                </div>
              </div>
            </div>);
  }

})
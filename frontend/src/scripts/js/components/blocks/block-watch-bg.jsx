var React = require("react");

module.exports = React.createClass({

  mixins: [React.addons.PureRenderMixin],

  getInitialState: function () {
      return {
        currentMedia: null
      };
  },

  getDefaultProps: function () {
      return {
          progress: 0,
          media: []
      };
  },

  componentWillMount: function () {
    this.calculateCurrentMedia(this.props);
  },

  componentWillReceiveProps: function (nextProps) {
    if(this.props.progress!==nextProps.progress && nextProps.media && nextProps.media.length>0) {
      this.calculateCurrentMedia(nextProps);
    }
  },

  calculateCurrentMedia: function(props) {
    console.log(props);
    var currentMediaIndex = Math.round(props.progress*(props.media.length-1));
    console.log('currentMediaIndex: '+currentMediaIndex);
    this.setState({
      currentMedia: props.media[currentMediaIndex]
    })
  },

  render: function() {

    var videoPartial = null;
    var playerPartial = null;
    var bodyPartial = null;

    var bodyStyles = null;
    var playerStyles = null;

    return (<div className="block-watch-bg">
              <img src={this.state.currentMedia} />
            </div>);
  }

})
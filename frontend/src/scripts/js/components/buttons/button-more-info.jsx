var React = require("react/addons");
var BlockTVFilter = require("../blocks/block-tv-filter-webgl.js")
var BlockMoreInfoLabel = require("../blocks/block-more-info-label.jsx");
var BlockMoreInfoLabelAlpha = require("../blocks/block-more-info-label-alpha.jsx");

module.exports = React.createClass({

  getDefaultProps: function() {
    return {
      modifier: null,
      active: false,
      href: "#",
      title: "",
      background: null,
      autoplay: false,
    }
  },

  getInitialState: function() {
    return {
      active: false
    }
  },

  componentDidUpdate: function (prevProps, prevState) {
    if(this.refs.video && !this.props.autoplay) {
      if(prevState.active!==this.state.active && this.state.active===true) {
        this.refs.video.play();
      }else if(prevState.active!==this.state.active && this.state.active===false) {
        this.refs.video.pause();
      }
    }
  },

  componentDidMount: function () {
    this.getDOMNode().addEventListener("mouseover", this.onMouseOver);
    this.getDOMNode().addEventListener("mouseout", this.onMouseOut);
  },

  componentWillUnmount: function () {
    this.getDOMNode().removeEventListener("mouseover", this.onMouseOver);
    this.getDOMNode().removeEventListener("mouseout", this.onMouseOut);
  },


  onMouseOver: function(e) {
    this.setState({
      active: true
    })
  },

  onMouseOut: function(e) {
    this.setState({
      active: false
    })
  },

  render: function() {

    var classes = {
      "button" : true,
      "button-more-info" : true
    }

    if(this.props.modifier) {
      classes["button-more-info--"+this.props.modifier] = true;
    }

    var videoPartial = null;
    if(this.props.video) {
      videoPartial = (<span className="button-more-info__bg">
                        <BlockTVFilter visible={true} autoplay={false} ref="video"
                          srcPoster={this.props.background}
                          srcWebM={this.props.video}
                          srcMP4={this.props.video}>
                        </BlockTVFilter>
                      </span>)
    }

    var style = {};
    if(this.props.background) {
      style.backgroundImage = "url("+this.props.background+")";
    }

    return  (<div className={React.addons.classSet(classes)} style={style} {...this.props}>
                <span className="button-more-info__wrapper">
                  <span className="button-more-info__body">
                    {this.props.children}
                  </span>
                </span>
                <div className="button-more-info__filter">
                  {videoPartial}
                </div>
              </div>
              )
  }

})
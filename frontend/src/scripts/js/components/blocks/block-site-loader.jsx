var React = require("react/addons");
var ButtonEpsilon = require("../buttons/button-epsilon.jsx");
require("gsap");
require("gsap-react-plugin");
var MoutNumberPad = require("mout/number/pad");

module.exports = React.createClass({

  onUpdateLoadingProgress: function() {
    this.setState({
      completed: true
    })
  },

  onEnterClick: function(e) {
    if(this.props.onEnterClick) this.props.onEnterClick(e);
  },

  getInitialState: function() {
    return {
      tweeningLoadingProgress: 0,
      completed: false
    }
  },

  getDefaultProps: function() {
    return {
      loadingProgress: 0
    }
  },

  componentWillMount: function () {
    this.loadingProgressTimeline = new TimelineMax({onComplete: this.onUpdateLoadingProgress});
    this.loadingProgressTimeline.pause();
    this.loadingProgressTimeline.fromTo(this, 2, {state: {tweeningLoadingProgress: 0}}, {state: {tweeningLoadingProgress: 1}});
  },

  componentWillReceiveProps: function (nextProps) {
    this.updateLoadingProgress(nextProps.loadingProgress);
  },

  updateLoadingProgress: function(progress) {
    var that = this;
    var tweenToTime = this.loadingProgressTimeline.duration()*progress;
    this.loadingProgressTimeline.tweenTo(tweenToTime);
  },

  render: function() {

    var classes = {
      "block-site-loader" : true
    }

    var progressString =  MoutNumberPad(Math.floor(this.state.tweeningLoadingProgress*100), 3);

    var loadingProgressLabelPartial = <ButtonEpsilon>{progressString}</ButtonEpsilon>;
    var enterButtonPartial = <ButtonEpsilon onClick={this.onEnterClick}>Enter</ButtonEpsilon>;
    var titlePartial = (this.state.completed) ? enterButtonPartial : loadingProgressLabelPartial;

    return  (<div className={React.addons.classSet(classes)} {...this.props}>
              <div className="block-site-loader__title">
                {titlePartial}
              </div>
              <div className="block-site-loader__copyright">
                <blockquote className="label label-gamma label-gamma--small label-gamma--uppercase label-gamma--blockquote">
                  Copyright &copy; 2015 theanomalyfilm.com<br/>
                  All Rights Reserved
                </blockquote>
              </div>
            </div>)
  }

})
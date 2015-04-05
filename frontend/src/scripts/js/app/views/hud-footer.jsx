var React = require("react");
var Components = require("../../components/index.jsx");

module.exports = React.createClass({

  getDefaultProps: function() {
    return {
      scrollYOffset: 0,
      expanded: false
    }
  },

  getInitialState: function() {
    return {
      navActive: false
    }
  },

  componentDidMount: function () {
    this.forceUpdate();
  },

  componentDidUpdate: function (prevProps, prevState) {
    if(prevState.navActive===false) {
      this.startAnimateIn();
    }
  },

  startAnimateIn: function() {
    this.setState({
      navActive: true
    })
  },

  render: function() {

    var hudFooterClassSet = {
      "hud-footer": true,
      "hud-footer--expanded": this.props.expanded
    }

    var hudFooterLeftClassSet = {
      "hud-footer__left": true,
      "hud-footer__left--animate": true,
      "hud-footer__left--animate-in": this.state.navActive,
    }

    var hudFooterRightClassSet = {
      "hud-footer__right": true,
      "hud-footer__right--animate": true,
      "hud-footer__right--animate-in": this.state.navActive,
    }

    var year = new Date().getFullYear();

    var translateY = 100 - this.props.scrollYOffset;

    var endStyle = {};

    var style = {}
    // style["-webkit-transform"] = style.mozTransform = style.msTransform = style.transform = "translate3d(0px, "+translateY+"px, 0px)";

    var soundNavPartial = null;
    soundNavPartial = <Components.Buttons.ButtonGamma href="#" modifier="sound">SOUND | ON</Components.Buttons.ButtonGamma>

    return <div className={React.addons.classSet(hudFooterClassSet)} style={style}>
            <div className={React.addons.classSet(hudFooterLeftClassSet)}>
              {soundNavPartial}<span className="label label-epsilon"> &mdash; License this soundtrack on <a href="" target="_blank">musicbed.com</a></span>
            </div>
            <div className={React.addons.classSet(hudFooterRightClassSet)}>
              <span className="hud-footer__right__item">
                <span className="label label-epsilon">&copy; COPYRIGHT {year} THEANOMALYFILM.COM. ALL RIGHTS RESERVED.</span>
              </span>
              <span className="hud-footer__right__item">
                <Components.Blocks.BlockFooterNav />
              </span>
            </div>
            <div className="hud-footer__end" style={endStyle}>
              <div className="hud-footer__end__left">

                <Components.Blocks.BlockAlign align="left">
                  <Components.Buttons.ButtonSypher href="http://sypherfilms.com" target="_blank"></Components.Buttons.ButtonSypher>
                </Components.Blocks.BlockAlign>
              </div>
              <div className="hud-footer__end__right">
                <div className="hud-footer__end__copyright">
                  <span className="label label-phi">&copy; COPYRIGHT {year} THEANOMALYFILM.COM. ALL RIGHTS RESERVED.</span>
                </div>
              </div>
            </div>
          </div>;
  }

})
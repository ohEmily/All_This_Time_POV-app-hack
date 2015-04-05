var React = require("react");
var Components = require("../../components/index.jsx");

module.exports = React.createClass({

  getDefaultProps: function() {
    return {
      scrollYOffset: 0
    }
  },

  getInitialState: function() {
    return {
      navActive: false
    }
  },

  componentDidMount: function () {
    this.startAnimateIn();
  },

  startAnimateIn: function() {
    this.setState({
      navActive: true
    })
  },

  render: function() {

    var navClassSet = {
      "hud-header": true,
      "hud-header--animate": true,
      "hud-header--animate-in": this.state.navActive,
    }

    return  <div className={React.addons.classSet(navClassSet)}>
              <div className="hud-header__right">
                <div className="hud-header__right__item">
                  <Components.Blocks.BlockHeaderNav />
                </div>
              </div>
            </div>;
  }

})
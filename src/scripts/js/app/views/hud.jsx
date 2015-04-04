var React = require("react");
var HUDHeader = require("./hud-header.jsx");
var HUDFooter = require("./hud-footer.jsx");

module.exports = React.createClass({

  getInitialState: function() {
    return {
      scrollYOffset: 0
    }
  },

  getDefaultProps: function() {
    return {
      expanded: false
    }
  },

  updateScroll: function(props) {
    this.calculateFooterHeight(props)
  },

  calculateFooterHeight: function(props) {

    // if(this.state.scrollHeight<=0) return;

    var pagesHeight = window.innerHeight*3;
    var windowHeight = window.innerHeight;
    var availableHeight = pagesHeight - windowHeight;

    if(props.scrollY>=(availableHeight-100)) {
      var diff = Math.abs(props.scrollY) - (availableHeight-100);
      diff = Math.min(100, diff);
      this.setState({scrollYOffset: diff});
    }else{
      this.setState({scrollYOffset: 0});
    }

  },

  render: function() {



    return <div className="hud">
            <HUDHeader />
            <HUDFooter expanded={this.props.expanded} />
          </div>;
  }

})
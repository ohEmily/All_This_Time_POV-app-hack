var React = require("react/addons");

module.exports = React.createClass({

  getDefaultProps: function() {
    return {
      modifier: null,
      active: false,
      href: "#"
    }
  },

  render: function() {

    var classes = {
      "button" : true,
      "button-epsilon" : true
    }

    if(this.props.modifier) {
      classes["button-epsilon--"+this.props.modifier] = true;
    }

    if(this.props.active) {
      classes["button-epsilon--active"] = true;
    }

    return  (<button className={React.addons.classSet(classes)} {...this.props}>
              <span className="label label-delta label-delta--small">{this.props.children}</span>
            </button>)
  }

})
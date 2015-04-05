var React = require("react/addons");

module.exports = React.createClass({

  getDefaultProps: function() {
    return {
      modifier: null,
      href: "#"
    }
  },

  render: function() {

    var classes = {
      "button" : true,
      "button-gamma" : true
    }

    if(this.props.modifier) {
      classes["button-gamma--"+this.props.modifier] = true;
    }

    return  (<a className={React.addons.classSet(classes)} {...this.props}>
              <span className="label label-epsilon">{this.props.children}</span>
            </a>)
  }

})
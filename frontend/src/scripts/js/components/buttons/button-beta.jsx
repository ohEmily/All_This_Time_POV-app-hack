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
      "button-beta" : true
    }

    if(this.props.modifier) {
      classes["button-beta--"+this.props.modifier] = true;
    }

    if(this.props.active) {
      classes["button-beta--active"] = true;
    }

    return  (<a className={React.addons.classSet(classes)} {...this.props}>
              <span className="button-beta__label">
                <span className="label label-beta">{this.props.children}</span>
              </span>
            </a>)
  }

})
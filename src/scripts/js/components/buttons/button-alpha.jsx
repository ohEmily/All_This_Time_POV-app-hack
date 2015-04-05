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
      "button-alpha" : true
    }

    if(this.props.modifier) {
      classes["button-alpha--"+this.props.modifier] = true;
    }

    return  (<a className={React.addons.classSet(classes)} href={this.props.href} {...this.props}>
              <span className="button-alpha__label">
                <span className="label label-alpha">{this.props.children}</span>
              </span>
            </a>)
  }

})
var React = require("react/addons");

module.exports = React.createClass({

  getDefaultProps: function() {
    return {
      modifier: null,
      active: false,
      href: "#",
      title: "",
      body: ""
    }
  },

  render: function() {

    var classes = {
      "button" : true,
      "button-alpha" : true,
      "button-alpha--large": true
    }

    if(this.props.modifier) {
      classes["button-alpha--"+this.props.modifier] = true;
    }

    return  (<a {...this.props} className={React.addons.classSet(classes)} href={this.props.href}>
              <span className="button-alpha__label">
                <span className="label label-zeta button-alpha__label">{this.props.title}</span>
                <span className="label label-eta button-alpha__label">{this.props.body}</span>
              </span>
            </a>)
  }

})
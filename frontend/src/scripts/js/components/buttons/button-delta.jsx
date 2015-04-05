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
      "button-delta" : true
    }

    if(this.props.modifier) {
      classes["button-delta--"+this.props.modifier] = true;
    }

    if(this.props.active) {
      classes["button-delta--active"] = true;
    }

    var labelPartial = null;
    if(this.props.modifier==='blockquote') {
      labelPartial = <blockquote className="label label-gamma label-gamma--blockquote">{this.props.children}</blockquote>;
    }else{
      labelPartial = <span className="label label-gamma">{this.props.children}</span>;
    }

    return  (<a className={React.addons.classSet(classes)} {...this.props}>
              {labelPartial}
            </a>)
  }

})
var React = require("react/addons");

module.exports = React.createClass({

  getDefaultProps: function() {
    return {
      modifier: null
    }
  },

  render: function() {

    var classes = {
      "button" : true,
      "button-scroll-thumb" : true
    }

    if(this.props.modifier) {
      classes["button-scroll-thumb--"+this.props.modifier] = true;
    }

    return  (<button className={React.addons.classSet(classes)} {...this.props}>
            </button>)
  }

})
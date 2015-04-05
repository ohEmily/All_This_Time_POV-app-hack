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
      "button-icon" : true
    }
    var labelClasses = {
      "label" : true,
      "label-icon" : true
    }

    if(this.props.modifier) {
      labelClasses["label-icon--"+this.props.modifier] = true;
    }

    return  (<button className={React.addons.classSet(classes)} {...this.props}>
              <span className={React.addons.classSet(labelClasses)}></span>
            </button>)
  }

})
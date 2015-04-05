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
      "button-close" : true
    }

    return  (<div className={React.addons.classSet(classes)} {...this.props}></div>)
  }

})
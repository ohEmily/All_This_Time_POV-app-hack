var React = require("react/addons");

module.exports = React.createClass({

  render: function() {

    var classes = {
      "button" : true,
      "button-sypher" : true
    }

    return  (<a className={React.addons.classSet(classes)} {...this.props}></a>)
  }

})
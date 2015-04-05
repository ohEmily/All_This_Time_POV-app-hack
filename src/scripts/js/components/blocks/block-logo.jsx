var React = require("react/addons");

module.exports = React.createClass({
  
  mixins: [React.addons.PureRenderMixin],

  getDefaultProps: function() {
    return {
      modifier: null
    }
  },

  render: function() {

    return  (<div className="block-logo">
            </div>)
  }

})
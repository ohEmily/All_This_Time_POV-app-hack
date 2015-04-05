var React = require("react/addons");

module.exports = React.createClass({

  mixins: [React.addons.PureRenderMixin],

  getDefaultProps: function() {
    return {
    }
  },

  render: function() {

    var classes = {
      "block-home-input" : true
    };

    return  (<div className={React.addons.classSet(classes)}>
              <h2>I lost my father on December 24th 2004</h2>
            </div>);
  }

})
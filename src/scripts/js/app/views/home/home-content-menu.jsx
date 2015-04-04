var React = require("react");
var Components = require("../../../components/index.jsx");

module.exports = React.createClass({

  mixins: [React.addons.PureRenderMixin],

  render: function() {

    return  (<div className="home-content-menu">
              <Components.Blocks.BlockAlign>
                <h1>I want to cry</h1>
                <h1>I want to laugh</h1>
                <h1>I want to think</h1>
                <h1>I want to do all these things together</h1>
              </Components.Blocks.BlockAlign>
            </div>);
  }

})
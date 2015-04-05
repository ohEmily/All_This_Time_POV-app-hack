var React = require("react");
var Components = require("../../../components/index.jsx");

module.exports = React.createClass({

  mixins: [React.addons.PureRenderMixin],

  render: function() {

    return  (<div className="home-content-start">
              <Components.Blocks.BlockAlign>
                <Components.Blocks.BlockHomeLogo></Components.Blocks.BlockHomeLogo>
                <Components.Blocks.BlockHomeInput></Components.Blocks.BlockHomeInput>
              </Components.Blocks.BlockAlign>
            </div>);
  }

})
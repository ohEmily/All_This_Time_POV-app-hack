var React = require("react");
var Components = require("../../../components/index.jsx");

module.exports = React.createClass({

  render: function() {
    return (<div className="home-nav">
              <Components.Blocks.BlockTopNav />
            </div>);
  }

})
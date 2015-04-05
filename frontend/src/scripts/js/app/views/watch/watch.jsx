var React = require("react");
var Components = require("../../../components/index.jsx");

module.exports = React.createClass({

  mixins: [React.addons.PureRenderMixin],

  render: function() {

    var videoPartial = null;
    var playerPartial = null;
    var bodyPartial = null;

    var bodyStyles = null;
    var playerStyles = null;

    return (<div className="watch-page">
              <div className="watch-page__bg">
                <Components.Blocks.BlockWatchBG />
              </div>
              <div className="watch-page__body" style={bodyStyles}>
                <Components.Blocks.BlockAlign>
                  <Components.Blocks.BlockTheaterText />
                </Components.Blocks.BlockAlign>
              </div>
            </div>);
  }

})
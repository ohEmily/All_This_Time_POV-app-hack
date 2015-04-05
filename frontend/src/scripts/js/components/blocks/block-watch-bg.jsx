var React = require("react");

module.exports = React.createClass({

  mixins: [React.addons.PureRenderMixin],

  render: function() {

    var videoPartial = null;
    var playerPartial = null;
    var bodyPartial = null;

    var bodyStyles = null;
    var playerStyles = null;

    return (<div className="block-watch-bg">
              <img src="http://media.giphy.com/media/ONGhmYwCKiPzG/giphy.gif" />
            </div>);
  }

})
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

    return (<div className="watch-bg">
              <img src="http://media.giphy.com/media/ONGhmYwCKiPzG/giphy.gif" />
            </div>);
  }

})
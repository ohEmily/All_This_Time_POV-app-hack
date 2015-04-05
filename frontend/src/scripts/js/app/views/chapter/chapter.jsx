var React = require("react");
var Components = require("../../../components/index.jsx");

module.exports = React.createClass({

  mixins: [React.addons.PureRenderMixin],

  // --------------------------------------------------
  // EVENTS


  // --------------------------------------------------
  // LIFECYCLE

  getDefaultProps: function() {
    return {
    }
  },

  getInitialState: function() {
    return {
    }
  },

  render: function() {

    return (<div className="chapter-page">
              <div className="chapter-page__body">
                <h1>Chapter Page Body</h1>
              </div>
            </div>);

  }

})
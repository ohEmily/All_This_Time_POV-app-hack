var React = require("react");

module.exports = React.createClass({

  render: function() {
    return (<div className="pages" {...this.props}>
              {this.props.children}
            </div>);
  }

})
var React = require("react/addons");

module.exports = React.createClass({
  
  mixins: [React.addons.PureRenderMixin],

  getDefaultProps: function() {
    return {
      modifier: null
    }
  },

  render: function() {

    return  (<div className="block-headphones">
              <div className="block-headphones_label">
                <span className="label label-gamma">
                  {this.props.children}
                </span>
              </div>
            </div>)
  }

})
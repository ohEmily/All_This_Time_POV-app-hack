var React = require("react/addons");

module.exports = React.createClass({
  
  mixins: [React.addons.PureRenderMixin],

  getDefaultProps: function() {
    return {
      modifier: null,
      active: false
    }
  },

  render: function() {

    var classSet = {
      "block-scroll-cta": true,
      "block-scroll-cta--animate": true,
      "block-scroll-cta--animate-in": this.props.active
    }

    return  (<div className={React.addons.classSet(classSet)}>
              <div className="block-scroll-cta__label">
                <span className="label label-gamma">{this.props.children}</span>
              </div>
            </div>)
  }

})
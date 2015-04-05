var React = require("react/addons");

module.exports = React.createClass({
  
  mixins: [React.addons.PureRenderMixin],

  getDefaultProps: function() {
    return {
      modifier: null,
      active: false,
      href: "#",
      title: ""
    }
  },

  render: function() {

    var classes = {
      "block-more-info-label-alpha" : true
    }

    if(this.props.modifier) {
      classes["button-more-info-label-alpha--"+this.props.modifier] = true;
    }

    return  (<div className={React.addons.classSet(classes)}>
                <div className="block-more-info-label-alpha__title">
                  <span className="label label-delta">{this.props.title}</span>
                </div>
                <div className="block-more-info-label-alpha__body">
                  <span className="label label-delta label-delta--light">
                    {this.props.children}
                  </span>
                </div>
              </div>
              )
  }

})
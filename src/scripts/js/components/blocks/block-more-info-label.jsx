var React = require("react/addons");

module.exports = React.createClass({
  
  mixins: [React.addons.PureRenderMixin],

  getDefaultProps: function() {
    return {
      modifier: null,
      active: false,
      href: "#",
      title: null,
      footer: null
    }
  },

  render: function() {

    var classes = {
      "block-more-info-label" : true
    }

    if(this.props.modifier)  classes["button-more-info-label--"+this.props.modifier] = true;

    var titlePartial = null;
    if(this.props.title) {
      titlePartial = (<div className="block-more-info-label__title">
                        <span className="label label-delta">{this.props.title}</span>
                      </div>)
    }

    var footerPartial = null;
    if(this.props.footer) {
      footerPartial = (<div className="block-more-info-label__footer">
                        <span className="label label-gamma label-gamma--uppercase">{this.props.footer}</span>
                      </div>)
    }

    return  (<div className={React.addons.classSet(classes)}>
                {titlePartial}
                <div className="block-more-info-label__body">
                  {this.props.children}
                </div>
                {footerPartial}
              </div>
              )
  }

})
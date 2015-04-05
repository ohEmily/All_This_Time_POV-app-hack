var React = require("react/addons");
var BlockHeadphones = require("./block-headphones.jsx");
var ButtonAlphaLarge = require("../buttons/button-alpha-large.jsx");

module.exports = React.createClass({
  
  mixins: [React.addons.PureRenderMixin],

  getDefaultProps: function() {
    return {
      modifier: null
    }
  },

  onButtonClick: function(e) {
    e.preventDefault();
    if(this.props.onClick) {
      this.props.onClick(e);
    }
  },

  render: function() {

    return  (<div className="block-watch-cta">
                <div className="block-watch-cta__button">
                  <ButtonAlphaLarge {...this.props} title="Watch the movie" body="Available Now" />
                </div>
                <div className="block-watch-cta__meta">
                  <BlockHeadphones>
                    Please watch in Fullscreen HD mode<br/>
                    Better experience with headphones
                  </BlockHeadphones>
                </div>
              </div>)
  }

})
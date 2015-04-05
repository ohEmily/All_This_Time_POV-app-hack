var React = require("react/addons");
var MoutStringPad = require('mout/string/lpad');

module.exports = React.createClass({

  mixins: [React.addons.PureRenderMixin],

  randomColor: 'red',

  componentWillMount: function () {

    var randomNum = Math.floor(Math.random()*16777215).toString(16);
    this.randomColor = '#'+MoutStringPad(randomNum, 6, '0');
  },

  render: function() {

    var childrenPartial = null;
    if(this.props.children) {
      childrenPartial = React.addons.cloneWithProps(this.props.children, {enabled:this.props.enabled, visible: this.props.visible})
    }

    var style = {};
    style.backgroundColor = this.randomColor;

    return (<div className="page" style={style}>
              {childrenPartial}
            </div>);
  }

})
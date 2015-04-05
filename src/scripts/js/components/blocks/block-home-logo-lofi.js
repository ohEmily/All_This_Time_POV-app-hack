/*doc
---
title: Block Animated Home Logo Lofi
name: block animated home logo lofi
category: JS Components
---

Block Home Logo Lofi Component

```html_example_table
<div id="block-home-logo-lofi-example-1">
</div>
<script type="text/jsx">
React.render(
  (<Components.Blocks.BlockHomeLogoLofi animate={false}></Components.Blocks.BlockHomeLogoLofi>),
  document.getElementById('block-home-logo-lofi-example-1')
);
</script>

```


*/
var React = require("react/addons");

module.exports = React.createClass({

  mixins: [React.addons.PureRenderMixin],

  getDefaultProps: function() {
    return {
      modifier: null,
      animate: true
    }
  },

  getInitialState: function() {
    return {
      logoActive: false
    }
  },

  componentDidMount: function() {
    this.setState({
      logoActive:  true
    });
  },

  render: function() {

    var logoClassSet = {
      "block-home-logo": true,
      "block-home-logo--animate": this.props.animate,
      "block-home-logo--animate-in": this.state.logoActive,
    }

    return  (<div className={React.addons.classSet(logoClassSet)}>
              <span className="block-home-logo__content label label-logo"></span>
            </div>)
  }

})
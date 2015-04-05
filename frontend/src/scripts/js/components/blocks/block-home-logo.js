/*doc
---
title: Block Animated Home Logo
name: block animated home logo
category: JS Components
---

Block Home Logo Component

```html_example_table
<div id="block-home-logo-example-1">
</div>
<script type="text/jsx">
React.render(
  (<Components.Blocks.BlockHomeLogo></Components.Blocks.BlockHomeLogo>),
  document.getElementById('block-home-logo-example-1')
);
</script>

```


*/
var React = require("react/addons");

module.exports = React.createClass({

  mixins: [React.addons.PureRenderMixin],

  render: function() {

    var logoClassSet = {
      "block-home-logo": true,
      "block-home-logo--animate": true,
      "block-home-logo--animate-in": true,
    }

    return  (<h1 className={React.addons.classSet(logoClassSet)}>
              The Most Wonderful Time of the Year
            </h1>);

  }
});
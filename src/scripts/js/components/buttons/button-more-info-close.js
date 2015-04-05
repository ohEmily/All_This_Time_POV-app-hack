/*doc
---
title: Button More Info Close
name: button more info close
category: Buttons
---

Close button when within an more info section

```html_example_table
<div id="button-more-info-close-example-1" style="width: 300px; height: 300px;">
</div>
<script type="text/jsx">
React.render(
  (<Components.Buttons.ButtonMoreInfoClose>
    <Components.Blocks.BlockMoreInfoLabel title="synopsis">
      <blockquote className="label label-gamma label-gamma--blockquote">
        Lorem ipsum dolor<br/>
        sit amet, consectetur
      </blockquote>
    </Components.Blocks.BlockMoreInfoLabel>
  </Components.Buttons.ButtonMoreInfoClose>),
  document.getElementById('button-more-info-close-example-1')
);
</script>
```

*/

var React = require("react/addons");
var ButtonClose = require("./button-close.jsx");
var BlockAlign = require("../blocks/block-align.js");

module.exports = React.createClass({

  getDefaultProps: function() {
    return {
      modifier: null
    }
  },

  render: function() {

    var that = this;

    var classes = {
      "button" : true,
      "button-more-info-close" : true
    }

    if(this.props.modifier) {
      classes["button-more-info-close--"+this.props.modifier] = true;
    }

    return (
      <button className={React.addons.classSet(classes)} {...this.props}>
        <div className="button-more-info__inactive">
          <BlockAlign>
            {this.props.children}
          </BlockAlign>
        </div>
        <div className="button-more-info__active">
          <ButtonClose />
        </div>
      </button>
    )
  }

})
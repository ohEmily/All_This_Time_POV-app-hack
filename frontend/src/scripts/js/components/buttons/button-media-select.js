/*doc
---
title: Media Select Button
name: media select button
category: Buttons
---

Media Select Button

```html_example_table
<div id="button-media-select-example-1">
</div>
<script type="text/jsx">
React.render(
  (<Components.Buttons.ButtonMediaSelect>Behind The Scenes</Components.Buttons.ButtonMediaSelect>),
  document.getElementById('button-media-select-example-1')
);
</script>
```


```html_example_table
<div id="button-media-select-example-2">
</div>
<script type="text/jsx">
React.render(
  (<Components.Buttons.ButtonMediaSelect active={true}>Behind The Scenes</Components.Buttons.ButtonMediaSelect>),
  document.getElementById('button-media-select-example-2')
);
</script>
```

*/

var React = require("react/addons");

module.exports = React.createClass({

  getDefaultProps: function() {
    return {
      modifier: null,
      active: false
    }
  },

  render: function() {

    var classes = {
      "button" : true,
      "button-media-select" : true
    }

    if(this.props.modifier) {
      classes["button-media-select--"+this.props.modifier] = true;
    }

    if(this.props.active) {
      classes["button-media-select--active"] = true;
    }

    return  (<button className={React.addons.classSet(classes)} {...this.props}>
              <div className="button-media-select__title">
                <span className="label label-alpha">
                  {this.props.children}
                </span>
              </div>
              <div className="button-media-select__active">
                <span className="label label-gamma">playing</span>
              </div>
            </button>)
  }

})
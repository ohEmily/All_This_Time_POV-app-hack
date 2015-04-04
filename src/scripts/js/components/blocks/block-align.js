/*doc
---
title: Block Align JS
name: block align JS
category: JS Components
---

Align Component. Pass the align property, with top left right or bottom to align.

```html_example_table
<div id="block-align-example-1" style="width: 100%; height: 500px; background-color: grey">
</div>
<script type="text/jsx">
React.render(
  (<Components.Blocks.BlockAlign>
    <span className="label label-gamma">
      Please watch in Fullscreen HD mode<br/>
      Better experience with headphones
    </span>
  </Components.Blocks.BlockAlign>),
  document.getElementById('block-align-example-1')
);
</script>
```

```html_example_table
<div id="block-align-example-2" style="width: 100%; height: 500px; background-color: grey">
</div>
<script type="text/jsx">
React.render(
  (<Components.Blocks.BlockAlign align="bottom left">
    <span className="label label-gamma">
      Please watch in Fullscreen HD mode<br/>
      Better experience with headphones
    </span>
  </Components.Blocks.BlockAlign>),
  document.getElementById('block-align-example-2')
);
</script>
```

```html_example_table
<div id="block-align-example-3" style="width: 100%; height: 500px; background-color: grey">
</div>
<script type="text/jsx">
React.render(
  (<Components.Blocks.BlockAlign align="bottom">
    <span className="label label-gamma">
      Please watch in Fullscreen HD mode<br/>
      Better experience with headphones
    </span>
  </Components.Blocks.BlockAlign>),
  document.getElementById('block-align-example-3')
);
</script>
```


```html_example_table
<div id="block-align-example-4" style="width: 100%; height: 500px; background-color: grey">
</div>
<script type="text/jsx">
React.render(
  (<Components.Blocks.BlockAlign align="right">
    <span className="label label-gamma">
      Please watch in Fullscreen HD mode<br/>
      Better experience with headphones
    </span>
  </Components.Blocks.BlockAlign>),
  document.getElementById('block-align-example-4')
);
</script>
```

*/

var React = require("react/addons");

module.exports = React.createClass({

  mixins: [React.addons.PureRenderMixin],

  getDefaultProps: function() {
    return {
      align: null
    }
  },

  render: function() {

    var classSet = {
      "block-align" : true
    }

    if(this.props.align) {
      var alignments = this.props.align.split(" ");
      for(var i = 0; i<alignments.length; i++) {
        classSet["block-align--"+alignments[i]] = true;
      }
    }

    return  (<div className={React.addons.classSet(classSet)} {...this.props}>
                <div className="block-align__content">
                  {this.props.children}
                </div>
              </div>)
  }

})
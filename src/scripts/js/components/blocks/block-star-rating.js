/*doc
---
title: Block Star Rating
name: block star rating
category: JS Components
---

Star ration

```html_example_table
<div id="block-star-rating-example-1">
</div>
<script type="text/jsx">
React.render(
  (<Components.Blocks.BlockStarRating rating={4} />),
  document.getElementById('block-star-rating-example-1')
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
      rating: 5
    }
  },

  render: function() {

    var that = this;

    var classes = {
      "block-star-rating" : true
    };

    var stars = [];

    for(var i = 0; i<this.props.rating; i++) {
      stars.push(<span key={"star"+i} className="label label-icon label-icon--star"></span>)
    }

    return  (<div className={React.addons.classSet(classes)}>
              {stars}
            </div>);
  }

})
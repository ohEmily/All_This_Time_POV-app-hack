/*doc
---
title: Block Review Quote
name: block review quote
category: JS Components
---

Review Quote

```html_example_table
<div id="block-review-quote-example-1">
</div>
<script type="text/jsx">
React.render(
  (<Components.Blocks.BlockReviewQuote rating={4} source="Mr. Man">
    One hell of a movie!
    </Components.Blocks.BlockReviewQuote>),
  document.getElementById('block-review-quote-example-1')
);
</script>
```

*/

var React = require("react/addons");
var BlockStarRating = require("./block-star-rating.js");

module.exports = React.createClass({
  
  mixins: [React.addons.PureRenderMixin],

  getDefaultProps: function() {
    return {
      modifier: null,
      rating: 5,
      source: "Anon."
    }
  },

  render: function() {

    var that = this;

    var classes = {
      "block-review-quote" : true
    };

    if(this.props.modifier) {
      classes["block-review-quote--"+this.props.modifier] = true;
    }



    return  (<div className={React.addons.classSet(classes)}>
              <div className="block-review-quote__quote">
                <span className="label label-theta">&ldquo;{this.props.children}&rdquo;</span>
              </div>
              <div className="block-review-quote__source">
                <span className="label label-iota">{this.props.source}</span>
              </div>
              <div className="block-review-quote__rating">
                <BlockStarRating rating={this.props.rating} />
              </div>
            </div>);
  }

})
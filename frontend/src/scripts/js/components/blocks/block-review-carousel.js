/*doc
---
title: Block Review Carousel
name: block review carousel
category: JS Components
---

Review Carousel for the Review Quote component

```html_example_table
<div id="block-review-carousel-example-1">
</div>
<script type="text/jsx">
React.render(
  (<Components.Blocks.BlockReviewCarousel interval={4000}>
      <Components.Blocks.BlockReviewQuote rating={4} source="Mr. Man">
        One hell of a movie!
      </Components.Blocks.BlockReviewQuote>
      <Components.Blocks.BlockReviewQuote rating={5} source="Mr. Jobs">
        Pretty damn good
      </Components.Blocks.BlockReviewQuote>
      <Components.Blocks.BlockReviewQuote rating={3} source="A guy with a really long name">
        Best movie this year!
      </Components.Blocks.BlockReviewQuote>
    </Components.Blocks.BlockReviewCarousel>),
  document.getElementById('block-review-carousel-example-1')
);
</script>
```

*/

var React = require("react/addons");

module.exports = React.createClass({
  
  mixins: [React.addons.PureRenderMixin],

  intervalTimeout: null,

  getDefaultProps: function() {
    return {
      modifier: null
    }
  },

  getInitialState: function() {
    return {
      selectedIndex: 0
    }
  },

  componentDidMount: function() {
    if(this.intervalTimeout) {
      clearInterval(this.intervalTimeout);
    }
    if(this.props.interval) {
      this.intervalTimeout = setInterval(this.onInterval, this.props.interval);
    }
  },

  componentWillUnmount: function() {
    if(this.intervalTimeout) {
      clearInterval(this.intervalTimeout);
    }
  },

  onInterval: function() {
    var nextIndex = this.state.selectedIndex + 1;
    if(nextIndex>=this.props.children.length) {
      nextIndex = 0;
    }
    this.setState({
      selectedIndex: nextIndex
    })
  },

  render: function() {

    var that = this;

    var classes = {
      "block-review-carousel" : true
    };

    if(this.props.modifier) {
      classes["block-review-carousel--"+this.props.modifier] = true;
    }

    var itemPartial = null;
    var itemIndex = 0;
    if(Array.isArray(this.props.children)) {
      this.props.children.forEach(function(result) {
        if(that.state.selectedIndex===itemIndex) {
          itemPartial = result;
        }
        itemIndex++;
      });
    }else{
      itemPartial = this.props.children;
    }



    return  (<div className={React.addons.classSet(classes)}>
              <div className="block-review-carousel__content">
                <React.addons.CSSTransitionGroup
                  transitionName="block-review-carousel__animation"
                  component="div">
                  <div className="block-review-carousel__content__item" key={this.state.selectedIndex}>
                    {itemPartial}
                  </div>
                </React.addons.CSSTransitionGroup>
              </div>
            </div>);
  }

})
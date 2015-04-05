/*doc
---
title: Input Slider
name: input slider
category: Inputs
---

Input Slider Component

```html_example_table
<div id="input-slider-example-1" style="width: 300px; height: 300px;">
</div>
<script type="text/jsx">
React.render(
  (<Components.Inputs.InputSlider scrollPercent={0.5} />),
  document.getElementById('input-slider-example-1')
);
</script>

```


*/

var React = require("react/addons");
var MoutMathClamp = require("mout/math/clamp");
var ButtonScrollThumb = require("../buttons/button-scroll-thumb.jsx");

module.exports = React.createClass({

  propTypes: {
    scrollPercent: React.PropTypes.number
  },

  getDefaultProps: function() {
    return {
      modifier: null
    }
  },

  getInitialState: function() {
    return {
      isDragging : false,
      startScrollPercent: 0,
      scrollPercent: 0
    }
  },

  onScrollThumbMouseDown: function(e) {
    this.startDrag(e.pageY);
  },

  onWindowMouseUp: function(e) {
    this.stopDrag();
  },

  onWindowMouseMove: function(e) {
    this.updateDragValue(e.pageY);
  },

  startDrag: function(startYVal) {
    this.setState({
      isDragging: true,
      startYVal: startYVal,
      startScrollPercent: this.state.scrollPercent
    })
    window.addEventListener("mouseup", this.onWindowMouseUp);
    window.addEventListener("mousemove", this.onWindowMouseMove);
  },

  stopDrag: function() {
    this.setState({
      isDragging: false
    })
    window.removeEventListener("mouseup", this.onWindowMouseUp);
    window.removeEventListener("mousemove", this.onWindowMouseMove);
  },

  updateDragValue: function(yVal) {
    var scrollDiff = yVal - this.state.startYVal;
    var trackHeight = this.getDOMNode().clientHeight;
    var thumbHeight = this.refs.scrollThumb.getDOMNode().clientHeight;
    var availableHeight = trackHeight - thumbHeight;

    var scrollPercent = scrollDiff/availableHeight;
    this.updateScrollPercent(this.state.startScrollPercent + scrollPercent);
  },

  updateScrollPercent: function(scrollPercent) {
    var newScrollPercent = MoutMathClamp(scrollPercent, 0, 1);
    this.setState({
      scrollPercent: newScrollPercent
    })
  },

  componentDidMount: function () {
    this.refs.scrollThumb.getDOMNode().addEventListener("mousedown", this.onScrollThumbMouseDown);
    if(this.props.scrollPercent && this.props.scrollPercent!==this.state.scrollPercent && !this.state.isDragging) {
      this.updateScrollPercent(parseFloat(this.props.scrollPercent))
    }
  },

  componentWillUnmount: function () {
    if(this.refs.scrollThumb) this.refs.scrollThumb.getDOMNode().removeEventListener("mousedown", this.onScrollThumbMouseDown);
    window.removeEventListener("mouseup", this.onWindowMouseUp);
    window.removeEventListener("mousemove", this.onWindowMouseMove);
  },

  componentWillReceiveProps: function (nextProps) {
    if(nextProps.scrollPercent!==undefined && nextProps.scrollPercent!==null && nextProps.scrollPercent!==this.state.scrollPercent) {
      var scrollPercent = parseFloat(nextProps.scrollPercent);
      this.updateScrollPercent(scrollPercent)
    }
  },

  componentDidUpdate: function (prevProps, prevState) {
    if(this.props.onSlideUpdate && this.state.isDragging && prevState.scrollPercent!==this.state.scrollPercent) {
      this.props.onSlideUpdate({scrollPercent: this.state.scrollPercent});
    }
  },

  render: function() {

    var classes = {
      "input" : true,
      "input-slider" : true
    }

    if(this.props.modifier) {
      classes["input-slider--"+this.props.modifier] = true;
    }

    // scroll thumb
    var translateY = "translateY("+(this.state.scrollPercent*100)+"%)";
    var scrollThumbStyle = {};
    scrollThumbStyle.webkitTransform = scrollThumbStyle.mozTransform = scrollThumbStyle.msTransform = scrollThumbStyle.transform = translateY;

    var buttonScrollThumbModifier = (this.state.isDragging) ? "active" : null;

    return  (<div className={React.addons.classSet(classes)} {...this.props}>
              <ButtonScrollThumb ref="scrollThumb" style={scrollThumbStyle} modifier={buttonScrollThumbModifier} />
            </div>)
  }

})
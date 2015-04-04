/*doc
---
title: Block Scroller
name: block scroller
category: JS Components
---

Scroller Component

```html_example_table
<div id="block-scroller-example-1" style="width: 300px; height: 300px;">
</div>
<script type="text/jsx">
React.render(
  (<Components.Blocks.BlockScroller style={{padding: "10px 10px"}} trackStyle={{padding: "70px 10px"}}>
    <p>Bacon ipsum dolor amet chuck bresaola ham, frankfurter swine cupim pork loin pancetta tail pork belly tenderloin kevin drumstick jowl t-bone. Pork belly jerky pork loin boudin, pork chop cupim shoulder sausage kielbasa. Biltong hamburger fatback kielbasa porchetta swine tongue. Leberkas beef ribs t-bone short ribs, bresaola hamburger spare ribs landjaeger fatback capicola bacon shoulder pig. Porchetta short loin venison biltong flank ball tip pork cow jerky rump t-bone beef cupim. Kielbasa picanha landjaeger, shank hamburger tail prosciutto sausage turducken bresaola shankle drumstick.</p>
    <p>Prosciutto meatloaf t-bone doner ham hock. Flank strip steak ham beef pig, landjaeger turkey tri-tip alcatra cupim salami chicken rump andouille venison. Venison ham sausage biltong boudin fatback brisket spare ribs shank ground round filet mignon cupim beef pork loin meatball. Swine pastrami short loin sirloin andouille.</p>
    <p>Pork salami strip steak chicken cupim short ribs shoulder filet mignon picanha rump kevin swine. Shank beef ribs shoulder, beef t-bone boudin landjaeger frankfurter jowl pork ham hock flank pork belly turkey ball tip. Turducken tail boudin t-bone beef ribs ball tip alcatra andouille venison. Turducken cupim spare ribs kevin short ribs andouille. Shank bresaola short ribs venison, shoulder meatball picanha tenderloin capicola. Tenderloin cupim shoulder drumstick t-bone ham hock kielbasa pig.</p>
    <p>Landjaeger meatball ball tip, pastrami andouille tail short ribs kielbasa beef venison ground round drumstick capicola. Andouille bresaola meatball landjaeger, porchetta jowl prosciutto turkey frankfurter pastrami short loin beef. Ham meatloaf capicola biltong pork boudin jowl strip steak shoulder cupim. Corned beef biltong tongue meatloaf turkey shankle ribeye drumstick.</p>
  </Components.Blocks.BlockScroller>),
  document.getElementById('block-scroller-example-1')
);
</script>

```


*/
var React = require("react/addons");
var MoutMathClamp = require("mout/math/clamp");
var InputSlider = require("../inputs/input-slider.js");

module.exports = React.createClass({
  
  mixins: [React.addons.PureRenderMixin],

  currentYScroll: 0,
  viewHeight: 0,
  contentHeight: 0,
  availableHeight: 0,
  slideResetTime: 50,
  slideTimeout: null,

  getInitialState: function() {
    return {
      friction: .08,
      nextPosition: 0,
      currentPosition: 0,
      scrollPercent: 0,
      trackVisible: false
    }
  },

  getDefaultProps: function() {
    return {
      style: {},
      trackStyle: {}
    }
  },

  onMouseWheel: function(e) {
    e.preventDefault();
    e.stopPropagation();
    this.measure();
    this.updateScrollY(e.wheelDeltaY);
    return;
  },

  onSlideUpdate: function(e) {
    // this.measure();
    this.updateScrollYPercent(e.scrollPercent);
  },

  measure: function(force) {
    var force = force || false;
    if(!this.isMounted()) return;
    if(this.viewHeight===0 || this.contentHeight===0 || this.availableHeight===0 || force) {
      this.viewHeight = this.refs.body.getDOMNode().clientHeight;
      this.contentHeight = this.refs.content.getDOMNode().clientHeight;
      this.availableHeight = this.contentHeight - this.viewHeight;
    }
  },

  updateScrollY: function(yScroll) {
    this.currentYScroll += yScroll;
    if(this.currentYScroll>0) {
      this.currentYScroll = 0;
    }else if(this.currentYScroll<= -this.availableHeight) {
      this.currentYScroll = -this.availableHeight;
    }
    this.updatePosition(this.currentYScroll);
  },

  updateScrollYPercent: function(yPercent) {
    var yScroll = -(this.availableHeight * yPercent);
    this.currentYScroll = yScroll;
    this.updatePosition(yScroll);
  },

  updatePosition: function(newPosition) {

    // var computedStyle = window.getComputedStyle(this.refs.content.getDOMNode());
    // var worthwhileHeight = this.contentHeight - parseInt(computedStyle.getPropertyValue('padding-top'));

    // if(worthwhileHeight < this.viewHeight) {
    //   this.setState({
    //     trackVisible: false
    //   });
    //   return;
    // }

    if(newPosition<-this.availableHeight) {
      newPosition = -this.availableHeight;
    }else if(newPosition>0) {
      newPosition = 0;
    }

    this.setState({
      nextPosition: newPosition,
      trackVisible: true
    });

    if(!this.animationFrame) requestAnimationFrame( this.animationLoop )
  },

  animationLoop: function() {

    var nextPosition = this.state.nextPosition;

    var $container = this.getDOMNode();

    var newCurrentPosition = this.state.currentPosition;
    var newScrollPercent;
    var newScrollHeight;

    newCurrentPosition  += (nextPosition - newCurrentPosition) * this.state.friction;

    this.setState({
      currentPosition : newCurrentPosition,
    })

    // TODO, work out how to detect end of scroll animation
    if(Math.abs(nextPosition-newCurrentPosition)<0.1) {
      this.setState({
        currentPosition : nextPosition,
      })
      this.animationFrame = null;
      return;
    }

    if(this.animationFrame) cancelAnimationFrame(this.animationFrame);
    this.animationFrame = requestAnimationFrame( this.animationLoop )
  },

  componentWillUnmount: function () {
    this.getDOMNode().removeEventListener("mousewheel", this.onMouseWheel);
    if(this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
  },

  componentDidMount: function () {
    this.getDOMNode().addEventListener("mousewheel", this.onMouseWheel);
    // this.measure();
    this.updateScrollY(0);

    // // hack, so the measurement updates once the fonts have loaded
    // var that = this;
    // setTimeout(function() {
    //   // that.measure(true);
    //   that.updateScrollY(0);
    // }, 300);
  },

  render: function() {

    var currentPercent = -(this.state.nextPosition/this.availableHeight);

    var scrollStyle = this.props.style;
    scrollStyle.webkitTransform = scrollStyle.mozTransform = scrollStyle.msTransform = scrollStyle.transform = "translateY("+this.state.currentPosition+"px)";

    var scrollTrackStyle = this.props.trackStyle;
    scrollTrackStyle.display = (this.state.trackVisible) ? "block" : "none"

    return  (<div className="block-scroller">

                <div className="block-scroller__body" ref="body">
                  <div className="block-scroller__body__content" ref="content" style={scrollStyle}>
                    {this.props.children}
                  </div>
                </div>
                <div className="block-scroller__track" style={scrollTrackStyle}>
                  <InputSlider onSlideUpdate={this.onSlideUpdate} scrollPercent={currentPercent} />
                </div>
              </div>)
  }

})
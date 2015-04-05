/*doc
---
title: Block TV Filter Simple
name: block tv filter simple
category: JS Components
---

Block TV Filter component

```html_example_table
<div id="block-tv-filter-simple-example-1" style="display: block; width: 500px; height: 300px;">
</div>
<script type="text/jsx">
React.render(
  (<Components.Blocks.BlockTVFilterSimple
                          srcWebM="/assets/video/homepage_vid.webm"
                          srcMP4="/assets/video/homepage_vid.mp4">
                        </Components.Blocks.BlockTVFilterSimple>),
  document.getElementById('block-tv-filter-simple-example-1')
);
</script>

```


*/


var React = require("react/addons");

module.exports = React.createClass({


  video: null,

  componentDidMount: function () {
    window.addEventListener("resize", this.onWindowResize);
  },

  updateSize: function() {
  },

  componentWillUnmount: function () {
    window.removeEventListener("resize", this.onWindowResize);
  },

  onWindowResize: function(e) {
    this.updateSize();
  },

  shouldComponentUpdate: function (nextProps, nextState) {
    return false;
  },

  render: function() {

    var videoStyle = {
      'width' : '100%',
      'height': '100%',
      'object-fit': 'cover'
    }

    var videoPartial = null;
    videoPartial = (<video autoPlay loop style={videoStyle}>
                      <source type="video/webm" src={this.props.srcWebM} />
                      <source type="video/mp4" src={this.props.srcMP4} />
                    </video>);

    return (<div className="block-tv-filter">
              {videoPartial}
            </div>)
  }

})
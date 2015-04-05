/*doc
---
title: Block Tabbed Pane
name: block tabbed pane
category: JS Components
---

Navigation Group. same function as a radio button in html, but set the selected button to active (via a prop)

```html_example_table
<div id="block-tabbed-pane-example-1" style="width: 100%; height: 450px;">
</div>
<script type="text/jsx">
React.render(
  (<Components.Blocks.BlockTabbedPane tabs={["one", "two", "three", "four"]}>
    <img src="http://www.placebear.com/400/300" />
    <img src="http://www.placebear.com/399/300" />
    <img src="http://www.placebear.com/401/300" />
    <img src="http://www.placebear.com/g/402/300" />
  </Components.Blocks.BlockTabbedPane>),
  document.getElementById('block-tabbed-pane-example-1')
);
</script>
```

*/

var React = require("react/addons");
var NavigationTabGroup = require("../navigation/navigation-tab-group.js");
var ButtonMediaSelect = require("../buttons/button-media-select.js");

module.exports = React.createClass({
  
  mixins: [React.addons.PureRenderMixin],

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

  onSelectChange: function(e) {
    this.setState({
      selectedIndex: e.selectedIndex
    });
  },

  render: function() {

    var that = this;

    var classes = {
      "block-tabbed-pane" : true
    }

    if(this.props.modifier) {
      classes["block-tabbed-pane--"+this.props.modifier] = true;
    }

    var navigationPartial = null;
    var navigationContentPartial = [];
    var itemPartial = null;
    var itemIndex = 0;

    this.props.tabs.forEach(function(result) {
      navigationContentPartial.push(<ButtonMediaSelect>{result}</ButtonMediaSelect>);
    });
    navigationPartial = (<NavigationTabGroup onSelectChange={that.onSelectChange} selectedIndex={this.state.selectedIndex}>{navigationContentPartial}</NavigationTabGroup>);

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

    return  (<div className="block-tabbed-pane">
              <div className="block-tabbed-pane__navigation">
                {navigationPartial}
              </div>
              <div className="block-tabbed-pane__content">
                <React.addons.CSSTransitionGroup
                  transitionName="block-tabbed-pane__animation"
                  component="div">
                  <div className="block-tabbed-pane__content__item" key={this.state.selectedIndex}>
                    {itemPartial}
                  </div>
                </React.addons.CSSTransitionGroup>
              </div>
            </div>);
  }

})
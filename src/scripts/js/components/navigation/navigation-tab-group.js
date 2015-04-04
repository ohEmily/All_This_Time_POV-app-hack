/*doc
---
title: Navigation Tab Group
name: navigation tab group
category: Navigation
---

Navigation Group. same function as a radio button in html, but set the selected button to active (via a prop)

```html_example_table
<div id="navigation-tab-group-example-1">
</div>
<script type="text/jsx">
React.render(
  (<Components.Navigation.NavigationTabGroup>
    <Components.Buttons.ButtonMediaSelect>Trailer</Components.Buttons.ButtonMediaSelect>
    <Components.Buttons.ButtonMediaSelect>Making Of</Components.Buttons.ButtonMediaSelect>
    <Components.Buttons.ButtonMediaSelect>Pitch</Components.Buttons.ButtonMediaSelect>
    <Components.Buttons.ButtonMediaSelect>Bonus</Components.Buttons.ButtonMediaSelect>
  </Components.Navigation.NavigationTabGroup>),
  document.getElementById('navigation-tab-group-example-1')
);
</script>
```


```html_example_table
<div id="navigation-tab-group-example-2">
</div>
<script type="text/jsx">
React.render(
  (<Components.Navigation.NavigationTabGroup>
    <Components.Buttons.ButtonMediaSelect>Loner Item</Components.Buttons.ButtonMediaSelect>
  </Components.Navigation.NavigationTabGroup>),
  document.getElementById('navigation-tab-group-example-2')
);
</script>
```

*/

var React = require("react/addons");

module.exports = React.createClass({

  getDefaultProps: function() {
    return {
      modifier: null
    }
  },

  getInitialState: function() {
    return {
      selectedIndex: -1
    }
  },

  setSelectedIndex: function(index) {
    if(Array.isArray(this.props.children)) {
      if(this.props.children.length<=index) return;
    }else{
      if(index!==0) return;
    }
    this.setState({
      selectedIndex: index
    })
  },

  onRadioButtonItemClick: function(index) {
    this.setSelectedIndex(index);
  },

  componentWillMount: function () {
    if(this.props.selectedIndex!==null || this.props.selectedIndex!==undefined) {
      this.setSelectedIndex(this.props.selectedIndex);
    }
  },

  componentDidUpdate: function (prevProps, prevState) {
    if(this.state.selectedIndex!==prevState.selectedIndex && this.props.onSelectChange) {
      this.props.onSelectChange({selectedIndex: this.state.selectedIndex});
    }
  },

  componentWillReceiveProps: function (nextProps) {
    if((nextProps.selectedIndex!==null || nextProps.selectedIndex!==undefined) &&
        nextProps.selectedIndex!==this.state.selectedIndex) {
      this.setSelectedIndex(nextProps.selectedIndex);
    }
  },

  render: function() {

    var classes = {
      "navigation" : true,
      "navigation-tab-group" : true
    }

    if(this.props.modifier) {
      classes["navigation-tab-group--"+this.props.modifier] = true;
    }

    var items = [];
    var itemIndex = 0;

    if(Array.isArray(this.props.children)) {
      var that =this;
      this.props.children.forEach(function(result) {
        var active = (that.state.selectedIndex===itemIndex);
        var clonedComponent = React.addons.cloneWithProps(result, {active: active, onClick: that.onRadioButtonItemClick.bind(this, itemIndex)})
        items.push(<li className="navigation-tab-group__item" key={"navigation-tab-group-item-"+itemIndex}>{clonedComponent}</li>)
        itemIndex++;
      });
    }else{
      var active = (this.state.selectedIndex===0);
      var clonedComponent = React.addons.cloneWithProps(this.props.children, {active: active, onClick: this.onRadioButtonItemClick.bind(this, 0)})
      items = <li className="navigation-tab-group__item">{clonedComponent}</li>;
    }

    return  (<ul className="navigation navigation-tab-group">
              {items}
            </ul>);
  }

})
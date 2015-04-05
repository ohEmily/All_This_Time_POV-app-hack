/*doc
---
title: Button Cast Member
name: button cast member
category: Buttons
---

Cast Member button used in the relevant more info section

```html_example_table
<div id="button-cast-member-example-1">
</div>
<script type="text/jsx">
React.render(
  (<Components.Buttons.ButtonCastMember actor="Job Bloggs" character="Homer Simpson" />),
  document.getElementById('button-cast-member-example-1')
);
</script>
```



```html_example_table
<div id="button-cast-member-example-2">
</div>
<script type="text/jsx">
React.render(
  (<Components.Buttons.ButtonCastMember active={true} actor="Job Bloggs" character="Homer Simpson" />),
  document.getElementById('button-cast-member-example-2')
);
</script>
```

*/

var React = require("react/addons");

module.exports = React.createClass({

  getDefaultProps: function() {
    return {
      modifier: null,
      active: false,
      href: "#"
    }
  },

  render: function() {

    var classes = {
      "button" : true,
      "button-cast-member" : true
    }

    if(this.props.modifier) {
      classes["button-cast-member--"+this.props.modifier] = true;
    }

    if(this.props.active) {
      classes["button-cast-member--active"] = true;
    }

    var characterPartial = null;
    if(this.props.character) {
      characterPartial = (<div className="button-cast-member__character">
                            <span className="label label-gamma label-gamma--wide">{this.props.character}</span>
                          </div>);
    }

    return  (<button className={React.addons.classSet(classes)} {...this.props}>
              <div className="button-cast-member__actor">
                <span className="label label-alpha label-alpha--large">
                  {this.props.actor}<br/>
                </span>
              </div>
              {characterPartial}
            </button>)
  }

})
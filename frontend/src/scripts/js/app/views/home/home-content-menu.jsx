var React = require("react");
var Components = require("../../../components/index.jsx");
var AppActions = require("../../actions/app-actions.js");

module.exports = React.createClass({

  mixins: [React.addons.PureRenderMixin],

  onChapterClick: function(chapter) {
    console.log('this.props.onChapterSelect: '+this.props.onChapterSelect);
    console.log('chapter: '+chapter);
    if(this.props.onChapterSelect) {
      this.props.onChapterSelect(chapter);
    }
  },

  render: function() {

    return  (<div className="home-content-menu">
              <Components.Blocks.BlockAlign>
                <ul className="home-content-menu__list">
                  <li className="home-content-menu__list__item">
                    <Components.Buttons.ButtonBeta onClick={this.onChapterClick.bind(this, 1)}>I want to cry</Components.Buttons.ButtonBeta>
                  </li>
                  <li className="home-content-menu__list__item">
                    <Components.Buttons.ButtonBeta onClick={this.onChapterClick.bind(this, 2)}>I want to laugh</Components.Buttons.ButtonBeta>
                  </li>
                  <li className="home-content-menu__list__item">
                    <Components.Buttons.ButtonBeta onClick={this.onChapterClick.bind(this, 3)}>I want to think</Components.Buttons.ButtonBeta>
                  </li>
                  <li className="home-content-menu__list__item">
                    <Components.Buttons.ButtonBeta onClick={this.onChapterClick.bind(this, 4)}>I want to do all these things together</Components.Buttons.ButtonBeta>
                  </li>
                </ul>
              </Components.Blocks.BlockAlign>
            </div>);
  }

})
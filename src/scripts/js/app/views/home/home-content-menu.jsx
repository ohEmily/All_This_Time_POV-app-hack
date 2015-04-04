var React = require("react");
var Components = require("../../../components/index.jsx");

module.exports = React.createClass({

  mixins: [React.addons.PureRenderMixin],

  render: function() {

    return  (<div className="home-content-menu">
              <Components.Blocks.BlockAlign>
                <ul className="home-content-menu__list">
                  <li className="home-content-menu__list__item">
                    <Components.Buttons.ButtonBeta>I want to cry</Components.Buttons.ButtonBeta>
                  </li>
                  <li className="home-content-menu__list__item">
                    <Components.Buttons.ButtonBeta>I want to laugh</Components.Buttons.ButtonBeta>
                  </li>
                  <li className="home-content-menu__list__item">
                    <Components.Buttons.ButtonBeta>I want to think</Components.Buttons.ButtonBeta>
                  </li>
                  <li className="home-content-menu__list__item">
                    <Components.Buttons.ButtonBeta>I want to do all these things together</Components.Buttons.ButtonBeta>
                  </li>
                </ul>
              </Components.Blocks.BlockAlign>
            </div>);
  }

})
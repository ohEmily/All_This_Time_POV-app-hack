var React = require("react/addons");
var ButtonBeta = require("../buttons/button-beta.jsx");

module.exports = React.createClass({
  
  mixins: [React.addons.PureRenderMixin],

  getDefaultProps: function() {
    return {
      modifier: null
    }
  },

  render: function() {

    return  (<ul className="block-top-nav">
                <li className="block-top-nav__item">
                  <ButtonBeta active={true}>Home</ButtonBeta>
                </li>
                <li className="block-top-nav__item">
                  <ButtonBeta href="#info">More Info</ButtonBeta>
                </li>
                <li className="block-top-nav__item">
                  <ButtonBeta href="#watch">Watch The Movie</ButtonBeta>
                </li>
            </ul>)
  }

})
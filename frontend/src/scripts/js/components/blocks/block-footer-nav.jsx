var React = require("react/addons");
var ButtonGamma = require("../buttons/button-gamma.jsx");

module.exports = React.createClass({
  
  mixins: [React.addons.PureRenderMixin],

  render: function() {

    return  (<ul className="block-footer-nav">
                <li className="block-footer-nav__item">
                  <ButtonGamma href="http://www.imdb.com/title/tt3305328/ratings" target="_blank">Rate On IMDB</ButtonGamma>
                </li>
                <li className="block-footer-nav__item">
                  <ButtonGamma>Credits</ButtonGamma>
                </li>
                <li className="block-footer-nav__item">
                  <ButtonGamma>Help</ButtonGamma>
                </li>
                <li className="block-footer-nav__item">
                  <ButtonGamma>En</ButtonGamma>
                </li>
            </ul>)
  }

})
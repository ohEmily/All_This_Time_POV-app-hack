var React = require("react/addons");
var ButtonIcon = require("../buttons/button-icon.jsx");

module.exports = React.createClass({
  
  mixins: [React.addons.PureRenderMixin],

  onFacebookClick: function() {
    this.popupwindow('http://www.facebook.com', 'Share', 500, 500);
  },

  onTwitterClick: function() {
    this.popupwindow('http://www.twitter.com', 'Share', 500, 500);
  },

  popupwindow: function(url, title, w, h) {
    var left = (screen.width/2)-(w/2);
    var top = (screen.height/2)-(h/2);
    return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
  },

  render: function() {
    
    googlePlusPartial = null;
    // googlePlusPartial= (<li className="block-header-nav__item">
    //                         <ButtonIcon modifier="gplus" />
    //                       </li>);

    return  (<ul className="block-header-nav">
                <li className="block-header-nav__item">
                  <ButtonIcon modifier="facebook" onClick={this.onFacebookClick} />
                </li>
                <li className="block-header-nav__item">
                  <ButtonIcon modifier="twitter" onClick={this.onTwitterClick} />
                </li>
                {googlePlusPartial}
            </ul>)
  }

})
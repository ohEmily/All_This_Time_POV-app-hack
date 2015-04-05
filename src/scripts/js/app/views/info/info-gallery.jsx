var React = require("react");
var Components = require("../../../components/index.jsx");
var imageBG = require("../../../../../assets/images/info/gallery/gallery-bg.jpg");

module.exports = React.createClass({

  onMoreInfoCloseClick: function(e) {
    e.preventDefault();
    e.stopPropagation();

    if(this.props.onCloseClick) {
      this.props.onCloseClick(e);
    }
  },

  render: function() {

    return (<div className="info-page__body info-page__body--gallery" key="gallery">

              <div className="info-page__body__bg">
                <Components.Blocks.BlockTVFilter
                  visible={true}
                  srcPoster={imageBG} />
              </div>

              <div className="grid no-gutters info-page__body__grid info-page-gallery">
                <div className="unit two-thirds info-page__body__grid__item">

                </div>
                <div className="unit one-third info-page__body__grid__item">

                   <Components.Buttons.ButtonMoreInfo
                      id="stills"
                      background="./assets/images/info/gallery/stills-bg.jpg">
                        <Components.Blocks.BlockMoreInfoLabel title="Movie Stills">
                          <p className="label label-gamma label-gamma--blockquote">
                            Lorem ipsum dolor<br/>
                            sit amet, consectetur
                          </p>
                        </Components.Blocks.BlockMoreInfoLabel>
                    </Components.Buttons.ButtonMoreInfo>

                </div>
                <div className="unit one-third info-page__body__grid__item">

                  <Components.Buttons.ButtonMoreInfoClose
                    onClick={this.onMoreInfoCloseClick}>
                    <Components.Blocks.BlockMoreInfoLabel title="Gallery">
                      <blockquote className="label label-gamma label-gamma--blockquote">
                        View all the stills<br/>
                        and behind the scenes from Anomaly
                      </blockquote>
                    </Components.Blocks.BlockMoreInfoLabel>
                  </Components.Buttons.ButtonMoreInfoClose>

                </div>

                <div className="unit one-third info-page__body__grid__item">

                  <Components.Blocks.BlockAlign>
                    <Components.Blocks.BlockMoreInfoLabel
                      footer="SALOMON LIGTHELM">
                      <p className="label label-gamma label-gamma--blockquote label-gamma--uppercase">
                        Directors Words
                      </p>
                      <p className="label label-gamma">
                        Nam eu sollicitudin tortor. Praesent ac neque justo<br/>
                        Ut pellentesque dignissim arcu, eu accumsan<br/>
                        justo imperdiet ut. Nulla ultricies et<br/>
                        turpis elementum, sit amet ornare lorem luctus.
                      </p>
                    </Components.Blocks.BlockMoreInfoLabel>
                  </Components.Blocks.BlockAlign>

                </div>


                <div className="unit one-third info-page__body__grid__item">

                  <Components.Buttons.ButtonMoreInfo
                    id="behind-the-scenes"
                    background="./assets/images/info/gallery/behind-the-scenes-bg.jpg">
                      <Components.Blocks.BlockMoreInfoLabel title="Behind the Scenes">
                        <p className="label label-gamma label-gamma--blockquote">
                          Lorem ipsum dolor<br/>
                          sit amet, consectetur
                        </p>
                      </Components.Blocks.BlockMoreInfoLabel>
                  </Components.Buttons.ButtonMoreInfo>

                </div>

              </div>

            </div>);
  }

})
var React = require("react");
var Components = require("../../../components/index.jsx");
var imageBG = require("../../../../../assets/images/info/videos/videos-bg.jpg");

module.exports = React.createClass({

  onMoreInfoCloseClick: function(e) {
    e.preventDefault();
    e.stopPropagation();
    if(this.props.onCloseClick) this.props.onCloseClick(e);
  },

  render: function() {

    return (<div className="info-page__body info-page__body--videos" key="videos">

              <div className="info-page__body__bg">
                <Components.Blocks.BlockTVFilter
                  visible={true}
                  srcPoster={imageBG} />
              </div>

              <div className="grid no-gutters info-page__body__grid info-page-videos">
                <div className="unit two-thirds info-page__body__grid__item info-page__body__grid__item--tall">

                  <div className="info-page-videos__content">
                    <Components.Blocks.BlockAlign>
                      <div className="info-page-videos__content__inner">
                      <Components.Blocks.BlockTabbedPane tabs={["Trailer", "Behind the scenes", "Pitch"]}>
                        <iframe src="//player.vimeo.com/video/114991185?title=0&amp;byline=0&amp;portrait=0&amp;color=ffffff" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
                        <iframe src="//player.vimeo.com/video/116057902?title=0&amp;byline=0&amp;portrait=0&amp;color=ffffff" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
                        <iframe src="//player.vimeo.com/video/68631585?title=0&amp;byline=0&amp;portrait=0&amp;color=ffffff" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
                      </Components.Blocks.BlockTabbedPane>
                      </div>
                    </Components.Blocks.BlockAlign>
                  </div>

                </div>
                <div className="unit one-third info-page__body__grid__item info-page__body__grid__item--tall">

                   <div className="grid no-gutters info-page__body__grid">

                      <div className="unit whole info-page__body__grid__item">

                        <Components.Buttons.ButtonMoreInfoClose
                          onClick={this.onMoreInfoCloseClick}>
                          <Components.Blocks.BlockMoreInfoLabel title="Videos">
                            <blockquote className="label label-gamma label-gamma--blockquote">
                              Trailer, Making-of, the pitch
                            </blockquote>
                          </Components.Blocks.BlockMoreInfoLabel>
                        </Components.Buttons.ButtonMoreInfoClose>

                      </div>

                      <div className="unit whole info-page__body__grid__item">

                        <Components.Blocks.BlockAlign>
                          <Components.Blocks.BlockMoreInfoLabel
                            footer="DAN DIFELICE">
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

                    </div>

                </div>

              </div>

            </div>);
  }

})
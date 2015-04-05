var React = require("react");
var Components = require("../../../components/index.jsx");
var MoreInfoDownloads = require("./info-downloads.jsx");
var MoreInfoSynopsis = require("./info-synopsis.jsx");
var MoreInfoCast = require("./info-cast.jsx");
var MoreInfoGallery = require("./info-gallery.jsx");
var MoreInfoVideos = require("./info-videos.jsx");

module.exports = React.createClass({

  mixins: [React.addons.PureRenderMixin],

  onMoreInfoClick: function(e) {
    e.preventDefault();
    e.stopPropagation();

    if(e.currentTarget.id) {
      this.setState({
        detail: true,
        detailSection: e.currentTarget.id
      })
    }
  },

  onMoreInfoCloseClick: function(e) {
    e.preventDefault();
    e.stopPropagation();

    this.setState({
      detail: false,
      detailSection: null
    })
  },

  getInitialState: function() {
    return {
      detail: false
    }
  },

  renderDownloadsPartial: function() {
    var detailPartial = <MoreInfoDownloads onCloseClick={this.onMoreInfoCloseClick} />
    return detailPartial;
  },


  renderVideosPartial: function() {
    var detailPartial = <MoreInfoVideos onCloseClick={this.onMoreInfoCloseClick} />
    return detailPartial;
  },


  renderGalleryPartial: function() {
    var detailPartial = <MoreInfoGallery onCloseClick={this.onMoreInfoCloseClick} />
    return detailPartial;
  },

  renderSypnosisPartial: function() {
    var detailPartial =   <MoreInfoSynopsis onCloseClick={this.onMoreInfoCloseClick} />
    return detailPartial;
  },

  renderCastPartial: function() {
    var detailPartial =  <MoreInfoCast onCloseClick={this.onMoreInfoCloseClick} />;
    return detailPartial;
  },

  render: function() {

    console.log("render info page");

    var overviewPartial = (<div className="grid no-gutters info-page__body__grid">
                            <div className="unit one-third info-page__body__grid__item info-page__body__grid__item--tall">
                              <Components.Buttons.ButtonMoreInfo
                                id="videos"
                                modifier="alpha"
                                background="./assets/images/info/home/videos.jpg"
                                video="./assets/video/info/home/videos.mp4"
                                onClick={this.onMoreInfoClick}>
                                  <Components.Blocks.BlockAlign align="top">
                                    <Components.Blocks.BlockMoreInfoLabelAlpha title="Videos">
                                      Trailer<br/>Behind the scenes<br/>the pitch
                                    </Components.Blocks.BlockMoreInfoLabelAlpha>
                                  </Components.Blocks.BlockAlign>
                              </Components.Buttons.ButtonMoreInfo>
                            </div>
                            <div className="unit one-third info-page__body__grid__item info-page__body__grid__item--tall">

                              <div className="grid no-gutters info-page__body__grid">
                                <div className="unit whole info-page__body__grid__item">

                                  <Components.Buttons.ButtonMoreInfo
                                    id="gallery"
                                    background="./assets/images/info/home/gallery.jpg"
                                    video="./assets/video/info/home/gallery.mp4"
                                    onClick={this.onMoreInfoClick}>
                                      <Components.Blocks.BlockMoreInfoLabel title="Gallery">
                                        <blockquote className="label label-gamma label-gamma--blockquote">
                                          View all the stills<br/>
                                          and behind the scenes from Anomaly
                                        </blockquote>
                                      </Components.Blocks.BlockMoreInfoLabel>
                                  </Components.Buttons.ButtonMoreInfo>


                                </div>
                                <div className="unit whole info-page__body__grid__item">

                                  <Components.Buttons.ButtonMoreInfo
                                    id="cast"
                                    background="./assets/images/info/home/cast.jpg"
                                    video="./assets/video/info/home/cast.mp4"
                                    onClick={this.onMoreInfoClick}>
                                      <Components.Blocks.BlockMoreInfoLabel title="Cast & Crew">
                                        <blockquote className="label label-gamma label-gamma--blockquote">
                                          See full cast and crew credits
                                        </blockquote>
                                      </Components.Blocks.BlockMoreInfoLabel>
                                  </Components.Buttons.ButtonMoreInfo>

                                </div>
                              </div>

                            </div>
                            <div className="unit one-third info-page__body__grid__item info-page__body__grid__item--tall" style={{marginLeft: -1}}>

                              <div className="grid no-gutters info-page__body__grid">
                                <div className="unit whole info-page__body__grid__item">


                                  <Components.Buttons.ButtonMoreInfo
                                    id="synopsis"
                                    background="./assets/images/info/home/synopsis.jpg"
                                    video="./assets/video/info/home/synopsis.mp4"
                                    onClick={this.onMoreInfoClick}>
                                      <Components.Blocks.BlockMoreInfoLabel title="Synopsis">
                                        <blockquote className="label label-gamma label-gamma--blockquote">
                                          Official synopsis of the movie
                                        </blockquote>
                                      </Components.Blocks.BlockMoreInfoLabel>
                                  </Components.Buttons.ButtonMoreInfo>

                                </div>
                                <div className="unit whole info-page__body__grid__item">

                                  <Components.Buttons.ButtonMoreInfo
                                    id="downloads"
                                    background="./assets/images/info/home/downloads.jpg"
                                    video="./assets/video/info/home/downloads.mp4"
                                    onClick={this.onMoreInfoClick}>
                                      <Components.Blocks.BlockMoreInfoLabel title="Downloads">
                                        <blockquote className="label label-gamma label-gamma--blockquote">
                                          Welcome to the goodies section
                                        </blockquote>
                                      </Components.Blocks.BlockMoreInfoLabel>
                                  </Components.Buttons.ButtonMoreInfo>

                                </div>
                              </div>

                            </div>
                          </div>);

    var detailPartial =  null;
    var innerPartial = null;

    var overviewStyle = {
      display: 'block'
    }

    switch(this.state.detailSection) {
      case "downloads":
        detailPartial = this.renderDownloadsPartial();
        innerPartial = detailPartial;
        overviewStyle.display = 'none';
      break;
      case "videos":
        detailPartial = this.renderVideosPartial();
        innerPartial = detailPartial;
        overviewStyle.display = 'none';
      break;
      case "gallery":
        detailPartial = this.renderGalleryPartial();
        innerPartial = detailPartial;
        overviewStyle.display = 'none';
      break;
      case "synopsis":
        detailPartial = this.renderSypnosisPartial();
        innerPartial = detailPartial;
        overviewStyle.display = 'none';
      break;
      case "cast":
        detailPartial = this.renderCastPartial();
        innerPartial = detailPartial;
        overviewStyle.display = 'none';
      break;
    }

    return (<div className="info-page">
              <div style={overviewStyle}>
                {overviewPartial}
              </div>
              {innerPartial}
              <div className="info-page__hud">
                <div className="info-page__hud__logo">
                  <span className="label label-logo label-logo--extra-small"></span>
                </div>
              </div>
            </div>);
  }

})
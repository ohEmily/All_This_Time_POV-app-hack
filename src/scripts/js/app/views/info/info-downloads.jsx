var React = require("react");
var Components = require("../../../components/index.jsx");
var DataDownloads = require("json!../../../../../assets/data/downloads.json");
var imageBG = require("../../../../../assets/images/info/downloads/downloads-bg.jpg");

module.exports = React.createClass({

  getInitialState: function() {
    return {
      selectedCategoryId: null,
      selectedThemeIndex: 0,
    }
  },

  onMoreInfoCloseClick: function(e) {
    e.preventDefault();
    e.stopPropagation();

    if(this.props.onCloseClick) {
      this.props.onCloseClick(e);
    }
  },

  onDownloadCategoryClick: function(itemName) {
    this.setState({
      selectedCategoryId: itemName,
      selectedThemeIndex: 0
    })
  },

  getDataCategoryThemeItems: function(id, themeIndex) {
    for(var i = 0; i<DataDownloads.length; i++) {
      var categoryId = DataDownloads[i].id;
      var categoryItems = DataDownloads[i].items;
      if(id===categoryId) {
        return categoryItems[themeIndex];
      }
    }
    return null;
  },

  renderDownloadCategoryPartial: function() {
    var downloadCategoryPartial = null;
    var downloadCategoryItems = [];
    for(var i = 0; i<DataDownloads.length; i++) {
      var categoryId = DataDownloads[i].id;
      var categoryName = DataDownloads[i].name;
      var active = Boolean(this.state.selectedCategoryId===categoryId);
      var itemPartial = (<div className="unit half align-left" key={"category"+i}>
                          <Components.Buttons.ButtonDelta href="#" modifier="blockquote" active={active} onClick={this.onDownloadCategoryClick.bind(this, categoryId)}>{categoryName}</Components.Buttons.ButtonDelta>
                        </div>);
      downloadCategoryItems.push(itemPartial);
    }

    downloadCategoryPartial = (<Components.Blocks.BlockAlign>
                                <div className="info-page-downloads__menu">
                                  <div className="grid">
                                    {downloadCategoryItems}
                                  </div>
                                </div>
                              </Components.Blocks.BlockAlign>);
    return downloadCategoryPartial;
  },

  renderDownloadItemsPartial: function() {

    if(!this.state.selectedCategoryId) return null;

    var theme = this.getDataCategoryThemeItems(this.state.selectedCategoryId, this.state.selectedThemeIndex);

    var downloadItemsPartial = null;
    var downloadItemsItems = [];

    // title
    var itemPartial = (<div className="unit whole" key={"items"+i}>
                          <span className="label label-gamma label-gamma--blockquote">
                            {theme.title.toUpperCase()}
                          </span>
                        </div>);
    downloadItemsItems.push(itemPartial);

    for(var i = 0; i<theme.sizes.length; i++) {
      var item = theme.sizes[i];
      var itemTitle = item.title;
      var itemSrc = item.src;
      var itemPartial = (<div className="unit whole" key={"items"+i}>
                            <Components.Buttons.ButtonDelta href={itemSrc} target="_blank">{itemTitle}</Components.Buttons.ButtonDelta>
                          </div>);
      downloadItemsItems.push(itemPartial);
    }

    downloadItemsPartial = (<div className="info-page-downloads__list" key={"info-page-downloads__list"+this.state.selectedCategoryId}>
                              <Components.Blocks.BlockAlign>
                                <div className="info-page-downloads__list__inner grid">
                                  {downloadItemsItems}
                                </div>
                              </Components.Blocks.BlockAlign>
                            </div>);
    return downloadItemsPartial;
  },

  render: function() {

    return (<div className="info-page__body info-page__body--downloads" key="downloads">

              <div className="info-page__body__bg">
                <Components.Blocks.BlockTVFilter
                  visible={true}
                  srcPoster={imageBG} />
              </div>

              <div className="grid no-gutters info-page__body__grid info-page-downloads">
                <div className="unit one-third info-page__body__grid__item info-page__body__grid__item--tall">

                </div>
                <div className="unit one-third info-page__body__grid__item info-page__body__grid__item--tall">

                   <div className="grid no-gutters info-page__body__grid">

                      <div className="unit whole info-page__body__grid__item">

                          <React.addons.CSSTransitionGroup
                              transitionName="global-animation__transition-alpha"
                              component="div">
                                {this.renderDownloadItemsPartial()}
                          </React.addons.CSSTransitionGroup>

                      </div>
                      <div className="unit whole info-page__body__grid__item">

                        {this.renderDownloadCategoryPartial()}

                      </div>

                    </div>

                </div>
                <div className="unit one-third info-page__body__grid__item info-page__body__grid__item--tall">

                   <div className="grid no-gutters info-page__body__grid">

                      <div className="unit whole info-page__body__grid__item">

                        <Components.Buttons.ButtonMoreInfoClose
                          onClick={this.onMoreInfoCloseClick}>
                          <Components.Blocks.BlockMoreInfoLabel title="Downloads">
                            <blockquote className="label label-gamma label-gamma--blockquote">
                              Welcome to the goodies section
                            </blockquote>
                          </Components.Blocks.BlockMoreInfoLabel>
                        </Components.Buttons.ButtonMoreInfoClose>

                      </div>

                      <div className="unit whole info-page__body__grid__item">

                        <Components.Blocks.BlockAlign>
                          <Components.Blocks.BlockMoreInfoLabel>
                            <p className="label label-gamma label-gamma--blockquote label-gamma--uppercase">
                              Note
                            </p>
                            <p className="label label-gamma">
                              More downloads are coming soon
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
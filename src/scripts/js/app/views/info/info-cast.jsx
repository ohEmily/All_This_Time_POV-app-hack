var React = require("react");
var Components = require("../../../components/index.jsx");
var DataCastCredits = require("json!../../../../../assets/data/cast-credits.json");
var DataCast = require("json!../../../../../assets/data/cast.json");
var DataCrew = require("json!../../../../../assets/data/crew.json");
var imageBG = require("../../../../../assets/images/info/cast/cast-bg.jpg");

module.exports = React.createClass({

  getInitialState: function() {
    return {
      selectedCastId: 1
    }
  },

  onMoreInfoCloseClick: function(e) {
    e.preventDefault();
    e.stopPropagation();
    if(this.props.onCloseClick) this.props.onCloseClick(e);
  },

  onMouseWheel:  function(e) {
    e.preventDefault();
    e.stopPropagation();
  },

  onCastMemberClick: function(id) {
    this.setState({
      selectedCastId: id
    })
  },

  componentDidMount: function () {
    console.log(DataCastCredits);
    this.getDOMNode().addEventListener("mousewheel", this.onMouseWheel);
  },

  componentWillUnmount: function () {
    this.getDOMNode().removeEventListener("mousewheel", this.onMouseWheel);
  },

  getCastMemberFromId: function(id) {

    var data = DataCast.concat(DataCrew);

    for(var i = 0; i<data.length; i++) {
      var dataId = data[i]["id"];
      if(dataId===id) {
        return data[i];
      }
    }
  },

  getCastPartial: function() {
    var castPartial = null;
    var castPartialInner = [];
    var crewPartialInner = [];

    for(var i = 0; i<DataCast.length; i++) {
      var dataCastId = DataCast[i]["id"];
      var dataCastName = DataCast[i]["name"];
      var dataCastRole = DataCast[i]["role"];

      var active = Boolean(this.state.selectedCastId===dataCastId);

      castPartialInner.push((<li className="info-page-cast__cast-list__content__item" key={"cast-member-"+i}>
                                <Components.Buttons.ButtonCastMember active={active} actor={dataCastName} character={dataCastRole} onClick={this.onCastMemberClick.bind(this, dataCastId)} />
                              </li>));


    }

    for(var i = 0; i<DataCrew.length; i++) {
      var dataCrewId = DataCrew[i]["id"];
      var dataCrewName = DataCrew[i]["name"];
      var dataCrewRole = DataCrew[i]["role"];

      var active = Boolean(this.state.selectedCastId===dataCrewId);

      crewPartialInner.push((<li className="info-page-cast__cast-list__content__item" key={"crew-member-"+i}>
                                <Components.Buttons.ButtonCastMember active={active} actor={dataCrewName} character={dataCrewRole} onClick={this.onCastMemberClick.bind(this, dataCrewId)} />
                              </li>));


    }

    castPartial = (<ul className="info-page-cast__cast-list__content">
                      <li className="info-page-cast__cast-list__content__item info-page-cast__cast-list__title">
                        <h3 className="label label-delta label-delta--small">Cast</h3>
                      </li>
                      {castPartialInner}
                      <li className="info-page-cast__cast-list__content__item info-page-cast__cast-list__title">
                        <h3 className="label label-delta label-delta--small">Crew</h3>
                      </li>
                      {crewPartialInner}
                    </ul>);

    return castPartial;
  },

  getCreditNames: function(credits, category) {

    var creditNamesPartial = null;
    var creditNamesInner = [];

    for(var i = 0; i<credits.length; i++) {

      var credit = credits[i];

      creditNamesInner.push((<p className="label label-phi label-phi--large" key={"credit-name-"+i}>
                                {credit}
                              </p>));


    }
    creditNamesPartial = <li className="info-page-cast__credits__item" key={"credit-name-category"+category}>{creditNamesInner}</li>;

    return creditNamesPartial;
  },

  getCreditsPartial: function() {
    var creditsPartial = null;
    var creditsPartialInner = [];

    for(var i = 0; i<DataCastCredits.length; i++) {

      var dataCastCreditsCategory = DataCastCredits[i]["category"];
      var dataCastCreditsNames = DataCastCredits[i]["names"];

      creditsPartialInner.push((<li className="info-page-cast__credits__item info-page-cast__credits__item--category" key={"credits-"+i}>
                                    <h3 className="label label-alpha label-alpha--large">
                                      {dataCastCreditsCategory}
                                    </h3>
                                </li>));

      creditsPartialInner.push(this.getCreditNames(dataCastCreditsNames, dataCastCreditsCategory))


    }

    creditsPartial = (<ul className="info-page-cast__credits">{creditsPartialInner}</ul>);

    return creditsPartial;
  },

  getCastBioPartial: function() {
    var castBioPartial = null;

    if(!this.state.selectedCastId) return;

    var dataCastMember = this.getCastMemberFromId(this.state.selectedCastId);

    if(!dataCastMember) return;

    castBioPartial = (<div className="info-page-cast__cast-detail-wrapper" key={this.state.selectedCastId}>
                        <Components.Blocks.BlockScroller style={{padding: "23.5% 15%"}} trackStyle={{padding: "45% 8%", marginTop: 22}}>
                          <div className="info-page-cast__cast-detail">
                            <h3 className="label label-alpha label-alpha--small label-alpha--blockquote info-page-cast__cast-detail__title">
                              {dataCastMember.name}<br/>
                              "{dataCastMember.role}"
                            </h3>
                            <div className="info-page-cast__cast-detail__bio" dangerouslySetInnerHTML={{__html: dataCastMember.bio}} />
                          </div>
                        </Components.Blocks.BlockScroller>
                      </div>);

    return castBioPartial;
  },

  render: function() {

    var castPartial = this.getCastPartial();
    var creditsPartial = this.getCreditsPartial();
    var castBioPartial = this.getCastBioPartial();

    return (<div className="info-page__body info-page__body--cast " key="cast">

              <div className="info-page__body__bg">
                <Components.Blocks.BlockTVFilter
                  visible={true}
                  srcPoster={imageBG} />
              </div>

              <div className="grid no-gutters info-page__body__grid info-page-cast">
                <div className="unit one-third info-page__body__grid__item info-page__body__grid__item--tall">

                    <div className="grid no-gutters info-page__body__grid">

                      <div className="unit whole info-page__body__grid__item">

                        <Components.Buttons.ButtonMoreInfoClose
                          onClick={this.onMoreInfoCloseClick}>
                          <Components.Blocks.BlockMoreInfoLabel title="Cast & Crew">
                            <blockquote className="label label-gamma label-gamma--blockquote">
                              See full cast &amp; crew credits
                            </blockquote>
                          </Components.Blocks.BlockMoreInfoLabel>
                        </Components.Buttons.ButtonMoreInfoClose>


                      </div>
                      <div className="unit whole info-page__body__grid__item">
                          <Components.Blocks.BlockScroller style={{padding: "22% 20%"}} trackStyle={{padding: "29% 21%", marginTop: -40}}>
                            <div className="info-page-cast__cast-list">
                              {castPartial}
                            </div>
                          </Components.Blocks.BlockScroller>

                      </div>

                    </div>

                </div>
                <div className="unit one-third info-page__body__grid__item info-page__body__grid__item--tall">

                  <React.addons.CSSTransitionGroup
                    transitionName="block-tabbed-pane__animation"
                    component="div">
                        {castBioPartial}
                  </React.addons.CSSTransitionGroup>

                </div>
                <div className="unit one-third info-page__body__grid__item info-page__body__grid__item--tall">
                    <Components.Blocks.BlockScroller style={{padding: "22% 20%"}} trackStyle={{padding: "45% 8%", marginTop: 22}}>
                      {creditsPartial}
                    </Components.Blocks.BlockScroller>
                </div>
              </div>

            </div>);
  }

})
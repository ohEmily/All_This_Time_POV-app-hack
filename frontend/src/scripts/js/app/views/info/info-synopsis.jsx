var React = require("react");
var Components = require("../../../components/index.jsx");
var imageBG = require("../../../../../assets/images/info/synopsis/synopsis-bg.jpg");

module.exports = React.createClass({

  onMoreInfoCloseClick: function(e) {
    e.preventDefault();
    e.stopPropagation();
    if(this.props.onCloseClick) this.props.onCloseClick(e);
  },

  render: function() {

    return (<div className="info-page__body info-page__body--synopsis " key="synopsis">

              <div className="info-page__body__bg">
                <Components.Blocks.BlockTVFilter
                  visible={true}
                  srcPoster={imageBG} />
              </div>

              <div className="grid no-gutters info-page__body__grid info-page-cast">
                <div className="unit one-third info-page__body__grid__item info-page__body__grid__item--tall">

                    

                </div>
                <div className="unit one-third info-page__body__grid__item info-page__body__grid__item--tall">

                    <div className="grid no-gutters info-page__body__grid">

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
                      <div className="unit whole info-page__body__grid__item">

                        <Components.Buttons.ButtonMoreInfoClose
                          onClick={this.onMoreInfoCloseClick}>
                          <Components.Blocks.BlockMoreInfoLabel title="Synopsis">
                            <blockquote className="label label-gamma label-gamma--blockquote">
                              Official synopsis of the movie
                            </blockquote>
                          </Components.Blocks.BlockMoreInfoLabel>
                        </Components.Buttons.ButtonMoreInfoClose>

                      </div>

                    </div>

                </div>
                <div className="unit one-third info-page__body__grid__item info-page__body__grid__item--tall">
                  <Components.Blocks.BlockScroller style={{padding: "23.5% 15%"}} trackStyle={{padding: "45% 8%", marginTop: 22}}>
                    <div className="info-page-cast__cast-detail">
                      <h3 className="label label-alpha label-alpha--small label-alpha--blockquote info-page-cast__cast-detail__title">
                        Directed by DAn DiFelice and Salomon Ligthelm<br/>
                        Executive Producer Jen Jacob
                      </h3>
                      <p>
                        In a year where science and space have dominated the box office and started numerous debates in both faith and culture, directors Dan DiFelice and Salomon Ligthelm introduce a story intertwining both topics in their latest film, Anomaly.The Anomaly story is a period piece set during the 1960's space race and inspired by astronomical events surrounding the nativity story. The narrative follows a couple who find themselves having to navigate the realities of two unfathomable events: a spontaneous birth that coincides with the arrival of a great comet during NASA's golden years.
                      </p>
                      <p>
                        While much of the nativity story that we know comes from traditional stories that have changed over time, Ligthelm and DiFelice explore a more scientific backdrop countered by human emotion.  Ligthelm started writing the script in 2012 following a conversation with his wife about the physical realities of virgin birth and what must have been the thoughts and emotions of Mary and Joseph as they navigated a confusing and almost unbelievable scenario. He spent the next year gathering references and immersing himself in astronomical interpretations of the Star of Bethlehem -- speculated to have been a comet or two planets' paths converging. 
                      </p>
                      <p>
                        "Studying the astronomy of those ancient times from many different sources was what really married the pieces of the film together. Even in ancient China they would read the stars to interpret that a King was being born -- this was significant to them."  - Salomon Ligthelm
                      </p>
                      <p>
                        A few months into the writing process, he approached NYC-based Director and VFX Supervisor Dan DiFelice to collaborate with on the project.
                      </p>
                      <p>
                        Following a successful Kickstarter campaign in 2013, and well on their way to completing the script with help from screenwriter Georgie Kelsey, Ligthelm and DiFelice joined forces with cinematographer Khalid Mohtaseb, whose work includes commercials such as Everlast "Greatness is Within" (2012), Lincoln "Open Your Eyes in the Moment" (2014) and producer Jens Jacob of Sypher Films to bring the film to life.  As they made their way into casting, Ligthelm recollects, "This is the first venture we have made into narrative filmmaking and so the whole dialogue aspect felt like an experiment, as well as working with professional actors. I think as first time narrative directors, the hardest thing to develop was a shorthand with the actors. I saw Andrew Sensenig [male lead] in a film called Upstream Color and really liked his performance in it, so I searched him up online, found his twitter and sent him a message. He sent an eager reply and the rest is history, really." 
                      </p>
                      <p>
                        After only nine days across four states of filming the majority of the footage, DiFelice supervised what would become massive efforts in VFX work, looking after a team at the Mill NYC, another at Rotor in Sydney, AU and Framestore in London.  In addition, multiple individuals were assisting remotely around the world during remote editing sessions.  It became a global effort; the directors spoke with NASA to obtain launch footage from the 1960's, which is now cut into the finished film. From there, while DiFelice was handling VFX, Ligthelm was working from his then home in Sydney, AU with composer Ryan Taubert on the original score. When asked about his hope for where the film goes from its launch, Ligthelm describes his feeling that, "We'd love to simply enable people to re-imagine the Christmas story as a relevant historical event."
                      </p>
                    </div>
                  </Components.Blocks.BlockScroller>
                </div>
              </div>

            </div>);
  }

})
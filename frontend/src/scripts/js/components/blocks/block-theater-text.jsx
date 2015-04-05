var React = require("react");
var TheaterJS = require("../../vendor/theater.js");

module.exports = React.createClass({

  mixins: [React.addons.PureRenderMixin],

  theater: null,



  componentDidMount: function () {
    window.theater= this.theater =  new TheaterJS();

    // var $log = this.refs.content.getDOMNode();

    this.theater
          .describe("Vader", { speed: .8, accuracy: .6, invincibility: 4 }, "#vader");

    this.theater
      .on("*", function (eventName, originalEvent, sceneName, arg) {
        var args  = Array.prototype.splice.apply(arguments, [3]),
            log   = '{\n      name: "' + sceneName + '"';

        log += ",\n      args: " + JSON.stringify(args).split(",").join(", ");
        log += "\n    }";

        console.log(log);

        // $log.innerHTML = log;
      })
      .on("say:start, erase:start", function (eventName) {
        // this refer to the TheaterJS instance.
        var self    = this,
            // The current actor is referenced as this.current
            // Its voice is the third element passed to the describe method.
            // It could be of two types: a DOM element or a function.
            current = self.current.voice;

        // TheaterJS has some useful methods such as
        // addClass, hasClass, removeClass, ...
        // Note: the "saying" class adds the blinking caret.
        // self.utils.addClass(current, "saying");
      })
      .on("say:end, erase:end", function (eventName) {
        var self    = this,
            current = self.current.voice;

        // When say or erase ends, remove the caret.
        // self.utils.removeClass(current, "saying");
      });


      this.theater
        .write("Vader: December 24, 2004")
        .write(400)
        .write("Vader: This was the temperature.")
        .write(400)
        .write("Vader: This was our President.")
        .write(400)
        .write("Vader: This was the number one record on the radio.")



  },

  render: function() {

    var videoPartial = null;
    var playerPartial = null;
    var bodyPartial = null;

    var bodyStyles = null;
    var playerStyles = null;

    return (<div className="block-theater-text">
              <h1 className="block-theater-text__content" id="vader">Block Theater Text</h1>
            </div>);
  }

})
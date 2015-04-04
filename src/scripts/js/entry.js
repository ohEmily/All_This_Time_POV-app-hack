// var bootstrap = require('./bootstrap.js');
var bootstrap = require('./bootstrap.js');

var init = function() {

  if(document.readyState==='interactive') {
    onReady();
  }else{
    document.onreadystatechange = onReady;
  }
}

// wait for ready
var onReady = function() {
  if(document.readyState!=='interactive') return;
  bootstrap.init();
}

init();
var App = require('./App')

function run() {
  var app = App.getInstance();
  app.run();

}

if (typeof window !== 'undefined') {
  window.addEventListener('load', run);

}



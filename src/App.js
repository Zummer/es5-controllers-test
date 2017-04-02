var Header = require('./views/Header')
var FlashModel = require('./models/FlashModel')
var FlashView = require('./views/FlashView')
var FlashController = require('./controllers/FlashController')

var SingletoneApp = (function () {
  var instance;

  function createInstance() {
    return {
      createChildren: function() {
        $('body').append('<div class="container"></div>');
        this.model = new FlashModel();
        this.panelView = new Header(this.model);
        this.flashView = new FlashView(this.model);
        this.controller = new FlashController(this.model, this.flashView);
      },
      run: function(){
        this.createChildren();

      }

    }

  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();

      }
      return instance;

    }

  };

})();

module.exports = SingletoneApp;

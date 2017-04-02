var Header = require('./views/Header')
var FlashModel = require('./models/FlashModel')
var FlashesView = require('./views/FlashesView')
var FlashController = require('./controllers/FlashController')

var SingletoneApp = (function () {
  var instance;

  function createInstance() {
    return {
      createChildren: function() {
        $('body').append('<div class="container"></div>');
        this.model = new FlashModel();
        this.panelView = new Header(this.model);
        this.flashView = new FlashesView(this.model);
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

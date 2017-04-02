var List = require('./views/List')
var Panel = require('./views/Panel')

var SingletoneApp = (function () {
  var instance;

  function createInstance() {
    return {
      createChildren: function() {
        $('body').append('<div class="container"></div>');
        new List();
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

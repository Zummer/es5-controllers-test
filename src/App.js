var List = require('./views/List')
var Panel = require('./views/Panel')

var SingletoneApp = (function () {
  var instance;

  function createInstance() {
    return {
      run: function(){
        new Panel();
        new List();
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

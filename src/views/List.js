var FlashListModel = require('../models/FlashListModel')
var FlashListView = require('./FlashListView')
var FlashListController = require('../controllers/FlashListController')

function List(){
  this.init();
}

List.prototype = {
  init: function(){
    var model = new FlashListModel(),
      view = new FlashListView(model),
      controller = new FlashListController(model, view);
  }
}

module.exports = List;

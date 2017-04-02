var Event = require('../services/EventDispatcher')

var FlashListModel = function () {
  this.flashes = [];
  this.selectedFlashes = [];
  this.addFlashEvent = new Event(this);
  this.removeFlashEvent = new Event(this);
  this.setFlashesAsCompletedEvent = new Event(this);
  this.deleteFlashesEvent = new Event(this);
  this.selectFlashEvent = new Event(this);

};

FlashListModel.prototype = {

  addFlash: function () {
    this.flashes.push({
      text: 'Какой то текст' + Math.random() * (1000 - 1) + 1,
      selected: false

    });
    this.addFlashEvent.notify();

  },

  getFlashes: function () {
    return this.flashes;

  },

  setSelectedFlash: function (flashIndex) {
    this.flashes[flashIndex].selected = !this.flashes[flashIndex].selected;
    this.selectFlashEvent.notify();

  },

  unselectFlash: function (flashIndex) {
    this.selectedFlashes.splice(flashIndex, 1);

  },

  setFlashesAsCompleted: function () {
    var selectedFlashes = this.selectedFlashes;
    for (var index in selectedFlashes) {
      this.flashes[selectedFlashes[index]].selected = true;

    }

    this.setFlashesAsCompletedEvent.notify();

    this.selectedFlashes = [];


  },


  deleteFlashes: function (index) {
    this.flashes.splice(index, 1);
    this.deleteFlashesEvent.notify();

  }



};

module.exports = FlashListModel;

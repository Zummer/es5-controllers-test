var Event = require('../services/EventDispatcher')

var FlashListModel = function () {
  this.flashes = [];
  this.selectedFlashes = [];
  this.addFlashEvent = new Event(this);
  this.removeFlashEvent = new Event(this);
  this.setFlashesAsCompletedEvent = new Event(this);
  this.deleteFlashesEvent = new Event(this);


};

FlashListModel.prototype = {

  addFlash: function () {
    this.flashes.push({
      text: 'Какой то текст',
      selected: false

    });
    this.addFlashEvent.notify();

  },

  getFlashes: function () {
    return this.flashes;

  },

  setSelectedFlash: function (flashIndex) {
    this.selectedFlashes.push(flashIndex);

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


  deleteFlashes: function () {
    var selectedFlashes = this.selectedFlashes.sort();

    for (var i = selectedFlashes.length - 1; i >= 0; i--) {
      this.flashes.splice(this.selectedFlashes[i], 1);

    }

    // clear the selected flashes
    this.selectedFlashes = [];

    this.deleteFlashesEvent.notify();


  }



};

module.exports = FlashListModel;
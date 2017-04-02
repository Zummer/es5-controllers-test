var Event = require('../services/EventDispatcher')
var loremIpsum = require('lorem-ipsum')

var FlashListModel = function () {
  this.flashes = [];
  this.selectedFlashes = [];
  this.addFlashEvent = new Event(this);
  this.removeFlashEvent = new Event(this);
  this.setFlashesAsCompletedEvent = new Event(this);
  this.deleteFlashesEvent = new Event(this);
  this.selectFlashEvent = new Event(this);
  this.toggleColorFlashEvent = new Event(this);

};

FlashListModel.prototype = {

  addFlash: function () {

    var maybeExtendedFlash = Math.random() > 0.5;
    var flash = {
      text: loremIpsum({
        count: 3

      }),
      selected: false,
      show: false

    };

    if (maybeExtendedFlash) {
      var colors = ['danger', 'success'];
      flash.color = colors[Math.floor(Math.random()*colors.length)];

    }

    this.flashes.push(flash);
    this.addFlashEvent.notify();

  },

  getFlashes: function () {
    return this.flashes;

  },

  setSelectedFlash: function (flashIndex) {
    this.flashes[flashIndex].selected = !this.flashes[flashIndex].selected;
    this.selectFlashEvent.notify();

  },

  toggleColorFlash: function (flashIndex) {
    this.flashes[flashIndex].color = this.flashes[flashIndex].color == 'danger' ? 'success' : 'danger';
    this.toggleColorFlashEvent.notify();

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

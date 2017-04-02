var Event = require('../services/EventDispatcher')
var loremIpsum = require('lorem-ipsum')

var FlashModel = function () {
  this.flashes = [];
  this.selectedFlashes = [];
  this.addFlashEvent = new Event(this);
  this.removeFlashEvent = new Event(this);
  this.setFlashesAsCompletedEvent = new Event(this);
  this.deleteFlashesEvent = new Event(this);
  this.selectFlashEvent = new Event(this);
  this.toggleColorFlashEvent = new Event(this);

};

var nextFlashId = 0;

FlashModel.prototype = {

  addFlash: function () {

    var maybeExtendedFlash = Math.random() > 0.5;
    var flash = {
      id: nextFlashId++,
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
    this.addFlashEvent.notify(flash.id);

  },

  getFlashes: function () {
    return this.flashes;

  },

  getSelectedFlashes: function () {
    return this.flashes.filter(t => t.selected);

  },
  getSelectedRed: function () {
    return this.getSelectedFlashes().filter(t => t.color === 'danger');

  },
  getSelectedGreen: function () {
    return this.getSelectedFlashes().filter(t => t.color === 'success');

  },

  setSelectedFlash: function (id) {
    var flash = this.flashes.find(t => t.id == id);
    flash.selected = !flash.selected;
    this.selectFlashEvent.notify();

  },

  toggleColorFlash: function (id) {
    var flash = this.flashes.find(t => t.id == id);
    flash.color = flash.color == 'danger' ? 'success' : 'danger';
    this.toggleColorFlashEvent.notify();

  },

  deleteFlashes: function (id) {
    var index = this.flashes.findIndex(t => t.id == id);
    this.flashes.splice(index, 1);
    this.deleteFlashesEvent.notify(id);

  }

};

module.exports = FlashModel;

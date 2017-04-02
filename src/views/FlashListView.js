var Event = require('../services/EventDispatcher')
var SimpleFlash = require('../views/SimpleFlash')
var Template = require('../templates/flashTemplate')

var FlashListView = function (model) {
  this.model = model;
  this.addFlashEvent = new Event(this);
  this.selectFlashEvent = new Event(this);
  this.unselectFlashEvent = new Event(this);
  this.completeFlashEvent = new Event(this);
  this.deleteFlashEvent = new Event(this);

  this.init();

};

FlashListView.prototype = {

  init: function () {
    this.createChildren()
      .setupHandlers()
      .enable();

  },

  createChildren: function () {
    // cache the document object
    this.$container = $('.container');
    this.$container.append((new Template).defaultTemplate);
    this.$addFlashButton = this.$container.find('.js-add-flash-button');
    this.$flashesContainer = this.$container.find('.flash-list');

    return this;

  },

  setupHandlers: function () {

    this.addFlashButtonHandler = this.addFlashButton.bind(this);
    this.selectOrUnselectFlashHandler = this.selectOrUnselectFlash.bind(this);
    this.completeFlashButtonHandler = this.completeFlashButton.bind(this);
    this.deleteFlashButtonHandler = this.deleteFlashButton.bind(this);

    /* Handlers from Event Dispatcher */

    this.addFlashHandler = this.addFlash.bind(this);
    this.setFlashesAsCompletedHandler = this.setFlashesAsCompleted.bind(this);
    this.deleteFlashesHandler = this.deleteFlashes.bind(this);

    return this;

  },

  enable: function () {

    this.$addFlashButton.click(this.addFlashButtonHandler);
    this.$container.on('click', '.flash', this.selectOrUnselectFlashHandler);

    /* Event Dispatcher */
    this.model.addFlashEvent.attach(this.addFlashHandler);
    this.model.setFlashesAsCompletedEvent.attach(this.setFlashesAsCompletedHandler);
    this.model.deleteFlashesEvent.attach(this.deleteFlashesHandler);

    return this;

  },

  addFlashButton: function () {
    this.addFlashEvent.notify({
      flash: ''

    });

  },

  completeFlashButton: function () {
    this.completeFlashEvent.notify();

  },

  deleteFlashButton: function (index) {
    this.deleteFlashEvent.notify(index);

  },

  selectOrUnselectFlash: function () {

    var flashIndex = $(event.target).attr("data-index");

    if ($(event.target).attr('data-flash-selected') == 'false') {
      $(event.target).attr('data-flash-selected', true);
      this.selectFlashEvent.notify({
        flashIndex: flashIndex

      });

    } else {
      $(event.target).attr('data-flash-selected', false);
      this.unselectFlashEvent.notify({
        flashIndex: flashIndex

      });

    }


  },

  render: function () {


    var flashes = this.model.getFlashes();
    var html = "";
    this.$flashesContainer.html('');

    for (var key in flashes) {

      var flash;

      if (flashes[key].hasOwnProperty('color')) {
        flash = new SimpleFlash(flashes[key], key, this.deleteFlashButtonHandler);

      } else {
        flash = new SimpleFlash(flashes[key], key, this.deleteFlashButtonHandler);

      }

      flash.render();

    }


  },

  /* -------------------- Handlers From Event Dispatcher ----------------- */

  //clearFlashTextBox: function () {
  //  this.$flashTextBox.val('');
  //
  //},

  addFlash: function () {
    this.render();

  },

  setFlashesAsCompleted: function () {
    this.render();


  },

  deleteFlashes: function () {
    this.render();


  }

  /* -------------------- End Handlers From Event Dispatcher ----------------- */

};

module.exports = FlashListView;

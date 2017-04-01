var Event = require('../services/EventDispatcher')
var SimpleFlash = require('../views/SimpleFlash')

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

    var container = $('<div class="js-container"></div>');
    $('body').append(container);
    container.append('<input type="text" class="js-flash-textbox">');
    container.append('<input type="button" class="js-add-flash-button" value="Add flash">');
    container.append('<div class="js-flashes-container"></div>');
    container.append('<input type="button" class="js-complete-flash-button" value="Complete flashs">');
    container.append('<input type="button" class="js-delete-flash-button" value="Delete flashs">');

    // cache the document object
    this.$container = $('.js-container');
    this.$addFlashButton = this.$container.find('.js-add-flash-button');
    this.$flashTextBox = this.$container.find('.js-flash-textbox');
    this.$flashesContainer = this.$container.find('.js-flashes-container');

    return this;

  },

  setupHandlers: function () {

    this.addFlashButtonHandler = this.addFlashButton.bind(this);
    this.selectOrUnselectFlashHandler = this.selectOrUnselectFlash.bind(this);
    this.completeFlashButtonHandler = this.completeFlashButton.bind(this);
    this.deleteFlashButtonHandler = this.deleteFlashButton.bind(this);

    /* Handlers from Event Dispatcher */

    this.addFlashHandler = this.addFlash.bind(this);
    this.clearFlashTextBoxHandler = this.clearFlashTextBox.bind(this);
    this.setFlashesAsCompletedHandler = this.setFlashesAsCompleted.bind(this);
    this.deleteFlashesHandler = this.deleteFlashes.bind(this);

    return this;

  },

  enable: function () {

    this.$addFlashButton.click(this.addFlashButtonHandler);
    this.$container.on('click', '.js-flash', this.selectOrUnselectFlashHandler);
    this.$container.on('click', '.js-complete-flash-button', this.completeFlashButtonHandler);
    this.$container.on('click', '.js-delete-flash-button', this.deleteFlashButtonHandler);

    /* Event Dispatcher */
    this.model.addFlashEvent.attach(this.addFlashHandler);
    this.model.addFlashEvent.attach(this.clearFlashTextBoxHandler);
    this.model.setFlashesAsCompletedEvent.attach(this.setFlashesAsCompletedHandler);
    this.model.deleteFlashesEvent.attach(this.deleteFlashesHandler);

    return this;

  },

  addFlashButton: function () {
    this.addFlashEvent.notify({
      flash: this.$flashTextBox.val()

    });

  },

  completeFlashButton: function () {
    this.completeFlashEvent.notify();

  },

  deleteFlashButton: function () {
    this.deleteFlashEvent.notify();

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
    this.buildList();

  },

  buildList: function () {
    var flashes = this.model.getFlashes();
    var html = "";
    var $flashesContainer = this.$flashesContainer;

    $flashesContainer.html('');

    for (var key in flashes) {

      var flash;

      if (flashes[key].hasOwnProperty('color')) {
        flash = new SimpleFlash(flashes[key], key);

      } else {
        flash = new SimpleFlash(flashes[key], key);

      }

      html = flash.render();
      $flashesContainer.append(html);

    }


  },

  /* -------------------- Handlers From Event Dispatcher ----------------- */

  clearFlashTextBox: function () {
    this.$flashTextBox.val('');

  },

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

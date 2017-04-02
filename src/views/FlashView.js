var Event = require('../services/EventDispatcher')
var Flash = require('../views/Flash')
var Template = require('../templates/flashTemplate')

var FlashView = function (model) {
  this.model = model;
  this.addFlashEvent = new Event(this);
  this.selectFlashEvent = new Event(this);
  this.unselectFlashEvent = new Event(this);
  this.completeFlashEvent = new Event(this);
  this.deleteFlashEvent = new Event(this);
  this.toggleColorFlashEvent = new Event(this);
  this.clickTimeout;

  this.render();

};

FlashView.prototype = {

  init: function () {
    this.createChildren()
      .setupHandlers()
      .enable();

  },

  createChildren: function () {
    // cache the document object
    this.$parent = $('.container');
    var templateList = (new Template).flashList();
    this.$parent.append(templateList);
    this.$addFlashButton = this.$parent.find('.js-add-flash-button');
    this.$flashesContainer = this.$parent.find('.flash-list');

    return this;

  },

  setupHandlers: function () {

    this.addFlashButtonHandler = this.addFlashButton.bind(this);
    this.selectOrUnselectFlashHandler = this.selectOrUnselectFlash.bind(this);
    this.completeFlashButtonHandler = this.completeFlashButton.bind(this);
    this.deleteFlashButtonHandler = this.deleteFlashButton.bind(this);
    this.toggleColorHandler = this.toggleColor.bind(this);

    /* Handlers from Event Dispatcher */

    this.addFlashHandler = this.addFlash.bind(this);
    this.setFlashesAsCompletedHandler = this.setFlashesAsCompleted.bind(this);

    return this;

  },

  enable: function () {

    this.$addFlashButton.click(this.addFlashButtonHandler);
    this.$parent.on('click', '.flash-item', this.selectOrUnselectFlashHandler);
    this.$parent.on('dblclick', '.flash-item', this.toggleColorHandler);
    this.$parent.on('click', '.close', this.deleteFlashButtonHandler);

    /* Event Dispatcher */
    this.model.addFlashEvent.attach(this.addFlashHandler);
    this.model.setFlashesAsCompletedEvent.attach(this.setFlashesAsCompletedHandler);
    this.model.selectFlashEvent.attach(this.selectFlash.bind(this));
    this.model.deleteFlashesEvent.attach(this.deleteFlashes.bind(this));

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

  deleteFlashButton: function (event) {

    event.stopPropagation();

    var flashIndex = $(event.target).attr("data-index");
    var flashes = this.model.getFlashes();
    var currentFlash = flashes[flashIndex];

    if (currentFlash.hasOwnProperty('color')) {
      if(!confirm("Вы действительно хотите удалить?")) {
        return;
      }
    }

    this.deleteFlashEvent.notify({
      flashIndex: flashIndex
    });

  },

  toggleColor: function () {

    clearTimeout(this.clickTimeout);

    var flashIndex = $(event.target).attr("data-index");
    var flashes = this.model.getFlashes();
    var currentFlash = flashes[flashIndex];

    if (currentFlash.hasOwnProperty('color')) {
      $(event.target).toggleClass('alert-danger');
      $(event.target).toggleClass('alert-success');

      this.toggleColorFlashEvent.notify({

        flashIndex: flashIndex

      });

    }

  },

  selectOrUnselectFlash: function (event) {

    clearTimeout(this.clickTimeout);
    // требуется для передачи в функцию через замыкание
    var self = this;

    this.clickTimeout = setTimeout(function(){
      return function(){
        var flashIndex = $(event.target).attr("data-index");

        $(event.target).toggleClass('selected');

        self.selectFlashEvent.notify({
          flashIndex: flashIndex

        });

      }

    }(), 300);

  },

  render: function () {

    if(!$('.flash-list').length){
      this.init();

    } else {

      var flashes = this.model.getFlashes();
      this.$flashesContainer.html('');

      for (var key in flashes) {
        var flash = new Flash(flashes[key], key);

      }

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

  selectFlash: function () {
    //this.render();

  },

  setFlashesAsCompleted: function () {
    this.render();

  },

  deleteFlashes: function () {
    this.render();

  }

  /* -------------------- End Handlers From Event Dispatcher ----------------- */

};

module.exports = FlashView;

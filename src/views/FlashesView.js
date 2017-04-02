var Event = require('../services/EventDispatcher')
var Flash = require('../views/Flash')
var Template = require('../templates/flashTemplate')

var FlashesView = function (model) {
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

FlashesView.prototype = {

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
    this.$addFlashButton = $('.js-add-flash-button');
    this.$flashesContainer = $('.flash-list');

    return this;

  },

  setupHandlers: function () {

    this.addFlashButtonHandler = this.addFlashButton.bind(this);
    this.selectOrUnselectFlashHandler = this.selectOrUnselectFlash.bind(this);
    this.deleteFlashButtonHandler = this.deleteFlashButton.bind(this);
    this.toggleColorHandler = this.toggleColor.bind(this);

    /* Handlers from Event Dispatcher */

    this.addFlashHandler = this.addFlash.bind(this);

    return this;

  },

  enable: function () {

    this.$addFlashButton.click(this.addFlashButtonHandler);
    this.$parent.on('click', '.flash-item', this.selectOrUnselectFlashHandler);
    this.$parent.on('dblclick', '.flash-item', this.toggleColorHandler);
    this.$parent.on('click', '.close', this.deleteFlashButtonHandler);

    /* Event Dispatcher */
    this.model.addFlashEvent.attach(this.addFlashHandler);
    this.model.deleteFlashesEvent.attach(this.deleteFlashes.bind(this));

    return this;

  },

  addFlashButton: function () {
    this.addFlashEvent.notify();

  },

  deleteFlashButton: function (event) {

    event.stopPropagation();

    // кнопка удаления содержит id
    var id = $(event.target).attr("data-index");
    var flashes = this.model.getFlashes();
    var currentFlash = flashes.find(t => t.id == id);

    if (currentFlash.hasOwnProperty('color')) {
      if(!confirm("Вы действительно хотите удалить?")) {
        return;
      }
    }

    this.deleteFlashEvent.notify({
      id: id
    });

  },

  toggleColor: function () {

    clearTimeout(this.clickTimeout);

    var id = event.target.id;
    var flashes = this.model.getFlashes();
    var currentFlash = flashes.find(t => t.id == id);

    if (currentFlash.hasOwnProperty('color')) {
      $(event.target).toggleClass('alert-danger');
      $(event.target).toggleClass('alert-success');

      this.toggleColorFlashEvent.notify({
        id: id
      });

    }

  },

  selectOrUnselectFlash: function (event) {

    clearTimeout(this.clickTimeout);
    // требуется для передачи в функцию через замыкание
    var self = this;

    this.clickTimeout = setTimeout(function(){
      return function(){
        var id = event.target.id;

        $(event.target).toggleClass('selected');

        self.selectFlashEvent.notify({
          id: id

        });

      }

    }(), 300);

  },

  render: function (args) {

    if(!$('.flash-list').length){
      this.init();

    } else {

      var flashes = this.model.getFlashes();
      if (args.hasOwnProperty('addId')) {
        var flash = flashes.find(t => t.id == args.addId);
        new Flash(flash);

      } else if (args.hasOwnProperty('removeId')) {

        $('#' + args.removeId).toggleClass('show');
        setTimeout(function () {
          $('#' + args.removeId).remove();

        }, 300);

      }

    }

  },

  /* -------------------- Handlers From Event Dispatcher ----------------- */

  addFlash: function (sender, id) {
    this.render({
      addId: id
    });

  },

  deleteFlashes: function (sender, id) {
    this.render({
      removeId: id
    });

  }

  /* -------------------- End Handlers From Event Dispatcher ----------------- */

};

module.exports = FlashesView;

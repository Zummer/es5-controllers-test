var FlashController = function (model, view) {
  this.model = model;
  this.view = view;

  this.init();

};

FlashController.prototype = {

  init: function () {
    this.createChildren()
      .setupHandlers()
      .enable();

  },

  createChildren: function () {
    // no need to create children inside the controller
    // this is a job for the view
    // you could all as well leave this function out
    return this;

  },

  setupHandlers: function () {

    this.addFlashHandler = this.addFlash.bind(this);
    this.selectFlashHandler = this.selectFlash.bind(this);
    this.deleteFlashHandler = this.deleteFlash.bind(this);
    this.toggleColorFlashHandler = this.toggleColorFlash.bind(this);
    return this;

  },

  enable: function () {

    this.view.addFlashEvent.attach(this.addFlashHandler);
    this.view.deleteFlashEvent.attach(this.deleteFlashHandler);
    this.view.selectFlashEvent.attach(this.selectFlashHandler);
    this.view.toggleColorFlashEvent.attach(this.toggleColorFlashHandler);

    return this;

  },


  addFlash: function (sender, args) {
    this.model.addFlash();

  },

  selectFlash: function (sender, args) {
    this.model.setSelectedFlash(args.id);

  },

  toggleColorFlash: function (sender, args) {
    this.model.toggleColorFlash(args.id);

  },

  deleteFlash: function (sender, args) {
    this.model.deleteFlashes(args.id);

  }


};

module.exports = FlashController;

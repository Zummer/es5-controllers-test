var FlashListController = function (model, view) {
  this.model = model;
  this.view = view;

  this.init();

};

FlashListController.prototype = {

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
    this.unselectFlashHandler = this.unselectFlash.bind(this);
    this.completeFlashHandler = this.completeFlash.bind(this);
    this.deleteFlashHandler = this.deleteFlash.bind(this);
    return this;

  },

  enable: function () {

    this.view.addFlashEvent.attach(this.addFlashHandler);
    this.view.completeFlashEvent.attach(this.completeFlashHandler);
    this.view.deleteFlashEvent.attach(this.deleteFlashHandler);
    this.view.selectFlashEvent.attach(this.selectFlashHandler);
    this.view.unselectFlashEvent.attach(this.unselectFlashHandler);

    return this;

  },


  addFlash: function (sender, args) {
    this.model.addFlash(args.flash);

  },

  selectFlash: function (sender, args) {
    this.model.setSelectedFlash(args.flashIndex);

  },

  unselectFlash: function (sender, args) {
    this.model.unselectFlash(args.flashIndex);

  },

  completeFlash: function () {
    this.model.setFlashesAsCompleted();

  },

  deleteFlash: function () {
    this.model.deleteFlashes();

  }


};

module.exports = FlashListController;

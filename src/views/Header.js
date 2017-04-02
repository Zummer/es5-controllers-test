var Template = require('../templates/flashTemplate')

function Header (model) {
  this.model = model;

  this.init();
  this.render();
};

Header.prototype = {
  init: function () {
    this.createChildren()
      .enable();

  },

  createChildren: function () {
    var templateHeader = (new Template).panel();
    var templateAdd = (new Template).add();
    var templateStatus = (new Template).status();

    this.$parent = $('.container');
    this.$parent.append(templateHeader);
    this.$panelBody = this.$parent.find('.panel-body');
    this.$panelBody.append(templateAdd);
    this.$panelBody.append(templateStatus);
    this.$status = this.$parent.find('.status-bar');

    return this;

  },

  enable: function () {
    /* Event Dispatcher */
    this.model.addFlashEvent.attach(this.render.bind(this));
    this.model.selectFlashEvent.attach(this.render.bind(this));
    this.model.deleteFlashesEvent.attach(this.render.bind(this));
    this.model.toggleColorFlashEvent.attach(this.render.bind(this));

    return this;

  },

  render: function () {

    var flashes = this.model.getFlashes();
    var selectedFlashes = this.model.getSelectedFlashes();
    var selectedRed = this.model.getSelectedRed();
    var selectedGreen = this.model.getSelectedGreen();

    this.$status.remove();

    var templateStatus = (new Template).status({
      flashes: flashes.length,
      selected: selectedFlashes.length,
      selectedRed: selectedRed.length,
      selectedGreen: selectedGreen.length
    });

    this.$panelBody.append(templateStatus);
    this.$status = this.$parent.find('.status-bar');

  }
}

module.exports = Header;

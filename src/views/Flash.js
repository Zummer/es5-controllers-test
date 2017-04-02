var Template = require('../templates/flashTemplate')

function Flash (data, index) {
  this.data = data;
  this.index = index;

  this.render();
}

Flash.prototype = {

  render: function () {
    this.$parent = $('.flash-list');
    this.$parent.append((new Template).flash(this.data, this.index));

  }

}

module.exports = Flash;

var Template = require('../templates/flashTemplate')

function SimpleFlash (data, index) {
  this.data = data;
  this.index = index;

  this.render();
}

SimpleFlash.prototype = {

  render: function () {
    this.$parent = $('.flash-list');
    this.$parent.append((new Template).simpleFlash(this.data, this.index));

  }

}

module.exports = SimpleFlash;

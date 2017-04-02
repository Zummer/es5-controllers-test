var Template = require('../templates/flashTemplate')

function Flash (data) {
  this.data = data;

  this.render();
}

Flash.prototype = {

  render: function () {
    this.$parent = $('.flash-list');
    this.$parent.append((new Template).flash(this.data));
    var self = this;
    setTimeout(function(){
      $('#' + self.data.id).toggleClass('show');
    }, 10);

  }

}

module.exports = Flash;

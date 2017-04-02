function SimpleFlash (data, index, deleteClick) {
  this.data = data;
  this.index = index;
  this.deleteClick = deleteClick.bind(this, this.index);

}

SimpleFlash.prototype = {

  init: function () {
      this.enable();

  },

  enable: function(){

    this.$deleteBtn.click(this.deleteClick);
    return this;
  },

  render: function () {
    this.$parent = $('.flash-list');
    this.$flash = $('<li>' + this.data.text + '</li>')
        .attr('data-index', this.index)
        .attr('data-flash-selected', false)
        .addClass("flash alert alert-info")
    this.$deleteBtn = $('<button class="close">&times;</button>');
    this.$flash.append(this.$deleteBtn);
    this.$parent.append(this.$flash);

    this.init();
  }

}

module.exports = SimpleFlash;

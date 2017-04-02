function SimpleFlash (data, index) {
  this.data = data;
  this.index = index;

  this.render();
}

SimpleFlash.prototype = {

  render: function () {
    this.$parent = $('.flash-list');
    this.$flash = $('<li>' + this.data.text + '</li>').attr('data-index', this.index)
        .attr('data-flash-selected', false).addClass("flash-item alert alert-info")

    if (this.data.selected) {
      this.$flash.addClass('selected');
    }

    this.$deleteBtn = $('<button class="close">&times;</button>').attr('data-index', this.index);
    this.$flash.append(this.$deleteBtn);
    this.$parent.append(this.$flash);

  }

}

module.exports = SimpleFlash;

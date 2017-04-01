function SimpleFlash (data, index) {
  this.data = data;
  this.index = index;
}

SimpleFlash.prototype = {
  render: function () {
    var html =
      '<li><div class="js-flash" data-index=' +
      this.index +
      ' data-flash-selected="false">' +
      this.data.text +

      '<div/></li>';
    return html;

  }

}

module.exports = SimpleFlash;

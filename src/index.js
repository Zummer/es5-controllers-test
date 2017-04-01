var FlashModel = require('./models/FlashModel')

$(function () {
  var model = new FlashModel();
  var root = document.createElement('div');
  root.innerHTML = 'Привет мир!';
  document.body.appendChild(root);
})

function Template() {
  this.status = function (data) {

    var template
      =   '<span class="status-bar">Количество блоков'
      +     '<span class="all-count">Bсего: {{flashes}}</span>'
      +     '<span class="selected-count">Выделенных: {{selected}}'
      +       '<span class="selected-red-count">Красных: {{selectedRed}}</span>'
      +       '<span class="selected-green-count">Зеленых: {{selectedGreen}}</span>'
      +     '</span>'
      +   '</span>'

    template = template.replace(/{{flashes}}/g, data && data.flashes || 0);
    template = template.replace(/{{selected}}/g, data && data.selected || 0);
    template = template.replace(/{{selectedRed}}/g, data && data.selectedRed || 0);
    template = template.replace(/{{selectedGreen}}/g, data && data.selectedGreen || 0);

    return template;

  }

  this.add = function() {
    return '<input type="button" class="js-add-flash-button btn btn-primary" value="Добавить блок">';

  }

  this.panel = function () {

      return '<div class="row">'
      +         '<div class="col-md-12 form-group header">'
      +           '<div class="panel panel-default">'
      +             '<div class="panel-body">'
      +             '</div>'
      +           '</div>'
      +         '</div>'
      +       '</div>';

  }

  this.flashList = function() {

      return '<div class="row">'
      +        '<div class="col-md-12 form-group">'
      +          '<ul class="flash-list">'
      +          '</ul>'
      +        '</div>'
      +      '</div>';

  }

  this.flash = function(data, index){

    var template
      = '<li class="{{initialClass}}" data-index="{{index}}"}>{{text}}'
      +   '<button class="close" data-index="{{index}}">&times;</button>'
      + '</li>';

    var initialClass = "flash-item alert alert-info";

    if(data.color) {
      initialClass = "flash-item alert alert-" + data.color;
    }

    if (data.selected) {
      initialClass = initialClass + ' selected';
    }

    template = template.replace(/{{initialClass}}/g, initialClass);
    template = template.replace(/{{index}}/g, index);
    template = template.replace(/{{text}}/g, data.text);

    return template;

  }

}

module.exports = Template;

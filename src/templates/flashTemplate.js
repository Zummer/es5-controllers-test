function Template() {

  this.flashList = function() {
    return '<input type="button" class="js-add-flash-button btn btn-primary" value="Добавить блок">'
      +       '<div class="row">'
      +         '<div class="col-md-12 form-group">'
      +           '<ul class="flash-list">'
      +           '</ul>'
      +         '</div>'
      +       '</div>'

  }

  this.simpleFlash = function(data, index){

    var template
      = '<li class="{{initialClass}}" data-index="{{index}}"}>{{text}}'
      +   '<button class="close" data-index="{{index}}">&times;</button>'
      + '</li>';

    var initialClass = "flash-item alert alert-info";

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

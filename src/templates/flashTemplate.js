function Template() {
  this.defaultTemplate
    =   '<input type="button" class="js-add-flash-button btn btn-primary" value="Добавить блок">'
    +     '<div class="row">'
    +       '<div class="col-md-12 form-group">'
    +         '<ul class="flash-list">'
    +         '</ul>'
    +       '</div>'
    +     '</div>';
}

module.exports = Template;

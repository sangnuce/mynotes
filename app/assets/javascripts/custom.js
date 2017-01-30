$(document).on('turbolinks:load', function(){
  $('.datetimepicker').datetimepicker({
    format: I18n.t('datetimepicker.formats.time')
  });
});

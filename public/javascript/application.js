'use strict';

$(function() {


$('#showNewContactForm').on('click', function() {
  $('#createContact').show();
});

$('#createContact').on('submit', function() {

  var firstName = $('#contactFirstName');
  var lastName = $('#contactLastName');
  var email = $('#contactEmail');
  var phone = $('#contactPhone');

  $.post('/api/contacts/new',
    {first_name: firstName.val(), last_name: lastName.val(), email: email.val(), phone: phone.val()},
    function(response) {
      if (response.result) {
        alert('Yay it worked');
        firstName.add(lastName).add(email).add(phone).val('');
      } else {
        alert('Didn\'t work :(');
      }
    }, 'json');

  return false;

});

});

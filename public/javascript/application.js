'use strict';

$(function() {


$('#showNewContactForm').on('click', function() {
  $('#createContact').show();
});

$('#createContact').on('submit', function() {

  var firstName = $('#contactFirstName').val();
  var lastName = $('#contactLastName').val();
  var email = $('#contactEmail').val();
  var phone = $('#contactPhone').val();

  if (firstName == '' || lastName == '') {
    return false;
  }

  $.post('/api/contacts/new',
    {first_name: firstName, last_name: lastName, email: email, phone: phone},
    function(response) {
      if (response.result) {
        alert('Yay it worked');
        $('#contactFirstName').add('#contactLastName').add('#contactEmail').add('#contactPhone').val('');
      } else {
        alert('Didn\'t work :(');
      }
    }, 'json');

  return false;

});

});

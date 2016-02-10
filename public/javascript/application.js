'use strict';

$(function() {

$('#showContacts').on('click', function() {
  $('#contactList').show();
  $('#contactList tbody').empty();

  $.getJSON('/api/contacts', function(contacts) {
    contacts.forEach(function(contact) {
      var tr = $('<tr>').appendTo('#contactList tbody');
      var fullName = contact.first_name + contact.last_name;
      $('<td>').text(fullName).appendTo(tr);
      $('<td>').text(contact.email).appendTo(tr);
      $('<td>').text(contact.phone).appendTo(tr);
    });
  });

});

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

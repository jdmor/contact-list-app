'use strict';

$(function() {

$('#showContacts').on('click', function() {
  $('#contactList').show();
  $('#createContact').hide();
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
  $('#contactList').hide();
});

$('#createContact').on('submit', function() {

  var firstName = $('#contactFirstName').val();
  var lastName = $('#contactLastName').val();
  var email = $('#contactEmail').val();
  var phone = $('#contactPhone').val();

  if (firstName === '' || lastName === '') {
    return false;
  }

  $.post('/api/contacts/new',
    {first_name: firstName, last_name: lastName, email: email, phone: phone},
    function(response) {
      if (response.result) {
        $('#contactFirstName').add('#contactLastName').add('#contactEmail').add('#contactPhone').val('');
      } else {
        // REFACTOR - Notify user of failed attempt
        console.log('Failed to create user.')
      }
    }, 'json');

  return false;

});

});

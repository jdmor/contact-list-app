'use strict';

$(function() {

var handlers = {
  loadContacts: function(contacts) {
    $('#contactList').show();
    $('#contactList tbody').empty();

    contacts.forEach(function(contact) {
      var tr = $('<tr>').appendTo('#contactList tbody');
      var fullName = handlers.fullName(contact);
      $('<td>').text(fullName).appendTo(tr);
      $('<td>').text(contact.email).appendTo(tr);
      $('<td>').text(contact.phone).appendTo(tr);
      var viewDetailsButton = $('<button>')
        .text('View')
        .addClass('js-view-contact')
        .data('contact-id', contact.id);
      viewDetailsButton.appendTo('<td>').appendTo(tr);
    });
  },
  loadContactDetails: function(contact) {
    $('#contactList').hide();
    var contactDetails = $('#contactDetails');
    contactDetails.empty();
    contactDetails.show();
    var fullName = handlers.fullName(contact);

    $('<p>').text(fullName).appendTo(contactDetails);
    $('<p>').text(contact.email).appendTo(contactDetails);
    $('<p>').text(contact.phone).appendTo(contactDetails);
  },
  fullName: function(contact) {
    return contact.first_name + ' ' + contact.last_name;
  }
};

$('#showContacts').on('click', function() {
  $('#createContact').hide();
  $('#searchContacts').hide();
  $('#contactDetails').hide();

  $.getJSON('/api/contacts', function(contacts) {
    handlers.loadContacts(contacts);
  });

});

$('#showNewContactForm').on('click', function() {
  $('#createContact').show();
  $('#contactList').hide();
  $('#searchContacts').hide();
  $('#contactDetails').hide();
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
        console.log('Failed to create user.');
      }
    }, 'json');

  return false;

});

$('#showSearchField').on('click', function() {
  $('#searchContacts').show();
  $('#contactList').hide();
  $('#createContact').hide();
  $('#contactDetails').hide();
});

$('#searchContacts').on('submit', function() {
  var term = $('#searchTerm').val();
  var path = '/api/contacts?search=' + term;

  $.getJSON(path, function(contacts) {
    handlers.loadContacts(contacts);
  });

  return false;
});

$('#contactList').on('click', '.js-view-contact', function() {
  var contactID = $(this).data('contact-id');
  var path = '/api/contacts/' + contactID;

  // get contact from db
  $.getJSON(path, function(contact) {
    handlers.loadContactDetails(contact);
  });

});

});

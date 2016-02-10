contacts = [
  ['William', 'Lowell', '219-793-1840', 'williamjlowell@teleworm.us'],
  ['Brandon', 'Hayes', '847-386-2853', 'brandonbhayes@armyspy.com'],
  ['Amanda', 'Castro', '847-558-3885', 'amandajcastro@rhyta.com'],
  ['Micheal', 'Kelley' '407-426-1894', 'michealjkelley@gmail.com'],
  ['Michale', 'Buckner', '704-395-1860', 'michalelbuckner@hotmail.com']
]

contacts.each do |contact|
  Contact.create(
    first_name: contact[0],
    last_name: contact[1],
    email: contact[2],
    phone: contact[3]
  )
end

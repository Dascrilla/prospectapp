Meteor.publish('contacts', function(filter) {
  /*if (filter) {
        return Contacts.find();
    }
  else {
    return Contacts.find();
  }
  */
  return Contacts.find();

}); 


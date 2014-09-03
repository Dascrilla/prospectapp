Template.contactsList.helpers({
  contact: function(){
    return Contacts.find();
    } 
});

Template.contactsList.contacts = function(){
  Contacts.find(); 
}

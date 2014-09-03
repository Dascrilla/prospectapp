Contacts = new Meteor.Collection('contacts'); 

Meteor.methods({
    contactsRemove: function(){
     return Contacts.remove({})
    }


});
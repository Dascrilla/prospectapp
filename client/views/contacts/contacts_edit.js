Template.contactEdit.helpers({ 
	contact: function() {
		return Contacts.findOne(Session.get('currentContactId')); 
	}
});

/* EVENT HANDLERS */

/* Cancel handler */
Template.contactPage.events({ 
	'click .cancel':function(e){
		e.preventDefault(); 
	Router.go('contactList'); 
	}, 

/* Submit  */
'submit form': function(e) {
e.preventDefault();
var currentContactId = this._id;

/* Defines object CoverageProperties and binds them to HTML "name" attrib.*/ 
var contactProperties = {
      dateset: $(e.target).find('[name=dateset]').val(), 
      sfid: $(e.target).find('[name=sfid]').val(),
      closed: $(e.target).find('[name=closed]').val()
}

/* Updates the current coverage with the new properties. Handles Error  */
Contacts.update(currentContactId, {$set: contactProperties}, function(error){
 if (error) {
// display the error to the user
alert(error.reason); 
} 
else {
	Router.go('contactList'); 
	//Router.go('coveragePage', {_id: currentCoverageId}); 
}
}); 
},

/* Delete handler */

/* Asks for confirmation, checks if there's an error, if not deletes the item and routes back to coveragesList */
/* TODO Find a better way to handle errors/form validation */
'click .delete': function(e) { 
e.preventDefault();
if (confirm("Delete this Item?")) {
 var currentContactId = this._id;
Contacts.remove(currentContactId, function(error){
 	if(error){
 	alert(error.reason); 
 	}
 	else{
 		Router.go('contactList');
 	}
 	}); 
} 
}
});
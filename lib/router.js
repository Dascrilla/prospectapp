/*subscriptions that WaitOn on the subscriptions to be loaded, displaying loading spinner in the interm */
Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() {
    return Meteor.subscribe('contacts'); 
  }
});

Router.map(function() {
  this.route('entrySignIn', {path: '/home'});
  this.route('profile', {path: '/profile'});

  this.route('contactsList', {
  	path: '/dashboard', 
  	waitOn: function() {
      return Meteor.subscribe('contacts');
    }, 
     onBeforeAction: function () {
      AccountsEntry.signInRequired(this);
    }
  });


  this.route('contact', {
    path: '/contacts/:_id',
    waitOn: function() {
      return Meteor.subscribe('contacts');
    },
    data: function() { return Contacts.findOne(this.params._id); }, 
    onBeforeAction: function () {
      AccountsEntry.signInRequired(this);
    }
  });

  this.route('contactSubmit', {
    path: '/submit', 
    onBeforeAction: function () {
      AccountsEntry.signInRequired(this);
    }
  });



  this.route('contactEdit', {
    path: '/contacts/:_id/edit',
    onBeforeAction: function () {
      AccountsEntry.signInRequired(this);
    },
    data: function() { return Contacts.findOne(this.params._id); }
    });

 });


/*requires the user logs in otherwise routes to Access Denied*/
var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn())
      this.render(this.loadingTemplate);
    else
      this.render('accessDenied');
    
    this.stop();
  }
}

Router.onBeforeAction(requireLogin, {only: 'contactSubmit'})
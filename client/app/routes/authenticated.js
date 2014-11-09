import Ember from 'ember';
var bind = Ember.run.bind;

export default Ember.Route.extend({
  beforeModel: function(transition) {
    return this.get('session').fetch()
      .catch(bind(this, 'authenticationDidFail', transition));
  },

  authenticationDidFail: function(transition) {
    this.controllerFor('login').setProperties({
      error: "You need to login first",
      attemptedTransition: transition
    });
    this.transitionTo('login');
  },

  logoutDidSucceed: function() {
    this.controllerFor('login').set("notice", "You have been logged out");
    this.transitionTo('login');
  },

  actions: {
    logout: function() {
      this.get('session').logout()
        .then(bind(this, 'logoutDidSucceed'));
    }
  }
});

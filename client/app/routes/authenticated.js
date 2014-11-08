import Ember from 'ember';
var inject = Ember.inject;
var run = Ember.run;

export default Ember.Route.extend({
  session: inject.service(),

  model: function() {
    return this.get('session').fetch()
      .catch(run.bind(this, 'authenticationDidFail'));
  },

  authenticationDidFail: function() {
    this.controllerFor('login').set("error", "You need to login first");
    this.transitionTo('login');
  },

  logoutDidSucceed: function() {
    this.controllerFor('login').set("notice", "You have been logged out");
    this.transitionTo('login');
  },

  actions: {
    logout: function() {
      this.get('session').logout()
        .then(run.bind(this, 'logoutDidSucceed'));
    }
  }
});

import Ember from 'ember';
var inject = Ember.inject;
var run = Ember.run;

export default Ember.Route.extend({
  session: inject.service(),

  model: function() {
    return this.get('session').fetch()
      .then(null, run.bind(this, 'authenticationDidFail'));
  },

  authenticationDidFail: function() {
    this.transitionTo('login');
  },

  logoutDidSucceed: function() {
    this.transitionTo('login');
  },

  actions: {
    logout: function() {
      this.get('session').logout()
        .then(run.bind(this, 'logoutDidSucceed'));
    }
  }
});

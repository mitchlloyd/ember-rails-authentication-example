import Ember from 'ember';
var bind = Ember.run.bind;

export default Ember.Route.extend({
  model: function() {
    return this.get('session').fetch()
      .catch(bind(this, 'authenticationDidFail'));
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
        .then(bind(this, 'logoutDidSucceed'));
    }
  }
});

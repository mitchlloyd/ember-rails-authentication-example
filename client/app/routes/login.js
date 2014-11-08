import Ember from 'ember';
var run = Ember.run;
var inject = Ember.inject;

export default Ember.Route.extend({
  session: inject.service(),

  model: function() {
    return {};
  },

  actions: {
    login: function(credentials) {
      this.get('session').login(credentials)
        .then(run.bind(this, 'authenticationDidSucceed'),
              run.bind(this, 'authenticationDidFail'));
    }
  },

  authenticationDidSucceed: function() {
    this.transitionTo('posts');
  },

  authenticationDidFail: function(response) {
    var message = response.responseJSON.error
    this.set('controller.error', message);
  }
});

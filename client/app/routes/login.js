import Ember from 'ember';
var bind = Ember.run.bind;
var inject = Ember.inject;

export default Ember.Route.extend({
  session: inject.service(),

  model: function() {
    return {};
  },

  actions: {
    login: function(credentials) {
      this.get('session').login(credentials)
        .then(bind(this, 'authenticationDidSucceed'),
              bind(this, 'authenticationDidFail'));
    }
  },

  authenticationDidSucceed: function() {
    this.transitionTo('posts');
  },

  authenticationDidFail: function(response) {
    var message = response.responseJSON.error;
    this.set('controller.error', message);
  },

  resetController: function(controller) {
    controller.setProperties({error: null, notice: null});
  }
});

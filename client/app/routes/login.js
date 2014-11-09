import Ember from 'ember';
var bind = Ember.run.bind;

export default Ember.Route.extend({
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
    var transition = this.get('controller.attemptedTransition');
    if (transition) {
      transition.retry();
    } else {
      this.transitionTo('posts');
    }
  },

  authenticationDidFail: function(response) {
    var message = response.responseJSON.error;
    this.set('controller.error', message);
  },

  resetController: function(controller) {
    controller.setProperties({error: null, notice: null});
  }
});

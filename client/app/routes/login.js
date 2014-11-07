import Ember from 'ember';
var run = Ember.run;

export default Ember.Route.extend({
  model: function() {
    return {};
  },

  actions: {
    login: function(credentials) {
      Ember.$.post('login', credentials)
        .then(run.bind(this, 'authenticationDidSucceed'),
              run.bind(this, 'authenticationDidFail'));
    }
  },

  authenticationDidSucceed: function() {

  },

  authenticationDidFail: function(response) {
    var message = response.responseJSON.error
    this.set('controller.error', message);
  }
});

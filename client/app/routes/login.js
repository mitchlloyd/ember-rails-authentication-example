import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return {};
  },

  actions: {
    login: function(credentials) {
      Ember.$.post('login', credentials);
    }
  }
});

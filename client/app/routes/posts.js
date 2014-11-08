import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return [
      {
        id: 1,
        title: "First Post",
        body: "Authenticating with buzzwords"
      }, {
        id: 2,
        title: "Second Post",
        body: "Authorization to the max"
      }
    ];
  }
});

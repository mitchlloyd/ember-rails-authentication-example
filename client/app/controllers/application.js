import Ember from 'ember';
var inject = Ember.inject;

export default Ember.Controller.extend({
  session: inject.service()
});

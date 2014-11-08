import Ember from 'ember';
var run = Ember.run;
var computed = Ember.computed;
var Promise = Ember.RSVP.Promise;

export default Ember.Service.extend({
  sessionData: null,
  isAuthenticated: computed.alias('sessionData'),

  login: function(credentials) {
    return Ember.$.post('login', credentials)
      .then(run.bind(this, 'authenticationDidSucceed'));
  },

  logout: function() {
    return Ember.$.ajax({type: 'DELETE', url: 'logout'})
      .then(run.bind(this, 'logoutDidSucceed'));
  },

  fetch: function() {
    return new Promise(function(resolve, reject) {
      if (this.get('sessionData')) {
        resolve()
      } else {
        Ember.$.ajax({type: 'GET', url: 'sessions'})
          .then(run.bind(this, 'authenticationDidSucceed'))
          .then(resolve, reject)
      };
    }.bind(this));
  },

  authenticationDidSucceed: function(response) {
    this.set('sessionData', response);
    var token = this.get('sessionData.csrf_token');
    debugger;
    $.ajaxPrefilter(function(options, originalOptions, jqXHR) {
      return jqXHR.setRequestHeader('X-CSRF-Token', token);
    });
  },

  logoutDidSucceed: function() {
    this.set('sessionData', null)
  }
});

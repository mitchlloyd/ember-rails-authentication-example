import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('authenticated', function() {
    this.resource('posts');
  });

  this.route('login');
});

export default Router;

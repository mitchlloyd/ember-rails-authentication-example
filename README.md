Ember and Rails Authentication from Scratch
-------------------------------------------

This is an example of setting up authentication with Ember and Rails without
using any additional libraries.

If you're setting up authentication you should look at:

* [Sorcery](https://github.com/NoamB/sorcery) for Rails authentication
* [Ember Simple Auth](http://ember-simple-auth.simplabs.com/)


Setting Up this Application
---------------------------

```
cd server
rake db:setup
```


Running this Application
------------------------

In the server directory run

```
rails s
```

In the client directory run

```
ember serve
```

Ember is setup to proxy unknown requests to the Rails app at `localhost:3000`.


Key Architecture Points
-----------------------

The [session](client/app/services/session.js) is the interface between the
client and the server. It contains all the details about what API endpoints to
use and how to setup the CSRF token.

Routes that require the user to be authenticated are nested under the
'authenticated' route in the [router](client/app/router.js). Note that templates
and the route file for these nested routes do not need to be nested under
"authenticated" folders in ember-cli. Also linking to these routes does not need
to refer to the "authenticated" namespace. This is a key property of `resources`
in the Ember router that makes this type of pattern easy to use without needing
to constantly refer to the 'authenticated' namespace.

The [authenticated route](client/app/routes/authenticated.js) attempts to fetch
the current user information and CSRF token from the Rails app. It redirects the
user to the login form if this login attempt fails. Also notice that this route
stores the attempted transition when authentication fails. This transition will
then be retried when the user later logs in.

The [login route](client/app/routes/authenticated.js) handles login and failed
login attempts.


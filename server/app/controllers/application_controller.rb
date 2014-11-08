class ApplicationController < ActionController::Base
  # My understanding is that the risk around CSRF is lower for APIs
  # because of browser's same origin policy for javascript. Still some
  # believe that because the browser is beyond our control, we should
  # still use CSRF. I'm using it here in case someone wants to know how
  # to use it.
  #
  # Some reading on the topic:
  #
  # http://stackoverflow.com/questions/7600347/rails-api-design-without-disabling-csrf-protection
  # http://security.stackexchange.com/questions/44186/what-is-the-need-of-security-token-to-prevent-csrf-attack
  # https://docs.angularjs.org/api/ng/service/$http#cross-site-request-forgery-xsrf-protection

  protect_from_forgery with: :exception

  def current_user
    @current_user || User.find_by(id: session[:user_id])
  end
end

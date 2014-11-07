class ApplicationController < ActionController::Base
  # My understanding is that the risk around CSRF is lower for APIs
  # because of browser's same origin policy for javascript. Still some
  # believe that because the browser is beyond our control, we should
  # still use CSRF. I'm using it here in case someone wants to know how
  # to use it.
  #
  # http://stackoverflow.com/questions/7600347/rails-api-design-without-disabling-csrf-protection

  protect_from_forgery with: :exception

  after_filter :set_csrf_cookie

  # Send the csrf token for authenticated users
  def set_csrf_cookie
    if protect_against_forgery? && current_user
      cookies['XSRF-TOKEN'] = form_authenticity_token
    end
  end

  def current_user
    @current_user || User.find_by(id: session[:user_id])
  end
end

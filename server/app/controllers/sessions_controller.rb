class SessionsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: :create

  def show
    if session[:user_id]
      user = User.find(session[:user_id])
      render json: session_payload(user)
    else
      render json: {error: "You are not logged in"}, status: 401
    end
  end

  def create
    user = User.find_by(email: params[:email])
    if user && user.authenticate(params[:password])
      session[:user_id] = user.id
      render json: session_payload(user)
    else
      render json: {error: "Email or password was incorrect"}, status: 401
    end
  end

  def destroy
    session.delete(:user_id)
    render json: {}, status: 204
  end

  private

  def session_payload(user)
    {
      user: { id: user.id, email: user.email },
      csrf_token: form_authenticity_token
    }
  end
end

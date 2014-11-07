class SessionsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: :create

  def create
    user = User.find_by(email: params[:email])
    if user && user.authenticate(params[:password])
      session[:user_id] = user.id
      render json: {}, status: :ok
    else
      render json: {error: "Email or password was incorrect"}, status: 401
    end
  end
end

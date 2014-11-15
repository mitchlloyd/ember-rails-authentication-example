class PostsController < ApplicationController
  before_action :require_authentication

  def index
    render json: {posts: Post.all}
  end
end

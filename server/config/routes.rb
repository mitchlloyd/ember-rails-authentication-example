Rails.application.routes.draw do
  resource :session
  post 'login', to: 'sessions#create'
  delete 'logout', to: 'sessions#destroy'

  resources :posts
end

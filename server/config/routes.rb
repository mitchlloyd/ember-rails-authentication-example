Rails.application.routes.draw do
  resources :sessions
  post 'login', to: 'sessions#create'
  delete 'logout', to: 'sessions#destroy'
end

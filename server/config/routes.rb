Rails.application.routes.draw do
  resources :sessions
  post 'login', to: 'sessions#create'
end

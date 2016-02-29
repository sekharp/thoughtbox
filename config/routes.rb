Rails.application.routes.draw do
  root to: "home#index"
  resources :users, only: [:new, :create]
  get '/login', to: "sessions#new"
  post '/login', to: "sessions#create"
  delete '/logout', to: "sessions#destroy"
  resources :links, only: [:index]

  namespace :api do
    resources :links
  end
end

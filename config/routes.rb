Rails.application.routes.draw do
  get "/book_search", to: "books#search_results"

  resources :books, only: [:index, :create, :update, :destroy]
  resources :users, only: [:index, :show, :create, :update]
  resources :exchanges, only: [:create, :update, :destroy]
  resources :messages, only: [:create, :update]
  resources :conversations, only: [:create]

  # login/out routes
  get "/me", to: "users#logged_user"
  post "/login", to: "sessions#create"
  post "/signup", to: "users#create"
  delete "/logout", to: "sessions#destroy"

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end

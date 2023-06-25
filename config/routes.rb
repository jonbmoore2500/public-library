Rails.application.routes.draw do
  get "/user_exchanges", to: "exchanges#active_exchanges"
  get "/library", to: "books#available_books"
  get "/book_search", to: "books#search_results"
  get "/user_convos", to: "conversations#user_convos"
  post "/new_convo", to: "conversations#new_convo"
  resources :books
  resources :users, only: [:index, :show, :create, :update]
  resources :exchanges
  resources :messages
  resources :conversations
  # be sure to limit the above resources
  # login/out routes
  get "/me", to: "users#logged_user"
  post "/login", to: "sessions#create"
  post "/signup", to: "users#create"
  delete "/logout", to: "sessions#destroy"
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end

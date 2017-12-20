Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "static_pages#root"

  resources :users, defaults: {format: :json}
  resources :names, defaults: {format: :json}
  resource :session, only: [:create, :destroy], defaults: {format: :json}
end

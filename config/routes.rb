Rails.application.routes.draw do
  root 'homepage#index'
  resources :names, only: [:create, :update, :index], default: :json
end
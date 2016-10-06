Rails.application.routes.draw do

  namespace :api do
    resource :user do
      post 'sign_in', to: 'users#sign_in'
      post 'check_sign', to: 'users#check_sign'

      #show , avalible server for user
      post 'avalible', to: 'users#change_avalible'
      post 'show', to: 'users#change_show'
      post 'change_password', to: 'users#change_password'
      post 'change_admin', to: 'users#change_admin'


      get 'test', to: 'users#test'
    end

    resource :account do
      post 'show_account', to: 'accounts#change_show'
      post 'change_password', to: 'accounts#change_password'
    end

    resource :setting do
      get 'default', to: 'settings#default'
      get 'ldap', to: 'settings#get_ldap'
      post 'ldap', to: 'settings#set_ldap'
      post 'test_ldap', to: 'settings#test_ldap'
      get 'test', to: 'settings#test'
    end

    resource :server do
      get  'info', to: 'servers#info'
    end
  end

  get '/test', to: 'start#index'

  #FrontEnd
  root to: 'start#index'
  get '/app', to: 'start#index'
  get '/app/*any', to: 'start#index' # route all path
end

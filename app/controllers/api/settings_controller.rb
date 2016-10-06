class Api::SettingsController < ApplicationController
  before_action :authenticate_required!, except: [:default , :test]
  before_action :admin_required!, except: [:default , :test]

  # defauil settings loaded befor render ui
  def default
    ldapConfig = Setting.where(key:'ldap').first.get_json
    ret = ldapConfig.slice('use_ldap','ldap_is_primary')
    render :json => ret
  end

  # set ldap configuration
  # serilize and save to Settings model with key `ldap`
  def set_ldap
    ldap = params[:ldap]
    ldapConfig = Setting.where(key:'ldap').first
    ldapConfig = Setting.new({key:'ldap'}) if ldapConfig.nil?
    ldapConfig.set_json(ldap)
    ldapConfig.save
    render :json => params
  end

  # return end render ldap configuration from Settings model with key `ldap`
  def get_ldap
    ldapConfig = Setting.where(key:'ldap').first.get_json
    render :json => ldapConfig
  end


  def test_ldap
    
    unless params['test'].nil?
      login = params['test']['testLogin']
      password = params['test']['testPassword']
    end
    if login.nil? || password.nil?
      render :json => {error:'please enter credentials'}
      return
    end

    ldap = User.ldapCheckUser({login:login, password:password})
    render :json => ldap
  end


  def test
    f = Puma.constants
    render :json => {f:f}
  end

end

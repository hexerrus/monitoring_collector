class Api::UsersController < ApplicationController
  before_action :authenticate_required!, except: [:sign_in, :test]
  before_action :admin_required! , except: [:sign_in , :check_sign, :test]

  # show all users account with permissions [only for admin]
  def show
    users = User.all.map { |u| u.compared }
    render :json => users
  end



  # change avalible server for user [only for admin]
  def change_avalible
    server_id = params[:server]
    user_id = params[:user]
    avalible = params[:avalible]

    if server_id.nil? || user_id.nil? || avalible.nil?
      render :json => {error:'please enter params'}
      return
    end

    up = UserPermission.where(user_id:user_id, server_id:server_id).first

    unless up.nil?
      up.avalible = avalible
      up.show = false if !avalible && up.show
      up.save
      render :json => {status:true}
      return
    end

    render :json => {status:false,up: up , params:params}
  end

  #change show option for any user [only for admin]
  def change_show
    server_id = params[:server]
    user_id = params[:user]
    show = params[:show]

    if server_id.nil? || user_id.nil? || show.nil?
      render :json => {error:'please enter params'}
      return
    end

    up = UserPermission.where(user_id:user_id, server_id:server_id).first

    unless up.nil?
      if !up.avalible && show
        render :json => {status:false}
        return
      end
      up.show = show
      up.save
      render :json => {status:true}
      return
    end

    render :json => {status:false,up: up , params:params}
  end


  #create new user
  def create
    login = params[:login]
    password = params[:password]

    if login.nil? || password.nil?
      render :json => {error: 'please enter params'}
      return
    end

    new_user = User.new({login:login , password:password})

    if new_user.valid?
      new_user.save
      render :json => {status:true}
      return
    else
      render :json => {status:false, error:"user not valid"}
      return
    end


  end

  #change user password
  def change_password
    password = params[:password]

    user_id = params[:user].to_i
    if user_id == 0 || password.nil?
      render :json => {error:'please enter params'}
      return
    end

    user = User.find(user_id)

    unless user.nil?
      user.password = password
      user.save
      render :json => {status:true}
      return
    end
    render :json => {status:false, params: params}
  end

  # change user admin permission
  def change_admin
    user_id = params[:user].to_i
    admin = params[:admin]

    if user_id == 0 || admin.nil?
      render :json => {error:'please enter params'}
      return
    end

    user = User.find(user_id)
    unless user.nil?
      user.admin = admin
      user.save
      render :json => {status:true,user:user , params:params}
      return
    end
    render :json => {status:false, params: params}
  end

  #delete user
  def destroy
    user_id = params[:user].to_i
    if user_id == 0
      render :json => {error:'please enter params'}
      return
    end
    user = User.find(user_id)
    unless user.nil?
      user.destroy
      render :json => {status:true}
      return
    end
    render :json => {status:false, params: params}
  end

  # logging in method, render token and user base information
  def sign_in
    login = params['login']
    password = params['password']
    type = (params['type'] || 'standard').to_sym

    if login.nil? || password.nil?
      render :json => {error:'please enter params'}
      return
    end

    if type == :standard
      user =  User.where(login:login,password:password,user_type:type).first
      if user.nil?
        render :json => { login:false , error: 'Invalid credentials' }
        return
      else
        raw_token = {login: user.login , password: password , type:user.user_type }
        token = JsonWebToken.encode(raw_token)
        render :json => { login:true , token: token , admin:user.admin , user: {login:user.login, type:user.user_type, id: user.id} }
        return
      end
    end
    if type == :ldap
      sing_in_ldap({login:login, password:password})

    end
  end

  # check token end return user  base information
  def check_sign
    user = @current_user
    render :json => { login:true , admin: user.admin, user: {login:user.login, type:user.user_type, id: user.id}}
  end

  def test
    cnt = Thread.list.select {|thread| thread.status == "run"}.count
    logger.fatal  "123123123 the request..."
    render :json => {cnt:cnt , env:Rails.env }
  end

  protected

  # sign_in method for ldap users
  def sing_in_ldap(args)
    login = args[:login]
    password = args[:password]
    ldap = User.ldapCheckUser({login:login, password:password})
    if ldap[:bind] == false
      render :json => { login: false , error:ldap[:error]}
      return
    else
      userObj = {login:login , user_type: :ldap}
      user = User.where(userObj).first_or_create
      raw_token = {login: user.login , password: password , type:user.user_type }
      token = JsonWebToken.encode(raw_token)

      render :json => { login: true , token: token , admin: user.admin,  user: {login:user.login, type:user.user_type, id: user.id} }
      return
    end
  end

end

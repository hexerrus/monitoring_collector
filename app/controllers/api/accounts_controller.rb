class Api::AccountsController < ApplicationController
  before_action :authenticate_required!


  def show
    render :json => @current_user.compared
  end

  # change show option for current user
  def change_show
    server_id = params[:server]
    user_id = @current_user.id
    show = params[:show]

    if server_id.nil? || show.nil?
      render :json => {error:'please enter correct params'}
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


  #change user password
  def change_password
    password = params[:password]
    if password.nil?
      render :json => {error:'please enter password param'}
      return
    end

    user =  @current_user
    user.password = password
    user.save
    render :json => {status:true}

  end

end

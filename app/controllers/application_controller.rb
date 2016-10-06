class ApplicationController < ActionController::Base


  #protect_from_forgery with: :exception

  protected

  def invalid_authentication
    render :json => {access:false}
    return
  end

  def authenticate_required!
    token = request.headers['Authorization'].to_s
    decode = JsonWebToken.decode(token)
    if decode == false
      invalid_authentication
    else
      user = User.where(login:decode[0]['login'] , user_type:decode[0]['type']).first
      if user.nil?
        invalid_authentication
      else
        @current_user = user
      end
    end

  end
  def admin_required!
    user = @current_user
    invalid_authentication if user.admin == false
  end



end

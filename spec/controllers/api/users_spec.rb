require "rails_helper"

adminUser = User.where(admin:true).first
adminToken = JsonWebToken.encode({login:adminUser.login , password: adminUser.password , type:adminUser.user_type})
notAdminUser = User.where(admin:false).first
notAdminToken = JsonWebToken.encode({login:notAdminUser.login , password: notAdminUser.password , type:notAdminUser.user_type})



describe Api::UsersController , :type => :api do

  #show

  context 'when get all users acount without token' do
    before do
      get "/api/user"
    end
    it 'responds with a key access is false' do
      expect(json['access']).to eq(false)
    end
  end

  context 'when get all users acount with not admin token' do
    before do
      header "Authorization", notAdminToken
      get "/api/user"
    end
    it 'responds with a key access is false' do
      expect(json['access']).to eq(false)
    end
  end

  context 'when get all users acount with admin token' do
    before do
      header "Authorization", adminToken
      get "/api/user"
    end
    it 'responds with a array contain users account info' do
      expect(json.length).to be > 1
    end
  end


  #avalible post

  context 'when post new avalible server preference to users account without token' do
    before do
      post "/api/user/avalible"
    end
    it 'responds with a key access is false' do
      expect(json['access']).to eq(false)
    end
  end

  context 'when post new avalible server preference to users account with not admin token' do
    before do
      header "Authorization", notAdminToken
        post "/api/user/avalible"
    end
    it 'responds with a key access is false' do
      expect(json['access']).to eq(false)
    end
  end

  context 'when post new avalible server preference to users account with admin token without params' do
    before do
      header "Authorization", adminToken
      post "/api/user/avalible"
    end
    it 'responds with a key error not nil' do
      expect(json['error']).not_to eq(nil)
    end
  end

  context 'when post new avalible server preference to users account with admin token with params' do
    before do
      header "Authorization", adminToken
      post "/api/user/avalible", {:server => Server.first.id , :user => User.first.id , :avalible => true}
    end
    it 'responds with a key status is true' do
      expect(json['status']).to eq(true)
    end
  end

  # show post

  context 'when post new show server preference to users account without token' do
    before do
      post "/api/user/show"
    end
    it 'responds with a key access is false' do
      expect(json['access']).to eq(false)
    end
  end

  context 'when post new show server preference to users account with not admin token' do
    before do
      header "Authorization", notAdminToken
        post "/api/user/show"
    end
    it 'responds with a key access is false' do
      expect(json['access']).to eq(false)
    end
  end

  context 'when post new show server preference to users account with admin token without params' do
    before do
      header "Authorization", adminToken
      post "/api/user/show"
    end
    it 'responds with a key error not nil' do
      expect(json['error']).not_to eq(nil)
    end
  end

  context 'when post new show server preference to users account with admin token with params' do
    before do
      header "Authorization", adminToken
      user = User.first
      server = Server.first
      up = UserPermission.where(user_id:user.id, server_id:server.id).first
      up.avalible = true
      up.save
      post "/api/user/show", {:server => server.id , :user => user.id , :show => true}
    end
    it 'responds with a key status is true' do
      expect(json['status']).to eq(true)
    end
  end

  # new post

  context 'when create new account without token' do
    before do
      post "/api/user"
    end
    it 'responds with a key access is false' do
      expect(json['access']).to eq(false)
    end
  end

  context 'when create new account with not admin token' do
    before do
      header "Authorization", notAdminToken
        post "/api/user"
    end
    it 'responds with a key access is false' do
      expect(json['access']).to eq(false)
    end
  end

  context 'when create new account with admin token without params' do
    before do
      header "Authorization", adminToken
      post "/api/user"
    end
    it 'responds with a key error not nil' do
      expect(json['error']).not_to eq(nil)
    end
  end

  context 'when create new account with admin token with params' do
    before do
      header "Authorization", adminToken
      @new_login = 'testuser'
      @new_password = '12345678'
      post "/api/user", { :login => @new_login, :password => @new_password }
    end
    it 'responds with a key status is true' do
      expect(json['status']).to eq(true)
    end

    it 'and user realy created' do
      expect(User.where(login:@new_login)).not_to eq(nil)
    end
  end

  context 'when create new account with admin token with params and user already exists' do
    before do
      header "Authorization", adminToken
      @new_login = 'testuser'
      @new_password = '12345678'
      User.create({login:@new_login , password:@new_password})
      post "/api/user", { :login => @new_login, :password => @new_password }
    end
    it 'responds with a key status is false' do
      expect(json['status']).to eq(false)
    end

  end
  # change_password post

  context 'when post new password for users account without token' do
    before do
      post "/api/user/change_password"
    end
    it 'responds with a key access is false' do
      expect(json['access']).to eq(false)
    end
  end

  context 'when post new password for users account with not admin token' do
    before do
      header "Authorization", notAdminToken
        post "/api/user/change_password"
    end
    it 'responds with a key access is false' do
      expect(json['access']).to eq(false)
    end
  end

  context 'when post new password for users account with admin token without params' do
    before do
      header "Authorization", adminToken
      post "/api/user/change_password"
    end
    it 'responds with a key error not nil' do
      expect(json['error']).not_to eq(nil)
    end
  end

  context 'when post new password for users account with admin token with params' do
    before do
      header "Authorization", adminToken
      @new_password = '12345678'
      user = User.first
      post "/api/user/change_password", { :password => @new_password, :user => user.id }
    end
    it 'responds with a key status is true' do
      expect(json['status']).to eq(true)
    end

    it 'and password realy changed' do

      expect(User.first.password).to eq(@new_password)
    end
  end

  # change_admin post

  context 'when post new admin preference users account without token' do
    before do
      post "/api/user/change_admin"
    end
    it 'responds with a key access is false' do
      expect(json['access']).to eq(false)
    end
  end

  context 'when post new admin preference users account with not admin token' do
    before do
      header "Authorization", notAdminToken
        post "/api/user/change_admin"
    end
    it 'responds with a key access is false' do
      expect(json['access']).to eq(false)
    end
  end

  context 'when post new admin preference users account with admin token without params' do
    before do
      header "Authorization", adminToken
      post "/api/user/change_admin"
    end
    it 'responds with a key error not nil' do
      expect(json['error']).not_to eq(nil)
    end
  end

  context 'when post new admin preference users account with admin token with params' do
    before do
      header "Authorization", adminToken
      @new_admin = true
      @user = User.where(admin:false).first
      post "/api/user/change_admin", { :admin => @new_admin, :user => @user.id }
    end
    it 'responds with a key status is true' do
      expect(json['status']).to eq(true)
    end

    it 'and admin realy changed' do
      expect(User.find(@user.id).admin).to eq(@new_admin)
    end
  end

  # destroy delete

  context 'when delete users account without token' do
    before do
      delete "/api/user"
    end
    it 'responds with a key access is false' do
      expect(json['access']).to eq(false)
    end
  end

  context 'when delete users account with not admin token' do
    before do
      header "Authorization", notAdminToken
        delete "/api/user"
    end
    it 'responds with a key access is false' do
      expect(json['access']).to eq(false)
    end
  end

  context 'when delete users account with admin token without params' do
    before do
      header "Authorization", adminToken
      delete "/api/user"
    end
    it 'responds with a key error not nil' do
      expect(json['error']).not_to eq(nil)
    end
  end

  context 'when delete users account with admin token with params' do
    before do
      header "Authorization", adminToken
      @user = User.where(admin:false).first
      delete "/api/user", { :user => @user.id }
    end
    it 'responds with a key status is true' do
      expect(json['status']).to eq(true)
    end

    it 'and user realy deleted' do
      expect(User.where(id:@user.id).first).to eq(nil)
    end
  end

  #sign_in post
  context 'when post sign_in without params' do
    before do
      header "Authorization", notAdminToken
        post "/api/user/sign_in"
    end
    it 'responds with a key error not nil ' do
      expect(json['error']).not_to eq(nil)
    end
  end

  context 'when post sign_in with params' do
    before do
      header "Authorization", notAdminToken
      user = User.first
      post "/api/user/sign_in" , {login:user.login , password:user.password}
    end
    it 'responds with all required keys' do
      expect(json['token']).not_to eq(nil)
      expect(json['login']).to eq(true)
      expect(json['admin']).not_to eq(nil)
    end
    it 'responds with correctly token' do
      token = json['token']
      payload = JsonWebToken.decode(token)
      expect(payload).not_to eq(false)
    end
  end

  #post check_sign
  context 'when check_sign users without token' do
    before do
      post "/api/user/check_sign"
    end
    it 'responds with a key access is false' do
      expect(json['access']).to eq(false)
    end
  end

  context 'when check_sign users with token' do
    before do
      header 'Authorization' , notAdminToken
      post "/api/user/check_sign"
    end
    it 'responds with a key login is true' do
      expect(json['login']).to eq(true)
    end
  end

end

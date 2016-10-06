require "rails_helper"

user = User.where(admin:true).first
token = JsonWebToken.encode({login:user.login , password: user.password , type:user.user_type})




describe Api::AccountsController , :type => :api do
  context 'when get default settings' do
    before do
      get "/api/setting/default"
    end

    it 'responds with a 200 status' do
      expect(last_response.status).to eq 200
    end

    it 'responds with a key use_ldap equal false (by default)' do
      message = json["use_ldap"]
      expect(message).to eq(false)
    end
  end


  #show

  context 'when get detailed user account information without token' do
    before do
      get "/api/account"
    end

    it 'responds with a 200 status' do
      expect(last_response.status).to eq 200
    end

    it 'responds with expected key access is false' do
      expect(json["access"]).to eq(false)
    end

  end

  context 'when get detailed user account information with token' do
    before do
      header 'Authorization' , token
      get "/api/account"
    end

    it 'responds with a 200 status' do
      expect(last_response.status).to eq 200
    end

    it 'responds with expected key access is nil' do
      expect(json["access"]).to eq(nil)
    end

    it 'responds with correctly user account' do
      expect(json["id"]).to eq(user.id )
    end

  end
  #change_show
  context 'when post new show settings into account without token' do
    before do
      post "/api/account/show_account"
    end

    it 'responds with a 200 status' do
      expect(last_response.status).to eq 200
    end

    it 'responds with expected key access is false' do
      expect(json["access"]).to eq(false)
    end

  end

  context 'when post show settings into account with token and without params' do
    before do
      header 'Authorization' , token
      post "/api/account/show_account"
    end

    it 'responds with a 200 status' do
      expect(last_response.status).to eq 200
    end

    it 'responds with expected key error' do
      expect(json["error"]).not_to eq(nil)
    end
  end

  context 'when post show settings into account with token and with params' do
    before do
      header 'Authorization' , token
      post "/api/account/show_account", {:server => Server.first.id , :show => true }
    end

    it 'responds with a 200 status' do
      expect(last_response.status).to eq 200
    end

    it 'responds with expected status is true' do
      expect(json["status"]).to eq(true)
    end
  end

  #change_password
  context 'when post new password settings into account without token' do
    before do
      post "/api/account/change_password"
    end

    it 'responds with a 200 status' do
      expect(last_response.status).to eq 200
    end

    it 'responds with expected key access is false' do
      expect(json["access"]).to eq(false)
    end
  end

  context 'when post new password settings into account with token and without new password' do
    before do
      header 'Authorization' , token
      post "/api/account/change_password"
    end

    it 'responds with a 200 status' do
      expect(last_response.status).to eq 200
    end

    it 'responds with expected key error not nil' do
      expect(json["error"]).not_to eq(nil)
    end
  end

  context 'when post new password settings into account with token and with new password' do
    before do
      @new_password = '12345678'
      header 'Authorization' , token
      post "/api/account/change_password",  { :password => @new_password }
    end

    it 'responds with a 200 status' do
      expect(last_response.status).to eq 200
    end

    it 'responds with expected key status is true' do
      expect(json["status"]).to eq(true)
    end

    it 'and password realy changed' do
      u = User.find(user.id)
      expect(u.password).to eq(@new_password)
    end
  end
end

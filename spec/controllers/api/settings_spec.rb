require "rails_helper"

user = User.where(admin:true).first
token = JsonWebToken.encode({login:user.login , password: user.password , type:user.user_type})




describe Api::SettingsController , :type => :api do
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



  context 'when post ldap setting without auth' do
    before do
      post '/api/setting/ldap' , :ldap => {:use_ldap => true}
    end

    it 'responds with a 200 status' do
      expect(last_response.status).to eq 200
    end

    it 'responds with expected key access is false' do
      expect(json["access"]).to eq(false)
    end

  end

  context 'when post ldap setting with auth' do
    before do
      header "Authorization", "#{token}"
      post '/api/setting/ldap' , :ldap => {:use_ldap => true, :test_key => 'test'}
    end

    it 'responds with a 200 status' do
      expect(last_response.status).to eq 200
    end

    it 'responds with expected key access is false' do
      message = json["access"]

      expect(message).to eq(nil)
    end

    it 'expect test_key is `test` in Setting model key ldap' do
      ldap = Setting.where(key:'ldap').first.get_json
      expect(ldap['test_key']).to eq('test')
    end

  end

  context 'when get ldap setting without auth' do
    before do
      get '/api/setting/ldap'
    end

    it 'responds with a 200 status' do
      expect(last_response.status).to eq 200
    end

    it 'responds with expected key access is false' do
      message = json["access"]
      expect(message).to eq(false)
    end
  end

  context 'when get ldap setting with auth' do
    before do
      header "Authorization", "#{token}"
      get '/api/setting/ldap'
    end

    it 'responds with a 200 status' do
      expect(last_response.status).to eq 200
    end

    it 'responds with expected key use_ldap not nil' do
      message = json["use_ldap"]
      expect(message).not_to eq(nil)
    end
  end

  context 'when test_ldap without auth' do
    before do
      post '/api/setting/test_ldap'
    end

    it 'responds with a 200 status' do
      expect(last_response.status).to eq 200
    end

    it 'responds with expected key access is false' do
      message = json["access"]
      expect(message).to eq(false)
    end

  end

  context 'when test_ldap with auth' do
    before do
      header "Authorization", "#{token}"
      post '/api/setting/test_ldap'
    end

    it 'responds with a 200 status' do
      expect(last_response.status).to eq 200
    end

    it 'responds with expected key access is false' do
      message = json["access"]
      expect(message).to eq(nil)
    end

    it 'responds with expected error because didn`t entered credentials' do
      message = json["error"]
      expect(message).not_to eq(nil)
    end

  end
end

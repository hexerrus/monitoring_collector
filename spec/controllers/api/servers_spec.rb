require "rails_helper"

adminUser = User.where(admin:true).first
adminToken = JsonWebToken.encode({login:adminUser.login , password: adminUser.password , type:adminUser.user_type})
notAdminUser = User.where(admin:false).first
notAdminToken = JsonWebToken.encode({login:notAdminUser.login , password: notAdminUser.password , type:notAdminUser.user_type})



describe Api::ServersController , :type => :api do

  #show

  context 'when get all servers without token' do
    before do
      get "/api/server"
    end
    it 'responds with a key access is false' do
      expect(json['access']).to eq(false)
    end
  end

  context 'when get all servers with not admin token' do
    before do
      header "Authorization", notAdminToken
      get "/api/server"
    end
    it 'responds with a key access is false' do
      expect(json['access']).to eq(false)
    end
  end

  context 'when get all servers with admin token' do
    before do
      header "Authorization", adminToken
      get "/api/server"
    end
    it 'responds with a array contain all servers' do
      expect(json.length).to be > 0
    end
  end


  #update put

  context 'when update server without token' do
    before do
      put "/api/server"
    end
    it 'responds with a key access is false' do
      expect(json['access']).to eq(false)
    end
  end

  context 'when update server with not admin token' do
    before do
      header "Authorization", notAdminToken
      put "/api/server"
    end
    it 'responds with a key access is false' do
      expect(json['access']).to eq(false)
    end
  end

  context 'when update server with admin token and without params' do
    before do
      header "Authorization", adminToken
      put "/api/server"
    end
    it 'responds with a key error not nil' do
      expect(json['error']).not_to eq(nil)
    end
  end

  context 'when update server with admin token and with correctly params' do
    before do
      header "Authorization", adminToken
      @server  = Server.first
      @new_name = 'testname'
      @new_link = 'http://test/test/'
      put "/api/server", :server => {id:@server.id, name: @new_name, link:@new_link}
    end
    it 'responds with key valid is true' do
      expect(json['valid']).to eq(true)
    end
    it 'server realy changed' do
      server = Server.find(@server.id)
      expect(server.name).to eq(@new_name)
      expect(server.link).to eq(@new_link)
    end
  end

  context 'when update server with admin token and with incorrect params' do
    before do
      header "Authorization", adminToken
      @server  = Server.first
      @new_name = ''
      @new_link = 'incorrect'
      put "/api/server", :server => {id:@server.id, name: @new_name, link:@new_link}
    end
    it 'responds with key valid is false' do
      expect(json['valid']).to eq(false)
    end
    it 'server not changed' do
      server = Server.find(@server.id)
      expect(server.name).not_to eq(@new_name)
      expect(server.link).not_to eq(@new_link)
    end
  end



  #create post

  context 'when create server without token' do
    before do
      post "/api/server"
    end
    it 'responds with a key access is false' do
      expect(json['access']).to eq(false)
    end
  end

  context 'when create server with not admin token' do
    before do
      header "Authorization", notAdminToken
      post "/api/server"
    end
    it 'responds with a key access is false' do
      expect(json['access']).to eq(false)
    end
  end

  context 'when create server with admin token and without params' do
    before do
      header "Authorization", adminToken
      post "/api/server"
    end
    it 'responds with a key error not nil' do
      expect(json['error']).not_to eq(nil)
    end
  end

  context 'when create server with admin token and with correctly params' do
    before do
      header "Authorization", adminToken
      @new_name = 'testname'
      @new_link = 'http://test/test/'
      post "/api/server", :server => { name: @new_name, link:@new_link}
    end
    it 'responds with key valid is true' do
      expect(json['valid']).to eq(true)
    end
    it 'server realy created' do
      server = Server.where(name:@new_name).first
      expect(server).not_to eq(nil)
    end
  end

  context 'when create server with admin token and with incorrect params' do
    before do
      header "Authorization", adminToken
      @new_name = ''
      @new_link = 'incorrect'
      post "/api/server", :server => { name: @new_name, link:@new_link}
    end
    it 'responds with key valid is false' do
      expect(json['valid']).to eq(false)
    end
    it 'server not created' do
      server = Server.where(name:@new_name).first
      expect(server).to eq(nil)
    end
  end

  # destroy delete

  context 'when delete server without token' do
    before do
      delete "/api/server"
    end
    it 'responds with a key access is false' do
      expect(json['access']).to eq(false)
    end
  end

  context 'when delete server with not admin token' do
    before do
      header "Authorization", notAdminToken
      delete "/api/server"
    end
    it 'responds with a key access is false' do
      expect(json['access']).to eq(false)
    end
  end

  context 'when delete server with admin token and without params' do
    before do
      header "Authorization", adminToken
      delete "/api/server"
    end
    it 'responds with a key error not nil' do
      expect(json['error']).not_to eq(nil)
    end
  end

  context 'when delete server with admin token and correctly params' do
    before do
      header "Authorization", adminToken
      @server = Server.first
      delete "/api/server", :server => { id: @server.id }
    end
    it 'responds with key valid is true' do
      expect(json['status']).to eq(true)
    end
    it 'server realy deleted' do
      server = Server.where(id:@server.id).first
      expect(server).to eq(nil)
    end
  end

  context 'when delete server with admin token and incorrect params' do
    before do
      header "Authorization", adminToken
      delete "/api/server", :server => { id:-1}
    end
    it 'responds with key valid is false' do
      expect(json['status']).to eq(false)
    end

  end
end

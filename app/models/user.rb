class User < ApplicationRecord
  after_create :afterCreate
  before_destroy :beforeDestroy

  enum user_type: [ :standard, :ldap ]
  has_many :user_permissions

  validates :login, presence: true
  validates_uniqueness_of :login

  # prepare explicit information about user
  def compared
    obj = self.slice :id , :login , :admin, :user_type
    obj[:perm]  = []
    UserPermission.where(user:self).each  do |up|
      obj[:perm]  << up.slice(:avalible , :show).merge( up.server.slice(:id,:name))
    end
    obj
  end

  # check user credentials on ldap server
  def self.ldapCheckUser(args)
    ldapConfig = Setting.where(key:'ldap').first.get_json
    login = args[:login]
    password = args[:password]

    error = false
    bind = false
    ldap = false
    begin
      uri = URI.parse(ldapConfig['ldap_server'])
      # interruption implemented through native timeout method
      # because new-ldap have incorrect timeout behaviour
      timeout(3) do
        ldap = Net::LDAP.new :host => uri.host,
         :port => uri.port,
         :verbose => true,
         :auth => {
               :method => :simple,
               :username => "#{ldapConfig['user_attribute']}=#{login},#{ldapConfig['base_dn']}",
               :password => password

         }
         bind = ldap.bind
      end
    rescue Exception => e
      error = e.message
    end

    if bind == false
      if error == false
        problem = "Connection failed!  Code:  #{ldap.get_operation_result.code}, message: #{ldap.get_operation_result.message}"
      else
        problem = error
      end
    end
    return { bind:bind, error: problem }
  end


  # add UserPermission for new user end all server
  def afterCreate
    Server.all.each do |server|
      UserPermission.create(user:self,server:server)
    end
  end

  # destroy UserPermission for new user end all server
  def beforeDestroy
    UserPermission.where(user:self).each {|up| up.destroy}
  end
end

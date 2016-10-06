class Server < ApplicationRecord
  after_save :afterSave


  after_create :afterCreate
  before_destroy :beforeDestroy

  enum server_type: [ :nagios, :zabbix ]
  has_many :user_permissions

  validates :name, presence: true
  #validates :link, presence: true
  validates :link,  :format => { :with =>  /https?:\/\/.*\//, :message => "Invalid link" }

  def check_server
    #puts "check server(#{link})"
    self.last_check_date = DateTime.now
    begin
      client = NagiosClient.new(
            :uri => self.link,
            :username => self.username,
            :password => self.password)
      client.update
      fileName =  "#{self.id}_#{DateTime.now.to_i.to_s}.json"
      fullFileName = File.join(Rails.root,'tmp',fileName)
      File.open(fullFileName, 'w') { |file| file.write(client.all.to_json) }
      #puts "save new file:#{fullFileName}"
      File.delete(File.join(Rails.root,'tmp',self.last_check_file)) rescue puts 'file not exists'
      #puts "delete old file:#{self.last_check_file}"
      #puts "GET_COUNT:#{client.Services.all.length}"
      self.status = true
      self.status_txt = 'OK'
      self.last_check_file = fileName

    rescue Exception => e
      self.status = false
      self.status_txt = e.message
      #puts '---error: ----'
      #puts e.message
      #puts '+++++++++++++'



    end

    self.save
    #fileName =  File.join(Rails.root,'tmp','dump.json')
    #File.open(fileName, 'w') { |file| file.write(client.all.to_json) }
  end


  def short_result
    self.short_result_nagios if self.server_type == 'nagios'

  end



  def short_result_nagios
    if self.status
    file = File.join(Rails.root,'tmp',self.last_check_file)
    contents = File.read(file)
    nagios_obj = JSON.parse(contents)

    client = NagiosClient.new({})
    client.load_object(nagios_obj)
    count_block = {
      hosts: client.Hosts.all.count,
      services: client.Services.all.count,
      service_ok: client.Services.find(:status => :OK).count,
      service_warning: client.Services.find(:status => :WARNING).count,
      service_critical: client.Services.find(:status => :CRITICAL).count,
      service_unknown: client.Services.find(:status => :UNKNOWN).count,
      service_downtime: client.Services.find(:downtime => true).count,
      service_ack: client.Services.find(:ack => true).count,
    }

    problems = []
    client.Services.all.each do |service|
      if service.status != :OK && service.downtime == false && service.ack == false
        service_h = service.to_hash
        service_h['host'] = service.host.hostname
        problems << service_h
      end
    end
    #puts "PUTS:#{problems.length}"
    #puts "CCC:#{client.Services.all.length}"

    res = {
      counters:count_block,
      problems: problems,
    }
    else
      res = {}
    end
    res[:last_check_time_left] = (DateTime.now.to_i - self.last_check_date.to_i)

    self.slice(:id , :name , :server_type , :status , :status_txt, :last_check_date, :link ).merge (res)
  end

  def self.find_time_left(id)
    r = 0
    $checker.each do |c|
      if c[:server].id == id
        return c[:left_time]
      end
    end
    return r
  end

  def self.update_cheker
    if $checker.nil?
      $checker = []
      Server.all.each do |s|
        $checker << {server:s ,left_time: s.interval}
      end
    else
      new_checker = []
      Server.all.each do |s|
        time_left = self.find_time_left s.id
        new_time = s.interval.to_i < time_left.to_i ? s.interval : time_left
        #puts "time_left:#{time_left}"
        new_checker << {server:s ,left_time: new_time}
      end
      $checker = new_checker
    end
  end





  def afterSave
    Server.update_cheker
  end

  def afterCreate
    #puts 'UserPermission.updateAll'
    User.all.each do |user|
      UserPermission.create(user:user,server:self)
    end
  end

  def beforeDestroy
    UserPermission.where(server:self).each {|up| up.destroy}
  end

end

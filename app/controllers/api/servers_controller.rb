class Api::ServersController < ApplicationController
  before_action :authenticate_required!, except: :test
  before_action :admin_required!, except: :info

  # show all servers
  def show
    render :json => Server.all
  end

  # update server
  def update
    server = params[:server]
    if server.nil?
      render :json => {error:"please enter params"}
      return
    end

    id = server[:id].to_i
    server_to_save = server.to_unsafe_h.except(:id)
    server_check = Server.new(server_to_save)
    valid = server_check.valid?
    server_elem = Server.find(id)
    unless server_elem.nil?
      if valid
        server_elem.update server_to_save
        server_elem.check_server
        render :json => { valid:true }
      else
        render :json => { valid:false, error: server_check.errors }
      end
    else
      render :json => server_to_save
    end

  end

  #reate new server
  def create
    server = params[:server]
    if server.nil?
      render :json => {error:'please enter params'}
      return
    end
    server_obj = server.to_unsafe_h

    new_server = Server.new(server_obj)
    if new_server.valid?
      new_server.save
      render :json => { valid: true }
    else
      render :json => { valid: false, errors: new_server.errors  }
    end
  end

  #delete server
  def destroy
    server = params[:server]
    if server.nil?
      render :json => {error:'please enter params'}
      return
    end

    id = server[:id].to_i
    server_elem = Server.where(id:id).first
    unless server_elem.nil?
      server_elem.destroy
      render :json => { status: true }
      return
    else
      render :json => { status: false }
      return
    end
  end

  # return explicit information about servers with all included host and services
  def info
    result = []
    Server.all.each do |server|
      result << server.short_result
    end

    status_key = makeStatusKey(result)
    render :json => {servers:result}.merge(status_key)

  end

  protected

  def makeStatusKey(servers)
    new_obj = []
    all_problems = []
    all_status = []
    servers.each do |server|
      prob_new = []
      prob = server['problems'] || []
      #puts "count:#{prob.length}"
      status = server['status']
      all_status << status
      prob_new = prob.map {|p| p['status']}
      all_problems << statusToInt(status)
      all_problems += prob.map {|p| statusToInt(p['status'])}
      new_obj << {status:status , problems:prob_new}
    end

    key = Digest::MD5.hexdigest(new_obj.to_json)
    #puts 'FFFF'
    all_problems.compact
    #puts all_problems.compact.inspect
    level = all_problems.compact.max

    {stateKey:key , level: level}

  end

  def statusToInt(status)
    case status
      when  :OK
        1
      when true
        1
      when :WARNING
        2
      when :UNKNOWN
        3
      when :CRITICAL
        3
      when false
        3
    end
  end
end

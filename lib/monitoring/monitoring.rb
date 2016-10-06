require 'monitoring/nagios/test'
module Monitoring2
  class Nagios
    attr_accessor :host, :username, :password
    def initialize(args)
      @uri = args['uri']
      @username = args['username']
      @password = args['password']
    end

    def test

      return {:host => @host}
    end

    def get_services
      m = Nag.new.test
      return "resturl:#{m}"
    end
    def get_services2
      page = Nokogiri::HTML(
        open(
           "#{@uri}status.cgi?host=all&limit=10",
           :http_basic_authentication => [@username, @password]
         ),
      )
      table = page.css('.status').to_s
      return table
    end

  end

end

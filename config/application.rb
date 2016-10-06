require_relative 'boot'

require 'rails/all'

#require './lib/monitoring/monitoring.rb'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Monitoring
  class Application < Rails::Application

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.
    config.autoload_paths << "#{config.root}/lib"
    config.eager_load_paths << "#{config.root}/lib"
=begin
    #if Rails.env.development?
      puts 'DDDEEVVV'
      reload_gems = %w(nagios_client) # names of gems which should autoreload
      config.autoload_paths += Gem.loaded_specs.values.inject([]){ |a,gem| a += gem.load_paths if reload_gems.include? gem.name; a }
      config.eager_load_paths += Gem.loaded_specs.values.inject([]){ |a,gem| a += gem.load_paths if reload_gems.include? gem.name; a }
      #puts Gem.loaded_specs.values.inject([]){ |a,gem| a += gem.load_paths if reload_gems.include? gem.name; a }
  #    require 'active_support/dependencies'
  #ActiveSupport::Dependencies.autoload_once_paths.delete('/opt/gems/nagios_client/lib')
      ActiveSupport::Dependencies.explicitly_unloadable_constants += reload_gems.map { |gem| gem.classify }
      #ActiveSupport::Dependencies.autoload_once_paths.delete('/opt/gems/nagios_client/lib')
  #ActiveSupport::Autoload.autoload('NagiosClient', '/opt/gems/nagios_client/lib')


  #  end
=end
  end
end

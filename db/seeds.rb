# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

users = [
  {login:'admin', password:'admin' , admin: true}
]

User.create(users)

servers = [
  {name:'demo', server_type: 'nagios', link: 'http://nagioscore.demos.nagios.com/nagios/cgi-bin/', username:'nagiosadmin' , password:'nagiosadmin' , interval: 60 },
]

Server.create(servers)

Server.all.each do |server|
  server.check_server
end

ldap_config = Setting.new({key:'ldap'})
ldap_config.set_json({use_ldap:false})
ldap_config.save

puts "env:#{Rails.env}"

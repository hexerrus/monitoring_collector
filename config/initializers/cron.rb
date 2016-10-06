if defined?(Puma::CLI) || defined?(Rails::Server)

  Server.update_cheker
  Thread.new {
    min_counter = 0
    while true do
      #puts '-----'
      #puts $checker
      #puts '-----'
        min_counter += 1
        $checker.each do |checkObj|
          need_break = false
          if checkObj[:left_time].to_i > 0
            checkObj[:left_time] = checkObj[:left_time].to_i - 1
          else
            #puts "check_server server:#{checkObj[:server].name} time: #{DateTime.now.to_i} "
            Thread.new { checkObj[:server].check_server }
            checkObj[:left_time] = checkObj[:server].interval.to_i
            need_break = true
          end
          break if need_break
        end
        if min_counter >= 60
          now = DateTime.now.to_i
          min_counter = 0
          files = Dir['./tmp/*.json']
          files.each do |file|
            file_ctime = File.ctime(file).to_i
            if now > (file_ctime + 60*60)
              File.delete(file)
            end
          end

        end

      sleep 1
    end
  }

end

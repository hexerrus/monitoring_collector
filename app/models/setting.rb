class Setting < ApplicationRecord

  # parse json value and convert into object
  def get_json
    JSON.parse self.value
  end

  # serilaize object into json and save value
  def set_json(val)
    self.value = val.to_json
    self.save
  end
  
end

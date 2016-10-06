Rails.env do
  config.autoload_paths += [Rails.root.join("lib").to_s]
  config.eager_load_paths += [Rails.root.join("lib").to_s]
end

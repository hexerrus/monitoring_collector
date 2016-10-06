class CreateServers < ActiveRecord::Migration[5.0]
  def change
    create_table :servers do |t|
      t.string :uri
      t.string :username
      t.string :password
      t.string :interval

      t.timestamps
    end
  end
end

# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160925145655) do
  create_table "servers", force: :cascade do |t|
    t.string   "name"
    t.column   :server_type, :integer, default: 0
    t.string   "link"
    t.string   "username"
    t.string   "password"
    t.string   "interval"
    t.column   :status, :boolean
    t.column   :status_txt, :string
    t.column   :last_check_file, :string
    t.datetime :last_check_date
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "login"
    t.string   "password"
    t.string   "email"
    t.column   :user_type, :integer, default: 0
    t.column   :admin, :boolean, default: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  create_table "user_permissions", force: :cascade do |t|
    t.column   :user_id, :integer
    t.column   :server_id, :integer
    t.column   :avalible, :boolean, default: true
    t.column   :show, :boolean, default: true
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  create_table "settings", force: :cascade do |t|
    t.column   :key, :string
    t.column   :value, :string
  end
end

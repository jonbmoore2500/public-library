# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2023_08_12_214356) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "books", force: :cascade do |t|
    t.integer "user_id"
    t.string "title"
    t.string "author"
    t.string "genre"
    t.integer "num_pages"
    t.boolean "hardback"
    t.string "notes"
    t.boolean "checked_out"
    t.boolean "hidden"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "conversations", force: :cascade do |t|
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "exchanges", force: :cascade do |t|
    t.integer "user_id"
    t.integer "book_id"
    t.boolean "approved", default: false
    t.boolean "received", default: false
    t.boolean "complete", default: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "returned", default: false
  end

  create_table "messages", force: :cascade do |t|
    t.text "text"
    t.bigint "sender_id", null: false
    t.bigint "recipient_id", null: false
    t.integer "conversation_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "msg_read"
    t.index ["recipient_id"], name: "index_messages_on_recipient_id"
    t.index ["sender_id"], name: "index_messages_on_sender_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "neighborhood"
    t.string "password_digest"
    t.string "bio"
    t.string "fav_author"
    t.string "fav_genre"
    t.date "last_login"
    t.integer "phone_num"
    t.string "email"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "messages", "users", column: "recipient_id"
  add_foreign_key "messages", "users", column: "sender_id"
end

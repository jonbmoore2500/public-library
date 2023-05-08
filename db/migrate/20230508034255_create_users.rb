class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :username
      t.string :neighborhood
      t.string :password_digest
      t.string :bio
      t.string :fav_author
      t.string :fav_genre
      t.date :last_login
      t.integer :phone_num
      t.string :email

      t.timestamps
    end
  end
end

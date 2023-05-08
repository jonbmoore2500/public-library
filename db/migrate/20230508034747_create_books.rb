class CreateBooks < ActiveRecord::Migration[6.1]
  def change
    create_table :books do |t|
      t.integer :user_id
      t.string :title
      t.string :author
      t.string :genre
      t.integer :num_pages
      t.boolean :hardback
      t.string :notes
      t.boolean :checked_out
      t.boolean :hidden

      t.timestamps
    end
  end
end

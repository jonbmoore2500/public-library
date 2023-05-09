class CreateExchanges < ActiveRecord::Migration[6.1]
  def change
    create_table :exchanges do |t|
      t.integer :user_id
      t.integer :book_id
      t.boolean :approved
      t.boolean :received
      t.boolean :complete
      
      t.timestamps
    end
  end
end

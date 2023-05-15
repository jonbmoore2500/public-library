class AddReturnedToExchanges < ActiveRecord::Migration[6.1]
  def change
    add_column :exchanges, :returned, :boolean
  end
end

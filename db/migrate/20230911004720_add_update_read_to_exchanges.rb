class AddUpdateReadToExchanges < ActiveRecord::Migration[6.1]
  def change
    add_column :exchanges, :update_read, :boolean, default: false
  end
end

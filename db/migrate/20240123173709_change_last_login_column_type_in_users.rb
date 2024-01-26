class ChangeLastLoginColumnTypeInUsers < ActiveRecord::Migration[6.1]
  def change
    change_column :users, :last_login, :datetime
  end
end

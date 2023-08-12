class AddMsgReadToMessages < ActiveRecord::Migration[6.1]
  def change
    add_column :messages, :msg_read, :boolean
  end
end

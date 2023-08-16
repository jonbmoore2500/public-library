class AddDefaultValToMessages < ActiveRecord::Migration[6.1]
  def change
    change_column_default :messages, :msg_read, from: nil, to: false
  end
end

class AddDefaultValsToExchanges < ActiveRecord::Migration[6.1]
  def change
    change_column_default :exchanges, :approved, from: nil, to: false
    change_column_default :exchanges, :received, from: nil, to: false
    change_column_default :exchanges, :returned, from: nil, to: false
    change_column_default :exchanges, :complete, from: nil, to: false
  end
end

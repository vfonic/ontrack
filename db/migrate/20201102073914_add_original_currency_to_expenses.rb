class AddOriginalCurrencyToExpenses < ActiveRecord::Migration[6.0]
  def change
    add_column :expenses, :original_currency, :string, limit: 3
  end
end

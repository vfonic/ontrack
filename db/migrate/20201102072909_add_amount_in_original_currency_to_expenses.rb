class AddAmountInOriginalCurrencyToExpenses < ActiveRecord::Migration[6.0]
  def change
    add_column :expenses, :amount_in_original_currency, :decimal, precision: 21, scale: 3
  end
end

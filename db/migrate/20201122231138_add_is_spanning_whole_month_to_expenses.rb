class AddIsSpanningWholeMonthToExpenses < ActiveRecord::Migration[6.0]
  def change
    add_column :expenses, :is_spanning_whole_month, :boolean
  end
end

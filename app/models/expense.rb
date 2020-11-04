class Expense < ApplicationRecord
  validates_presence_of :amount, :category_id, :paid_at

  belongs_to :category
  money_column :amount_in_original_currency, currency_column: :original_currency

  def amount=(value)
    return super(value) unless value.is_a? Money

    self[:amount] = usd_amount(value.value.to_i * 100, value.currency.iso_code)
    self[:amount_in_original_currency] = value.value
    self[:original_currency] = value.currency.iso_code
  end

  private

    def usd_amount(amount_in_cents, currency)
      return amount_in_cents if currency == 'USD'

      usd_to_hrk_conversion_rate = ::UsdToHrkConversionRateFetcher.call
      # round the amount to leave out any cents and then convert it back to cents
      (amount_in_cents.to_f / usd_to_hrk_conversion_rate / 100).round * 100
    end
end

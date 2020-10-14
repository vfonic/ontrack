class UsdToHrkConversionRateFetcher
  HNB_ENDPOINT_URL = 'https://www.hnb.hr/temeljne-funkcije/monetarna-politika/tecajna-lista/tecajna-lista?p_p_id=tecajnalista_WAR_hnbtecajnalistaportlet&p_p_lifecycle=2&p_p_resource_id=getTecajnaAjaxDataURL&izborValuta=USD&_tecajnalista_WAR_hnbtecajnalistaportlet_vrstaTecaja=srednji'

  def self.call
    fetch_conversion_rate
  end

  class << self
    private

    def fetch_conversion_rate
      conversion_rate.to_f
    end

    def conversion_rate
      # returned value is using comma decimal separator
      # we convert it to decimal point separator
      # 6,1332 => 6.1332
      Nokogiri::HTML(html_response).css('td:last-child').first.text.sub(',', '.')
    end

    def html_response
      JSON[hnb_conversion_rate]['data'][0]
    end

    def hnb_conversion_rate
      HTTP.get(HNB_ENDPOINT_URL).to_s
    end

  end
end

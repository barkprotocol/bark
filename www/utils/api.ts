import axios from 'axios';

const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY;
const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3';

interface CoinMarketCapData {
  price: number;
  volume_24h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  market_cap: number;
}

interface CoinGeckoData {
  current_price: number;
  total_volume: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d: number;
  market_cap: number;
}

export async function fetchCoinMarketCapData(symbol: string): Promise<CoinMarketCapData> {
  try {
    const response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest', {
      params: { symbol },
      headers: {
        'X-CMC_PRO_API_KEY': COINMARKETCAP_API_KEY,
      },
    });

    const data = response.data.data[symbol];
    return {
      price: data.quote.USD.price,
      volume_24h: data.quote.USD.volume_24h,
      percent_change_24h: data.quote.USD.percent_change_24h,
      percent_change_7d: data.quote.USD.percent_change_7d,
      market_cap: data.quote.USD.market_cap,
    };
  } catch (error) {
    console.error('Error fetching data from CoinMarketCap:', error);
    throw error;
  }
}

export async function fetchCoinGeckoData(id: string): Promise<CoinGeckoData> {
  try {
    const response = await axios.get(`${COINGECKO_API_URL}/coins/${id}`);
    const data = response.data;
    return {
      current_price: data.market_data.current_price.usd,
      total_volume: data.market_data.total_volume.usd,
      price_change_percentage_24h: data.market_data.price_change_percentage_24h,
      price_change_percentage_7d: data.market_data.price_change_percentage_7d,
      market_cap: data.market_data.market_cap.usd,
    };
  } catch (error) {
    console.error('Error fetching data from CoinGecko:', error);
    throw error;
  }
}

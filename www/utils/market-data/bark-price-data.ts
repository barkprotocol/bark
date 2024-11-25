export interface PriceData {
    date: string;
    price: number;
    volume: number;
    marketCap: number;
  }
  
  export const barkPriceData: PriceData[] = [
    { date: '2024-01-01', price: 0.05, volume: 1000000, marketCap: 50000000 },
    { date: '2024-01-02', price: 0.052, volume: 1200000, marketCap: 52000000 },
    { date: '2024-01-03', price: 0.055, volume: 1500000, marketCap: 55000000 },
    { date: '2024-01-04', price: 0.054, volume: 1400000, marketCap: 54000000 },
    { date: '2024-01-05', price: 0.056, volume: 1600000, marketCap: 56000000 },
    { date: '2024-01-06', price: 0.058, volume: 1800000, marketCap: 58000000 },
    { date: '2024-01-07', price: 0.06, volume: 2000000, marketCap: 60000000 },
    { date: '2024-01-08', price: 0.062, volume: 2200000, marketCap: 62000000 },
    { date: '2024-01-09', price: 0.064, volume: 2400000, marketCap: 64000000 },
    { date: '2024-01-10', price: 0.065, volume: 2500000, marketCap: 65000000 },
  ];
  
  export const getCurrentPrice = (): number => {
    return barkPriceData[barkPriceData.length - 1].price;
  };
  
  export const get24HourChange = (): number => {
    const currentPrice = getCurrentPrice();
    const yesterdayPrice = barkPriceData[barkPriceData.length - 2].price;
    return ((currentPrice - yesterdayPrice) / yesterdayPrice) * 100;
  };
  
  export const get7DayChange = (): number => {
    const currentPrice = getCurrentPrice();
    const weekAgoPrice = barkPriceData[barkPriceData.length - 8].price;
    return ((currentPrice - weekAgoPrice) / weekAgoPrice) * 100;
  };
  
  export const getTotalVolume = (): number => {
    return barkPriceData.reduce((total, data) => total + data.volume, 0);
  };
  
  export const getMarketCap = (): number => {
    return barkPriceData[barkPriceData.length - 1].marketCap;
  };
  
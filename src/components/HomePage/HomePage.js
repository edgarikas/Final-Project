import { useCallback, useEffect, useState } from 'react';
import { COINS_API } from '../../constants';

import millify from 'millify';

import './HomePage.css';
import Cryptos from '../Cryptos/Cryptos';
import Loader from '../Loader';

function HomePage({ favorites, onToggleFavorite }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const globalStats = data?.data?.stats;

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '3b0f08ace3msh35b9f54172a1681p113040jsn46dd73443bc4',
      'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
    },
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(COINS_API, options);
      if (response.status > 399 && response.status < 600) {
        throw new Error('Failed to load');
      }
      const resultData = await response.json();
      setData(resultData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      {loading && <h1>Loading</h1>}

      <h1 className='global-stats'>The Globall Crypto Market Stats</h1>
      <div className='market-stats'>
        <div className='market-stats_second-part'>
          <div className='market-stats_info'>
            <h2>Total Cryptocurrencies</h2>
            <p>{millify(globalStats?.totalCoins)}</p>
          </div>
          <div className='market-stats_info'>
            <h2>Total Market Cap</h2>
            <p>${millify(globalStats?.totalMarketCap)}</p>
          </div>
          <div className='market-stats_info'>
            <h2>Total Markets</h2>
            <p>{millify(globalStats?.totalMarkets)}</p>
          </div>
        </div>
        <div className='market-stats_second-part'>
          <div className='market-stats_info'>
            <h2>Total Exchanges</h2>
            <p>{millify(globalStats?.totalExchanges)}</p>
          </div>
          <div className='market-stats_info'>
            <h2>Total 24h Volume</h2>
            <p>${millify(globalStats?.total24hVolume)}</p>
          </div>
        </div>
      </div>
      <h1>Today's Top 10 Cryptocurrencies In The World of Crypto</h1>
      <Cryptos
        onToggleFavorite={onToggleFavorite}
        favorites={favorites}
        simplified
      />
    </>
  );
}

export default HomePage;

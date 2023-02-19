import { useCallback, useEffect } from 'react';
import { COINS_API } from '../../constants';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import millify from 'millify';
import * as TYPES from '../../content/types';
import './HomePage.css';
import Cryptos from '../Cryptos/Cryptos';
import News from '../News/News';
import Loader from '../Loader';

function HomePage({
  onLoadingDone,
  onLoading,
  load,
  onSuccess,
  onFailure,
  error,
  data,
}) {
  const globalStats = data?.data?.stats;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '3b0f08ace3msh35b9f54172a1681p113040jsn46dd73443bc4',
      'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
    },
  };

  const fetchData = useCallback(async () => {
    onLoading();
    try {
      const response = await fetch(COINS_API, options);
      if (response.status > 399 && response.status < 600) {
        throw new Error('Failed to load');
      }
      const resultData = await response.json();
      onSuccess(resultData);
    } catch (error) {
      onFailure();
    } finally {
      onLoadingDone(false);
    }
  }, [onSuccess, onFailure, onLoading, onLoadingDone]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (load) {
    return <Loader />;
  }
  if (error) {
    return <h1>Something is wrong... x)</h1>;
  }

  return (
    <>
      <h1 className='global-stats'>The Global Crypto Market Stats</h1>
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
      <div className='headings'>
        <h1 className='home-title'>
          Today's Top 10 Cryptocurrencies In The World of Crypto
        </h1>
        <p>
          <Link className='show-more' to='/cryptos'>
            Show More
          </Link>
        </p>
      </div>

      <Cryptos simplified />
      <div className='headings'>
        <h1 className='home-title'>Hottest Crypto News</h1>
        <p>
          <Link className='show-more' to='/news'>
            Show More
          </Link>
        </p>
      </div>

      <News simplified />
    </>
  );
}

function mapStateToProps(state) {
  return {
    favoritesCoins: state.content.favoritesCoins,
    load: state.content.homeLoading,
    error: state.content.error,
    data: state.content.coins,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toggleFavorite: (id, isFavorite) => {
      if (isFavorite) {
        dispatch({ type: TYPES.REMOVE_FAVORITE, id });
      } else {
        dispatch({ type: TYPES.ADD_FAVORITE, id });
      }
    },

    onSuccess: (payload) => {
      dispatch({ type: TYPES.GET_COINS_SUCCESS, payload });
    },
    onFailure: () => {
      dispatch({ type: TYPES.GET_COINS_FAILURE });
    },
    onLoading: () => {
      dispatch({ type: TYPES.HOME_LOADING });
    },
    onLoadingDone: () => {
      dispatch({ type: TYPES.HOME_LOADING_DONE });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

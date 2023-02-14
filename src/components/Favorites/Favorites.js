import React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './Favorites.css';
import * as TYPES from '../../content/types';
import Loader from '../Loader';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';
import millify from 'millify';
import { Typography, Card, Row, Col } from 'antd';
const { Title } = Typography;

function Favorites({
  cryptoCount,
  favoritesCoins,
  toggleFavorite,
  deleteAllCryptos,
}) {
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false);
  const COINS_API = `https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=${cryptoCount}&offset=0`;
  let cryptosNumberLenght = 2;
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
  }, [COINS_API]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  let coinsList = [];
  data?.data?.coins.forEach((allCoins) => {
    favoritesCoins.forEach((fav) => {
      if (allCoins.uuid === fav) {
        coinsList = coinsList.concat(allCoins);
      }
    });
  });

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className='favorite-title'>
        <h1>
          Your Favorite Coins List. Your Wishlist Is {coinsList.length} coins
        </h1>
      </div>
      <div className='favorite-buttons'>
        {favoritesCoins.length > 0 && (
          <button
            className='btnForFav deleteAll'
            type='submit'
            onClick={() => deleteAllCryptos()}
          >
            Delete All 🗑️
          </button>
        )}

        {favoritesCoins.length === 0 && (
          <Title level={3} className='show-more'>
            <Link to='/cryptos'>Show Cryptos List</Link>
          </Title>
        )}
      </div>

      <Row gutter={[32, 32]} className='crypto-card-container'>
        {coinsList?.map((currency) => (
          <Col
            xs={24}
            sm={12}
            lg={6}
            className='crypto-card'
            key={currency.uuid}
          >
            <Card
              title={`${currency.rank}. ${currency.name}`}
              extra={
                <img
                  alt='cryptoImage'
                  className='crypto-image'
                  src={currency.iconUrl}
                />
              }
              hoverable
            >
              <Link key={currency.uuid} to={`/crypto/${currency.uuid}`}>
                <p>
                  Price:{' '}
                  {millify(currency.price, { precision: cryptosNumberLenght })}
                </p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {currency.change}%</p>
              </Link>
              <Button
                design={
                  favoritesCoins.includes(currency.uuid) ? 'outline' : null
                }
                onClick={() =>
                  toggleFavorite(
                    currency.uuid,
                    favoritesCoins.includes(currency.uuid)
                  )
                }
              >
                {favoritesCoins.includes(currency.uuid) ? 'Remove' : 'Add'}
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}

function mapStateToProps(state) {
  return {
    favoritesCoins: state.content.favoritesCoins,
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
    deleteAllCryptos: () => {
      dispatch({ type: TYPES.REMOVE_ALL_CRYPTOS });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);

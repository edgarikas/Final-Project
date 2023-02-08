import { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import './Cryptos.css';
import Loader from '../Loader';
import Button from '../Button/Button';

import millify from 'millify';
import { Select, Card, Row, Col, Input } from 'antd';
const { Option } = Select;

function Cryptos({
  simplified,
  onToggleFavorite,
  favorites,
  changeCryptoCount,
  cryptoCount,
  favoritesCoins,
  toggleFavorite,
}) {
  //const [cryptoCount, setCryptoCount] = useState(100);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [cryptoCurrencies, setCryptocurrencies] = useState();

  const count = simplified ? 10 : cryptoCount;

  let cryptosListLength = data?.data?.coins.length;
  let cryptosNumberLenght = 2;

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '3b0f08ace3msh35b9f54172a1681p113040jsn46dd73443bc4',
      'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
    },
  };
  const COINS_API = `https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=${count}&offset=0`;

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
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [COINS_API]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const filteredData = data?.data?.coins.filter((item) =>
      item.name.toLowerCase().includes(searchTerm)
    );
    setCryptocurrencies(filteredData);
  }, [searchTerm, data]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <h1>Something is wrong.. x)</h1>;
  }

  return (
    <>
      {!simplified && (
        <div className='crypto-list'>
          <h1> List Of {cryptosListLength} Cryptocurrencies </h1>
          <label>Cryptocurrencies list of: </label>

          <Select
            className='selectCrytpoCount'
            onChange={(value) => changeCryptoCount(value)}
          >
            <Option value='100'>100</Option>
            <Option value='250'>250</Option>
            <Option value='500'>500</Option>
            <Option value='750'>750</Option>
            <Option value='1000'>1000</Option>
          </Select>
        </div>
      )}

      {!simplified && (
        <div className='search-crypto'>
          <label>Do your own crypto reasearch</label>
          <Input
            placeholder='Search Cryptocurrency'
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
        </div>
      )}

      <Row gutter={[32, 32]} className='crypto-card-container'>
        {cryptoCurrencies?.map((currency) => (
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
                design={favorites.includes(currency.uuid) ? 'outline' : null}
                onClick={() => onToggleFavorite(currency.uuid)}
              >
                {favorites.includes(currency.uuid) ? 'Remove' : 'Add'}
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}

function mapStateToProps(state) {
  console.log('sss', state.content.favoritesCoins);
  return {
    favoritesCoins: state.content.favoritesCoins,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toggleFavorite: (id, isFavorite) => {
      if (isFavorite) {
        dispatch({ type: 'REMOVE_FAVORITES', id });
      } else {
        dispatch({ type: 'ADD_FAVORITES', id });
      }
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cryptos);

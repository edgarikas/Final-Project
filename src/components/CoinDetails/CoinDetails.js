import { useParams } from 'react-router-dom';
import millify from 'millify';
import HTMLReactParser from 'html-react-parser';
import { useCallback, useEffect, useState } from 'react';
import { Col, Row, Typography, Select } from 'antd';
import Loader from '../Loader';
import Button from '../Button/Button';
import LineChart from '../LineChart/LineChart';
import './CoinDetails.css';
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  PercentageOutlined,
} from '@ant-design/icons';
const { Title, Text } = Typography;
const { Option } = Select;

function CoinDetails({ favorites, onToggleFavorite }) {
  const { coinId } = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [timeperiod, setTimeperiod] = useState('7d');
  const [coinHistory, setCoinHistory] = useState();
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '3b0f08ace3msh35b9f54172a1681p113040jsn46dd73443bc4',
      'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
    },
  };

  const cryptoDetails = data?.data?.coin;

  let coinPriceLenght = 2;
  if (cryptoDetails?.price <= 1) {
    coinPriceLenght = 5;
  }

  const COIN_API = `https://coinranking1.p.rapidapi.com/coin/${coinId}?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h`;
  const COIN_PRICE_HISTORY_API = `https://coinranking1.p.rapidapi.com/coin/${coinId}/history?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=${timeperiod}`;

  const time = ['1h', '3h', '24h', '7d', '30d', '3m', '1y', '3y', '5y'];
  const stats = [
    {
      title: 'Price to USD',
      value: `$ ${
        cryptoDetails?.price &&
        millify(cryptoDetails?.price, { precision: coinPriceLenght })
      }`,
      icon: <DollarCircleOutlined />,
    },
    { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    {
      title: '24h Price Change',
      value: `% ${cryptoDetails?.change}`,
      icon: <PercentageOutlined />,
    },
    {
      title: 'Market Cap',
      value: `$ ${
        cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)
      }`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: 'All-time-high(daily avg.)',
      value: `$ ${
        cryptoDetails?.allTimeHigh?.price &&
        millify(cryptoDetails?.allTimeHigh?.price)
      }`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: 'Number Of Markets',
      value: cryptoDetails?.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: 'Number Of Exchanges',
      value: cryptoDetails?.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: 'Aprroved Supply',
      value: cryptoDetails?.supply?.confirmed ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: 'Total Supply',
      value: `$ ${
        cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: 'Circulating Supply',
      value: `$ ${
        cryptoDetails?.supply?.circulating &&
        millify(cryptoDetails?.supply?.circulating)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  const fetchHistory = useCallback(async () => {
    try {
      const response = await fetch(COIN_PRICE_HISTORY_API, options);
      if (response.status > 399 && response.status < 600) {
        throw new Error('Failed to load');
      }
      const resultData = await response.json();
      setCoinHistory(resultData);
    } catch (error) {
      console.log(error);
    }
  }, [COIN_PRICE_HISTORY_API]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(COIN_API, options);
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
  }, [COIN_API]);

  useEffect(() => {
    fetchData();
    fetchHistory();
  }, [fetchData, fetchHistory]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {cryptoDetails && (
        <Col className='coin-detail-container'>
          <Col className='coin-heading-container'>
            <Title level={2} className='coin-name'>
              {data?.data?.coin.name} ({data?.data?.coin.symbol}) Price
            </Title>
            <p>
              {cryptoDetails.name} live price in US Dollar (USD). View value
              statistics, market cap and supply.
            </p>
            <Button
              design={favorites.includes(coinId) ? 'outline' : null}
              onClick={() => onToggleFavorite(coinId)}
            >
              {favorites.includes(coinId)
                ? 'Remove From Favorite ???????'
                : 'Add To Favorite ???'}
            </Button>
          </Col>
          <Select
            defaultValue={timeperiod}
            className='select-timeperiod'
            placeholder='Select Timeperiod'
            onChange={(value) => {
              setTimeperiod(value);
            }}
          >
            {time.map((date) => (
              <Option key={date}>{date}</Option>
            ))}
          </Select>

          <LineChart
            coinHistory={coinHistory}
            currentPrice={millify(cryptoDetails?.price, {
              precision: coinPriceLenght,
            })}
            coinName={cryptoDetails?.name}
          />

          <Col className='stats-container'>
            <Col className='coin-value-statistics'>
              <Col className='coin-value-statistics-heading'>
                <Title level={3} className='coin-details-heading'>
                  {cryptoDetails && cryptoDetails.name} Value Statistics
                </Title>
                <p>
                  An overview showing the statistics of {cryptoDetails.name},
                  such as the base and quote currency, the rank, and trading
                  volume.
                </p>
              </Col>
              {stats.map(({ icon, title, value }) => (
                <Col key={value} className='coin-stats'>
                  <Col className='coin-stats-name'>
                    <Text>{icon}</Text>
                    <Text>{title}</Text>
                  </Col>
                  <Text className='stats'>{value}</Text>
                </Col>
              ))}
            </Col>
            <Col className='other-stats-info'>
              <Col className='coin-value-statistics-heading'>
                <Title level={3} className='coin-details-heading'>
                  Other Stats Info
                </Title>
                <p>
                  An overview showing the statistics of {cryptoDetails.name},
                  such as the base and quote currency, the rank, and trading
                  volume.
                </p>
              </Col>
              {genericStats.map(({ icon, title, value }) => (
                <Col key={value} className='coin-stats'>
                  <Col className='coin-stats-name'>
                    <Text>{icon}</Text>
                    <Text>{title}</Text>
                  </Col>
                  <Text className='stats'>{value}</Text>
                </Col>
              ))}
            </Col>
          </Col>
          <Col className='coin-desc-link'>
            <Row className='coin-desc'>
              <Title level={3} className='coin-details-heading'>
                What is {cryptoDetails.name}?
              </Title>
              {HTMLReactParser(cryptoDetails.description)}
            </Row>
            <Col className='coin-links'>
              <Title level={3} className='coin-details-heading'>
                {cryptoDetails.name} Links
              </Title>
              {cryptoDetails.links?.map((link, i) => (
                <Row className='coin-link' key={i}>
                  <Title level={5} className='link-name'>
                    {link.type}
                  </Title>
                  <a href={link.url} target='_blank' rel='noreferrer'>
                    {link.name}
                  </a>
                </Row>
              ))}
            </Col>
          </Col>
        </Col>
      )}
    </>
  );
}

export default CoinDetails;

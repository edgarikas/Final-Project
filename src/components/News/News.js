import { useCallback, useEffect, useState } from 'react';
import { Select, Typography, Row, Col, Card } from 'antd';
import moment from 'moment';
import './News.css';
import Loader from '../Loader';
const { Text, Title } = Typography;
const { Option } = Select;
const demoImage = 'https://images.radio.com/podcast/3a8503394d.jpg';

function News({ simplified }) {
  const [news, setNews] = useState();
  const [newsCount, setNewsCount] = useState(simplified ? 12 : 50);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '3b0f08ace3msh35b9f54172a1681p113040jsn46dd73443bc4',
      'X-RapidAPI-Host': 'crypto-news16.p.rapidapi.com',
    },
  };

  const NEWS_API = `https://crypto-news16.p.rapidapi.com/news/top/${newsCount}`;

  const fetchNews = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(NEWS_API, options);
      if (response.status > 399 && response.status < 600) {
        throw new Error('Failed to load');
      }
      const resultData = await response.json();
      setNews(resultData);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [NEWS_API]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <h1>Something is wrong.. x)</h1>;
  }

  return (
    <>
      {!simplified && (
        <div className='news'>
          <h1>Hottest Crypto News</h1>
          <h2>New List Of: {newsCount}</h2>
          <Select
            className='newsListCount-select'
            onChange={(value) => setNewsCount(value)}
          >
            <Option disabled={newsCount === '10' ? true : false} value='10'>
              10
            </Option>
            <Option disabled={newsCount === '20' ? true : false} value='20'>
              20
            </Option>
            <Option disabled={newsCount === '30' ? true : false} value='30'>
              30
            </Option>
            <Option disabled={newsCount === '40' ? true : false} value='40'>
              40
            </Option>
            <Option disabled={newsCount === '50' ? true : false} value='50'>
              50
            </Option>
          </Select>
        </div>
      )}

      <Row gutter={[24, 24]}>
        {news?.map((news, i) => (
          <Col xs={24} sm={12} lg={8} key={i}>
            <Card hoverable className='news-card'>
              <a href={news.url} target='_blank' rel='noreferrer'>
                <div className='news-container'>
                  <Title className='news-title' level={4}>
                    {news.title}
                  </Title>
                  <img
                    style={{ maxWidth: '200px', maxHeight: '100px' }}
                    src={demoImage}
                    alt='news'
                  />
                </div>
                <div className='provider-container'>
                  <div>
                    <Text className='provider-name'>{news.title}</Text>
                  </div>
                  <Text>{moment(news.date).startOf('ss').fromNow()}</Text>
                </div>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default News;

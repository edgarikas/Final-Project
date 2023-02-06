import { useCallback, useEffect, useState } from 'react';

function News() {
  const [news, setNews] = useState();
  const options = {
    method: 'GET',
    headers: {
      'X-BingApis-SDK': 'true',
      'X-RapidAPI-Key': '3b0f08ace3msh35b9f54172a1681p113040jsn46dd73443bc4',
      'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com',
    },
  };

  const NEWS_API = `https://bing-news-search1.p.rapidapi.com/news/trendingtopics?textFormat=Raw&safeSearch=Off`;

  const fetchNews = useCallback(async () => {
    try {
      const response = await fetch(NEWS_API, options);
      if (response.status > 399 && response.status < 600) {
        throw new Error('Failed to load');
      }
      const resultData = await response.json();
      setNews(resultData);
    } catch (error) {
      console.log(error);
    }
  }, [NEWS_API]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  console.log(news);

  return <h1>news</h1>;
}

export default News;

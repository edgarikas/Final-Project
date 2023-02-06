import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './components/HomePage/HomePage';
import Navbar from './components/Navbar/Navbar';
import Cryptos from './components/Cryptos/Cryptos';
import CoinDetails from './components/CoinDetails/CoinDetails';
import News from './components/News/News';
import Favorites from './components/Favorites/Favorites';
import store from './state/state';
import { useState } from 'react';

import { FAVORITESCOINS_STORAGE_KEY } from './constants';

function App() {
  const [cryptoCount, setCryptoCount] = useState(100);
  const [favoritesCoins, setFavoritesCoins] = useState(
    JSON.parse(window.localStorage.getItem(FAVORITESCOINS_STORAGE_KEY)) || []
  );
  const onToggleFavorite = (id) => {
    let newFavorites = [...favoritesCoins];
    if (favoritesCoins.includes(id)) {
      newFavorites = newFavorites.filter((coinId) => coinId !== id);
    } else {
      newFavorites = newFavorites.concat(id);
    }
    window.localStorage.setItem(
      FAVORITESCOINS_STORAGE_KEY,
      JSON.stringify(newFavorites)
    );
    setFavoritesCoins(newFavorites);
  };

  const toggleDeleteAllCoins = () => {
    window.localStorage.removeItem(FAVORITESCOINS_STORAGE_KEY);
    setFavoritesCoins(
      JSON.parse(window.localStorage.getItem(FAVORITESCOINS_STORAGE_KEY)) || []
    );
  };

  const changeCryptoCount = (count) => {
    setCryptoCount(count);
  };

  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path='/'
            element={
              <HomePage
                onToggleFavorite={onToggleFavorite}
                favorites={favoritesCoins}
              />
            }
          ></Route>
          <Route
            path='/cryptos'
            element={
              <Cryptos
                onToggleFavorite={onToggleFavorite}
                changeCryptoCount={changeCryptoCount}
                cryptoCount={cryptoCount}
                favorites={favoritesCoins}
              />
            }
          ></Route>
          <Route
            path='/crypto/:coinId'
            element={
              <CoinDetails
                favorites={favoritesCoins}
                onToggleFavorite={onToggleFavorite}
              />
            }
          ></Route>
          <Route
            path='/favorites'
            element={
              <Favorites
                onToggleFavorite={onToggleFavorite}
                toggleDeleteAllCoins={toggleDeleteAllCoins}
                favorites={favoritesCoins}
                cryptoCount={cryptoCount}
              />
            }
          ></Route>
          <Route path='/news' element={<News />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

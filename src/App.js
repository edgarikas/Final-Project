import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './components/HomePage/HomePage';
import Navbar from './components/Navbar/Navbar';
import Cryptos from './components/Cryptos/Cryptos';
import CoinDetails from './components/CoinDetails/CoinDetails';
import News from './components/News/News';
import Favorites from './components/Favorites/Favorites';
import store from './state/state';
import { Provider } from 'react-redux';
import { useState } from 'react';

function App() {
  const [cryptoCount, setCryptoCount] = useState(100);
  const changeCryptoCount = (count) => {
    setCryptoCount(count);
  };

  return (
    <>
      <Provider store={store}>
        <div className='App'>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path='/' element={<HomePage />}></Route>
              <Route
                path='/cryptos'
                element={
                  <Cryptos
                    changeCryptoCount={changeCryptoCount}
                    cryptoCount={cryptoCount}
                  />
                }
              ></Route>
              <Route path='/crypto/:coinId' element={<CoinDetails />}></Route>
              <Route
                path='/favorites'
                element={<Favorites cryptoCount={cryptoCount} />}
              ></Route>
              <Route path='/news' element={<News />}></Route>
            </Routes>
          </BrowserRouter>
        </div>
      </Provider>
    </>
  );
}

export default App;

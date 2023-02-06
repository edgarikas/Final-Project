import { Link } from 'react-router-dom';
import logo from '../../images/cryptocurrency.png';
import './Navbar.css';

function Navbar() {
  return (
    <>
      <header className='Header'>
        <div className='Header__container'>
          <Link to='/'>
            <img alt='prop' className='Header__logo' src={logo}></img>
          </Link>
          <div className='meniu'>
            <Link to='/'>
              <p>Home</p>
            </Link>

            <Link to='/cryptos'>
              <p>Cryptocurrencies</p>
            </Link>
            <Link to='/favorites'>
              <p>Favorites</p>
            </Link>
            <Link to='/news'>
              <p>News</p>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar;

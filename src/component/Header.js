import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import SearchBarIcon from '../component/searchbar.svg';
import FavoritelocIcon from '../component/favoriteloc.svg';
import FavoritelocClickedIcon from '../component/favoriteloc_clicked.svg';

export default function Header() {
  const [favoritelocClicked, setFavoritelocClicked] = useState(false);

  const toggleFavoriteloc = () => {
    setFavoritelocClicked(!favoritelocClicked);
  };

  return (
    <header>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/Searchbar">
                <img src={SearchBarIcon} alt="SearchBar" />
              </Link>
            </li>
            <li>
              <button onClick={toggleFavoriteloc}>
                <img src={favoritelocClicked ? FavoritelocClickedIcon : FavoritelocIcon} alt="Favoriteloc" />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

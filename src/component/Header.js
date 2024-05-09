import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import SearchBarIcon from '../component/searchbar.svg';
import FavoritelocIcon from '../component/favoriteloc.svg';
import FavoritelocClickedIcon from '../component/favoriteloc_clicked.svg';
import SearchBarClickedIcon from '../component/searchbar_clicked.svg';

export default function Header() {
  const [favoritelocClicked, setFavoritelocClicked] = useState(false);
  const [searchBarClicked, setSearchBarClicked] = useState(false);

  const toggleFavoriteloc = () => {
    setFavoritelocClicked(!favoritelocClicked);
  };

  const toggleSearchBar = () => {
    setSearchBarClicked(!searchBarClicked);
  };

  const hideSearchBlock = () => {
    setSearchBarClicked(false);
  };

  return (
    <header>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/Searchbar">
                <img src={SearchBarIcon} alt="SearchBar" onClick={toggleSearchBar} />
              </Link>
            </li>
            <li>
              <button className="favorite-loc-button" onClick={toggleFavoriteloc}>
                <img src={favoritelocClicked ? FavoritelocClickedIcon : FavoritelocIcon} alt="Favoriteloc" />
              </button>
            </li>
          </ul>
        </nav>
        {searchBarClicked && (
          <div className="search-block" onClick={hideSearchBlock}>
            <img src={SearchBarClickedIcon} alt="SearchBarClicked" className="search-bar-clicked" />
          </div>
        )}
      </div>
    </header>
  );
}

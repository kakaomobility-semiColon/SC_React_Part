import React, { useState } from 'react';
import './Header.css';
import SearchBarIcon from '../component/searchbar.svg';
import FavoritelocIcon from '../component/favoriteloc.svg';
import FavoritelocClickedIcon from '../component/favoriteloc_clicked.svg';
import GlassesClickedIcon from '../component/glasses_clicked.svg';

export default function Header({ onSearch }) {
  const [favoritelocClicked, setFavoritelocClicked] = useState(false);
  const [searchBarClicked, setSearchBarClicked] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');

  const toggleFavoriteloc = () => {
    setFavoritelocClicked(!favoritelocClicked);
  };

  const toggleSearchBar = () => {
    setSearchBarClicked(!searchBarClicked);
  };

  const handleSearch = () => {
    onSearch(searchKeyword);
    setSearchKeyword('');
  };

  return (
    <header>
      <div>
        <nav>
          <ul>
            <li>
              <img src={SearchBarIcon} alt="SearchBar" onClick={toggleSearchBar} />
            </li>
            <li>
              <button className="favorite-loc-button" onClick={toggleFavoriteloc}>
                <img src={favoritelocClicked ? FavoritelocClickedIcon : FavoritelocIcon} alt="Favoriteloc" />
              </button>
            </li>
          </ul>
        </nav>
        <div className="search-block" style={{ display: searchBarClicked ? 'block' : 'none' }}>
          <div className="searchbar_clicked"> 
            <div className="searchbar">
              <img src={GlassesClickedIcon} alt="Search" className="glassesclicked-icon" onClick={handleSearch} />
              <input
                type="text"
                placeholder="장소, 위치, 대중교통을 입력하세요"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

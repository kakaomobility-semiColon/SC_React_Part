// Header.js
import React, { useState } from 'react';
import './Header.css';
import SearchBarIcon from '../component/SVG/searchbar.svg';
import FavoritelocIcon from '../component/SVG/favoriteloc.svg';
import FavoritelocClickedIcon from '../component/SVG/favoriteloc_clicked.svg';
import GlassesClickedIcon from '../component/SVG/glasses_clicked.svg';
import { searchingData } from './Data/searchingData'; // import searchingData

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
                placeholder="장소, 위치, 대중교통 검색"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
            </div>
            <div className="searching-box">
              {searchingData.map((item, index) => (
                <div key={index} className="searching-item">
                  <p className="searching-item-name">{item.name}</p>
                  <p className="searching-item-address">{item.address}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

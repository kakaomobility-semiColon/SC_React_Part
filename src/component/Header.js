import React, { useState } from 'react';
import './Header.css';
import SearchBarIcon from '../component/SVG/searchbar.svg';
import FavoritelocIcon from '../component/SVG/favoriteloc.svg';
import FavoritelocClickedIcon from '../component/SVG/favoriteloc_clicked.svg';
import GlassesClickedIcon from '../component/SVG/glasses_clicked.svg';

export default function Header({ onSearch }) {
  const [favoritelocClicked, setFavoritelocClicked] = useState(false);
  const [searchBarClicked, setSearchBarClicked] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([]); // 초기 상태를 빈 배열로 설정

  const toggleFavoriteloc = () => {
    setFavoritelocClicked(!favoritelocClicked);
  };

  const toggleSearchBar = () => {
    setSearchBarClicked(!searchBarClicked);
  };

  const handleSearch = async () => {
    onSearch(searchKeyword);

    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/charger/${searchKeyword}/detail`);
      const data = await response.json();
      setSearchResults(Array.isArray(data) ? data : [data]); // 응답이 배열인지 확인 후 설정
    } catch (error) {
      console.error('Error fetching search results:', error);
      setSearchResults([]); // 오류 발생 시 빈 배열로 설정
    }

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
              {searchResults.map((item, index) => (
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
